const API = require('../../service/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',//用户名称
    userAvatar:'', //用户头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.login()
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       this.getUser()
    //     }
    //   }
    // })
  },
  login(){
    let _this = this
    wx.login({
      success(res) {
        if (res.code) {
          const data = {
            code: res.code,
          }
          API.getWxUser(data).then((res) => {
            if(res.code == 200){
              //存入缓存token
              wx.setStorage({
                key: 'TOKEN',
                data:res.data.token,
              })
              //获取用户信息
              _this.getUser()
            }
          })
        }
      }
    })
    
  },
  // 获取用户信息
  getUser(){
    let _this = this;
    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
        _this.data.username = userInfo.nickName
        _this.data.userAvatar = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
        console.log(_this.data.userAvatar)
        _this.setData({
          username: userInfo.nickName,
          userAvatar: userInfo.avatarUrl,
        });
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
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
    this.login()
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