
// 1.发送请求动态渲染一级分类
$(function () {
  
  let first_id = null

  $.ajax({
    url: '/category/queryTopCategory',
    type: 'get',
    dataType: 'json',
    success(info) {
      console.log(info)
      // 1.1数据获取之后
      let htmlStr = template('first_tpl', info);
      $('#first_ul').html(htmlStr)

      // 2.获取first——ul 第一个li元素上面的id属性 用于二级分类的渲染
      first_id = $('#first_ul li:first-child').attr('data-id')
      // 2.1 默认渲染一级分类中第一个的li
      renderSecondCategory(first_id)
      // 3.由于动态渲染的数据，需要通过事件委托来注册事件
      $("#first_ul").on('click','li',function() {
      
        renderSecondCategory($(this).attr('data-id'))
        // 
        
        // 增加当前类,移出其他的类
        $(this).addClass('current').siblings().removeClass('current')
      })
    }
  })

  // 二级分类渲染默认传入第一个id
  // 获取first——ul 第一个li元素上面的id属性 !!!!!数据必须等到动态渲染完之后才能够获取，ajax请求时异步的，不然下面的代码就会先执行然后就获取不到了。
  

  function renderSecondCategory(id) {
    $.ajax({
      url:'/category/querySecondCategory',
      type:'get',
      dataType:'json',
      data: {
        id
      },
      success( info ) {
        console.log( info )
        
        $('#second_ul').html( template('second_tpl',info) )
      }
    })
  }
  

  
  
})
