var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CommoditySchema = new Schema({
    name:String,
    price:Number,
    imgScr:String,
    meta:{
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
     }
    }
})

CommoditySchema.statics = {
    fetch:function(cb){
        return this
                .find({})
                .sort('mtat.updateAt')
                .exec(cb)
    },
    findById:function(id,cb){
        return this
                .findOne({_id:id})
                .sort('meta.updateAt')
                .exec(cb)
    }
}
//把模式导出
module.exports = CommoditySchema