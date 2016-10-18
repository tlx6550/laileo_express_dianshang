$( function register() {
   //通过serialize()方法进行序列化表单值，创建文本字符串。
   var data = $("form").serialize();
   //例如："username=张三&password=12345"
   $.ajax({
       url:'/register',
       type:'POST',
       data:data,
       success:function(data,status){
           if(status == 'success'){
               location.href='register';
           }
       },
       error:function(res,err){
           location.href='register';
       }
   });
}
)