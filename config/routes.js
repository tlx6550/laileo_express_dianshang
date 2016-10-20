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
   app.get('/logout',User.logout)
   app.get('/signin',User.showSignin)
   app.get('/signup',User.showSignup)

   //index page
   app.get('/',Index.index)
   // app.get('/signin',User.signin)
   // app.get('/signup',User.signup)
   //User
   app.post('/user/signup',User.signup)
   app.post('/user/signin',User.signin)
   app.get('/admin/user/list',User.list)

   //Commodity
   app.get('/commoditylist',User.signinRequired,Commodity.list)
   app.get('/admin/commodity/list',User.signinRequired,Commodity.commoditylist)
   app.get('/admin/commodity/new',User.signinRequired,Commodity.new)
   app.get('/commodity/:id',Commodity.detail)
   app.get('/admin/commodity/update/:id',User.signinRequired,Commodity.update)
   app.post('/admin/commodity/new',User.signinRequired,Commodity.saveImgScr,Commodity.save)
   app.delete('/admin/commodity/list',User.signinRequired,Commodity.del)
}