<template>
  <div @click="desc" style="background: #fff;border-top: 10px solid #eee;">

    <div class="count" style="padding: 15px;padding-bottom: 0;">
      <div class="name">订单号:1213456666666666</div>
      <div style="font-size: 15px;color: #999">已完成</div>
    </div>
    <div class="vipcell">
      <img src="@/assets/images/logo.png">
      <div class="title">
        <div class="time">商品名称</div>
        <div class="time">商品价格:90 &nbsp;&nbsp;数量:1</div>
        <div class="count">
          <div style="flex-grow: 2" class="time">下单时间:2018年10月10日16:23:48</div>
          <div style="color: #c8b585;font-size: 17px;">¥50</div>
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


  };
</script>

<style scoped lang="less" rel="stylesheet/less">


  .vipcell {
    display: flex;
    flex-direction: row;
    /*border-top: 10px solid #eee;*/
    background: #fff;
  }

  .vipcell img {
    width: 55px;
    height: 55px;
    margin: 15px;

  }

  .title {
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
  }

  .name {
    font-size: 15px;
    flex-grow: 2;
  }

  .time {
    font-size: 12px;
    color: #999;
  }

  .count {
    display: flex;
    flex-direction: row;

    padding-right: 15px;

  }
</style>
