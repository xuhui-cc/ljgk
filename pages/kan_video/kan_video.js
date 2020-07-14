// pages/kan_video/kan_video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    system_id: '',
    lesson_id: '',
    currentTime: 0,
    last_time: 0,
    

    videoimage: "block"


  },
//获取当前播放进度
  timeUpdate: function(e) {
    var currentTime = e.detail.currentTime;
    var duration = this.data.use_time - this.data.last_watch_time
    this.setData({
      use_time: currentTime,
      duration: duration
    })
    
    console.log('currentTime:' + this.data.use_time)
    console.log('duration:' + this.data.duration)
  },

  bindplay: function (e) {
    this.setData({
      tab_image: "none"
    }),
      this.videoCtx.play()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options.video_id + "video_id")
    
    var video = ''
    that.data.video_id = options.video_id;
    
    
    var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var params = {
      "uid": uid,
      "video_id": that.data.video_id,
    }
    
    app.ljgk.xcxkanVideo(params).then(d => {
      if (d.data.status == 1) {
        that.setData({ videoUrl: d.data.data.video_url, last_watch_time: d.data.data.last_watch_time,  video_percent: options.video_percent  })
        if (that.data.video_percent == 1) {
          that.setData({
            last_time: 0,
          })
        } else {
          that.setData({
            last_time: options.last_time
          })
          
        }
        // that.data.last_time = options.last_time;
        console.log(that.data.videoUrl + "that.data.videoUrl")
        console.log(that.data.last_watch_time + "that.data.last_watch_time")
      } else {

      }
        
      
    })
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
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
    var uid = wx.getStorageSync('uid');
    var params = {
      "uid": uid,
      "video_id": this.data.video_id,
      "use_time": this.data.use_time,
      "duration": this.data.duration,
    }
    //返回当前播放时间节点
    app.ljgk.xcxsaveStudyRecord(params).then(d => {
      if (d.data.status == 1) {
        
        console.log(d.data.msg  +"succeed")
      } else {
        console.log(d.data.msg + "false")
      }
    })
    

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

  },

  
})