<template>
  <div>
    <van-nav-bar
      title="订单明细"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="" class="test" slot="left"/>
    </van-nav-bar>

    <div style="display: flex;padding: 10px 20px;font-size: 16px;background: #eee">
      <div style="flex-grow: 2;color: #7e7e7e">2018年10月15日-2018年10月15日</div>
      <div style="" @click="choose">筛选</div>
      <img src="">
    </div>

    <van-tabs v-model="active" class="tabs" @click="onClick" :color="'#c8b585'">
      <div style="" class="num">
        <div style="flex-grow: 1;">100</div>
        <div style="flex-grow: 1">1000</div>
        <div style="flex-grow: 1">900</div>
      </div>
      <van-tab title="销售推广奖励">

        <ordercell ></ordercell>
        <ordercell></ordercell>
        <ordercell></ordercell>
        <ordercell></ordercell>
        <ordercell></ordercell>
        <ordercell></ordercell>
      </van-tab>
      <van-tab title="团队佣金">
        <ordercell></ordercell>
        <ordercell></ordercell>
        <ordercell></ordercell>
        <ordercell></ordercell>
        <ordercell></ordercell>
        <ordercell></ordercell>
      </van-tab>
      <van-tab title="拉新奖励">
        <newcell></newcell>
        <newcell></newcell>
        <newcell></newcell>
        <newcell></newcell>
        <newcell></newcell>
        <newcell></newcell>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import ordercell from './component/ordercell';
  import newcell from './component/new';
  export default {
    components: {
      ordercell,
      newcell
    },
    data() {
      return {
        message: "订单页",
        active: 0,
        searchv: "",

      };
    },

    methods: {


      choose(){
        this.$router.push({
          path: '/choose',
        })
      },

      desc(){
        this.$router.push({
          path: '/desc',
        })
      },


    },

    //created创建完毕状态
    created() {
    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .searchView {
    background: #fff;
    border: 6px solid #eee;
    align-items: center;
    height: 50px;
    flex-direction: row;
  }

  .searchinput {
    width: 85%;
    height: 100%;
  }

  .search {
    background: #fff;
    align-items: center;
  }

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
  }

  .num {
    background: #fff;
    display: flex;
    flex-direction: row;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #999
  }

</style>
