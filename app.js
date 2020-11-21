//// Include packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//// Include modules
const routes = require('./routes')
const Restaur = require('./models/restaurs_model.js')
require('./config/mongoose')

//// Define variables
const app = express()
const port = 3000

//// Set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//// Use static files
app.use(express.static('public'))

//// Process
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)
//// Set routes

//// Delete
// app.delete('/restaurants/:id/delete', (req, res) => {
//   const id = req.params.id
//   Restaur.findById(id)
//     .then(restaurants => restaurants.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.error(error))
// })

//// Start server
app.listen(port, () => {
  console.log(`${new Date().getHours()}:${new Date().getMinutes()} app is running on http://localhost:${port}`)
})
