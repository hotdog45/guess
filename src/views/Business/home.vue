<template>
  <div>

    <!--<van-nav-bar-->
    <!--class="nav-bar"-->
    <!--title="我的收益"-->
    <!--left-text=""-->
    <!--right-text=""-->
    <!--left-arrow-->
    <!--@click-left="onClickLeft"-->
    <!--@click-right="onClickRight"-->
    <!--&gt;-->
    <!--<van-icon name="" class="test" slot="left" />-->

    <!--&lt;!&ndash;<van-icon name="arrow-left" class="test" slot="left" />&ndash;&gt;-->
    <!--&lt;!&ndash;<van-icon name="search" class="test" slot="right" />&ndash;&gt;-->
    <!--</van-nav-bar>-->

    <div style="text-align: center;background:#c8b585;color: #fff;">
      <!--<img src="">-->
      <div style="line-height: 50px;font-size: 17px;">我的收益</div>
      <div style="padding: 10px 0;">可提现金额(元)</div>
      <div style="font-size: 50px;color: #fff;font-weight: 500;">300.00</div>
      <div v-if="hasPay" @click="withdrawal"  class="tixian" style="">提现</div>
      <div v-else class="tixian" @click="payBind" style="">绑定支付宝</div>
      <div style="line-height: 60px;font-size: 16px;font-weight: 500;">累计收益总金额(元):500.00</div>
    </div>

    <div class="bill" @click="goBill" style="">
      <img src="@/assets/images/icon1@2x.png" style="width: 35px;height: 33px;margin-left: 10px">
      <div style="flex-grow: 2;padding: 0 10px;font-size: 16px;">
        <div>我的账单</div>
        <div style="color:#c6c6c6 ">每个月22-31号可提现</div>
      </div>
      <van-icon name="arrow" size="15px"/>
    </div>
    <div class="shouru" style="">
      <div style="flex-grow: 2;">
        <div style="font-size: 19px;">10.03</div>
        <div style="display: flex;flex-direction: row;align-items: center;">
          <div style="color: #c6c6c6;">今日收入</div>
          <img src="@/assets/images/icon2@2x.png" @click="showhub" style="width: 32px;height: 26px; padding: 5px 8px; ">
        </div>
      </div>
      <div style="flex-grow: 2;border-left: 1px solid #eee;padding-left: 35px;">
        <div style="font-size: 19px;padding-bottom: 5px;">10.03</div>
        <div>
          <div style="color: #c6c6c6;">昨日收入</div>
        </div>
      </div>
    </div>
    <div class="share">
      <img src="@/assets/images/icon3@2x.png" style="width: 23px;height: 23px;">
      <div style="flex-grow: 2;padding-left: 10px;">分享开店礼包 赚59元</div>
      <div class="share2" style="">去参加</div>
    </div>

    <van-popup v-model="show">内容</van-popup>


  </div>
</template>

<script>
  import {
    getH5Login,
  } from '@/api/sulan'

  export default {
    components: {},
    data() {
      return {
        message: "首页页",
        hasPay: true,
        show: false
      };
    },

    methods: {

      onClickLeft() {
        alert('返回');
      },
      onClickRight() {
        alert('按钮');

      },
      showhub(){
        this.show = !this.show
      },
      withdrawal(){
        this.$router.push({
          path: '/withdrawal',
        })
      },
      payBind(){
        this.$router.push({
          path: '/bindpay',
        })
      },

      goBill(){
        this.$router.push({
          path: '/bill',
        })
      },

//授权
      getcode(){
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          "wx4b6d100929d957c6" +
          "&redirect_uri=" + encodeURIComponent(window.location.href) +
          "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        window.location.href = url;
      },
//登录
      login(){
        var that = this
        if (this.code.length > 9) {
          getH5Login({code: this.code}).then((res)=> {
            if (res.success) {
              alert("登录成功!")
              window.localStorage.token = res.module.token;
              window.localStorage.userId = res.module.userId;
              if (res.module.needPhone) {
                alert("请绑定手机号!")
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
      goLogin(){
        if (window.localStorage.isLogin == 1) {
//          alert("已经登录token:" + window.localStorage.token + "\n用户id" + window.localStorage.userId)
        } else if (window.localStorage.isLogin == 2) {
          window.localStorage.isLogin = 1;
        } else {
          var codetmp;
          var pageUrl = window.location.href;
          var str = pageUrl.match(/code=(\S*)&state/);
          if (str != null) {
            codetmp = str[1];
          }
          if (typeof(codetmp) != "undefined") {
            this.code = codetmp
            this.login();
          } else {
            this.getcode();
          }
        }
      },


    },

    //created创建完毕状态
    created() {
//      window.localStorage.token = 'a3516c97fdcb5e143b78da4b8279a791';
//      window.localStorage.userId = 42897;

//          this.goLogin()
    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .test {
    color: #000;
  }

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
  }

  .bill {
    margin: 15px 20px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    box-shadow: 2px 5px 5px #eee;
    border: 1px solid #eee;
    z-index: 9999;
  }

  .shouru {
    background: #fff;
    padding: 30px 35px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;

  }

  .share {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    background: #fff;
    margin-top: 10px;
    font-size: 16px;
  }

  .share2 {
    border: 1px solid #c8b585;
    padding: 3px 16px;
    border-radius: 20px;
    color: #c8b585;

  }

  .tixian {
    margin: 10px 100px;
    border: 1px solid #fff;
    line-height: 46px;
    border-radius: 23px;
    font-size: 17px;
  }
</style>
