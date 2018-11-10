<template>
  <!-- 页面的内容 -->
  <div style="display: flex;flex-direction:column; background-color: #fff; height: 100% ;align-items:center;">

    <div style="width: 70%;margin-top: 150px; position: relative">
      <x-input class="x-input" placeholder="手机号" v-model="personMessage.phone"></x-input>
      <x-input class="x-input" placeholder="验证码" v-model="personMessage.code"></x-input>
      <button v-else v-if="this.code == true" class="getCode" @click.once="getCode" :disabled="isDisable">获取验证码</button>
      <button class="getCode2" v-else>{{count}}s</button>
      <x-input disabled="false"></x-input>
    </div>

    <x-button style="border-radius:1px;width: 70%; height: 44px;background: #eecc7f;color: #fff"
              @click.native="bindphone">绑定手机号
    </x-button>


  </div>

</template>


<script>
  import {getSendVerifyCode, getVerifyCodeIsOk} from '@/api/sulan'
  import {Dialog} from 'vant'
  import {Group, XInput, Tab, TabItem, XButton, Toast, ToastPlugin} from 'vux'

  export default {
    name: 'Login',
    data () {
      return {
        personMessage: {
          phone: '',
          code: '',
          userId: window.localStorage.userId,//"42897",
        },
        isDisable: false,
        errMeg: '',
        nextBtn: false,
        checked: true,
        code: true,    //为true，为获取字样点击按钮，为false为倒计时
        timer: null,    //倒计时定时器
        count: '',      //倒计时时间
        prePath: '',    //上页路由参数
      };
    },
    components: {
      Group,
      Tab,
      TabItem,
      XButton,
      XInput,
      Toast,
      ToastPlugin,
    },
    created(){

    },
    methods: {
      // 获取验证码
      getCode(){
        this.isDisable = true
        getSendVerifyCode(this.personMessage).then((res) => {
          console.log(res)

          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.code = false
                this.count--
              } else {
                clearInterval(this.timer);
                this.timer = null;
                this.isDisable = false
                this.code = true
              }
            }, 1000)
          }

        });

      },
      // 立即绑定
      bindphone(){
        var that = this
        getVerifyCodeIsOk(this.personMessage).then((res) => {

          if (res.success) {
            alert("绑定成功");
            window.localStorage.isLogin = 2;
            window.localStorage.token = res.module.token;
            window.localStorage.userId = res.module.userId;
            window.localStorage.inviteCode = res.module.inviteCode;
            that.$router.go(-1);//返回上一层
          } else {
            alert("绑定失败,请稍后重试!")
          }

        });
      },

    },


  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .x-input {
    height: 65px;
    font-size: 15px;
    color: #333;
  }

  .getCode {
    border-radius: 1px;
    width: 84px;
    height: 24px;
    font-size: 11px;
    background-color: #eecc7f;
    color: #fff;
    border: none;
    position: absolute;
    right: 0px;
    margin-top: -45px;
  }

  .getCode2 {
    border-radius: 1px;
    width: 84px;
    height: 24px;
    font-size: 11px;
    background-color: #ccc;
    color: #fff;
    border: none;
    position: absolute;
    right: 0px;
    margin-top: -45px;
  }


</style>
