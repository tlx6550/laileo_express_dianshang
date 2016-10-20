$(function() {
  $('.del').click(function(e){
    var target = $(e.target);
    var id = target.data('id');
    var tr = $('.item-id-'+id);
    $.ajax({
      type:'DELETE',
      url:'/admin/commodity/list?id='+id
    }).done(function(results){
      if (results.success ===1) {
        if (tr.length > 0) {
          tr.remove();
        }
      }
    })
  })
})

//两者写法一样，前者是自执行 无线调用；后者先定义函数名 ，在调用
// function del() {
//   $('.del').click(function(e){
//     var target = $(e.target);
//     var id = target.data('id');
//     var tr = $('.item-id-'+id);
//     $.ajax({
//       type:'DELETE',
//       url:'/admin/commodity/list?id='+id
//     }).done(function(results){
//       if (results.success ===1) {
//         if (tr.length > 0) {
//           tr.remove();
//         }
//       }
//     })
//   })
// }
// del();