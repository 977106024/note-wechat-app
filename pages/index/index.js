const API = require('../../service/api')
// 录音对象
const recorderManager = wx.getRecorderManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list:[],
    // inputText:'',
    searchImg:'',
    scrollHeight:'', //滚动高度
    msg:'',//语音内容
    orderList:[
      {
      id:1,
      time:'2019/3/19',
      content:'和购卡积分累积案例'
      },
      {
        id:2,
        time: '2019/3/11',
        content: '开发坷拉激发疯狂辣椒'
      },
      {
        id:2,
        time: '2019/3/11',
        content: '开发坷拉激发疯狂辣椒'
      },
      {
        id: 2,
        time: '2019/3/11',
        content: '开发坷拉激发疯狂辣椒'
      },

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // svg图片转换
    const fileManager = wx.getFileSystemManager();
    wx.downloadFile({
      url:
        'http://ponshr88o.bkt.clouddn.com/search.svg',
      success: ({ tempFilePath }) => {
        let fileData = fileManager.readFileSync(tempFilePath, 'base64');
        this.setData({
          searchImg: `data:image/svg+xml;base64,${fileData}`
        });
      }
    });
    wx.authorize({
      scope: 'record'
    });
    // wx.request({
    //   url: 'http://localhost:2333/weChatApp/test',
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },
  //语音---
  // 按下按钮的时候触发
  startrecorderHandel() {
    //录音配置
    const options = {
      duration: 60000,
    }
    // 开始录音
    recorderManager.start(options)
    recorderManager.onStart(()=>{
      console.log('recorder start')
    });

    //错误
    recorderManager.onError((res) => {
      console.log("error", res);
    });
  },

  // 松开按钮的时候触发-发送录音
  sendrecorderHandel() {
    // 结束录音
    recorderManager.stop();
    recorderManager.onStop(res => {
      // tempFilePath 是录制的音频文件
      const { tempFilePath } = res ;
      console.log(tempFilePath)
      // 获取文件路径-提交到后台-后台发送到百度
      wx.uploadFile({
        url: "http://localhost:2333/weChatApp/uploadFile",
        filePath: tempFilePath,
        name: "recorder",
        success(res) {
          console.log(res)
        },
        fail(err) {
          console.log(err);
        }
      });
    })
  },

 // 记点什么---
  // getText(e) {
  //   this.setData({
  //     inputText: e.detail.value
  //   })
  // },
  // save(){
  //   let text = this.data.inputText
  //   if(text === ''){
  //     wx.showToast({
  //       title: '请输入内容！',
  //       icon:'none'
  //     })
  //     return
  //   }
  //   let data = {
  //     content: text
  //   }
  //   API.add(data).then((res)=>{
  //     console.log(res)
  //     this.data.list.push(text)
  //     this.setData({
  //       list: this.data.list,
  //       inputText: ''
  //     })
  //   })
  // },

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
