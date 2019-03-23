const API = require('../../service/api')
// 录音对象
const recorderManager = wx.getRecorderManager()
function sendRecord(src) {
  var obj = {
    // 已经在花生壳中映射到本地端口-3001 
    url: "http://xxx:34306/post",
    filePath: src,
    name: "fffile",
    header: {
      'Content-Type': 'application/json'
    },
    success: function (result) {
      var data = JSON.parse(result.data);
      // msg 为最终语音识别的字符串
      var msg = data.result;
      // 获取当前页面对象
      var page = getCurrentPages()[0];
      page.setData({ msg: msg });
    },
    fail: function (err) {
      console.log(err);
    }
  };
  wx.uploadFile(obj)
}

// 结束录音的时候触发 
recorderManager.onStop((res) => {
  console.log('recorder stop', res)
  // 获取文件路径-提交到后台-后台发送到百度
  sendRecord(res.tempFilePath);
})

recorderManager.onError((res) => {
  console.log("error", res);
});

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
    })
  },
  //语音
  // 按下按钮的时候触发
  startrecorderHandel() {
    // 开始录音
    recorderManager.start({
    });
  },

  // 松开按钮的时候触发-发送录音
  sendrecorderHandel() {
    // 结束录音
    recorderManager.stop();
  },

  getText(e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  // 记点什么
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
