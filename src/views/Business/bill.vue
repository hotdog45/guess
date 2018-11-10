<template>
  <div>
    <van-nav-bar
      title="我的账单"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="arrow-left" class="test" slot="left" />
    </van-nav-bar>
    <div v-for="item in  list">
      <orderhead></orderhead>
      <div v-for="item2 in  list2">
        <billcell></billcell>
      </div>
    </div>


  </div>
</template>

<script>
  import billcell from './component/billcell';
  import orderhead from './component/orderhead.vue';
  export default {
    components: {
      billcell,
      orderhead
    },
    data() {
      return {
        message: "详情页",
        list:[0,1,2,3,4,5,6],
        list2:[20,31,32,33,4,5,6]
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

  .test{
    color: #000;
  }

</style>
