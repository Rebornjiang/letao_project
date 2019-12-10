$(function() {

  //发送ajax请求获取后台数据用来渲染
  let currentPage = 1;
  let pageSize = 5;

  render()

  function render() {
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success(info) {
        console.log(info)
        // 获取数据之后可以动态来渲染数据，通过模板引擎 arttemplate
        // 使用模板引擎渲染的步骤1.引包 2.准备模板 3.准备数据 4.将数据与模板相结合
        // template(模板id，数据对象)
        // 在模板当中可以任意使用数据对象中的属性
        let htmlStr = template('tpl',info)
        $('tbody').html(htmlStr)
  
        
        // 分页功能
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size ),
          size:'normal',
          onPageClicked(a,b,c,page) {
            //这里的page就是 点击的当前页
            currentPage = page
            render()
          }
        })
        
        
  
  
  
      }
    })
  }
  

  
  // 用户的启用功能与禁用功能
      // 为什么不能够给#switch元素成功绑定事件？ 是因为#switch元素是通过模板引擎动态渲染的数据
      // 一开始页面中是没有的，后面才加上的。如果要给他们绑定事件，就需要通过事件委托来进行绑定
  //  $("#switch").click(function() {
  //    console.log('开启或是关闭')
  //   // 
  //  })


  let currentId = null;
  let isDelete = null;
  // 调用模态框
  $('tbody').on('click','.btn',function() {
   
    currentId = $(this).parent().attr('data-id')
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1
    $('#switchModal').modal()
  })


  //用户的启用功能与禁用功能
  $('#switch').click(function() {
   
    // 启用或是禁用
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      data:{
        id:currentId,
        isDelete
      },
      dataType:'json',
      success(info) {
        if (info.success) {
          render()

        }
      }
    })

    $('#switchModal').modal('hide')
  })
})

