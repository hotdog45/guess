<template>
  <!-- 页面的内容 -->
  <div>订单创建成功，10分钟内支付有效，正在唤起支付。</div>
</template>

<script>
  import request from '../../api/request';
  import {
    getQueryAllAddress,
    getWeixinWapPayTicket,
    getOrderCreateOrder,
    getOrderH5Pay,
    getShareH5,
  } from '@/api/sulan'
  import axios from 'axios';
  /* 页面的js */
  export default {
    components: {},
    data() {
      return {};
    },

    methods: {
      //获取支付信息
      orderPay(){
//        alert("获取支付信息token:" + window.localStorage.token);
        getOrderH5Pay({"orderId": "B" + window.localStorage.orderId}).then((res)=> {
//              alert("微信配置res:\n"+JSON.stringify(res));
//          console.log("res" + JSON.stringify(res));
          if (res.success) {
            this.weixinconfig(res.module)
          } else {
            alert(JSON.stringify(res.errorMsg));

          }
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
          this.goChooseWXPay(json)
        })
        wx.error(res=> {

        })
      },

      goChooseWXPay(json){
//        alert("进入支付json:" + JSON.stringify(json));
        var that = this
        var wx = require('weixin-js-sdk');
        if (typeof(wx) !== undefined) {
          wx.chooseWXPay({
            appId:json.appId,  //'wx4b6d100929d957c6',// 公众号名称，由商户传入
            timestamp: json.timeStamp,
            nonceStr: json.nonceStr, // 随机串
            package: json.pack,
            signType: json.signType, // 微信签名方式：
            paySign: json.paySign,// 微信签名
            success(res){
//              alert("支付成功" + JSON.stringify(res));

              that.$router.push({
                path: '/payafter',
              })
              request.get('order/queryOrderIsPaySuccess/B' + window.localStorage.orderId).then((res)=> {
//                alert("查询订单:\n"+JSON.stringify(res));
//                console.log("res" + JSON.stringify(res));
              })

            },
            fail(){
              alert("支付失败");
            }
          })
        } else {
          console.log("微信中打开");
        }
      },

    },

    created() {
      this.orderPay()

    },

  };
</script>

<style scoped lang="less" rel="stylesheet/less">


</style>
