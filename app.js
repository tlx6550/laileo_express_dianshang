var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//connect-mongo 第三方中间件建立客户端登录状态保存在服务端
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// //本地开发环境 代码格式
// if ('development'=== app.get('env')) {
//   app.set('showStackError',true)
//   app.use(morgan(':method :url :status'))
//   app.locals.pretty = true
//   mongoose.set('debug',true)
// }
// var routes = require('./routes/index');
// var users = require('./routes/users');
var path = require('path');
var app = express();
var port = process.env.PORT || 2000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 设置视图路径
app.set('views','./views/pages');
app.set('view engine', 'jade');
var dbUrl = 'mongodb://localhost/dianshang'
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function(){
    console.log('Connection success!');
});
mongoose.connection.on('error', function(err){
    console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Connection disconnected');
});
app.locals.moment = require('moment');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
//保存登录状态信息到数据库
app.use(cookieParser())

app.use(require('connect-multiparty')());
app.use(session({
    secret: 'dianshang',
    store: new MongoStore({
      url:dbUrl,
      collection: 'sessions'
    }),
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

require('./config/routes')(app)
// 监听端口
app.listen(port);
console.log('实战 started on port:' +port);
module.exports = app;
