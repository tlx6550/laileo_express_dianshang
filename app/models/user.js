var mongoose = require('mongoose')
var UserSchema = require('../schemas/user')
//User,
//当我们对其添加数据时如果User已经存在，
//则会保存到其目录下，如果未存在，则会创建User集合，然后在保存数据。
var User =mongoose.model('User',UserSchema)
module.exports = User