<template>
  <div class="login">
    <!--<img src="@/assets/images/logo.png" class="logo_img">-->
    <div  class="logo_img"></div>
    <van-cell-group class="form_box">
      <van-field class="input_item"
        v-model="personMessage.phoneNumer"
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errMeg"
      />
      <van-field class="input_item"
        v-model="personMessage.password"
        label="密码"
        type="password"
        placeholder="请输入密码"
      />
    </van-cell-group>

    <div class="btn_login" @click='login'>登录</div>
    <div class="btn_forget btn_com" @click='forget'>忘记密码</div>
    <div tag="div" class="btn_regist btn_com" @click="regist">立即注册</div>
    <div>{{$store.state.token}}</div>
  </div>
</template>

<script>
import RouterLink from "vant/es/mixins/router-link";
import { Login,getPhoneCode } from '@/api/user';
import {Dialog,Toast} from 'vant'
import store from '@/store/store'
import axios from 'axios';

export default {
  name: 'Login',
  components: {RouterLink},
  data () {
    return {
      personMessage:{
        phoneNumer: '',
        password: '',
      },
      errMeg: '',
      prePath: '',    //上页路由参数
      productId: '',
    };
  },
  store,
  created(){
    this.prePath = this.$route;
  },
  methods: {



    login2(){
      Login({mobile: this.personMessage.phoneNumer, password: this.personMessage.password, userType: '1', storeType: 3}).then((res) => {
        // 登录成功
        if(res.status == 0){
          const toast = Toast.loading({
            forbidClick: true, // 禁用背景点击
            message: '登录成功'
          });
          let second = 2;
          const timer = setInterval(() => {
            second--;
            if (second) {
              toast.message = `登录成功`;
              window.localStorage.token = res.data.token;
              window.localStorage.userId = res.data.userId;
              this.productId = this.prePath.query.productId;
              this.$router.push({'path': '/shop?productId=' +  this.productId})
            } else {
              clearInterval(timer);
              Toast.clear();
              // 登录成功，跳转进入登录页的页面
              // this.$store.commit('changeToken','111111');
              // this.prePath = this.$route.params.path + '?token=' + this.$route.query.token + '&productId=' + this.$route.query.productId
              // this.$router.push({'path': '/' + this.prePath.params.path + '?token=' + res.data.token + '&productId=' + this.prePath.query.productId})

            }
          }, 1000);
        }
        else {
          Dialog.alert({
            message: res.msg
          }).then(() => {
            // 注册成功，跳转到登陆
            console.log('用户名或密码错误')
          });
        }
      });
    },
    // 忘记密码
    forget(){

//      axios.post('https://item.xianzaishi.com/requestuser/loginwithpwd', {
//        phone: '15829554591',
//        hardwareCode: 'D35BFDCA-8EC1-48F0-A27E-A14925FD9647'
//      }).then(function (response) {
//          console.log(response);
//        })
//      var instance = axios.create({
//        baseURL: 'http://139.196.79.85:8080/cxwap/requestuser/sendVerifyCode',
//        timeout: 1000,
//        headers: {'Content-Type': 'application/json'}
//      });
//      instance.post('', {
//        phone: '15829554591',
////        userId: '42897'
//      }).then(function (response) {
//        console.log(response);
//      })

      getPhoneCode({phone: '15829554591',userId:42897}).then(function (response) {
          console.log(response);
        })



    },
    // 立即注册
    regist(){
      this.productId = this.prePath.query.productId;
      this.$router.push({'path': '/loginIn/regist?productId=' + this.productId })
    },
  },
   watch:{
      personMessage:{
        handler:function(val,oldval){
          let phoneNumer = val.phoneNumer;
          let phoneFlg=/^[1][3,4,5,7,8][0-9]{9}$/.test(phoneNumer);     //判断手机号
          if(!phoneFlg && phoneNumer!= ''){
            this.errMeg = '手机号格式错误'
          }
          else{
            this.errMeg = ''
          }

        },
        deep:true
      }
    }
}
</script>
<style lang="scss">
  .van-cell-group{
    background: #f5f8fa;
    .van-cell{
      background: #f5f8fa;
    }
  }
</style>
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
        width: 264px;
        padding-left: 0;
        padding-right: 0;
        border-bottom: 0.5px solid lightgray;
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
      background-color:rgba(253,109,31,1);
      border-radius:2px;
      box-shadow:0px 13px 57px 0px rgba(253,162,31,0.4);
      margin: 40px auto 30px;
    }
    .btn_com{
      float: left;
      width:80px;
      height:35px;
      font-size:15px;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:35px;
      margin: 0 15px 30px 65px;
    }
  }
</style>
