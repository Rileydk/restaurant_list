const express = require('express')
const router = express.Router()

const Restaur = require('../../models/restaurs_model')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaur.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaur.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.post('/new', (req, res) => {
  let { name, name_en, category, rating, phone, image, location, google_map, description } = req.body

  if (!image) {
    image = 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5720/restaurants-list-cover.jpg'
  }

  Restaur.create({ name, name_en, category, rating, phone, image, location, google_map, description })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, rating, phone, image, location, google_map, description } = req.body

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

router.delete('/:id/delete', (req, res) => {
  const id = req.params.id
  console.log(id)
  Restaur.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
