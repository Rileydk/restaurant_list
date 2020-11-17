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
app.get('/', (req, res) => {
  Restaur.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurs => res.render('index', { restaurs }))
    .catch(error => console.error(error))
})

//// Start server
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})
