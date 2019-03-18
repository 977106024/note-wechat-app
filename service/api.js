const aomain = require('../utils/config')

//token
function getToken(){
  return new Promise((resolve) => {
    wx.getStorage({
      key: 'TOKEN',
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        wx.showToast({
          title: '请登录！',
          icon: 'none'
        })
      }
    })
  })
}

//promise封装request
function requestFun(url, method, data){
  return new Promise((resolve, reject) => {
    wx.request({
      url: aomain + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

//不登录的接口
const noLogin = ['weChatApp/login']

//封装request
const request = async (url,method,data) => {
  //需要登录的接口
  for(let item of noLogin){
    if (url !== item) {
      await getToken().then((res) => {
        data.token = res
      })
    }
  }
  return requestFun(url, method, data)
}

//接口
module.exports = {
  request,
  getWxUser(data){
    return request('weChatApp/login','get',data)
  },
  add(data) {
    return request('weChatApp/add', 'post', data)
  }
}