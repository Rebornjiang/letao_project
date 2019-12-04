
$(function () {
  //找到需要进行表单校验的dom元素

  $('#loginForm').bootstrapValidator({
    //表单校验的风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //fields 校验的字段
    fields: {
      username: {
        //校验的内容有那些
        //校验规则
        validators: {
          //非空校验
          notEmpty: {
            message: '请输入用户名'
          },
          stringLength: {
            min: 3,
            max: 6,
            message: '用户名长度需要在 3-6 位之间'
          },
          callback: {
            message:'用户名错误'
          }

        },

      },
      password: {
        validators: {
          notEmpty: {
            message: '请输入用户名'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度需要在 6-12 位之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })
  var bootstrapValidator = $('#loginForm').data('bootstrapValidator');
  // 完成重置功能
  $('[type="reset"]').on('click',() => {
    bootstrapValidator.resetForm(true)
  })

  //登陆功能

  // 1.表单校验成功之后 button type=submit 会提交表单 并且 跳转到 form action属性的地址中
  // 由于这是前端渲染，通过ajax来进行发送请求，所以要取消type=submit的默认行为
  // 2.bootstrapValidator 插件提供一个监听事件，表单验证成功之后，会先于提交表单前触发。
  // 在这个事件中阻止默认行为即可

  $('#loginForm').on('success.form.bv',e => {
   
    
    e.preventDefault()
    
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#loginForm').serialize(),
      dataType:'json',
      success(info) {
        console.log(info)
        if (info.success) {
          //登陆成功
          location.href = 'index.html'
        }
        if (info.error === 1001) {
          //密码错误
          //以字段的形式
          bootstrapValidator.updateStatus('password','INVALID',"callback")
        }
        if (info.error === 1000) {
          //用户名错误
          bootstrapValidator.updateStatus('username','INVALID',"callback")        
        }
      },
    })
  })



})