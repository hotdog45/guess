<template>
  <div class="login">
    <img src="@/assets/images/logo.png" class="logo_img">
    <van-cell-group class="form_box">
      <van-field class="input_item"
                 v-model="personMessage.phoneNumer"
                 placeholder="手机号"
                 :error-message="errMeg"
      />
      <van-field class="input_item"
                 v-model="personMessage.code"
                 placeholder="验证码">
        <van-button slot="button" size="small" type="warning" @click="getCode" v-if="this.code == true">获取验证码</van-button>
        <van-button slot="button" size="small" disabled v-else>{{count}}s</van-button>
      </van-field>
      <van-field class="input_item"
                 v-model="personMessage.password"
                 type="password"
                 placeholder="密码"
      />
      <van-field class="input_item"
                 v-model="personMessage.confirmPassword"
                 type="password"
                 placeholder="确认密码"
      />
    </van-cell-group>

    <div class="btn_login" v-if="this.nextBtn == false">立即注册</div>
    <div class="btn_login btn_active" @click='next' v-if="this.nextBtn == true">立即注册</div>
    <div class="rule">
      <van-checkbox class="icon_check" v-model="checked"></van-checkbox>
      注册即表示同意<span class="toRule" @click="toRule">大风车商城规则</span>
    </div>
  </div>
</template>

<script>
  import { getPhoneCode,regist } from '@/api/user'
  import {Dialog} from 'vant'
  import store from '@/store/store'
  export default {
    name: 'Login',
    data () {
      return {
        personMessage:{
          phoneNumer: '',
          code: '',
          password: '',
          confirmPassword: ''
        },
        errMeg: '',
        nextBtn: false,
        checked: true,
        code: true,    //为true，为获取字样点击按钮，为false为倒计时
        timer: null,    //倒计时定时器
        count: '',      //倒计时时间
        prePath: '',    //上页路由参数
      };
    },
    store,
    created(){
      // this.prePath = this.$route.params.path + '?token=' + this.$route.query.token + '&productId=' + this.$route.query.productId
      this.prePath = this.$route
      console.log(this.prePath)
    },
    methods: {
      // 获取验证码
      getCode(){
        getPhoneCode({mobile: this.personMessage.phoneNumer}).then((res) => {
          console.log(res)
          if(res.status == 0){
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
                  this.code = true
                }
              }, 1000)
            }
          }
          else {
            Dialog.alert({
              message: res.msg
            }).then(() => {
              // on close
            });
          }
        });

      },
      // 立即注册
      next(){
        regist({mobile: this.personMessage.phoneNumer, password: this.personMessage.password, smsCode: this.personMessage.code, userType: '1', storeType: 3}).then((res) => {
          console.log(res)
          // 注册成功或者已经注册过，跳转登录
          if(res.status == 0 || res.status == 130){
              Dialog.alert({
                message: res.msg
              }).then(() => {
                // 注册成功，跳转到登陆
                window.localStorage.token = res.data.token;
                // this.$store.commit('changeToken','111111');
                // this.$router.go(-1);//返回上一层
                // this.$route.params.path + '?token=' + this.$route.query.token + '&productId=' + this.$route.query.productId
               this.$router.push({'path': '/shop?productId=' + this.prePath.query.productId})
              });
          }
          else {
            Dialog.alert({
              message: res.msg
            }).then(() => {

            });
          }
        });
      },
      // 跳转到大风车商城规则
      toRule(){
        this.$router.push({'path': '/loginIn/rule'})
      }
    },
    watch:{
      personMessage:{
        handler:function(val,oldval){
          console.log(val)
          let phoneNumer = val.phoneNumer;
          let phoneFlg=/^[1][3,4,5,7,8][0-9]{9}$/.test(phoneNumer);     //判断手机号
          if(!phoneFlg && phoneNumer!= ''){
            this.errMeg = '手机号格式错误'
          }
          else{
            this.errMeg = ''
          }
          // 填写信息无误，能进行下一步
          if(val.code!= '' && val.password!='' && val.password == val.confirmPassword){
          // if(phoneFlg && val.code!= '' && val.password!='' && val.password == val.confirmPassword){
            this.nextBtn = true
          }
          else{
            this.nextBtn = false
          }
        },
        deep:true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login{
    .logo_img{
      width: 85px;
      height: 85px;
      margin: 50px 144px 60px;
    }
    .form_box{
      margin-left: 50px;
      .input_item{
        margin-top: 25px;
        width: 264px;
        padding-left: 0;
        padding-right: 0;
        border-bottom: 0.5px solid lightgray;
        .time{
          width: 34px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          border-radius: 5px;
          background-color: #EAEAEA;
        }
      }
    }
    .btn_login{
      width: 264px;
      height: 39px;
      text-align: center;
      line-height: 39px;
      font-size: 15px;
      color: #fff;
      font-weight: 500;
      touch-action: none;
      background-color: lightgray;
      border-radius:2px;

      margin: 40px auto 30px;
    }
    .btn_active{
      box-shadow:0px 13px 57px 0px rgba(253,162,31,0.4);
      background-color:rgba(253,109,31,1);
    }
    .rule{
      position: relative;
      width: 190px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      color:rgba(51,51,51,1);
      font-size: 13px;
      margin: 30px auto;
      .icon_check{
        position: absolute;
        left: -28px;
        touch-action: none;
        z-index: 999;
      }
      .toRule{
        color: #fd6d1f;
        border-bottom: 1px solid #fd6d1f;
      }
    }
  }
</style>
