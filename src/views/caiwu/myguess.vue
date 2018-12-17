<template>
  <div style="background: #fff">
    <!--{{message}}-->
    <div class="topview">
      <div class="top-bar" @click="top">我的猜物
        <div class="img-rapper"><img @click="back" class='back' src="@/assets/images/back2.png" alt=""></div>
      </div>

      <div class="header2">
        <div class="header">
          <div class="btn1" v-if="sel==0">我猜</div>
          <div class="btn3" v-else @click="choose(0)">我猜</div>
          <div class="btn2" v-if="sel==1">我发</div>
          <div class="btn4" v-else @click="choose(1)">我发</div>
        </div>
      </div>
    </div>


    <!--<div>私聊</div>-->

    <div v-if="sel==0" v-for="(item,index) in list2" >
      <cell1 :item="item" @chat="chat2"></cell1>
    </div>

    <div v-if="sel==1" v-for="(item2,index) in list1"  @click.stop.prevent="details(index)">
      <cell :item="item2" @chat="chat3"></cell>
    </div>


    <div style="height: 44px"></div>
  </div>
</template>

<script>

  import {getPluginsGuessMyAnswer, getPluginsGuessMy} from "@/api/sigua";

  import cell1 from './cell1'
  import cell from './cell3'


  var invoke = window.WebViewInvoke
  var toast = invoke.bind('toast');
  var onConfirmChat = window.WebViewInvoke.bind('onConfirmChat');
  export default {
    data() {
      return {
        message: "详情页11",
        sel: 0,
        data1:{},
        data2:{},
        list1: [],
        list2: [],
      };
    },

    components: {
      cell1,
      cell
    },
    methods: {
      top(){
        window.scrollTo(0,0);
      },
      chat3(data){
        var item = data
        console.log(JSON.stringify(item))
        var guess_owner={
          nickname:item.correctAttendee.userInfo.nickname,
          uid:item.correctAttendee.userInfo.uid
        }
        console.log(item.correctAttendee.id+"||||||"+JSON.stringify(item.correctAttendee) +"|||||||||||"+JSON.stringify(guess_owner))
        onConfirmChat(item.correctAttendee.id,item.correctAttendee.im_group ? item.correctAttendee.im_group :"",guess_owner).then(ret=>{
//          toast(ret);
          console.log(ret)
          this.getList1(1)
          this.getList2(1)
        }).catch();
      },
      chat2(data){
        var item = data
        console.log("test"+JSON.stringify(item))
        var guess_owner={
          nickname:item.userInfo.nickname,
          uid:item.userInfo.uid
        }
        console.log(item.id+"||||||"+JSON.stringify(item.correctAttendee) +"|||||||||||"+JSON.stringify(guess_owner))
        onConfirmChat(item.id,item.im_group ,guess_owner).then(ret=>{
//          toast(ret);
          console.log(ret)
          this.getList1(1)
          this.getList2(1)
        }).catch();
      },

      back(){
        this.$router.go(-1);
      },
      details(num){
        // var json ;
        // if (this.sel == 0){
        //   json = this.list2[num]
        // }else {
        //   json = this.list1[num]
        // }
        // this.$router.push({
        //   path: '/details?share=2&id='+json.id,
        // })
      },


      choose(ind) {
        this.sel = ind;
        this.getList1(1)
      },
      //我发
      getList1(page) {
        getPluginsGuessMy(page).then(res => {
          if (res.code == 200) {
//            this.data1 = res.data
//            if (this.data1.records.length >0){
//              this.getList1(this.data1.page + 1)
//              if (this.list1.length >1){
//                this.data1.records.forEach((record, index) => {
//                  this.list1.push(record)
//                });
//              }else {
                this.list1 = res.data.records
//              }
//            }else {
//              //没有更多
//            }
          } else {
            toast(res.msg);
          }
        });
      },
      getList2(page) {
        getPluginsGuessMyAnswer(page).then(res => {
          if (res.code == 200) {
//            this.list2 = res.data.records
//            this.data2 = res.data
//            if (this.data2.records.length >0){
//              this.getList1(this.data2.page + 1)
//              if (this.list2.length >1){
//                this.data2.records.forEach((record, index) => {
//                  this.list2.push(record)
//                });
//              }else {
                this.list2 = res.data.records
//              }
//            }else {
//              //没有更多
//            }
          } else {
            toast(res.msg);
          }
        });
      },

    },

    //created创建完毕状态
    created() {

      this.getList2(1)

    },
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .header {

    display: flex;
    flex-direction: row;

    background: #e6e6e6;
    border-radius: 22px;

  }

  .header2{
    position: sticky;
    top: 56px;
    margin: 0 27px;
    z-index: 1111;
    background: #fff;
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

  .topview{
    position: sticky;
    top: 0;
    z-index: 1111;
    background: #fff;
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
