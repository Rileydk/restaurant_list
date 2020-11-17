//// Include packages
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

//// Include modules
const Restaur = require('./models/restaurs_model.js')

//// Define variables
const app = express()
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

// get details
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaur.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

//// Start server
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})
