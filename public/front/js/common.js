mui('.mui-scroll-wrapper').scroll({
  indicators: false,
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


$(".lt_footer li a").click(function() {
  $(this).addClass('current').parent().siblings().find('a').removeClass('current')
  // console.log($(this).children().addClass('current').parent().siblings().children().removeClass('current'))
})

// 封装 能够获取地址栏的参数
// key=a&name=reborn&age=18

// 功能：此方法的功能将地址栏？之后的参数生成为一个对象，传入对应的key,就能够直接获取值了
function getSearch(keyStr) {

  var str = decodeURI(location.search)
  var newStr = str.slice(1)
  var arr = newStr.split('&')
  
  var obj = {}
  arr.forEach(item => {
    var key = item.split('=')[0]
    var value = item.split('=')[1]

    obj[key] = value

    

  })
  return obj[keyStr]
  
}
