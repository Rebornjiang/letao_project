$(function () {


  // 一 渲染表格
  render()
  function render(currentPage = 1, pageSize = 2) {
    $.ajax({

      url: "/product/queryProductDetailList",
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success(info) {

        let htmlStr = template('tpl', info)
        $('tbody').html(htmlStr)

        // 二 分页功能
        $('#paginator').bootstrapPaginator({
          //指定bootstrap版本
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked(a, b, c, page) {

            render(page)
          },
          // 将分页英文显示更改为中文
          // itemTexts 函数当控件内的每个操纵按钮被渲染(render)时，都会调用该函数，
          // 如需要更改 分页内容 只需要 return someText 就行了。
          // type为该控件的操作按钮的类型，
          // 如上图所示的五种类型：first、prev、page、next、last。
          // page为该按钮所属第几页。
          itemTexts(type, page, current) {

            switch (type) {
              case 'page':

                return page;

              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return "尾页";
            }
          },
          tooltipTitles(type, page, current) {
            switch (type) {
              case 'page':

                return "前往第" + page + "页";

              case 'first':
                return '前往首页';
              case 'prev':
                return '前往上一页';
              case 'next':
                return '前往下一页';
              case 'last':
                return "前往尾页";
            }
          },
          useBootstrapTooltip: true
        })
      }
    })
  }

  // 三 打开模态框

  $('#addProduct').click(() => {

    $("#addProductModal").modal()

    // 3.1 发送请求获取二级分类的列表，用于渲染
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: "json",
      data: { page: 1, pageSize: 100 },
      success(info) {

        let htmlStr = template('firstTpl', info)

        $("#firstCategory").html(htmlStr)
      }
    })

    // 3.2 点击二级分为列表中的任意一个，将btn替换为选中的值
    //     通过模板引擎渲染的数据，是不能够绑定事件，需要通过事件委托来进行绑定事件。
    $('#firstCategory').on('click', 'a', function () {

      $('#firstBtnText').text($(this).text())


      // 将所选中的值的id赋值给到其对于的隐藏域，用于表单提交。
      $('[name="brandId"]').val($(this).attr('data-id'))

      // 重新更改校验状态
      $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID')

    })


    // 4多文件上传，初始化
    let fileInfoArr = []
    $('#fileupload').fileupload({
      dataType: 'json',
      done(e, data) {
        // 多文件上传发送三次请求，这样做的好处是？
        //  1） jquery-fileupload 文件上传是通过ajax异步请求的，相比于只发送一个请求
        //        文件上传时不会等待全部都加载完之后在发送请求，这样效率会更快，用户体验好。

        // prepend 的作用是往一个元素内部的最前面增加 元素
        fileInfoArr.unshift(data.result)

        $('#imgBox').prepend('<img src="' + data.result.picAddr + '" alt="" width="100px" style="margin-right:5px;">')


        // 清除子img //清除数组
        if (fileInfoArr.length > 3) {
          $('#imgBox img').eq(-1).remove()
          fileInfoArr.pop()
        }

        // 更改表单校验状态

        if (fileInfoArr.length === 3) {
          $('form').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
        }

      }
    })


    // 5.表单验证
    $('form').bootstrapValidator({
      //因为有一些的隐藏域，所以需要将表单验证的排除项清空。
      excluded: [],
      //配置表单验证图标
      //配置校验图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

      //配置字段
      fields: {
        brandId: {
          validators: {
            notEmpty: {
              message: '请选择二级分类，此选项不能为空。'
            }
          }
        },
        proName: {
          validators: {
            notEmpty: {
              message: '请填写产品名称，此选项不能为空。'
            }
          }
        },
        //库存
        num: {
          validators: {
            notEmpty: {
              message: '请填写商品库存，此选项不能为空。'
            },
            regexp: {
              regexp: /^[1-9]\d*$/,
              message: '库存必须大于0'
            }
          }
        },
        size: {
          validators: {
            notEmpty: {
              message: '请填写商品尺码，此选项不能为空。'
            },
            regexp: {
              regexp: /^\d{2}-\d{2}$/,
              message: '尺码必须是32-44'
            }
          }
        },
        oldPrice: {
          validators: {
            notEmpty: {
              message: '请填写商品原价，此选项不能为空。'
            }
          }
        },
        proDesc: {
          validators: {
            notEmpty: {
              message: '请填写商品描述，此选项不能为空。'
            }
          }
        },
        price: {
          validators: {
            notEmpty: {
              message: '请填写商品现价，此选项不能为空。'
            }
          }
        },
        picStatus: {
          validators: {
            notEmpty: {
              message: '请上传三张图片'
            }
          }
        }
      }

    })

    // 6.阻止默认行为，提交数据到后台区
    $("form").on('success.form.bv', function (e) {
      e.preventDefault();

      let formParams = $('form').serialize() 
      // brandId=11&proName=1&proDesc=1&num=1&size=32-40&oldPrice=1&price=1&statu=1&pic1=&picStatus=#
      let strArr = formParams.split('&')
     
      strArr.pop()
      
      let newParams = strArr.join('&')
      newParams += "&picAddr1="+fileInfoArr[0].picAddr+"&picName1="+fileInfoArr[0].picName+""
      newParams += "&picAddr2="+fileInfoArr[1].picAddr+"&picName2="+fileInfoArr[1].picName+""
      newParams += "&picAddr3="+fileInfoArr[2].picAddr+"&picName3="+fileInfoArr[2].picName+""
     
      $.ajax({
        url:'/product/addProduct',
        type:'post',
        data: newParams,
        dataType:'json',
        success(info) {
          console.log(info)
          if (info.success) {
            //刷新页面，关闭模态框，清空表单

            render(1)

            $('#addProductModal').modal('hide')

            $('form').data('bootstrapValidator').reset(true)

            $('#firstBtnText').text('请选择二级分类')
            $('#imgBox img').remove()
          }
        }
      })
    });

  })

})