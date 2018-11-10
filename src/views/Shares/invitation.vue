<template>
  <!-- 页面的内容 -->
  <div class="">
    <img :src="imgStr" class="imgqr">
  </div>
</template>

<script>

  import {
    getShareH5,
  } from '@/api/sulan'

  export default {
    components: {

    },
    data() {
      return {
        imgStr:"",
      };
    },

    methods: {},


    created() {
      var data = {
        "url": "http://partner.xianzaishi.com?",
        "userId": window.localStorage.userId,
      }
      getShareH5(data).then((res)=> {
        this.imgStr = res
      })
    },
  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .imgqr {
    width: 100%;

  }
</style>
