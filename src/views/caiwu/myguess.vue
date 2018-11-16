<template>
    <div>
        <!--{{message}}-->
        <div class="top-bar">我的猜物
            <div class="img-rapper"><img class='back' src="@/assets/images/back.png" alt=""></div>
        </div>

        <div class="header">
            <div class="btn1" v-if="index==0" >我猜</div>
            <div class="btn3" v-else @click="choose(0)">我猜</div>
            <div class="btn2" v-if="index==1">我发</div>
            <div class="btn4" v-else   @click="choose(1)">我发</div>                  
        </div>
        
        <div class="content">
            <div class="left">
                <img src="" alt="">
            </div>
            <div class="right">
                <div class="intro">
                    <div class="avator">
                        <img src="" alt="">
                    </div>
                    <div class="intro-detail">
                        <div class="intro-name">大豆</div>
                        <div class="intro-address">北京-西城区</div>
                    </div>
                    <!--<p class="intro-name">大豆</p>-->
                    <!--<p class="intro-address">北京-西城区</p>-->
                </div>
                <div class="join">1255人参与</div>
                <div class="join">正确答案:房车</div>
                <div class="btn-rapper">
                    <div class="right-btn success">你猜对了</div>
                    <div class="right-btn detail-talk">细聊</div>
                </div>

            </div>
        </div>

        <div class="content">
            <div class="left">
                <img src="" alt="">
            </div>
            <div class="right">
                <div class="intro">
                    <div class="avator">
                        <img src="" alt="">
                    </div>
                    <div class="intro-detail">
                        <div class="intro-name">大豆</div>
                        <div class="intro-address">北京-西城区</div>
                    </div>
                    <!--<p class="intro-name">大豆</p>-->
                    <!--<p class="intro-address">北京-西城区</p>-->
                </div>
                <div class="join">1255人参与</div>
                <div class="join">正确答案:房车</div>
                <div class="btn-rapper">
                    <div v-if="false" class="right-btn success">你猜对了</div>
                    <div v-else class="right-btn error">你猜错了</div>
                    <div v-if="false" class="right-btn detail-talk">细聊</div>
                    <div v-else-if="1"  class="wait">正确谜底是：房车</div>
                    <div v-else  class="wait">等待谜底揭晓</div>


                    
                </div>

            </div>
        </div>

         <div class="content2" v-if="true" >
            
            <div class="right" >
                <div class="join">1255人参与</div>
                <div class="join">正确答案:房车</div>
                <div class="intro">
                    <div class="avator">
                        <img src="" alt="">
                    </div>
                    <div class="intro-detail">
                        <div class="intro-name">大豆</div>
                        <div class="intro-address">北京-西城区</div>
                    </div>
                </div>
                <div class="temp">

                </div>
                 <div v-if="false" class="right-btn detail-talk">细聊</div>
                 <div v-else-if="false" class="right-btn error">已结束，没人猜中</div>
                  <div v-else class="right-btn error">审核未通过</div> 
                
            </div>
            <div class="left">
                <img src="" alt="">
            </div>
        </div>

    </div>
</template>

<script>
// import MyPublic from "./mypublic.vue";
// import { ButtonTab, ButtonTabItem } from "vux";

export default {
  data() {
    return {
      message: "详情页11",
      index: 1
    };
  },

  methods: {
    choose(ind) {
      this.index = ind;
    }
  },

  //created创建完毕状态
  created() {},
  components: {}
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.header {
  display: flex;
  flex-direction: row;
  margin: 0 27px;
  background: #e6e6e6;
  border-radius: 22px;
}
.header div {
  flex-grow: 2;
  text-align: center;
  width: 168px;
  height: 43px;
  line-height: 43px;
  border-radius: 22px;
  font-size: 15px;
}
.header .btn1 {
  background: #53ffdc;
}
.header .btn2 {
  background: #66ccff;
}
.header .btn3 {
  background: #e6e6e6;
}
.header .btn4 {
  background: #e6e6e6;
}

.top-bar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 56px;
  line-height: 56px;
  font-size: 15px;
}
.img-rapper {
  position: absolute;
  top: 0;
  left: 14px;
  padding-top: 5px;
  width: 56px;
  height: 56px;
}
.back {
  width: 20px;
  height: 20px;
}
.tab {
  margin: 0 30px;
}
.content {
  display: flex;
  flex-direction: row;
  margin: 0px 37px;
  padding: 17px 0;
  border-bottom: #666 solid 1px;
}
.left {
  width: 100px;
  height: 180px;
  background: orange;
}
.left img {
  width: 100%;
  height: 100%;
}
.right {
  position: relative;
  right: 0;
  flex: 1;
  margin: 0 0 0 8px;
}
.intro {
  display: flex;
  flex-direction: row;
}
.intro .avator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: red;
  margin-right: 20px;
  margin-left: 20px;
}
.intro .intro-detail {
  padding-top: 10px;
}
.intro .intro-detail div {
  display: inline;
}
.intro .intro-detail .intro-name {
  font-weight: bold;
  font-size: 13px;
}
.intro .intro-detail .intro-address {
  font-size: 11px;
}
.join {
  text-align: right;
  font-size: 14px;
}
.btn-rapper {
  position: absolute;
  right: 0;
}
.right-btn {
  width: 130px;
  height: 40px;
  line-height: 40px;
  border-radius: 30px;
  text-align: center;
}
.success {
  margin: 11px 0 7px 0;
  background: #fff;
  border: #53ffdc solid 1px;
}

.error {
  margin: 7px 0;
  background: #fff;
  border: #cecfd0 solid 1px;
}

.detail-talk {
  margin: 10px 0;
  background: #53ffdc;
}
.wait {
  padding-top: 15px;
  text-align: right;
  font-size: 14px;
}

.content2 {
  display: flex;
  flex-direction: row;
  margin: 0px 37px;
  padding: 17px 0;
  border-bottom: #666 solid 1px;
}

.content2 .join {
  text-align: left;
}
.content2 .avator {
  margin: 10px 10px 0 0px;
}
.content2 .intro-detail {
  display: flex;
  flex-direction: column;
}

.content2 .right {
  display: flex;
  flex-direction: column;
}
.content2 .temp {
  flex-grow: 2;
}

.content2 .right .btn-rapper .error {
  margin-right: 42px;
  width: 143px;
  margin-bottom: -20px;
}
</style>
