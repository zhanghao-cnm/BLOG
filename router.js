var express = require('express')
const { json } = require('express/lib/response')
var User = require('./models/user')
var router = express.Router()

router.get('/', function (req, res) {
    console.log(req.session.user)
    res.render('main.html',{
        user:req.session.user
    })
   
})

router.get('/login', function (req, res) {
    
    res.render('login.html')
})
router.post('/login', function (req, res) {
    User.findByemail(req.body,function(err,user){
       
        if(user.length==0) {
            return res.status(200).json({
            status:1,
            message:'服务端出错'
        })
        }
        req.session.user=user[0]
        
        res.status(200).json({
            status: 0,
            message: '注册成功'
        })

    })
})

router.get('/register', function (req, res) {
    res.render('register.html')

})
router.post('/register', function (req, res) {
    // console.log(req.body)
    User.save(req.body, function (err,user) {
        if (err) {
            return res.status(200).json({
                status:1,
                message:'服务端出错'
            })
        }
        console.log(user)
        req.session.user=user
        res.status(200).json({
            status: 0,
            message: '注册成功'
        })

    })
})

router.get('/logout',function(req,res){
    req.session.user=null

    res.redirect('/')
})
















module.exports = router