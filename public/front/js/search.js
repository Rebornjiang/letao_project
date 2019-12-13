$(function() {

  // 一 增加数据，获取localStorage中的数据。

    // 1.1 先创建一些数据来，相当于创建了一个文件名为search_history_list。
    // var jsonStr = JSON.stringify(['david','mollly','reborn','peter'])
    // localStorage.setItem('search_history_list',jsonStr)
  
  // 1.2 声明一个获取localStorage中的数据的方法
  function getHistoryRecords() {
    var jsonStr = localStorage.getItem('search_history_list')
    var arr = JSON.parse(jsonStr)
    return arr
  }

  function saveHistoryRecords(arr) {
    var jsonStr = JSON.stringify(arr)
    localStorage.setItem('search_history_list',jsonStr)
  }

  // 二 动态渲染到页面上
  function render() {
    var arr = getHistoryRecords()
    $('.main_history').html( template('tpl',{arr}) )

  }

  render()


  // 三 删除数据
  //    3.1 清空 所有的 数据
  // 由于dom结构时通过模板引擎动态生成的，所以需要通过事件委托注册事件
  $(".main_history").on('click','.clearRecords',function() {
    // 准备模态框
    mui.confirm('您确认要清空历史记录吗？','温馨提示',['取消','确认'],function(e) {
      //  点击取消按钮 e 为 0 ，确认为1
      if (e.index === 1) {
        //清空数据
        var arr = getHistoryRecords()
        arr.splice(0,arr.length)
        
        // 存储数据
        saveHistoryRecords(arr)


        //数据清空之后需要重新渲染
        render()
      }
    })
  })

  //    3.2 清空单挑数据
  $(".main_history").on('click','.delRecord',function() {
    mui.confirm('您确认要删除该条记录吗？','温馨提示',['取消','确认'],e => {
      if (e.index === 1) {
        //获取id
        var arr = getHistoryRecords()
        arr.splice($(this).attr('data-index'),1)
        saveHistoryRecords(arr)
        render()

      }
    })
  })


  // 四 增加数据
  $('.addRecord').click(function() {
    // 历史记录
    var str = $('.lt_search .header input').val()
    // 非空判断
    if (str === '') {
      //提示消息框
      mui.toast('请输入搜索关键字',{
        
      })
    }
    // 判断是否由重复的搜索记录，如果有删除该条记录，在添加
    var arr = getHistoryRecords()

    if (arr.indexOf(str) != -1) {
      //证明有搜索记录
      arr.splice(arr.indexOf(str),1)
    }

    //添加新的记录
    
    arr.unshift(str)
    saveHistoryRecords(arr)
    render()
    $('.lt_search .header input').val('')
  })
})