<template>
  <div>
    <van-nav-bar
      class="nav-bar"
      title="审核"
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
    <!--<div style="height: 44px"></div>-->

    <div class="header" >身份认证</div>
    <div style="background: #fff;">
      <div class="name" >
        <div style="width: 100px;">姓名</div>
        <input placeholder="请输入姓名 (需要与身份证一致)" style="flex-grow: 2">
      </div>
      <div class="name">
        <div style="width: 100px;">身份证号码</div>
        <input placeholder="请输入身份证号码" style="flex-grow: 2">
      </div>
      <div style="margin: 15px">身份证照片</div>
      <div class="inputView">
        <div class="inputbg">
          <input class="input1" type="file" multiple="multiple" id="files_upload1" />
          <div style="text-align: center;padding: 5px">身份证正面照</div>
        </div>
        <div class="inputbg">
          <input class="input1" type="file" multiple="multiple" id="files_upload2" />
          <div style="text-align: center;padding: 5px">身份证反面照</div>
        </div>

      </div>

    </div>
    <div class="header" >绑定提现用户</div>
    <div class="name">
      <img src="">
      <div style="flex-grow: 2">支付宝</div>
      <div>去绑定</div>
      <van-icon class="arrow" name="arrow" size="10px"/>
    </div>

    <div class="apply">提交申请</div>

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
        alert('返回');
      },
    },

    //created创建完毕状态
    created() {
    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .name{
    display: flex;
    flex-direction: row;
    padding: 0  15px;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #eee;
    background: #fff;
  }

  .inputView{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    margin: 0 15px;
    padding-bottom: 35px;

  }
  .inputbg{
    height: 100px;
    width: 48%;
    background: #ccc;
  }
  .input1{
    opacity: 0;
    height: 100%;
    width: 100%;
  }
  .arrow{
     padding-right: 5px;
   }
  .header{
    background: #eee;
    color: #999;
    font-size: 13px;
    padding-left: 15px;
    line-height: 30px;
  }
  .apply{
    background: #fff;
    margin: 20px ;
    text-align: center;
    border: 1px solid #eee;
    line-height: 35px;
    border-radius: 6px
  }

</style>
