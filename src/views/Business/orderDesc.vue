<template>
    <div>
      <van-nav-bar
        class="nav-bar"
        title="订单详情"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" class="test" slot="left" size="15px"/>
      </van-nav-bar>

      <div style="background: #fff; padding: 10px 20px;margin: 10px 0;font-size: 14px;color: #7e7e7e;">
        <div style="display: flex;flex-direction: row;">
          <div style="flex-grow: 2;">订单总价:90 &nbsp;&nbsp;数量:2</div>
          <div style="color: #c8b585;">待收货</div>
        </div>
        <div style="margin-top: 5px;">订单号:2132435465</div>
        <div style="display: flex;flex-direction: row;margin-top: 5px;">
          <div style="flex-grow: 2;">下单时间:2018年10月09日17:40:44</div>

          <div style="font-size: 17px;color: #c8b585">¥50</div>
        </div>

      </div>

      <div style="background: #fff;">
        <div class="vipcell">
          <img src="@/assets/images/logo.png">
          <div class="title">
            <div class="time">21324354657</div>
            <div class="time">数量:1</div>
            <div class="time">商品价格:90</div>
          </div>
        </div>

        <div class="count" >
          <div style="flex-grow: 2;">商品优惠</div>
          <div >-¥30</div>
        </div>
        <div class="count2" >
          <div style="flex-grow: 2">实付</div>
          <div style="font-size: 14px;">¥30</div>
        </div>
        <div class="count2" style="border-bottom: 1px solid #eee;padding-bottom: 10px;">
          <div style="flex-grow: 2">佣金:8%</div>
          <div style="font-size: 14px;color: #c8b585;">¥30</div>
        </div>
      </div>

      <div style="background: #fff;">
        <div class="vipcell">
          <img src="@/assets/images/logo.png">
          <div class="title">
            <div class="time">21324354657</div>
            <div class="time">数量:1</div>
            <div class="time">商品价格:90</div>
          </div>
        </div>

        <div class="count" >
          <div style="flex-grow: 2;">商品优惠</div>
          <div >-¥30</div>
        </div>
        <div class="count2" >
          <div style="flex-grow: 2">实付</div>
          <div style="font-size: 14px;">¥30</div>
        </div>
        <div class="count2" style="border-bottom: 1px solid #eee;padding-bottom: 10px;">
          <div style="flex-grow: 2">佣金:8%</div>
          <div style="font-size: 14px;color: #c8b585;">¥30</div>
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

  .vipcell{
    display: flex;
    flex-direction: row;

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


  .name{
    font-size: 14px;
    flex-grow: 2;
  }
  .time{
    font-size: 12px;
    color: #7e7e7e;
  }
  .count{
    display: flex;
    flex-direction: row;
    background: #fff;
    margin: 0 15px;
    font-size: 14px;
    color: #c6c6c6;
  }
  .count2{
    display: flex;
    flex-direction: row;
    background: #fff;
    margin: 0 15px;
    padding: 3px 0;
    font-size: 15px;
    color: #262626;
  }
  .test{
    color: #000;
  }
</style>
