$(function() {

  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    dataType:'json',
    success(info) {
      console.log(info)

      $('.userinfo').html( template('tpl',info))
    }
  })

  // 等出功能
  $("#logoutBtn").click(function() {
    $.ajax({
      url:'/user/logout',
      type:'get',
      dataType:'json',
      success(info) {
        
        if(info.success) {
          location.href = "login.html"
        }
      }
    })
  })
})  