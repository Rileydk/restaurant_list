const mongoose = require('mongoose')
const Restaur = require('../restaurs_model.js')
const data = require('../../restaurs_data.json')

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

  data.results.forEach(item => {
    Restaur.create({
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })
  })

  console.log('seed data created!')
})
