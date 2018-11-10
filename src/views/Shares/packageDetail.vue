<template>
  <!-- 页面的内容 -->
  <div class="container">
    <div class="image">
      <img src="@/assets/images/pic01.jpeg">
      <!--<img src="@/assets/images/img/pic02.jpeg">-->
      <!--<img src="@/assets/images/img/pic03.jpeg">-->
    </div>
    <div>
      <van-radio-group v-model="radio">
      <div class="package">
      <div style="flex-grow: 1">299开店礼包一</div>
      <div style="margin-right: 15px">¥299</div>
      <van-radio name="1"></van-radio>
      </div>
      <div class="package">
      <div style="flex-grow: 1">299开店礼包二</div>
      <div style="margin-right: 15px">¥299</div>
      <van-radio name="2"></van-radio>
      </div>
      <!--<div class="package">-->
      <!--<div style="flex-grow: 1">500元消费券</div>-->
      <!--<div style="margin-right: 15px">¥399</div>-->
      <!--<van-radio name="3"></van-radio>-->
      <!--</div>-->
      </van-radio-group>
    </div>
    <div style="height: 120px"></div>

    <div class="vip">
      <div v-if="!isShare" class="desc">
        <van-checkbox v-model="checked"></van-checkbox>
        <div>阅读并同意</div>
        <div @click="desc" style="color: #eecc7f">《速懒鲜生社区合伙人使用规则》</div>
      </div>
      <div v-if="!isShare" class="vipbtn" @click="buyVip">开通申请合伙人</div>
      <div v-else class="vipbtn" @click="toShareshow">邀请朋友</div>

    </div>

    <div class="img2" @click="doThis" v-show="isShare2">
      <div class="xxx" @click="toSharehide" >关闭</div>
      <img :src="imgStr" class="imgqr" >

    </div>
  </div>


</template>

<script>
  import Vue from 'vue';

  import {
    getH5Login,
    getH5DecodeUrl,
    getH5isPartner,
    getShareH5,
  } from '@/api/sulan'

  /* 页面的js */
  export default {
    components: {},
    data() {
      return {
        message: "订单结算页",
        checked: true,
        code: "",
        isShare: false,
        isShare2: false,
        radio:'1',
        imgStr:'',
        needPhone:false,
      };
    },

    methods: {
      //授权
      getcode(){
        var pageUrl = window.location.href;
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          "wx4b6d100929d957c6" +
          "&redirect_uri=" + encodeURIComponent(pageUrl) +
          "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
//        alert(url)
        window.location.href = url;
      },
      toSharehide(){

        this.isShare2 = false
//        alert(this.isShare2)
      },
      doThis(){},
      toShareshow(){

        this.isShare2 = !this.isShare2
//        alert(this.isShare2)
//        this.$router.push({
//          path: '/invitation',
//        })
      },

      //登录
      login(){
//        alert("开始登录2  code为"+this.code)
        var that = this
        if (this.code.length > 9) {
          getH5Login({code: this.code}).then((res)=> {
            if (res.success) {
              alert("登录成功")
              window.localStorage.token = res.module.token;
              window.localStorage.userId = res.module.userId;
              if (res.module.needPhone) {
                alert("请绑定手机号")
                that.$router.push({
                  path: '/bindphone',
                })
                return
              }

              window.localStorage.inviteCode = res.module.inviteCode;
              window.localStorage.isLogin = 1;
              window.location.reload();
              that.H5DecodeUrl()

            } else {
//              alert(JSON.stringify(res.errorMsg));
            }

          })
        } else {
//          alert("请进行授权登录2")
          this.getcode();
        }

      },
      //是否购买
      H5isPartner(){
        getH5isPartner({"userId": window.localStorage.userId}).then((res)=> {
//            alert("是否购买"+JSON.stringify(res));
          this.isShare = res.module.isPartner
        })
      },
      //
      H5DecodeUrl(){
        this.H5isPartner()
//        this.getWeixinTicket()
        const inviteCode = this.$route.query.inviteCode;
        if (typeof(inviteCode) !== undefined && inviteCode.length > 5) {
          getH5DecodeUrl({"inviteCode": inviteCode}).then((res)=> {
//            alert("xxxxx"+JSON.stringify(res));
          })
        }

      },

      getWeixinTicket(){
        var data = {
//          'data': {'url': window.encodeURIComponent(location.href.split('#')[0])}
          'data': {'url': "http://partner.xianzaishi.com"}

        }
        getWeixinWapPayTicket(data).then((res)=> {
          this.weixinconfig(res.data)
        })
      },
      weixinconfig(json){
        var wx = require('weixin-js-sdk');
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: json.appId, // 必填，公众号的唯一标识
          timestamp: json.timestamp, // 必填，生成签名的时间戳
          nonceStr: json.noncestr, // 必填，生成签名的随机串
          signature: json.paySign,// 必填，签名，见附录1
          jsApiList: ['chooseWXPay',
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
          // 在这里调用 API
          //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          wx.onMenuShareTimeline({
            title: '速懒合伙人', // 分享标题
            link: 'http://partner.xianzaishi.com', // 分享链接
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
            title: ' 速懒合伙人', // 分享标题
            desc: '速懒合伙人', // 分享描述
            link: 'http://partner.xianzaishi.com', // 分享链接
            imgUrl: 'http://img1.3lian.com/img013/v2/4/d/101.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          });
          wx.onMenuShareQQ({
            title: '速懒合伙人！', // 分享标题
            desc: '描述一下，可是知道该咋描述你呢？', // 分享描述
            link: 'http://partner.xianzaishi.com', // 分享链接
            imgUrl: 'http://img1.3lian.com/img013/v2/4/d/101.jpg', // 分享图标
          });
          wx.onMenuShareQZone({
            title: '速懒合伙人', // 分享标题
            desc: '速懒合伙人', // 分享描述
            link: 'http://partner.xianzaishi.com', // 分享链接
            imgUrl: 'http://img1.3lian.com/img013/v2/4/d/101.jpg', // 分享图标
          });

        })
        wx.error(res=> {

        })
      },

      //开通VIP
      buyVip(){

        window.localStorage.radio = this.radio
        if (this.checked) {
          this.$router.push({
            path: '/ordersettlement',
          })
        } else {
          alert("请同意协议")
        }

      },
      //协议
      desc(){
        this.$router.push({
          path: '/agreement',
        })
      },

      gologin(){
        if (window.localStorage.isLogin == 1) {
//          alert("已经登录token:" + window.localStorage.token + "\n用户id" + window.localStorage.userId)
        } else if (window.localStorage.isLogin == 2) {
          window.localStorage.isLogin = 1;
          window.location.reload();
          this.H5DecodeUrl()
        } else {
          var codetmp;
          var pageUrl = window.location.href;
          var str = pageUrl.match(/code=(\S*)&state/);
          if(str !=null){
            codetmp = str[1];
          }
//          alert("授权获取code0"+codetmp )
          if (typeof(codetmp) != "undefined") {
//            alert("去登陆code:" + codetmp)
            this.code = codetmp
            this.login();
          } else {
//            alert("授权获取code1")
            this.getcode();
          }
        }

      },

      shareh5img(){
        var data = {
          "url": "http://partner.xianzaishi.com?",
          "userId": window.localStorage.userId,
        }
        getShareH5(data).then((res)=> {
          this.imgStr = res
        })
      }



    },


    created() {

//      window.localStorage.token = 'a3516c97fdcb5e143b78da4b8279a791';
//      window.localStorage.userId = 42897;

      window.localStorage.inviteCode  = this.$route.query.inviteCode;
      this.gologin()
      this.shareh5img()
      this.H5DecodeUrl()
    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">


  .container {
    background: #fff;
    position: relative
  }

  .image img {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .package {
    display: flex;
    flex-direction: row;
    height: 60px;
    margin: 10px;
    border: 1px solid #eee;
    align-items: center;
    padding: 0 20px;
  }

  .vip {
    display: flex;
    position: fixed;
    bottom: 0;
    flex-direction: column;
    border-top: 1px solid #eee;
    width: 100%;
    background: #fff;
  }

  .desc {
    display: flex;
    flex-direction: row;
    margin: 10px;
    margin-bottom: 0;

  }

  .vipbtn {
    margin: 10px 25px;
    background: #eecc7f;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    margin-top: 10px;
  }
  .img2{
    font-size: 11px;
    border: none;
    position: fixed;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    /*background: #000;*/
    /*opacity: 0.9;*/
    background: rgba(0,0,0,0.5);

  }
  .imgqr{
    width: 90%;
    margin: 20px;
    margin-top: 0px;
    opacity: 1;
    background: #fff;
    border: 10px solid #fff;
    /*pointer-events: none;*/

  }
  .xxx{
    margin-top: 10px;
    margin-left: 20px;
    width: 60px;
    background: #fff;
    text-align: center;
    height: 30px;
    border: 1px solid #eee;
    line-height: 30px;
  }

</style>
