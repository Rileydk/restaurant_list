const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String
  },
  rating: {
    type: Number
  },
  phone: {
    type: String
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  google_map: {
    type: String
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('Restaur', restaurSchema)
