//// Include packages
const express = require('express')
const mongoose = require('mongoose')

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

//// Set routes
app.get('/', (req, res) => {
  res.send('Hello World')
})

//// Start server
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})
