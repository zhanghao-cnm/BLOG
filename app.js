var express = require('express')
var path = require('path')
var fs=require('fs')
var bodyparser = require('body-parser')
 var template = require('art-template')
var router = require('./router.js')
var session=require('express-session')


var app = new express()
// app.use('/public/', express.static(path.join(__dirname, '/public/')))
app.use('/node_modules', express.static('./node_modules'))
app.use('/public/', express.static('./public'))



app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.engine('html', require('express-art-template'))

app.use(session({
    secret: 'keyboard cat', //加密字符串 在原加密基础上 和这个字符串拼接起来
    resave: false,
    saveUninitialized: false  //无论是否使用session，都会默认分配一个密钥
  }))


app.use(router)



app.listen(8000, function () {
    console.log('running')
})
