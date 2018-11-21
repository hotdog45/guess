<template>
    <div class="content" v-if="item">
      <div class="left">
        <img :src="item.image_src" alt="">
      </div>
      <div class="right">
        <div class="intro" v-if="item.userInfo">
          <img class="avator" :src="item.userInfo.avatar" alt="">
          <div class="intro-detail">
            <div class="intro-name">{{item.userInfo.nickname}} </div>
            <div class="intro-address" v-if="item.userInfo.location"> {{item.userInfo.location.city}}-{{item.userInfo.location.region}}</div>
          </div>
        </div>
        <div class="join">{{item.stat.attendee_num ?item.stat.attendee_num : 0}}人参与</div>
        <div class="join">正确答案:{{item.answer}}</div>
        <div class="btn-rapper">
          <div v-if="item.is_correct" class="right-btn success">你猜对了</div>
          <div v-else class="right-btn error">你猜错了</div>
          <div v-if="item.is_correct" class="right-btn detail-talk">细聊</div>
          <div v-else-if="item.state =='overdue'" class="wait">正确谜底是：{{item.answer}}</div>
          <div v-else class="wait">等待谜底揭晓</div>
        </div>
      </div>
    </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
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
    position: relative;
    width: 100px;
    height: 180px;
    background: #000;

  }

  .left img {
    width: 100%;
    position: absolute;
    bottom: 0;
    top:0;
    margin: auto 0;
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
    margin-right: 10px;
    margin-left: 10px;
  }

  .intro .intro-detail {
    padding-top: 2px;
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
    margin: 11px 0;
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
