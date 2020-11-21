// 使用config重構
// 搜尋列調整位置樣式
// 取消card-list排序方式
// 非搜尋時而無資料時修改顯示資訊
// 調整無搜尋結果時之樣式
// 增加排序選項（類別：、排序方法：A-Z、評價）
//// 依建立時間序：近到遠、遠到近
//// 依名稱：A-Z、Z-A
//// 依類別：A-Z、Z-A
//// 依評價：高到低、低到高
// 修改detail樣式
// 編輯頁面標頭、未填入詳細資料時樣式
// 類別改為選單式，可自行增加類別，增加篩選器

// 增加分頁器
// 使用更好的方法，從資料庫就做篩選，而非全部取回再filter
// 如何整理使用的圖片？asset？

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
