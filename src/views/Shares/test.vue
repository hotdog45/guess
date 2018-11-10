<template>
  <!-- 页面的内容 -->
  <div>
    测试页
    <div>

      <div class="btn2" @click='btn(0)'>地图</div>
      <div class="btn2" @click="btn(1)">获取定位</div>
      <div class="btn2" @click="btn(2)">+地址</div>
      <div class="btn2" @click='btn(3)'>获取授权</div>
      <div class="btn2" @click="btn(4)">获取微信配置</div>
    </div>

    <div>

      <div class="btn" @click='router(0)'>packageDetail</div>
      <div class="btn" @click="router(1)">ordersettlement</div>
      <div class="btn" @click='router(2)'>invitation</div>
      <div class="btn" @click="router(3)">pay</div>
      <div class="btn" @click='router(4)'>agreement</div>
      <div class="btn" @click="router(5)">addadress</div>
      <div class="btn" @click='router(6)'>addresslist</div>
      <div class="btn" @click="router(7)">regist</div>
    </div>


  </div>
</template>

<script>

  import axios from 'axios';
  import {wx} from 'weixin-js-sdk';
  import {getAddAddress, getWeixinWapPayTicket} from '@/api/sulan'


  /* 页面的js */
  export default {
    components: {},
    data() {
      return {
        message: "详情页",
      };
    },

    methods: {

      btn(index){
        if (index == 0) {
          var wx = require('weixin-js-sdk');
          wx.openLocation({
            latitude: 30, // 纬度，浮点数，范围为90 ~ -90
            longitude: 120, // 经度，浮点数，范围为180 ~ -180。
            name: '', // 位置名
            address: '', // 地址详情说明
            scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
          });

        } else if (index == 1) {
          var wx = require('weixin-js-sdk');
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，
            // 可传入'gcj02'
            success: function (res) {
              console.log("地址地址11111" + res)
              alert("地址地址11111" + JSON.stringify(res));
//            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//            var speed = res.speed; // 速度，以米/每秒计
//            var accuracy = res.accuracy; // 位置精度
            }
          });
        } else if (index == 2) {
          this.test11()

        } else if (index == 3) {
          var pageUrl = window.location.href;
          alert(pageUrl);
          var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            "wx4b6d100929d957c6" +
            "&redirect_uri=" + encodeURIComponent(pageUrl) +
            "&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect";
          alert(url)
          window.location.href = url;
        } else if (index == 4) {

          var data = {
            'data': {'url': window.encodeURIComponent(location.href.split('#')[0])}
          }
          getWeixinWapPayTicket(data).then((res)=> {
//            if (res.code == 1) {
              alert("请求配置成功" + JSON.stringify(res.data));
              this.weixinconfig(res.data)
//            } else {
//              alert("请求配置失败" + JSON.stringify(res));
//            }
          })
        }
      },

      weixinconfig(json){
//        alert("开始配置" + JSON.stringify(json));
        var wx = require('weixin-js-sdk');
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: json.appId, // 必填，公众号的唯一标识
          timestamp: json.timestamp, // 必填，生成签名的时间戳
          nonceStr: json.noncestr, // 必填，生成签名的随机串
          signature: json.paySign,// 必填，签名，见附录1
          jsApiList: [
            'chooseWXPay',
            'getLocation',
            'openLocation',
            'checkJsApi',
            'hideOptionMenu',
            'updateAppMessageShareData',
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
          ]
        });
        wx.ready(()=> {
//          alert("wx配置成功");


          // 在这里调用 API
          //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          wx.onMenuShareTimeline({
            title: '快来!分享朋友圈', // 分享标题
            link: 'http://www.oldck.com/test', // 分享链接
            imgUrl: 'http://img1.3lian.com/img013/v2/4/d/101.jpg', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          //获取“分享给朋友”按钮点击状态及自定义分享内容接口
          wx.onMenuShareAppMessage({
            title: ' 微信分享给朋友', // 分享标题
            desc: '描述一下，可是知道该咋描述你呢？', // 分享描述
            link: 'http://www.oldck.com/test', // 分享链接
            imgUrl: 'http://img1.3lian.com/img013/v2/4/d/101.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          });
          wx.onMenuShareQQ({
            title: 'QQ我要跳转到百度页面了啊！', // 分享标题
            desc: '描述一下，可是知道该咋描述你呢？', // 分享描述
            link: 'http://www.oldck.com/test', // 分享链接
            imgUrl: 'http://img1.3lian.com/img013/v2/4/d/101.jpg', // 分享图标
          });
          wx.onMenuShareQZone({
            title: 'QZone我要跳转到百度页面了啊！', // 分享标题
            desc: '描述一下，可是知道该咋描述你呢？', // 分享描述
            link: 'http://www.oldck.com/test', // 分享链接
            imgUrl: 'http://img1.3lian.com/img013/v2/4/d/101.jpg', // 分享图标
          });



        })
        wx.error(res=> {
//          alert("错误信息" + JSON.stringify(res));
        })
      },
      test11(){
        var data = {
          "userId": 42897,
          "areaCode": "330110",
          "address": "上海市上海市浦东新区陆家嘴街道",
          "phone": "1582955467",
          "codeAddress": "浙江省杭州市余杭区藕花洲大街303号",
          "longitude": 120.29832,
          "latitude": 30.41557,
          "type": 0,
          "orgId": 1,
          "shopId": 1,
          "name": "xxxxxxxx"
        }

        getAddAddress(data).then((res)=> {
          alert("添加地址" + JSON.stringify(res));
        })
      },


      router(index){
        if (index == 0) {
          this.$router.push({
            path: '/'
          })
        } else if (index == 1) {
          this.$router.push({
            path: 'ordersettlement'
          })
        } else if (index == 2) {
          this.$router.push({
            path: 'invitation'
          })
        } else if (index == 3) {
          this.$router.push({
            path: 'pay'
          })
        } else if (index == 4) {
          this.$router.push({
            path: 'agreement'
          })
        } else if (index == 5) {
          this.$router.push({
            path: 'addadress'
          })
        } else if (index == 6) {
          this.$router.push({
            path: 'addresslist'
          })
        }else if (index == 7) {
          this.$router.push({
            path: 'bindphone'
          })
        }

      }

    },


    //created创建完毕状态
    created() {
      var code = this.$route.query.code;
      if (typeof(code) != "undefined") {
        alert("去登陆code:"+code)
        this.code = code
        this.login();
      } else {
        alert("授权获取z")
      }


    },
  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .btn {
    background: green;
    margin: 20px;

    width: 80%;
    height: 40px;

    color: white;
    font-size: 30px;
  }

  .btn2 {
    background: blueviolet;
    margin: 20px;

    width: 60%;
    height: 40px;
    color: white;
    font-size: 30px;
  }


</style>
