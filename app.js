// 刪除前先跳出警示

// sort
// index按鈕改為右上角下拉選單
// paginator(收攏頁面)
// detail頁排版調整
// 觀摩

//// Include packages
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//// Include modules
const Restaur = require('./models/restaurs_model.js')

//// Define variables
const port = 3000

//// Connect db
mongoose.connect('mongodb://localhost/restaurants_list_2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//// Set template engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

//// Use static files
app.use(express.static('public'))

//// Process
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//// Set routes
// get Index
app.get('/', (req, res) => {
  Restaur.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurs => res.render('index', { restaurs }))
    .catch(error => console.error(error))
})

// get search results
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  Restaur.find()
    .lean()
    .then(list => {
      const restaurs = list.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurs, keyword })
    })
    .catch(error => console.error(error))
})

// get to create new page
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// get details
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaur.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

// get to edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaur.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

// create new
app.post('/restaurants/new', (req, res) => {
  let { name, name_en, category, rating, phone, image, location, google_map, description } = req.body

  if (!image) {
    image = 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5720/restaurants-list-cover.jpg'
  }

  Restaur.create({ name, name_en, category, rating, phone, image, location, google_map, description })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//// Save edit
app.put('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  let { name, name_en, category, rating, phone, image, location, google_map, description } = req.body

  if (!image) {
    image = 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5720/restaurants-list-cover.jpg'
  }

  Restaur.findById(id)
    .then(restaur => {
      restaur.name = name,
        restaur.name_en = name_en,
        restaur.category = category,
        restaur.rating = rating,
        restaur.phone = phone,
        restaur.image = image,
        restaur.location = location,
        restaur.google_map = google_map,
        restaur.description = description
      restaur.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//// Delete
app.delete('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaur.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//// Start server
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})
