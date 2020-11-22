const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
const Restaur = require('./models/restaurs_model.js')
const hbsHelpers = require('./hbs_helpers')
require('./config/mongoose')

const app = express()
const selected = hbsHelpers.selected
const port = 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: { selected }
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} app is running on http://localhost:${port}`)
})
