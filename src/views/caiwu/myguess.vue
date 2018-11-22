<template>
  <div>
    <!--{{message}}-->
    <div class="top-bar">我的猜物
      <div class="img-rapper"><img @click="back" class='back' src="@/assets/images/back2.png" alt=""></div>
    </div>

    <div class="header">
      <div class="btn1" v-if="sel==0">我猜</div>
      <div class="btn3" v-else @click="choose(0)">我猜</div>
      <div class="btn2" v-if="sel==1">我发</div>
      <div class="btn4" v-else @click="choose(1)">我发</div>
    </div>

    <div v-if="sel==0" v-for="(item,index) in list2" @click.stop.prevent="details(index)">
      <cell1 :item="item" ></cell1>
    </div>

    <div v-if="sel==1" v-for="(item2,index) in list1"  @click.stop.prevent="details(index)">
      <cell :item="item2" ></cell>
    </div>


  </div>
</template>

<script>

  import {getPluginsGuessMyAnswer, getPluginsGuessMy} from "@/api/sigua";

  import cell1 from './cell1'
  import cell from './cell3'


  var invoke = window.WebViewInvoke
  var toast = invoke.bind('toast');
  export default {
    data() {
      return {
        message: "详情页11",
        sel: 0,
        list1: [],
        list2: [],
      };
    },

    components: {
      cell1,
      cell
    },
    methods: {

      back(){
        this.$router.go(-1);
      },
      details(num){
        var json ;
        if (this.sel == 0){
          json = this.list2[num]
        }else {
          json = this.list1[num]
        }
        this.$router.push({
          path: '/details?id='+json.id,
        })
      },


      choose(ind) {
        this.sel = ind;
      },
      //我发
      getList1() {
        var data = {
          page: "1",
          total: "20"
        };
        getPluginsGuessMy(data).then(res => {
          if (res.code == 200) {
            this.list1 = res.data.records
          } else {
            toast(res.msg);
          }
        });
      },
      getList2() {
        var data = {
          page: "1",
          total: "20"
        };
        getPluginsGuessMyAnswer(data).then(res => {
          if (res.code == 200) {
            this.list2 = res.data.records
          } else {
            toast(res.msg);
          }
        });
      },

    },

    //created创建完毕状态
    created() {
      this.getList1()
      this.getList2()

    },
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .header {
    display: flex;
    flex-direction: row;
    margin: 0 27px;
    background: #e6e6e6;
    border-radius: 22px;
  }

  .header div {
    flex-grow: 2;
    text-align: center;
    width: 168px;
    height: 43px;
    line-height: 43px;
    border-radius: 22px;
    font-size: 15px;
  }

  .header .btn1 {
    background: #53ffdc;
  }

  .header .btn2 {
    background: #66ccff;
  }

  .header .btn3 {
    background: #e6e6e6;
  }

  .header .btn4 {
    background: #e6e6e6;
  }

  .top-bar {
    position: sticky;
    top: 0;
    /*padding-top: 10px;*/
    /*position: relative;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 56px;
    line-height: 56px;
    font-size: 15px;
    background: #fff;
    z-index: 1111;
  }

  .img-rapper {
    position: absolute;
    top: 0;
    left: 14px;
    padding-top: 5px;
    width: 56px;
    height: 56px;
  }

  .back {
    width: 20px;
    height: 20px;
  }

  .tab {
    margin: 0 30px;
  }


</style>
