const API = require('../../service/api')
const TIME = require('../../utils/util')
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
    select:1,//话筒动态绑定class
    orderList: [{
      createdTime: parseInt(Date.now() / 1000),
      content: "欢迎使用小程序便签",
      _id: 0
    },
    {
      createdTime: parseInt(Date.now() / 1000),
      content: "在这-------------------------------------------------------------------------------------------记录一切^_^",
      _id: 1
    }]

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
  // 首页数据
  list(){
    API.noteList().then(res => {
      if (res.code == 200) {
        // res.data.result.map(item => {
        //   this.data.orderList.push({
        //     _id: item._id,
        //     content: item.content,
        //     createdTime: item.createdTime,
        //     // TIME.formatTime(item.createdTime)
        //   })
        // })
        this.setData({
          orderList: res.data.result,
        });
        console.log(this.data.orderList)
      }
    })
  },

  // 跳转便签详情
  todetails:function(e){
    let content = e.currentTarget.dataset.content; //带参数
    let time = e.currentTarget.dataset.time;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/noteDetail/noteDetail?time=' + time + '&content=' + content + '&id=' + id,
    })
  },
  //语音---
  // 按下按钮的时候触发
  startrecorderHandel() {
    // 录音按钮改变class
    this.setData({
      select: 0,
    })
    this.data.select == 0
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
    // 录音按钮改变class
    this.setData({
      select:1,
    })
    // 结束录音
    recorderManager.stop();
    recorderManager.onStop(res => {
      console.log('recorder stop')
      // tempFilePath 是录制的音频文件
      const { tempFilePath } = res ;

      // 获取文件路径-提交到后台-后台发送到百度
      let token = wx.getStorageSync('TOKEN')
      if (token) {
        wx.uploadFile({
          url: "http://192.168.1.56:2333/weChatApp/uploadFile",
          filePath: tempFilePath,
          name: "recorder",
          header: {
            "x-access-token": token
          },
          success: res => {
            let $res = JSON.parse(res.data)
            if ($res.code == 200) {
              let result = $res.data.result
              this.data.orderList.push({
                _id: result._id,
                content: result.content, 
                createdTime:result.createdTime
                })
              this.setData({
                orderList: this.data.orderList
              });
            } else if($res.code === -200) {
              console.log(res)
              wx.showToast({
                title: '没有听清！',
                icon: 'none'
              })
            }
          },
          fail(err) {
            console.log(err);
          }
        });
      } else {
        //登录
        wx.navigateTo({
          url: '../login/login',
        })
      }
    });
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
    // API.removeNote()
    this.list()
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

