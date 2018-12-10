<template>
  <div class="bg">
    <div class="thumb">
      <img class="test" src="" alt="" crossOrigin="anonymous" id="dolly"/>
    </div>

    <div class="view" ref="mybox">
      <div class="header">
        <img class="back" @click="back" src="@/assets/images/back.png">
        <div></div>
        <div v-if="test2" class="publicLab" @click="postGuess">发布</div>
        <div v-else class="publicLab" @click="">发布</div>
      </div>

      <input class="name" v-model="answer" placeholder="请准确输入猜物答案，字数不得超过5个字" type="text" maxlength="5">
      <div class="zhusi">注释：不可以加修饰类的形容词（功能类除外），<br>
        例如：水杯，可以用马克杯、玻璃杯、带手柄水杯等，<br>
        不可以用美丽的水杯、伤感的水杯等。
      </div>
    </div>
  </div>
</template>

<script>
  import {getPluginsGuess, getPluginsGuessAnwser} from "@/api/sigua";
  import {closePixelate} from "../../utils/close-pixelate";
  import Cookies from 'js-cookie';
  var pixelOpts = [{resolution: 24}];
  var invoke = window.WebViewInvoke
  var toast = invoke.bind('toast');
  var onPushScreen = invoke.bind('onPushScreen');
  var goBack = invoke.bind('goBack');
  var imgq = ""
  window.onload = function () {
    toast("图片打码中...")
    var img = document.getElementById('dolly');
    img.crossOrigin = '';
    imgq = window.localStorage.imgurl;
    console.log("imgq"+imgq);
    var img750 = window.localStorage.imgurl+'?x-oss-process=image/resize,w_750';
    // var img750 = 'https://upload.jianshu.io/admin_banners/web_images/4581/14d959ff757f21616baa933fd3bdbfcf52fd512a.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
    // imgq = img750
    img.src = img750
    console.log("img750"+img750);
//    img.src = imgq;
    img.onload = function () {
      img.closePixelate(pixelOpts);
      Cookies.set('isReload', "1", {expires: 0.0002})
    }

  };


  export default {
    components: {},
    data() {
      return {
        answer: "",
        testimg: "",
        test2:true
      };
    },

    methods: {

      back(){
        this.$router.go(-1);
      },

      postGuess() {
        if (this.answer == '' || this.answer.length < 1) {
          toast("请输入答案")
          return
        }
        if ( this.answer.length > 5) {
          toast("答案不能超过五个字")
          return
        }
        this.test2 = false
        var data = {
          name: this.answer,
          correct_answer: this.answer,
          description: "",
          image_src: imgq,
          mosaic_level: 4,

        };
        Cookies.set('isReload', "1", {expires: 0.0002})
        var that = this
        getPluginsGuess(data).then(res => {

          if (res.code == 200) {
            toast("发布成功\n为确保猜物的真实合规\n你的物件已发送至芥摩\n后台审核，审核通过后\n会立即开始猜物。");
            setTimeout(function () {
              that.answer = ""
              window.localStorage.removeItem("imgurl");
              that.$router.go(-1);
              that.test2 = true
            }, 1000)
          } else if (res.code == 1004) {
            onPushScreen({page: 'Pages/My/NameConfirmPower', params: {}});
            that.test2 = true
          } else {
            toast(res.msg);
            that.test2 = true
          }
        });
      },


    },

    beforeCreate(){
      if (Cookies.get('isReload') != "100") {
        Cookies.set('isReload', "100", {expires: 0.0002})
        window.location.reload();
      }
    },

    //created创建完毕状态
    created() {



    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  input::-webkit-input-placeholder {
    color: white;
  }

  .bg {
    position: relative;
  }

  .test {
    /*visibility: hidden;*/
    width: 100%;
    position: fixed;
    bottom: 0;
    top: 0;
    margin: auto 0;
    z-index: 2;
    line-height: 100%;
  }

  .thumb {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    margin: auto 0;
    z-index: 1;
  }

  .view {
    z-index: 1000;
    position: fixed;
    background: rgba(90, 90, 90, 0);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px 20px 6px 14px;
  }

  .header div {
    flex-grow: 2;
  }

  .public {
    width: 59px;
    height: 59px;
  }

  .back {
    width: 20px;
    height: 20px;
  }

  .publicLab {
    width: 100%;
    text-align: right;
    color: #fff;
    font-size: 16px;
  }

  .name {
    z-index: 1002;
    position: fixed;
    bottom: 120px;
    left: 27px;
    width: 324px;
    padding: 0 16px;
    /*text-align: center;*/
    line-height: 43px;
    border-radius: 22px;
    border: none;
    background: #000;
    color: #fff;

  }

  .zhusi {
    z-index: 1000;
    position: fixed;
    bottom: 45px;
    left: 47px;
    right: 39px;
    color: #fff;
    font-size: 12px;
  }
</style>
