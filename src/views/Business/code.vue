<template>
    <div >
      <van-nav-bar
        class="nav-bar"
        title="激活码"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="" class="test" slot="left" />

        <!--<van-icon name="arrow-left" class="test" slot="left" />-->
        <!--<van-icon name="search" class="test" slot="right" />-->
      </van-nav-bar>
      <div style="height: 44px"></div>

      <div style="background: #fff;margin: 15px; padding: 15px">
        <div class="vipcell">
          <img src="@/assets/images/logo.png" style="width: 65px;height: 65px;padding: 10px">
          <div class="title" >
            <div class="name">用户名</div>
            <div class="time">浙江 杭州</div>
          </div>
          <img src="@/assets/images/logo.png" style="width: 15px;height: 15px ;margin-top: 10px">
        </div>
        <img class="qrcode" src="@/assets/images/logo.png">
        <div style="text-align: center;margin-top: 15px">分享开店礼包 赚80元</div>
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
  .nav-bar{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 44px;
  }
  .vipcell{
    display: flex;
    flex-direction: row;
    background: #fff;
    margin: 15px;
  }

  .qrcode{
    width: 90%;
    background: #fff;
    margin: 15px;
  }

  .title{
    margin-top: 10px;
  }

</style>
