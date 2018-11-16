<template>
    <div>

        <div class="header">
            <div class="btn1" v-if="index==0">我猜</div>
            <div class="btn3" v-else>我猜</div>
            <div class="btn2" v-if="index==1">我发</div>
            <div class="btn4" v-else>我发</div>                  
        </div>
        

          <div class="content" v-if="false">
            
            <div class="right">
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
                    <!--<p class="intro-name">大豆</p>-->
                    <!--<p class="intro-address">北京-西城区</p>-->
                </div>
                <div class="btn-rapper">
                    <div class="right-btn success">你猜对了</div>
                    <div class="right-btn detail-talk">细聊2</div>
                </div>
                
            </div>
            <div class="left">
                <img src="" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      message: "详情页",
      index: 1
    };
  },

  methods: {},

  //created创建完毕状态
  created() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.header {
  display: flex;
  flex-direction: row;
  margin: 27px;
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

.content {
  display: flex;
  flex-direction: row;
  margin: 0px 20px;
  padding: 30px 0;
  border-bottom: #111 solid 1px;
}
.left {
  width: 120px;
  height: 200px;
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
  margin: 0 15px;
}
.intro {
  display: flex;
  flex-direction: row;
}
.intro .avator {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: red;
  margin-right: 10px;
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
  font-size: 12px;
}
.join {
  text-align: left;
}
.btn-rapper {
  position: absolute;
  bottom: 0;
  right: 0;
}
.right-btn {
  width: 130px;
  height: 40px;
  line-height: 40px;
  background: pink;
  border-radius: 30px;
  text-align: center;
}
.success {
  margin: 10px 0;
  background: #fff;
  border: #53ffdc solid 1px;
}

.detail-talk {
  margin: 10px 0;
  background: #53ffdc;
}
</style>
