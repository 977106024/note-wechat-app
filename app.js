//app.js
const API = require('./service/api')
App({
  onLaunch: function () {
    let token = wx.getStorageSync('TOKEN')
    if(!token){
      // 登录
      wx.login({
        success: res => {
          const data = {
            code: res.code,
          }
          API.login(data).then((res) => {
            if (res.code == 200) {
              wx.setStorage({
                key: 'TOKEN',
                data: res.data.token,
              })
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})