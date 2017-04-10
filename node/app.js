var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var PORT = 3008

// 路由接口
const routes = require('./routers/router')

var app = express()

// 设置跨域访问
app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})

app.use(bodyParser.json())

app.use('/', routes)

app.use(express.static(path.join(__dirname, '../dist')))

module.exports = app.listen(PORT, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + PORT
  console.log('Listening at ' + uri + '\n')
})
