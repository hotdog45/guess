<template>
  <div>
    <van-nav-bar
      class="nav-bar"
      title="提现"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <!--<van-icon name="" class="test" slot="left" />-->

      <van-icon name="arrow-left" class="test" slot="left" size="15px"/>
      <!--<van-icon name="search" class="test" slot="right" />-->
    </van-nav-bar>

    <div class="vipcell">
      <img src="@/assets/images/logo.png" style="width: 65px;height: 65px;padding: 10px">
      <div class="title">
        <div class="name" style="padding-top: 10px;">用户名</div>
        <div class="time">333333333</div>
      </div>
    </div>

    <div style="background: #fff;padding: 3px 0">
      <div style="color: #999;margin: 10px 25px;font-size: 17px">提现金额</div>
      <div
        style="display: flex;flex-direction: row;margin: 0px 20px;align-items: center;border-bottom: 1px solid #eee;">
        <div style="font-weight:700;font-size: 55px;">¥</div>
        <input  placeholder="0.00" style="font-weight:700;flex-grow: 2;font-size: 50px; margin-left: 20px">
      </div>
      <div style="color: #999;margin: 5px 15px;">余额 2000.00元</div>

    </div>
    <div
      style="font-size: 17px; background: #c8b585;color: #fff; border-radius: 23px; margin:25px;line-height: 46px; text-align: center;">
      预计48小时内到账,确认提现
    </div>

    <div>
      <div class="rules">
        <div class="dot"></div>
        <div>每月22-31号提取上个月的结算（确认收货），<br>48小 48小时内支付宝打款.</div>

      </div>
      <div class="rules">
        <div class="dot"></div>
        单笔体现不低于1元，单笔限额29999，每月<br>限额29999.
      </div>
      <div class="rules">
        <div class="dot"></div>
        每笔扣取3%的银行手续费.
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

    methods: {
      onClickLeft() {
        this.$router.push({
          path: '/home',
        })
      },


    },

    //created创建完毕状态
    created() {
    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .vipcell {
    display: flex;
    flex-direction: row;
    background: #fff;
    margin: 15px;
    padding: 10px;
    border-radius: 10px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: #95713d;
    margin: 5px;
    flex-basis: 10px;
  }

  .rules {
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
    font-size: 15px;
    color: #c6c6c6;
  }

  .title {
    font-size: 16px;
  }

  .test{
    color: #000;
  }
</style>
