<template>
  <div class="vipcell">
    <img src="@/assets/images/logo.png">
    <div class="title">
      <div class="name">21324354657</div>
      <div class="time">拉新时间:2018年10月09日16:32:17</div>
    </div>
    <div  class="vip">¥65</div>

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


    };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .vipcell{
    display: flex;
    flex-direction: row;
    border-top: 10px solid #eee;
    border-bottom: 10px solid #eee;
    background: #fff;
  }
  .vipcell img{
    width: 60px;
    height: 60px;
    margin: 15px;

  }
  .title{
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
  }

  .vip{
    /*border: 1px solid #0bb20c;*/
    color: #c8b585;
    width: 50px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    margin-top: 15px;
    margin-right: 15px;
    font-size: 14px;
  }
  .vip2{
    border: 1px solid #0bb20c;
    color: #0bb20c;
    width: 70px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    margin-top: 15px;
    margin-right: 15px;
    font-size: 11px;
  }
  .name{
    font-size: 14px;
    flex-grow: 2;
  }
  .time{
    font-size: 12px;
    color: #999;
  }
</style>
