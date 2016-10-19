var User = require('../models/user');
//添加注册路由
exports.signup =function(req,res){
    var _user = req.body.user
    User.findOne({name:_user.name},function(err,user){
        if (err) {
            console.log(err)
        }
        if (!user == null) {
            console.log('已存在用户名')
            return res.redirect('/signin')
        }else{
            console.log('开始保存')
            user = new User(_user)
            console.log('数据为：'+user.name+'__'+user.password)
            user.save(function(err,user){
            if(err){
                console.log(err);
              }
            console.log('保存成功')
            res.redirect('/')
         })
       }
    })
}

//加载用户名list
exports.list = function(req,res){
  User.fetch(function(err,users){
    if(err){
      console.log(err);
    }
    res.render('userlist',{
      title : '用户列表',
      users: users,
    });
  });
};

//添加登录路由
exports.signin = function(req,res){
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name:name},function(err,user){
    if(err){
      console.log(err);
    }
    if (!user) {
      return res.redirect('/signup')
    } 
    user.comparePassword(password,function(err,isMatch){
      if(err){
        console.log(err);
       }
       if(isMatch){
        //保存客户登录状态
        req.session.user = user
        return res.redirect('/')
       }else{
         res.redirect('/signin')
         console.log('password is err');
       }
    })
  })
}

//加载用户名中间件
exports.signinRequired = function(req,res,next){
  var user = req.session.user
  if(!user){
    return res.redirect('/')
  }
  next()
}