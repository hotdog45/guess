<template>
    <div>
      <van-nav-bar
        class="nav-bar"
        title="绑定"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="arrow-left" class="test" slot="left" size="15px"/>
      </van-nav-bar>

      <div style="padding: 10px 22px;color: #c6c6c6;font-size: 17px;">绑定提现支付</div>
      <div style="font-size: 17px;background: #fff;display: flex;flex-direction: column;line-height: 50px;padding: 0 20px;">
        <input style="" placeholder="请输入姓名(需要与身份证一致)">
       <div style="border-bottom: 1px solid #eee;"></div>
        <input placeholder="请输入支付宝账号">
      </div>
      <div class="bind" >去绑定</div>




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

.bind{
  border-radius: 23px;
  line-height: 46px;
  margin: 20px;
  text-align: center;
  /*border: 1px solid #eee;*/
  background: #c8b585;
  color: #fff;
  font-size: 17px;
}
.test{
  color: #000;
}
</style>
