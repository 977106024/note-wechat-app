const aomain = require('../utils/config')

//用Promise封装request
const request = (url,method,data) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url:aomain + url,
      method:method,
      data:data,
      header:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request){
        resolve(request.data)
      },
      fail(error){
        reject(error)
      }
    })
  })
}

module.exports = {
  request,
  getWxUser(data){
    return request('weChatApp/login','get',data)
  }
}