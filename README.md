# Dinery

用Express.js和MongoDB建立的餐廳收藏清單網站

## 網站功能

1. 可以瀏覽所有收藏的餐廳
2. 可以新增想收藏的餐廳
3. 可以點擊查看個別詳細資料
4. 可以修改餐廳資料
5. 可以刪除收藏的餐廳
6. 可以在已收藏的餐廳中搜尋
7. 可以按建立時間先後、名稱、評價高低排序

## 安裝專案

在終端機中按順序輸入以下指令即可將專案下載安裝到自訂位置

注意須先安裝MongoDB，並在同一層建立[mongodb-data]資料夾

1. 開啟終端機，前往希望存放的資料夾位置
  ```bash
  cd <path/.../dir>
  ```
2. 下載到資料夾
  ```bash
  git clone https://github.com/Rileydk/restaurant_list.git
  ```
3. 安裝所需套件
  ```bash
  npm i
  ```
4. 啟動MongoDB伺服器
  ```bash
  cd mongodb/bin
  ./mongod --dbpath /Users/<username>/mongodb-data
  ```
5. 載入種子資料
  ```bash
  npm run seed
  ```
6. 啟動app伺服器
  ```bash
  npm run dev
  ```
7. 終端機顯示以下內容後，就可以到瀏覽器輸入[http://localhost:3000](http://localhost:3000)使用**Dinery**了！
  ```bash
  The server is listening on http://localhost:3000.
  ```

## 套件版本

- [node.js: v10.22.0](https://nodejs.org/en/)
- [npm: v6.14.8](https://www.npmjs.com/)
- [express.js: v4.17.1](https://www.npmjs.com/package/express)
- [express-handlebars: v5.2.0](https://www.npmjs.com/package/express-handlebars)
- [mongoose: v5.10.14](https://www.npmjs.com/package/mongoose)
- [body-parser: v1.19.0](https://www.npmjs.com/search?q=body-parser)
- [method-override: v3.3.0](https://www.npmjs.com/package/method-override)
- [bootstrap: v4.5.3](https://getbootstrap.com/)
- [jquery: v3.5.1](https://jquery.com/download/)
- [popper: v2](https://popper.js.org/)
