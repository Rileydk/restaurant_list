const express = require('express')
const router = express.Router()

const Restaur = require('../../models/restaurs_model')

router.get('/', (req, res) => {
  Restaur.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurs => res.render('index', { restaurs }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
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

module.exports = router
