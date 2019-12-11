
$(function() {
  //发送请求获取数据，渲染表格列表

  render()

  function render(currentPage=1,pageSize=3) {
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success(info) {

        // template(模板id 数据对象)
        let htmlStr = template('tpl',info)
        $('tbody').html(htmlStr)
  
        // 分页功能
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          
          currentPage:info.page,
      
          totalPages:Math.ceil(info.total / info.size),
  
          onPageClicked(a,b,c,page){
            render(page)
          }
          
        })
      } 
  
    })
  
  }

  //开启模态框
  $('#addCategory').click(function() {
   
    $('#addCategoryModal').modal()
  })

  // 表单校验
  $('form').bootstrapValidator({
    //表单校验的风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName:{
        validators:{

          notEmpty:{
            message:'表单不能够为空，请输入分类'
          }
        }
      }
    }
  })

  //表单校验成功之后，不能够使用表单来提交到后台，需要利用ajax来发送请求。
    //so 需要阻止表单提交的默认行为

  $('form').on('success.form.bv',e => {
    e.preventDefault()
    
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      // 表单序列化这个方法需要理解一下
      data:$('form').serialize(),
      dataType:'json',
      success(info) {
        console.log(info)
        //
        if (info.success) {

          // 关闭模态框，
          // 刷新页面
          $('#addCategoryModal').modal('hide')

          render()
          //重置表单内容
          // 只有传true才会重置文本内容
          $("form").data('bootstrapValidator').resetForm(true)

        }
      }

    })
  })  

  
})