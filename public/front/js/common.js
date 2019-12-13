mui('.mui-scroll-wrapper').scroll({
  indicators: false,
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


$(".lt_footer li").click(function() {
  $(this).children().addClass('current').parent().siblings().children().removeClass('current')
  // console.log($(this).children().addClass('current').parent().siblings().children().removeClass('current'))
})