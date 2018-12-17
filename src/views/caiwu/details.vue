<template>
  <div id="test" >
      <Fullpage :option="data" :isDetail="share">
      </Fullpage>
  </div>
</template>

<script>
  import Fullpage from './Fullpage'
  import {
    getPluginsGuessDesc,
    getPluginsGuessDesc2
  } from "@/api/sigua";


  var invoke = window.WebViewInvoke
  var toast = invoke.bind('toast');
  var getLocalUser = window.WebViewInvoke.bind('getLocalUser');
  const hideLoading = window.WebViewInvoke.bind('hideLoading');

  export default {
    name: 'App',
    data () {
      return {
        data:{
          share:false
        },
      }
    },
    components: {
      Fullpage
    },
    created () {

      this.getdata()

    },
    mounted(){
      // setTimeout(function() {
        hideLoading();
      // }, 200)
    },
    methods: {

      getdata() {
        let id = this.$route.query.id;
        let share = this.$route.query.share;
        this.share = share == 2 ?true:false
        if (share ==1) {
          getPluginsGuessDesc2(id).then(res => {
            if (res.code == 200) {
              this.data = res.data
            }
          });
        }else {
          getPluginsGuessDesc(id).then(res => {
            if (res.code == 200) {
              this.data = res.data
            }
          });
        }




      },
    },


  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }
  #test {
    width: 100%;
    height: 100%;
  }
</style>
