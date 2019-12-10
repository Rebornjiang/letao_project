$(function() {

  //发送ajax请求获取后台数据用来渲染

  $.ajax({
    type:'get',
    url:'/user/queryUser',
    dataType:'json',
    data:{
      page:'1',
      pageSize:'5'
    },
    success(info) {
      console.log(info)
      // template(模板id，数据对象)
      let htmlStr = template('tpl',info)
      $('tbody').html(htmlStr)
      // 获取数据之后可以动态来渲染数据，通过模板引擎 arttemplate
      // 使用模板引擎渲染的步骤1.引包 2.准备模板 3.准备数据 4.将数据与模板相结合
    }
  })
})