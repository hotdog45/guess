<template>
  <div id="test">
    <div v-for="(item,index) in data">
      <Fullpage :currentPage='currentPage' :option="item" :index="index" :isDetail="false">
      </Fullpage>

    </div>


  </div>
</template>

<script>
  import Fullpage from './Fullpage'
  import {
    getPluginsGuessList,
  } from "@/api/sigua";

  import Cookies from 'js-cookie';

  function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI
  }

  function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    if (Math.abs(dx) < 50 && Math.abs(dy) < 50) {
      return result
    }
    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
      result = 4;
    } else if (angle >= 45 && angle < 135) {
      result = 1;  //向上
    } else if (angle >= -135 && angle < -45) {
      result = 2;  // 向下
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    }
    return result
  }


  var invoke = window.WebViewInvoke
  var toast = invoke.bind('toast');
  var getLocalUser = window.WebViewInvoke.bind('getLocalUser');

  export default {
    name: 'App',
    data() {
      return {
        currentPage: 1,
        startX: '',
        startY: '',
        endX: '',
        endY: '',
        data1: {},
        data: [1],
        page: 1,

      }
    },
    components: {
      Fullpage
    },
    created() {
      var that = this
      window.localStorage.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTQ0MDYyNTA1LCJleHAiOjE1NzU1OTg1MDV9.TZPkD3B7WVYTGhU8jd83TZ0ZKpdZgGKjT04TtbN3BXw"
      getLocalUser().then(ret => {
        console.log("ret=======" + JSON.stringify(ret))
        window.localStorage.token = ret.token;
        console.log(window.localStorage.token)

        that.getList("1")
      }).catch();

      this.touchListener()
      that.getList("1")
    },
    methods: {

      touchListener() {
        document.addEventListener('touchstart', (ev) => {
          this.startX = ev.touches[0].pageX;
          this.startY = ev.touches[0].pageY
        })
        document.addEventListener('touchend', (ev) => {
          this.endX = ev.changedTouches[0].pageX;
          this.endY = ev.changedTouches[0].pageY;
          const direction = GetSlideDirection(this.startX, this.startY, this.endX, this.endY);
          if (direction === 1) {
            if (this.currentPage < this.data.length - 1) {
              this.currentPage++
            } else {
              this.page = this.data1.page + 1
              this.getList(this.page)
            }
          } else if (direction === 2) {//向下
            if (this.currentPage >= 2) {
              this.currentPage--
            }

          }
        })
      },

      getList(page) {

        getPluginsGuessList(page).then(res => {
          if (res.code == 200) {
            this.data1 = res.data
            if (this.data.length > 2) {
              res.data.records.forEach((record, index) => {
                this.data.push(record)
              });
            } else {
              this.data = ["1"]
              if (res.data != null && res.data.records.length > 0) {
                // this.data = res.data.records[0]
                res.data.records.forEach((record, index) => {
                  this.data.push(record)
                });
              } else {
                this.data.push("2")
              }

            }

            this.$children.forEach((child, index) => {
              if (child.option === null) {
                let childOption = this.data[index];
                this.$set(childOption, 'index', index + 1);
                console.log(childOption + "....")
                child.option = childOption;
              }
            });
          } else {
//            alert("请求失败,稍后重试!");
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
          console.log(childOption + "....")
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
