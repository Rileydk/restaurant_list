const express = require('express')
const router = express.Router()

const Restaur = require('../../models/restaurs_model')

let searchStatus = 0
let sortCategory = '_id'
let sortCategoryPre = ''
let sortOrder = 'desc'
let sortOrderDesc = ''
let sortOrderAsc = ''

router.get('/', (req, res) => {
  Restaur.find()
    .lean()
    .sort({ [sortCategory]: sortOrder })
    .then(restaurs => res.render('index', { restaurs, sortCategoryPre, sortOrder, sortOrderDesc, sortOrderAsc }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  searchStatus = 1
  const keyword = req.query.keyword.trim()
  Restaur.find()
    .lean()
    .then(list => {
      const restaurs = list.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurs, keyword, searchStatus })
    })
    .catch(error => console.error(error))
  searchStatus = 0
})

router.get('/sort/:category', (req, res) => {
  sortCategoryPre = req.params.category
  sortOrder = ''
  if (sortCategoryPre === '_id') {
    sortOrderDesc = '近 -> 遠'
    sortOrderAsc = '遠 -> 近'
  } else if (sortCategoryPre === 'name') {
    sortOrderDesc = 'Z -> A'
    sortOrderAsc = 'A -> Z'
  } else if (sortCategoryPre === 'rating') {
    sortOrderDesc = '高 -> 低'
    sortOrderAsc = '低 -> 高'
  }
  res.redirect('/')
})

router.get('/sort/category/:order', (req, res) => {
  sortCategory = sortCategoryPre
  sortOrder = req.params.order
  res.redirect('/')
})

module.exports = router
