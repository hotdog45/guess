/**
* Created by lishunfeng on 2018/11/16.
*/
<template>
  <div class="full-page" v-if="option" :class="{ 'page-before': index < currentPage,
'page-after': index > currentPage,'page-current': index === currentPage}">

    <div class="thumb">
      <img class="test" v-if="option.state =='overdue' ||option.state =='success' " :src="option.image_ori_src+'?x-oss-process=image/resize,w_375'" alt="">
      <img class="test" v-else :src="option.image_src+'?x-oss-process=image/resize,w_250'" alt="">
      <!--<img class="test" :src="option.image_src"  />-->
    </div>

    <div class="thumb2" v-if="show3">
      <img class="test2" src="@/assets/images/caizhong.png" @click="show3click"/>
    </div>

    <div class="thumb2" v-if="showload">
      <div class="xxx" @click="xxxx"></div>
      <img class="test3" src="@/assets/images/xiazai.jpeg" @click="show4click"/>
    </div>

    <div class="view">
      <div class="header">
        <img class="back" @click="back" src="@/assets/images/back.png">
        <div></div>
        <img @click="publicGuess" class="public" src="@/assets/images/public.png">
      </div>
      <div class="publicLab" @click="publicGuess">发布</div>

      <div class="bodyBtn">
        <div class="btn1" @click="myguess">
          <img src="@/assets/images/me.png">
          <div>自己</div>
        </div>
        <div @click="share">
          <img src="@/assets/images/share.png">
          <div>{{option.stat ?option.stat.forward:'0'}}</div>
        </div>
        <div class="tipdiv" @click="showclick2">
          <div class="tip2" style="text-align: left;" v-if="show2">{{option.name.length}}个字</div>
          <img style="width: 37px;height: 37px;" src="@/assets/images/jiji.png">
          <!--<div class="tip" style="color:#000;font-size=11px;" @click="showclick2">提示</div>-->

        </div>

      </div>
      <div class="foot">
        <div >
          <img class="role" src="@/assets/images/role.png" @click="showclick">
          <input  v-model="answer" class="name">
          <div @click="postAnwser" class="send">发送</div>

        </div>
        <marquee class="desc" width=90% direction=left align=middle>
          <span v-for="(item,index) in option.answers">@{{item.userInfo == null ?"":item.userInfo.nickname}}:&nbsp;{{item == null ?"":item.answer}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </marquee>
      </div>
    </div>
    <div class="roleDesc" @click="showclick" v-if="show1">
      <div class="roleDesc2">
        <div style="text-align: center;margin-top: 20px;">猜物规则</div>
        <div style="display: flex;flex-direction: column;padding: 7px 8px 0 11px">
          <div class="roletext"><span class="rolep">+&nbsp;</span>每天一人最多猜5次,若次数已满，需发布一
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件猜物换取5次猜物机会。
          </div>
          <div class="roletext"><span class="rolep">+&nbsp;</span>为了更好地沟通，发布猜物答案同时将自动
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关注物主。
          </div>
          <div class="roletext"><span class="rolep">+&nbsp;</span>猜中后若快递寄送物件,猜中方需承担运费。</div>
        </div>
      </div>
    </div>

  </div>
</template>
<!--Rectangle-->
<script>
  import {
    getPluginsGuessList, getPluginsGuessAnwser,
    getPluginsGuessForward
  } from "@/api/sigua";
  // import {brower} from "../../utils/brower"

  var invoke = window.WebViewInvoke
  var toast = invoke.bind('toast');
  var onPushScreen = invoke.bind('onPushScreen');
  var goBack = invoke.bind('goBack');
  var forward = window.WebViewInvoke.bind('forward');
  var getLocalUser = window.WebViewInvoke.bind('getLocalUser');
  var onConfirmChat = window.WebViewInvoke.bind('onConfirmChat');
  export default {
    data() {
      return {
        img: "http://m1.jamootime.com/guess/181004231009_153865994345547551.jpg",
        answer: '',
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        showload: false,
        user: {},
      }
    },
    methods: {
      downloadAPP() {
        this.showload = true
      },
      xxxx(){
        this.showload = false
      },

      tokenCheck(){
        var token = window.localStorage.token
        console.log("token:"+token)
        if (token == 'undefined'  ||token == null || token.length < 9) {
          this.showload = true
          return
        }
      },
      show4click() {

        this.showload = false
        var token = window.localStorage.token + ""
        console.log("token:"+token)
        if (token == 'undefined'  || token == null || token.length < 7) {
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            window.location.href = 'https://itunes.apple.com/cn/app/jamoo/id1435730898'
          } else if (/(Android)/i.test(navigator.userAgent)) {
            //Android终端
            window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.jamoo'
          }
        }
      },

      back() {
        if (this.isDetail) {
          this.$router.go(-1);
        } else {
          goBack()
          // window.localStorage.token = ""
        }
      },
      myguess() {
        var token = window.localStorage.token
        console.log("token:"+token)
        if (token == 'undefined' ||token == null || token.length < 12) {
          this.showload = true
          return
        }
        this.$router.push({
          path: '/myguess',
        })
      },

      publicGuess() {

        var token = window.localStorage.token
        console.log("token:"+token)
        if (typeof(token) == undefined ||token == null || token.length < 12) {
          this.showload = true
          return
        }
        if (this.user.mobile == null || this.user.mobile.length < 4) {
          onPushScreen({page: 'Pages/My/AssociationPhone', params: {}});
          return
        }
        if (this.user.verified == null ||this.user.verified == false) {
          onPushScreen({page: 'Pages/My/NameConfirmPower', params: {}});
          return
        }else {
          console.log("通过了审核!")
        }


        onPushScreen({
          page: 'Pages/MediaFullScreen', params: {
            from: 'GUESS',
            mediaType: 'photo',
            nextPage: 'GUESS'
          }
        });
        var that = this
        window.WebViewInvoke.define('onMediaCallback', function (data) {
          data = data || {};
          let imgt = data.data + ""
          window.localStorage.imgurl = imgt
          if (window.localStorage.imgurl) {
            that.$router.push({
              path: '/public',
            })
          }

        });


      },
      show3click() {
        var token = window.localStorage.token
        console.log("token:"+token)
        if (typeof(token) == undefined ||token == null || token.length < 12) {
          this.showload = true
          return
        }
        var item = this.option
        console.log("test::" + JSON.stringify(item))
        var guess_owner = {
          nickname: item.nickname,
          uid: item.uid
        }
        this.show3 = false
        // console.log("item.id::" + item.id + "item.im_group::" + item.im_group + "guess_owner::" + guess_owner)
        onConfirmChat(item.id, item.im_group, guess_owner).then(ret => {
          console.log(ret)
        }).catch();
      },

      showclick() {
        this.show1 = !this.show1
      },

      showclick2() {
        this.show2 = !this.show2
      },

      share() {

        forward({
          avatar: this.user.avatar,
          image: this.option.image_src,
          subTitle: "猜物",
          title: "这是什么？猜中拿走，你就是芥摩锦鲤！",
          url: "http://guess.jamootime.com/details?id=" + this.option.id+"&share=1",
          topic_id: this.option.id,
          type: "guess",
        });
        //http://www.oldck.com/details?id=14
//        var id = this.option.id;
//        getPluginsGuessForward(id).then(res => {
//          if (res.code == 200) {
//            toast('转发成功!');
//          } else {
//            toast(res.msg);
//          }
//        });
      },

      postAnwser() {
        var token = window.localStorage.token
        console.log("token:"+token)
        if (typeof(token) == undefined ||token == null || token.length < 12) {
          this.showload = true
          return
        }
        if (this.user.mobile == null || this.user.mobile.length < 4) {
          onPushScreen({page: 'Pages/My/AssociationPhone', params: {}});
          return
        }

        if (this.answer == "" || this.answer.length < 1) {
          toast('请输入答案!');
          return
        }
        var data = {
          answer: this.answer
        };
        var id = this.option.id;
        this.answer = ""
        getPluginsGuessAnwser(id, data).then(res => {
          if (res.code == 200) {
            if (res.data.is_correct) {
              this.show3 = true
            } else {
              toast('和答案就差一点点\n再猜猜其他的吧');
            }
          } else {
            toast(res.msg);
          }
        });
      },
    },
    created() {
      getLocalUser().then(ret => {
        this.user = ret
        window.localStorage.token = ret.token;
      }).catch();
    },
    props: ['currentPage', 'option', 'index', 'isDetail']
  }
</script>

<style scoped>



  .roleDesc2 {
    z-index: 1010;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    bottom: 0;
    left: 18px;
    right: 18px;
    height: 218px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    color: #fff;
    font-size: 15px;
  }

  .roleDesc {
    z-index: 1009;
    position: fixed;
    background: rgba(0, 0, 0, 0.1);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }


  .rolep {
    font-size: 22px;
  }


  .roletext {
    padding: 4px 0 0px 4px;
  }


  .full-page {
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.5s ease 0s;
    z-index: 1;
    background-color: rgba(0, 0, 0, 1);
  }

  .page-before {
    z-index: 0;
    transform: translate3d(0, -100%, 0);
  }

  .page-after {
    z-index: 0;
    transform: translate3d(0, 100%, 0);
  }


  .test {
    width: 100%;
    position: fixed;
    bottom: 0;
    top: 0;
    margin: auto 0;
  }

  .thumb {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 11;
  }


  .test2 {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 199px;
  }

  .test3 {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 300px;
    z-index: 1222;
    background: #000;
  }

  .xxx{
    position: fixed;
    bottom: 120px;
    top: 0;
    right: 0;
    z-index: 1232;
    margin: auto 10px;
    width: 100px;
    height: 100px;
  }

  .thumb2 {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1111;
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
    padding: 30px 14px 6px 14px;
  }

  .header div {
    flex-grow: 2;
  }

  .public {
    /*margin-top: -10px;*/
    width: 59px;
    height: 59px;
  }

  .back {
    width: 20px;
    height: 20px;
  }

  .publicLab {
    width: 100%;
    padding-right: 33px;
    text-align: right;
    color: #fff;
    font-size: 11px;
  }

  .bodyBtn {
    z-index: 900;
    position: fixed;
    left: 310px;
    bottom: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1003;
  }

  .bodyBtn div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bodyBtn div img {
    width: 25px;
    height: 25px;
    z-index: 1006;
  }

  .bodyBtn div div {
    font-size: 11px;
    color: #fff;
    padding-top: 5px;
    padding-bottom: 20px;
  }

  .tipdiv {
    position: relative;
    z-index: 1003;
  }

  .tip {
    position: absolute;
    top: 5px;
    z-index: 1014;
  }

  .tip2 {
    position: fixed;
    bottom: 142px;
    right: 40px;
    font-size: 11px;
    color: #fff;
    background-color: #000;
    padding: 0 30px 0px 10px;
    text-align: left;
    border-radius: 18px;
    height: 34px;
    line-height: 26px;
    z-index: 999;
  }

  .desc {
    color: #fff;
  }

  .foot {
    background: red;
    z-index: 1001;
  }

  .role {
    z-index: 1002;
    position: fixed;
    bottom: 51px;
    left: 24px;
    width: 59px;
    height: 81px;
  }

  .name {
    z-index: 1000;
    position: fixed;
    bottom: 60px;
    left: 27px;
    width: 324px;
    padding: 0 66px;
    line-height: 43px;
    border-radius: 22px;
    border: none;
    background: #4a4a4a;
    color: #fff;
  }

  .send {
    z-index: 1000;
    position: fixed;
    bottom: 62px;
    right: 20px;
    color: #fff;
    font-size: 15px;
    padding: 20px 20px 10px 10px;
  }

  .desc {
    z-index: 1000;
    position: fixed;
    bottom: 13px;
    right: 27px;
    left: 27px;
    width: 318px;
    height: 21px;
    font-size: 15px;
  }
</style>
