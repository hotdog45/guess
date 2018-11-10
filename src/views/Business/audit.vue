<template>
    <div>
      <van-nav-bar
        class="nav-bar"
        title="认证"
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

      <img src="@/assets/images/logo.png" style="margin: 50px;margin-top: 100px;width: 70%">
      <div style="text-align: center;color: #999;">信息审核中</div>


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

  .test{
    color: #000;
  }

  /*.nav-bar{*/
    /*position: fixed;*/
    /*top:0;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 44px;*/
  /*}*/
</style>
