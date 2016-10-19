var Commodity = require('../models/commodity');
var fs = require('fs')
var path = require('path')
var _ = require('underscore');

exports.new = function(req,res){
    Commodity.find({},function(err,commoditiy){
        res.render('admincommodity',{
            title:'商品录入',
            commoditiy:commoditiy
        })
    })
}

exports.save = function(req, res) {
    if(!req.body) return res.sendStatus(400);
    var id = req.body.commodity._id;
    var commodityObj = req.body.commodity;
    var _commodity;
    if (req.imgScr) {
        commodityObj.imgScr = req.imgScr
        console.log('commodityObj==='+JSON.stringify(commodityObj))

    } 
    if (id){
        Commodity.findById(id,function(err,commodity){
            if (err) {console.log(err)}
            _commodity = _.extend(commodity,commodityObj);
            _commodity.save(function(err,_commodity){
                 if (err) {console.log(err)}
                 res.redirect('/commodity/'+_commodity._id);
            })
        })
    }else{
        
        _commodity = new Commodity(commodityObj); 
                _commodity.save(function(err,commodity){
            if (err) {console.log(err)}
            console.log('添加成功！')
            res.redirect('/commodity/'+_commodity._id);
        })
    }
}

exports.saveImgScr = function(req,res,next){
  var posterData = req.files.uploadImgScr
  var filePath = posterData.path
  var originalFilename = posterData.originalFilename
  if (originalFilename) {
    fs.readFile(filePath,function(err,data){
      var timestamp = Date.now()
      //split() 方法用于把一个字符串分割成字符串数组。
      var type =posterData.type.split('/')[1]
      var poster =timestamp + '.' +type
      var newPath = path.join(__dirname,'../../','/public/upload/'+poster)
      fs.writeFile(newPath,data,function(err){
        
        req.imgScr = poster
        
        next()
      })
    })
  }else{
    next()
  }
}

exports.detail = function(req,res){
  
// req.params 获取路径变量值，这里指id这个变量
  var id = req.params.id;
  Commodity.update({_id:id},{$inc:{pv:1}},function(err){
    if(err){
        console.log(err);
      }
  })
   Commodity.findById(id, function(err, commodity) {
    res.render('detail',{
            title:'商品详情',
            commodity:commodity
        })
  })
}

// 加载list page
exports.list = function(req,res){
  Commodity.fetch(function(err,commodities){
    if(err){
      console.log(err);
    }
    res.render('commoditylist',{
      title : '商品列表',
      commodities: commodities,
    });
  });
};
