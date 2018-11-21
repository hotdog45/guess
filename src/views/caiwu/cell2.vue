<template>
  <div>
    <div class="content">
      <div class="left">
        <img src="" alt="">
      </div>
      <div class="right">
        <div class="intro">
            <img class="avator" src="" alt="">
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
          <div v-else-if="1" class="wait">正确谜底是：房车</div>
          <div v-else class="wait">等待谜底揭晓</div>
        </div>
      </div>
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
      };
    },

    methods: {},

    //created创建完毕状态
    created() {
    },

    props: ['item']


  };
</script>

<style scoped lang="less" rel="stylesheet/less">

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

</style>
