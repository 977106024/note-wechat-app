const API = require('../../service/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',//时间
    content: '', //内容
    fixedContent:'',//存储内容
    iconType: [
       'success_no_circle'
    ],
    noteIcon:true, //便签icon
    completeIcon: false,//编辑icon
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //上个页面带过来的参数
      time:options.time, 
      content:options.content,
      fixedContent:options.content,
      id:options.id
    })
  },
  // 获取修改的内容
  valueChange:function(e){
    this.setData({
      content:e.detail.value
    })
    // console.log(this.data.content)
  },
  // 更新编辑获取焦点
  upFocus(){
    this.setData({
      noteIcon:false,
      completeIcon:true,
    })
  },
  // 更新编辑记事本
  editNote(){
    // 点击完成的时候存储一遍内容
    this.setData({
      fixedContent: this.data.content
    })
    console.log(this.data.content)
    // console.log("触发")
    // console.log(this.data.content)
    // console.log(this.data.id)
    let newContent = this.data.content
    let curentId = this.data.id
    API.updateNote({
      id: curentId,
      content : newContent
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          noteIcon: true,
          completeIcon: false,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})