<template>
  <div id="test" >
      <Fullpage :option="data" :isDetail="true">
      </Fullpage>
  </div>
</template>

<script>
  import Fullpage from './Fullpage'
  import {
    getPluginsGuessDesc,
  } from "@/api/sigua";


  var invoke = window.WebViewInvoke
  var toast = invoke.bind('toast');
  var getLocalUser = window.WebViewInvoke.bind('getLocalUser');

  export default {
    name: 'App',
    data () {
      return {
        data:{},
      }
    },
    components: {
      Fullpage
    },
    created () {

      this.getdata()



    },
    methods: {

      getdata() {
        var id = this.$route.query.id;
        getPluginsGuessDesc(id).then(res => {
          if (res.code == 200) {
            this.data = res.data
          } else {

          }
        });
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
