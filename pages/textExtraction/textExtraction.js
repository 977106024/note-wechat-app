// pages/textExtraction/textExtraction.wxml.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upImage:'',//图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击选择图片
  upImg(){
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          upImage: tempFilePaths[0]
        })

        const uploadTask = wx.uploadFile({
          url: 'http://localhost:2333/weChatApp/upImgFile',
          filePath: tempFilePaths[0],
          name: 'imgfile',
          success: function (res) {
            console.log(res.data)
          }
        })
        // uploadTask.abort()

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