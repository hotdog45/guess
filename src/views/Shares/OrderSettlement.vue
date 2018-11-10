<template>
  <!-- 页面的内容 -->
  <div class="container">
    <div>
      <div class="receipt-info" @click="toChooseAddress">
        <van-icon v-if="addressShow" class="icon-left" name="location" size="20px"/>
        <span v-show="!addressShow">+添加收货信息</span>
        <div v-if="addressShow" v-model="addressList">
          <p>{{addressList[0].name}}&nbsp;&nbsp;手机号:{{addressList[0].phone}}</p>
          <p>收货地址:
            {{addressList[0].codeAddress +
            addressList[0].address}} </p>
          <x-icon class="icon-right" type="ios-arrow-forward" size="18"></x-icon>
        </div>
      </div>
      <div style="padding: 5px 0; margin: 20px 0;background: #fff">
        <!--<div class="package">-->
          <!--<div style="flex-grow: 1">套餐1</div>-->
          <!--<div style="margin-right: 15px">¥299</div>-->
          <!--<van-radio name="1"></van-radio>-->
        <!--</div>-->

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
        </van-radio-group>
      </div>

      <div style="background: #fff;padding: 0 15px">
        <div class="count">
          <div>商品金额</div>
          <div style="flex-grow: 1"></div>
          <div>¥299.00</div>
        </div>
        <div class="count">
          <div>运费</div>
          <div style="flex-grow: 1"></div>
          <div>¥0.00</div>
        </div>
        <div class="count">
          <div>微信号</div>
          <input v-model="wxNum" style="margin-left: 20%;flex-grow: 1;text-align: right;border: none"
                 placeholder="方便查询物流信息,请输入微信账号">
        </div>
        <div class="count">
          <div>总计</div>
          <div style="flex-grow: 1"></div>
          <div>¥299.00</div>
        </div>
      </div>
      <div class="vipbtn" @click="orderCreateOrder">
        <van-icon v-if="addressShow" class="gold-coin" name="gold-coin" size="16px"/>
        确认支付
      </div>


    </div>


  </div>
</template>

<script>
  import {
    getQueryAllAddress,
    getWeixinWapPayTicket,
    getOrderCreateOrder,
    getOrderH5Pay,

  } from '@/api/sulan'

  /* 页面的js */
  export default {
    components: {},
    data() {
      return {
        message: "详情页",
        addressShow: false,
        radio: '1',
        addressList: [],
        wxNum: "",
      };
    },

    methods: {
      //支付

      toChooseAddress(){
        this.$router.push({
          path: '/addresslist',
        })
      },

      //创建订单
      orderCreateOrder(){
        if (this.addressList == null || this.addressList.length == 0) {
          alert("请选择地址!");
          return;
        }
//14217  13945  13904

//        var data = {"userId":10062}  ,//this.addressList[0].id

//
        var skuId = 14217
        if (this.radio == "1"){
          skuId = 14217
        }else {
          skuId = 14324
        }

        var data = {
          "orderNormalRequest": {
            "number": 1.0,
            "skuId": skuId
          },
          "orderType": 1,
          "userId": window.localStorage.userId,
          "addressId":this.addressList[0].id,
          "couponId": "",
          "orgId": 1,
          "shopId": 1,
          "wxNum": this.wxNum,
          "expiry": 12,
        }

        getOrderCreateOrder(data).then((res)=> {
          if (res.success) {
            console.log("res" + JSON.stringify(res));
            window.localStorage.orderId = res.module
            this.$router.push({
              path: '/pay',
            })
          } else {
            alert(JSON.stringify(res.errorMsg));
          }
        })


      },

      getWeixinTicket(){
        var data = {
          'data': {'url': window.encodeURIComponent(location.href.split('#')[0])}
//          'data': {'url': "http://www.oldck.com/test"}

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
//          window.localStorage.isSet = 1
        })
        wx.error(res=> {
//          window.localStorage.isSet = 0
        })
      },

      //获取地址列表
      addressNewList(){
        var data = {"userId":window.localStorage.userId}

        getQueryAllAddress(data).then((res)=> {
          if (res.success) {
            this.addressList = res.module.list
            if (this.addressList.length > 0) {
              this.addressShow = true
            } else {
              this.addressShow = false
            }
          }

        })
      },

    },

    created() {
      //配置
//      if (window.localStorage.isSet != 1){
//      this.getWeixinTicket()
//      }
      this.radio = window.localStorage.radio

      var address = JSON.parse(sessionStorage.getItem('address'))

      if (address != null) {
        this.addressList = address.address;
        this.addressShow = false
      }

      if (this.addressList.length > 0) {
        this.addressShow = true
      } else {
        this.addressNewList()
        this.addressShow = false
      }

      window.localStorage.isLogin = 0;
    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  /* 页面的样式
注意:scoped的作用是style中所有的样式只对本页的html起作用
*/
  @white: #FFFFFF;
  @black: #393a3e;

  .receipt-info {
    position: relative;
    width: 100%;
    padding: 25px;
    color: #333;
    background-color: @white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > span {
      margin: 20px;
      font-size: 15px;
      display: block;
      text-align: center;
    }
    > div {
      text-indent: 15px;
      position: relative;
      line-height: 30px;
      p:first-of-type {
        font-size: 15px;
        color: #000000;
        margin: 0
      }
      p:last-of-type {
        font-size: 14px;
        color: #626262;
        margin: 0
      }
      .total {
        color: #000000;
      }
      .icon-right {
        position: absolute;
        right: 5px;
        top: 50%;
        margin-top: -9px;
      }

    }
    .icon-left {
      position: absolute;
      left: 15px;
      top: 50%;
      margin-top: -9px;
    }
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

  .count {
    display: flex;
    flex-direction: row;
    background: #fff;
    border-bottom: 1px solid #eee;
    height: 45px;
    align-items: center;
    /*padding: 20px;*/
  }

  .vipbtn {
    display: flex;
    position: fixed;
    background: #eecc7f;
    height: 50px;
    line-height: 50px;
    align-items: center;
    bottom: 0;
    color: #fff;
    padding-left: 38%;
    width: 100%;
  }

  .gold-coin {
    margin-right: 10px;
  }
</style>
