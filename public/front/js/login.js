$(function () {








  $("#loginBtn").click(function () {
    //1.获取账户名 密码 发送ajax请求
    let username = $("#username").val().trim()
    let password = $("#password").val().trim()
    if (username === '') {
      mui.toast('用户名不能为空')
      return;
    }
    if (password === '') {
      mui.toast("密码不能为空")
      return;
    }

    //2.发送ajax请求
    $.ajax({
      url: '/user/login',
      data: {
        username,
        password
      },
      type: 'post',
      dataType: 'json',
      success(info) {
        console.log(info)
        //两种情形，一种时登录成功，一种时登录失败。
        // 需要判断时从那个连接跳转到登陆页的，如果时从商品详情页跳转 登陆成功 跳转回去
        // 如果是直接 是登登陆页面 就跳转到个人中心页面
        if (info.success) {

          if (location.href.indexOf('retUrl') > -1) {
            // 证明是从商品详情页跳转过来的
            let res = location.search.replace('?retUrl=', '').trim()
            location.href = res
          } else {

            location.href = 'user.html'
          }


        }
        if (info.error === 403) {
          mui.toast('用户名或是密码错误')
                  
        }
      }
    })
  })
})