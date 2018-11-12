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
        <div>
          <img style="width: 36px;height: 36px;" src="@/assets/images/icon2.png">
          <div>208</div>
        </div>

      </div>
     <div class="foot">
       <div>
        <img class="role" src="@/assets/images/role.png">
        <input class="name">
        <div class="send">发送</div>

      </div>
      <marquee class="desc"  width=90%  direction=left align=middle>弹来弹去跑马灯!</marquee>
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
  background: rgba(0, 0, 0, 0.1);
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
  padding: 216px 319px 0 319px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bodyBtn div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bodyBtn div img {
  width: 28px;
  height: 28px;
}
.bodyBtn div div {
  font-size: 11px;
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
}
.name {
  z-index: 1000;
  position: fixed;
  bottom: 60px;
  left: 27px;
  width: 324;
  line-height: 43px;
}
.send {
  z-index: 1000;
  position: fixed;
  bottom: 71px;
  right: 54px;
}
</style>
