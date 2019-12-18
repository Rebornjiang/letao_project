$(function () {


  // 1.封装渲染函数
  function render() {
    //进入页面发送ajax请求

    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      dataType: 'json',
      success(info) {
        if (info.error === 400) {
          //此时未登陆
          location.href = 'login.html'
        } else {
          // 此时已经登陆
          // 动态渲染

          $(".cartInfo").html(template('tpl', { info }))

        }
      }
    })
  }

  //2.实现下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次      
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          render()
          // 结束下拉刷新
          setTimeout(function () {

            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
          }, 500)

        }
      }
    }
  });

  // 3.删除功能
  $(".cartInfo").on('tap', "#delInfo", function () {
    console.log('11')

    // 获取购物车id
    let id = $(this).attr('data-id')

    $.ajax({
      url: "/cart/deleteCart",
      type: "get",
      dataType: 'json',
      data: {
        id: [id]
      },
      success(info) {
        console.log(info)
        if (info.success) {
          //删除成功
          // 重新渲染界面
          render()
        }
      }
    })
  })


  // 4.edit模态框
  $(".cartInfo").on('tap', "#editInfo", function () {
    // 获取模态框需要的数据，进行动态渲染
    // h5新增的方法，可以一次性获取所有的自定义属性
    let obj = this.dataset;

    // confirm第一个参数可以是一个是htmlStr结构
    let htmlStr = template('editTpl', obj)
    // 现在发现 通过模板渲染的元素都垂直排列，为什么会发生case？ 是因为模板引擎会
    // 默认将标签与标签的换行(\n)用 《br》标签代替 需要对htmlStr的所有的/n都替换为''
    htmlStr = htmlStr.replace(/\n/g, '')



    mui.confirm(htmlStr, '编辑商品', ["确认", "取消"], function (e) {
      if (e.index === 0) {
        //点击确认 发送ajax请求更改数据
        let num = $(".mui-numbox-input").val()
        let size = $(".edit_modal_size span.current").text().trim()

        $.ajax({
          url: '/cart/updateCart',
          type: 'post',
          dataType: 'json',
          data: {
            id: obj.id,
            size,
            num
          },
          success(info) {
            if (info["success"]) {
              mui.toast('更新成功')
              render()

            }
          }
        })
      }
    })

    // 初始化数量组件
    mui(".mui-numbox").numbox()

    // 5.让size可以选择

    $("body").on('click', '.edit_modal_size span', function () {

      $(this).addClass('current').siblings().removeClass('current')
    })



  })




})