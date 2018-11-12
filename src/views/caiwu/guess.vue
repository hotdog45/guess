<template>
  <div class="bg">
    <div class="thumb">
      <img class="test" src="@/assets/images/pic01.jpeg"  id="dolly" />
    </div>
    <!--<div class="thumb">-->
      <!--<img class="test" src="@/assets/images/1111.jpeg"  id="dolly1" />-->
    <!--</div>-->

    <div class="view">
      <div class="header">
        <img class="back" src="@/assets/images/back.png">
        <div></div>
        <img class="public" src="@/assets/images/public.png">
      </div>
      <div class="publicLab">发布</div>
      
      <div class="bodyBtn">
        <div class="btn1">
          <img  src="@/assets/images/me.png">
          <div>自己</div>
        </div>
        <div>
          <img src="@/assets/images/share.png">
          <div>208</div>
        </div>
        <div class="tipdiv">
          <div class="tip2"  style="text-align: left;">三个字</div>
          <img style="width: 37px;height: 37px;" src="@/assets/images/icon2.png">
          <div class="tip" style="color:#000;font-size=11px;">提示</div>
          
        </div>

      </div>
     <div class="foot">
       <div>
        <img class="role" src="@/assets/images/role.png">
        <input class="name">
        <div class="send">发送</div>

      </div>
      <marquee class="desc"  width=90%  direction=left align=middle>
        @虎嗅【2018天猫双11战绩：成交额2135亿元，物流单量超10亿】双11开启当晚，
        2分零5秒成交额超过100亿元；一小时达到672.6亿元（接近100亿美金）；15小时49分39秒，
        破2017年11月11日全天交易额；22小时28分37秒，成交额突破2000亿元。

      </marquee>
    </div>
    </div>
    
  </div>
</template>

<script>
import { closePixelate } from "../../utils/close-pixelate";

window.onload = function() {
  var pixelOpts = [{ resolution: 34 }];

  var dolly = document.getElementById("dolly");
  dolly.width = window.screen.width;
  dolly.closePixelate(pixelOpts);

  var dolly1 = document.getElementById("dolly1");
  dolly1.width = window.screen.width;
  dolly1.closePixelate(pixelOpts);
};

export default {
  components: {},
  data() {
    return {};
  },

  methods: {},

  //created创建完毕状态
  created() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.bg {
  position: relative;
}

.test {
  visibility: hidden;
}
.thumb {
  width: 100%;
  height: 100%;
  background: #999;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto 0;
  z-index: 1;
}

.view {
  z-index: 1000;
  position: fixed;
  background: rgba(90, 90, 90, 1);
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
  position: absolute;
  top: 6px;
  left: -70px;
  font-size: 11px;
  background: #000;
  border-radius: 12px;
  width: 85px;
  height: 22px;
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
  background: #000;
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
