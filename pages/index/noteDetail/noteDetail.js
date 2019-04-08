const API = require('../../../service/api')
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
    hidden:true, //模态框显示隐藏
    disabled:false //是否禁用输入
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
    // 修改之前存下值。点击完成的时候存储一遍内容
    this.setData({
      fixedContent: this.data.content
    })
  },
  // 更新编辑记事本
  editNote(){
    // 如果没有改动
    if(this.data.fixedContent == this.data.content){
      console.log("没有任何改动")
      // 跳回首页
      wx.navigateBack({
        url: '../index/index',
      })
    //如果有改动请求修改接口
    }else{
      // 切换图标
      this.setData({
        noteIcon: true,
        completeIcon: false,
      })
      // console.log(this.data.content)
      // console.log("触发")
      // console.log(this.data.content)
      // console.log(this.data.id)
      let newContent = this.data.content
      let curentId = this.data.id
      API.updateNote({
        id: curentId,
        content: newContent
      }).then(res => {
        if (res.code == 200) {
        }
      })
    }
  },
  // 点击删除note
  deleteNote(){
    this.setData({
      hidden:false,
      disabled:true,
    })
  },
  // 取消删除
  cancel(){
    this.setData({
      hidden: true,
      disabled: false,
    })
  },
  // 确定删除
  confirm(){
    let curentId = this.data.id
    API.removeNote({
      id: curentId,
    }).then(res => {
      if (res.code == 200) {
        // 跳回首页
        wx.navigateBack({
          url: '../index/index',
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