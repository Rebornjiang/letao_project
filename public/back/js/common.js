// 创建一个公共的js文件 ，需要的时候可以直接调用

// 1.进度条加载功能 ----请求的时候开始进度条， 请求结束的时候进度条加载完成
//Q：可是一个页面中 会有很多个请求，要怎么使用？
//A：在第一个请求发送的时候开启进度条NProgress.start(),最后一个请求结束的时候NProgress.done()
// 需要能够监听全局请求的事件

$(function () {
  //发送第一个请求的时候
  $(document).ajaxStart(() => {
    NProgress.start()
  })

  $(document).ajaxStop(() => {
    setTimeout(() => {
      NProgress.done()

    }, 500)
  })
})

//实现登陆拦截功能
$(function () {

  //只用后台才知道用户有没有登陆，只需要发送请求给到后台来获取用户是否已经登陆
  // 用户是登陆状态的话，就可以跳转，不是登陆状态拦截跳转到登陆页面。
  if (location.href.indexOf('login.html') === -1) {

    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      dataType: 'json',
      success(info) {
        if (info.error === 400) {
          location.href = 'login.html'
        }
      }
    })
  }

})


// 菜单栏显示与隐藏
$(function () {
  let flag = true;
  $('.show_level2').click(function () {

    if (flag) {

      $('.level2').removeClass('hidden')
      flag = false;
    } else {
      $('.level2').addClass('hidden')
      flag = true;
    }

  })
})

//侧边栏关闭开启

$(function () {

  $('.icon-menu').click(function () {
    console.log(111)
    $('.lt-aside').toggleClass('hidemenu')
    $('.lt-content .header').toggleClass('hidemenu')
    $('.lt-content').toggleClass('hidemenu')

  })
})

// 退出功能
// 1.弹出模态框
// 2.点击确认，进行跳转到登陆页面，并且要发送请求删除sessionId

$(function () {
  $('.icon-logout').click(() => {
    console.log(111)
    $('#logoutModal').modal("show")

    //点击退出，调换页面发送请求 ，删除sessionId
    $('#logout').click(() => {
      $.ajax({
        url: '/employee/employeeLogout',
        type: 'get',
        dataType: 'json',
        success(info) {
          if (info) {
            location.href = 'login.html'
          } else {
            alert('退出登陆失败，请联系管理员')
          }
        }
      })
    })
  })


})