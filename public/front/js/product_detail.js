

$(function () {
  //进去页面就发送请求获取数据，获取search页面提供过来的id

  var id = getSearch('productId')
  $.ajax({
    url: '/product/queryProductDetail',
    data: { id },
    type: 'get',
    dataType: 'json',
    success(info) {

      $('.mui-scroll').html(template('tpl', info))
      // 用于dom结构时动态渲染的，需要在dom结构完全加载 完成之后 初始化轮播图
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      // mui默认会进行初始化插件，但是动态生成的需要手动进行更新初始化
      mui('.mui-numbox').numbox()
    }
  })

  //2.让size可以选择
  $('.lt_search').on('click','.lt_size span',function() {
    $(this).addClass('current').siblings().removeClass('current')
  })

  // 3.给加入购物车绑定事件，size非空校验，发送请求
  $("#addCart").click(function() {
    let res = $(".lt_size span").hasClass('current')
    if (!res) {
      mui.toast('请选择商品尺码')
      return;
    }
    // 收集发送请求的数据
    var productId = id;
    var num = mui(".mui-numbox").numbox().getValue()
    var size = $(".lt_size span.current").text().trim()
    
    // 发送请求
    $.ajax({
      url:"/cart/addCart",
      dataType:'json',
      type:'post',
      data:{
        productId,
        num,
        size
      },
      success(info) {

        if (info.error === 400) {
          //没有登陆的状态
          location.href = "login.html?retUrl=" + location.href 
        }
        if(info.success) {
          // 已经登陆的状态
          mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e) {
            if (e.index === 0) {
              //选择的时去购物车
              location.href = "shop_cart.html"
            }
          })

        }
      }
    })
    // 跳转购物车分为两种情形 1.登陆才能跳转购物 2.没有登陆返回到登陆页面
   

  })


})