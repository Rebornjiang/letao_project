$(function () {

  //进入页面发送ajax 请求
  //获取后天的数据，来渲染表格。
  render()
  function render(currentPage = 1, pageSize = 5) {

    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success(info) {
 
        let htmlStr = template('tpl', info)
        $('tbody').html(htmlStr)

        //分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          //注册事件 当页数发生变化的时候触发
          onPageClicked(a, b, c, page) {
            render(page)
          }
        })
      }
    })
  }


  // 点击btn 打开模态框

  $('#addCategory').click(() => {

    $('#addCategoryModal').modal()

    $('#fileupload').attr('name','pic1')
    //发送请求获取一级分类的数据，并渲染

    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success(info) {
        console.log(info)

        let htmlStr = template('firstTpl', info)
        $('#firstCategory').html(htmlStr)


        $('#firstCategory').on('click', 'a', function () {
          $('#firstBtnText').text($(this).text())
          let categoryId = $(this).attr('data-id')
          console.log(categoryId)
          $('[name="categoryId"]').val( categoryId )

          //更改隐藏域的校验状态
          $("form").data('bootstrapValidator').updateStatus("categoryId", "VALID")  
        })
      }
    })

    // 文件上传初始化
    // 关于前端文件上传 更加兼容的处理办法是：由前端将文件提供给到后台，后台将文件转存之后提供
    // 上传文件的路径。

    $("#fileupload").fileupload({
      dataType: "json",
      //e：事件对象
      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done: function (e, data) {

        $('#imgBox img').attr('src',data.result.picAddr)
        $('[name="brandLogo"]').val(data.result.picAddr)

        $('#fileupload').attr('name','')

        //更改表单校验状态
        $("form").data('bootstrapValidator').updateStatus("brandLogo", "VALID")
        
      }
    });

    $('form').bootstrapValidator({
      //对于隐藏域，禁用文本等等 插件默认不进行校验 就算隐藏域的值发生变化，插件也是监听不到的。需要手动更改变化
      // 需要取消 默认排除校验的表单元素

      excluded: [],

      //配置校验图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

      fields:{
        brandName:{
          validators: {
            notEmpty:{
              message:'请选择二级分类'
            }
          }
        },
        categoryId:{
          validators: {
            notEmpty:{
              message:'请选择一级分类'
            }
          }
        },
        brandLogo:{
          validators: {
            notEmpty:{
              message:'请选择需要上传的图片'
            }
          }
        }
        

      }
    })


    // 表单校验成功之后，
    //此事件在 点击提交之后，表单校验成功之后触发，先于发送请求
    $('form').on('success.form.bv',function(e) {
      e.preventDefault()
      

      //发送ajax请求

      $.ajax({
        url:'/category/addSecondCategory',
        type:'post',
        data:$('form').serialize(),
        dataType:'json',
        success(info) {
          if (info.success) {
            //关闭模态框
            $('#addCategoryModal').modal('hide')
             // 刷新页面
            render(1)
           

            // 清空 内容
            $('form').data('bootstrapValidator').resetForm(true)

            //上面只能清除input的内容，并不能清除向下拉列表和图片
            $('#firstBtnText').text('请选择一级分类')
            $('#imgBox img').attr('src','./images/none.png')

          }
        }
      })
    })

  })


})