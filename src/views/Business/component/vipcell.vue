<template>
  <div class="vipcell">
    <img src="@/assets/images/logo.png">
    <div class="title">
      <div class="name">21324354657</div>
      <div class="time">拉新时间:2018年10月09日16:32:17</div>
    </div>
    <div v-if="isvip" class="vip">vip会员</div>
    <div v-else class="vip2">会员</div>

  </div>
</template>

<script>

  export default {
    components: {},
    props: ["data"],
    data() {
      return {
        message: "详情页",
        isvip:false
      };
    },

    methods: {},

    //created创建完毕状态
    created() {
    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .vipcell{
    display: flex;
    flex-direction: row;
    border-top: 10px solid #eee;
    /*border-bottom: 10px solid #eee;*/
    background: #fff;
  }
  .vipcell img{
    width: 50px;
    height: 50px;
    margin: 15px;

  }
  .title{
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
  }

  .vip{
    /*border: 1px solid #c8b585;*/
    border-radius: 3px;
    background: #c8b585;
    color: #fff;
    width: 70px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    margin-top: 15px;
    margin-right: 15px;
    font-size: 13px;
  }
  .vip2{
    /*border: 1px solid #0bb20c;*/
    border-radius: 3px;
    background: #c6c6c6;
    color: #fff;
    width: 70px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    margin-top: 15px;
    margin-right: 15px;
    font-size: 11px;
  }
  .name{
    font-size: 15px;
    flex-grow: 2;
  }
  .time{
    font-size: 12px;
    color: #c6c6c6;
  }
</style>
