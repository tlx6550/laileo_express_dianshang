// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '我的实战项目' });
// });

// module.exports = router;
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Commodity = require('../app/controllers/commodity');
module.exports = function(app){
    
   app.use(function(req,res,next){
       var _user = req.session.user
       app.locals.user = _user
       next()
   })

   //index page
   app.get('/',Index.index)
   //User
   app.post('/user/signup',User.signup)
   app.post('/user/signin',User.signin)
   app.get('/admin/user/list',User.list)

   //Commodity
   app.get('/commoditylist',User.signinRequired,Commodity.list)
   app.get('/admin/commodity/new',User.signinRequired,Commodity.new)
   app.get('/commodity/:id',Commodity.detail)
   app.post('/admin/commodity/new',User.signinRequired,Commodity.saveImgScr,Commodity.save)
   // app.get('/admin/commodity/commoditylist',User.signinRequired,Commodity.commoditylist)
}