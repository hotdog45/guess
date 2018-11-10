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
        <div class="title" >
          <div class="name" style="padding-top: 10px;">用户名</div>
          <div class="time" >333333333</div>
        </div>
      </div>
      <div style="background: #fff;padding: 3px 0">
        <div style="color: #999;margin: 5px 15px;">提现金额</div>
        <div style="display: flex;flex-direction: row;margin: 0px 20px;align-items: center;border-bottom: 1px solid #eee;">
          <div style="font-size: 40px;">¥</div>
          <input placeholder="0.00" style="flex-grow: 2;font-size: 40px; margin-left: 20px">
        </div>
        <div style="color: #999;margin: 5px 15px;">余额 2000.00元</div>

      </div>
      <div class="tixian" >预计48小时内到账,确认提现</div>

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
    margin: 15px;
    padding: 10px;
  }

  .tixian{
    margin: 20px 25px;
    padding:10px 0;
    text-align: center;
    border: 1px solid #eee;
    background: #0bb20c;
    color: #fff;
  }

</style>
