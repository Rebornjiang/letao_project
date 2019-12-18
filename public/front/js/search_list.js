$(function () {
  var currentPage = 1;
  var pageSize = 2;
  // 添加搜索排序功能点击实现高亮
  // $('.sort a').click(function () {
  //   $(this).addClass('current').parent().siblings().find('a').removeClass('current')
  // })

  // 功能1. 将通过页面与页面传递过来的 搜索关键字添加到搜索框内
  let searchKey = getSearch('key')
  $('.lt_search .header input').val(searchKey)

  // 下拉刷新功能
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        //  刷新的过程中需要做那些事情//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          currentPage = 1;
          render(function(info) {
            $(".product ul").html(template('tpl', info))
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false)
          })
          // 刷新不会自动结束，需要调用结束的函数该方法的作用是关闭“正在刷新”的样式提示，内容区域回滚顶部位置，
          // mui('.mui-scroll-wrapper').pullRefresh().endPullDownRefresh();
        }
      },
      up: {
        // 上拉加载刷新时需要执行的函数
        callback: function () {
          currentPage++
          render(function(info) {
            
            $(".product ul").append(template('tpl', info))
            if (info.data.length === 0) {

              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true)
            }else {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false)
              
            }
            
          })
          
        }
      }
    }
  });


  // 2.判断是否有current类，如果有更改当前元素的箭头为相反方向，如果没有的话增加上current的类。
  $('.sort a[data-type]').on('tap',function() {
    if ($(this).hasClass('current')) {
      //如果有current类就改变箭头 ，也就是i标签的 类
      $(this).find('i').toggleClass("fa-angle-up").toggleClass("fa-angle-down")
    } else {
      $(this).addClass('current').parent().siblings().find('a').removeClass('current')
    }

    render(function(info) {
      mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
    })
  })


  // 功能2 动态渲染页面，发送请求获取数据
  render(function(info) {
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
  })

  function render(callback) {

    // $('.product ul').html('<div class="loading"></div>')

    // 功能 4 实现排序与降序 
    let params = {
      proName: $('.lt_search .header input').val(),
      page: currentPage,
      pageSize: pageSize
    }
    // price 使用价格排序（1升序，2降序）
    // num   产品库存排序（1升序，2降序）
    // 如何判断是升序还是降序那，就看有没有curren的类
    let currentEle = $(".sort a.current")

    if (currentEle.length > 0) {

      // 证明4个元素中有current的类，我们怎么知道拥有current的类的是价格排序的a还是库存排序的啊？
      // 通过在 a标签上增加不同的 属性就可以实现，
      let currentKey = currentEle.attr('data-type')
      let currentVal = currentEle.find('i').hasClass('fa-angle-down') ? 2 : 1

      params[currentKey] = currentVal

    }

    setTimeout(function () {
      $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        success(info) {
          // console.log(info)
          callback && callback(info)
         
        }
      })
    }, 500)

  }

  // 功能3 点击搜索btn实现搜索功能
  $('#searchBtn').click(function () {
    //非空校验，没有内容不能够搜索并出现搜索提示框
    if ($('.lt_search .header input').val().trim() === '') {

      mui.toast('搜索内容不能够为空')
      return
    }

    render(function(info) {
      mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
    })

    // 4. 需要将搜索的内容添加到localStorage中search_list中
    let jsonStr = localStorage.getItem('search_history_list')
    let arr = JSON.parse(jsonStr)
    //不能够重复搜索的内容
    let isDuplicate = arr.indexOf($('.lt_search .header input').val())
    if (isDuplicate != -1) {
      //证明是重复的
      arr.splice(isDuplicate, 1)
    }
    //搜索保持的记录不能够大于10条
    if (arr.length >= 10) {
      arr.pop()
    }
    arr.unshift($('.lt_search .header input').val())

    let newJsonStr = JSON.stringify(arr)
    localStorage.setItem('search_history_list', newJsonStr)
  })


  // 因为<!-- 商品下拉会禁止a连接的点击事件 --> 解决点击图片可以跳转下一页的方法就是，给a绑定
  // tap事件
  
  $(".product ul").on('tap','a',function() {
    let id = $(this).attr('data-id')
    location.href = "product_detail.html?productId=" + id
  })







})



