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
