var mongoose = require('mongoose')
var CommoditySchema = require('../schemas/commodity')
var Commodity =mongoose.model('Commodity',CommoditySchema)
module.exports = Commodity