<template>
  <div style="background: #fff;height: 100%;">
    <van-nav-bar
      class="nav-bar"
      title="筛选"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="arrow-left" class="test" slot="left" size="15px"/>
    </van-nav-bar>


    <div class="top" style="">
      <div @click="timeStart"   v-if="isStart" class="time2" style="flex-grow: 2;">{{StartTime}}</div>
      <div @click="timeStart" v-else class="time1" style="flex-grow: 2;">{{StartTime}}</div>
      <div style="width: 60px;font-size: 16px;color: #7e7e7e">至</div>
      <div @click="timeEnd" v-if="!isStart" class="time2" style="flex-grow: 2;">{{EndTime}}</div>
      <div @click="timeEnd" v-else class="time1" style="flex-grow: 2;">{{EndTime}}</div>
    </div>
    <img src="">

    <datetime-view v-if="isStart" v-model="StartTime" ref="datetime" :format="format"></datetime-view>
    <datetime-view v-else v-model="EndTime" ref="datetime" :format="format"></datetime-view>
  </div>
</template>

<script>
  import { DatetimeView } from 'vux'
  export default {
    components: {
      DatetimeView,
    },
    data() {
      return {
        isStart:true,
        StartTime:"开始时间",
        EndTime:"结束时间",
        format: 'YYYY-MM-DD'
      };
    },

    methods: {
      onClickLeft() {
        this.$router.push({
          path: '/order',
        })
      },
      timeStart(){
        this.isStart = true
      },
      timeEnd(){
        this.isStart = false
      },

      onClickRight() {
        alert('确定');


      },



    },

    created() {


    },


  };
</script>

<style scoped lang="less" rel="stylesheet/less">

.top{
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: 15px;
}
  .test{
    color: #000;
  }

  .time1{
    border-bottom: 1px solid #c6c6c6;
    color: #c6c6c6 ;
    padding-bottom: 10px;
    font-size: 17px;
  }


  .time2{
    border-bottom: 1px solid dodgerblue;
    color: dodgerblue ;
    padding-bottom: 10px;
    font-size: 17px;
  }
</style>
