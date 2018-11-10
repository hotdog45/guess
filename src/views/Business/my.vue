<template>
  <div>
    <van-nav-bar
      class="nav-bar"
      title="用户管理"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="" class="test" slot="left"/>

      <!--<van-icon name="arrow-left" class="test" slot="left" />-->
      <!--<van-icon name="search" class="test" slot="right" />-->
    </van-nav-bar>

    <div style="height: 44px"></div>


    <div class="searchView">
      <!--<van-icon name="search" class="search" @click="searchGo"/>-->
      <input class="searchinput" v-model="searchv" placeholder="🔍搜索">
    </div>


    <van-tabs v-model="active" class="tabs" @click="onClick" :color="'#c8b585'">
      <div style="" class="num">
        <div style="flex-grow: 1;">100</div>
        <div style="flex-grow: 1">1000</div>
        <div style="flex-grow: 1">900</div>
      </div>
      <van-tab title="全部">

        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>

      </van-tab>
      <van-tab title="会员">
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
      </van-tab>
      <van-tab title="VIP会员">
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
        <vipcell></vipcell>
      </van-tab>
    </van-tabs>


  </div>
</template>

<script>
  import vipcell from './component/vipcell';


  export default {
    components: {
      vipcell
    },
    data() {
      return {
        message: "我的页",
        active: 0,
        searchv:"",
      };
    },

    methods: {

      onClick(index, title) {
        this.$toast(title);
      },
//
      searchGo(){
//        alert("cccccccc")
//        window.android.getClient("测试")
//        window.android.showAndroid()

        window.location.href="test://xxx";
      }
    },

    //created创建完毕状态
    created() {
    },


  };
</script>

<style lang="less" rel="stylesheet/less">

  .tabs .van-tabs__line {
    background-color: #0FAFAA;
  }

</style>

<style scoped lang="less" rel="stylesheet/less">


  .searchView {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    margin: 8px 20px;
    align-items: center;
    height: 36px;
    flex-direction: row;
    padding: 5px;
    justify-content: center;
  }

  .searchinput {
    width: 100%;
    height: 100%;
    text-align: center;

  }

  .search {
    background: #fff;
    align-items: center;
  }

  .nav-bar{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 44px;
  }
  .num{
    background: #fff;
    display: flex;
    flex-direction: row;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #999
  }


</style>
