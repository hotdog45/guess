<template>
  <!-- 页面的内容 -->
  <div>
    <div class="desc">
      <h2>恭喜您获得速懒鲜生VIP资格</h2>
      您的专属顾问为您提供一对一服务，赶快扫码进您的专属福利群，每天惊喜不断！
    </div>
    <img :src="groupQR" class="imgqr">
    <div class="vipbtn" @click="share">邀请朋友参加</div>
  </div>
</template>

<script>
  import {
    getShopGroupQR,
  } from '@/api/sulan'

  /* 页面的js */
  export default {
    components: {},
    data() {
      return {
        groupQR: "",
      };
    },

    methods: {

      share(){
        this.$router.push({
          path: 'invitation'
        })
      },

    },

    //created创建完毕状态
    created() {
      getShopGroupQR().then((res)=> {
        this.groupQR = res.module
      })
    },
  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .desc {
    margin: 20px 50px;
  }

  .imgqr {
    width: 200px;
    height: 200px;
    margin: 20px 80px;

  }
  .vipbtn {
    margin: 10px 35px;
    background: #eecc7f;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    margin-top: 0;
  }
</style>
