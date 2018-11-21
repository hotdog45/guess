<template>
  <div id="test" >
    <div v-for="(item,index) in data" >
      <!--<div>凄凄切切群群群群群群群群</div>-->
      <Fullpage :currentPage='currentPage' :option="item" :index = "index">
      </Fullpage>
    </div>

  </div>
</template>

<script>
  import Fullpage from './Fullpage'
  import {getPluginsGuessList,

  } from "@/api/sigua";



  function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI
  }

  function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    if(Math.abs(dx) < 50 && Math.abs(dy) < 50) {
      return result
    }
    var angle = GetSlideAngle(dx, dy);
    if(angle >= -45 && angle < 45) {
      result = 4;
    }else if (angle >= 45 && angle < 135) {
      result = 1;  //向上
    }else if (angle >= -135 && angle < -45) {
      result = 2;  // 向下
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    }
    return result
  }


  var invoke = window.WebViewInvoke
  var toast = invoke.bind('toast');
  var getLocalUser = window.WebViewInvoke.bind('getLocalUser');

  export default {
    name: 'App',
    data () {
      return {
        currentPage: 1,
        startX: '',
        startY: '',
        endX: '',
        endY: '',
        data:[],

      }
    },
    components: {
      Fullpage
    },
    created () {

      getLocalUser().then(ret=>{
//        toast(JSON.stringify(ret))
        window.localStorage.token  = ret.token;
      }).catch();



      this.touchListener()
      this.getList()
    },
    methods: {

      touchListener(){
        document.addEventListener('touchstart', (ev) => {
          this.startX = ev.touches[0].pageX;
          this.startY = ev.touches[0].pageY
        })
        document.addEventListener('touchend', (ev) => {
          this.endX = ev.changedTouches[0].pageX;
          this.endY = ev.changedTouches[0].pageY;
          const  direction = GetSlideDirection(this.startX, this.startY, this.endX, this.endY);
          if (direction === 1) {
            if (this.currentPage < this.data.length-1) {
              this.currentPage ++
            }//向上
          } else if ( direction ===2 ) {//向下
            if (this.currentPage >= 2) {
              this.currentPage --
            }
          }
        })
      },

      getList() {

        var data = {
          token:window.localStorage.token,
        }

        getPluginsGuessList(data).then(res => {
          if (res.code == 200) {
            this.data = res.data.records
            this.$children.forEach((child, index) => {
              if (child.option === null) {
                let childOption = this.data[index];
                this.$set(childOption, 'index', index + 1);
                console.log(childOption+"....")
                child.option = childOption;
              }
            });
          } else {
            alert("请求失败,稍后重试!");
          }
        });
      },






    },

    mounted() {


      this.$children.forEach((child, index) => {
        // 动态设置各个page内的options
        if (child.option === null) {
          let childOption = this.data[index];
          this.$set(childOption, 'index', index + 1);
          console.log(childOption+"....")
          child.option = childOption;
        }
      });
    }
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
