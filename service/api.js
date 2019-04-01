const aomain = require('../utils/config')

//不需要token的接口
const noLogin = ['weChatApp/login']

//封装request
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    let param = data === undefined ? {} : data

    //wx.request请求参数
    const request = {
      url: aomain + url,
      method: method,
      data: param,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        let $request = JSON.parse(JSON.stringify(request.data))
        if ($request.code === 400){
          wx.navigateTo({
            url: '/pages/login/login',
          })
          return
        }
        resolve($request)
      },
      fail(error) {
        reject(error)
      }
    }

    //不需要登录的接口 不带token
    for (let item of noLogin) {
      if (url !== item) {
        let token = wx.getStorageSync('TOKEN')
        if (token) {
          request.header["x-access-token"] = token
        } else {
          console.log('需要登陆！')
          // wx.navigateTo({
          //   url: '/pages/login/login',
          // })
        }
      }
    }

    //发送求情
    wx.request(request)
  })
}

//接口
module.exports = {
  request,
  //登录
  login(data) {
    return request('weChatApp/login', 'get', data)
  },
  add(data) {
    return request('weChatApp/add', 'post', data)
  },
  //便签列表
  noteList(data) {
    return request('weChatApp/noteList', 'get', data)
  },
  //删除便签
  removeNote(data){
    return request('weChatApp/removeNote', 'post', data)
  }
}