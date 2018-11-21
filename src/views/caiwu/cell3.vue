<template>
  <div>
    <div class="content2" v-if="item">
      <div class="right">
        <div class="join" >{{(item.stat && item.stat.attendee_num) ?item.stat.attendee_num : 0}}人参与</div>
        <div class="join" style="font-weight: 500">正确答案:{{item.correct_answer[0]}}</div>
        <div v-if="item.state =='success'" style="color: #F85C38;font-size: 14px;padding: 5px 0 0 0">猜中者</div>
        <div class="intro" v-if="item.state =='success'">
          <img class="avator" :src="item.avatar" alt="">
          <div class="intro-detail" >
            <div class="intro-name">{{item.name}}</div>
            <div class="intro-address" v-if="item.location">{{item.location.city}}-{{item.location.region}}</div>
          </div>
        </div>
        <div class="temp">

        </div>
        <div v-if="item.state =='success'" class="right-btn detail-talk">细聊</div>
        <div v-else-if="item.state =='overdue'" class="right-btn error">已结束，没人猜中</div>
        <div v-else-if="!item.is_approved" class="right-btn error">审核未通过</div>
        <div v-else-if="item.state =='inprogress'" >截止竞猜日期<br>
          {{dateFormat(item.last_update)}}</div>

      </div>
      <div class="left">
        <img :src="item.image_src" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
      };
    },

    methods: {
      dateFormat (value) {
        var value=new Date(value);
        var year = value.getFullYear();
        var month = value.getMonth() + 1;
        var day = value.getDate();
        return year + '年' + month + '月' + day + '号';
      },
    },
    //created创建完毕状态
    created() {
    },
    props: ['item']

  };
</script>

<style scoped lang="less" rel="stylesheet/less">

  .content2 {
    display: flex;
    flex-direction: row;
    margin: 0px 37px;
    padding: 17px 0;
    border-bottom: #666 solid 1px;
  }

  .content2 .join {
    text-align: left;
  }

  .content2 .avator {
    margin: 10px 10px 0 0px;
  }

  .content2 .intro-detail {
    display: flex;
    flex-direction: column;
  }

  .content2 .right {
    display: flex;
    flex-direction: column;
  }

  .content2 .temp {
    flex-grow: 2;
  }

  .content2 .right .btn-rapper .error {
    margin-right: 42px;
    width: 143px;
    margin-bottom: -20px;
  }

  .content {
    display: flex;
    flex-direction: row;
    margin: 0px 37px;
    padding: 17px 0;
    border-bottom: #666 solid 1px;
  }

  .left {
    position: relative;
    width: 100px;
    height: 180px;
    background: #000;

  }

  .left img {
    width: 100%;
    position: absolute;
    bottom: 0;
    top:0;
    margin: auto 0;
  }

  .right {
    position: relative;
    right: 0;
    flex: 1;
    margin: 0 0 0 8px;
  }

  .intro {
    display: flex;
    flex-direction: row;
  }

  .intro .avator {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: red;
    margin-right: 20px;
    margin-left: 0px;
  }

  .intro .intro-detail {
    padding-top: 10px;
  }

  .intro .intro-detail div {
    display: inline;
  }

  .intro .intro-detail .intro-name {
    font-weight: bold;
    font-size: 13px;
  }

  .intro .intro-detail .intro-address {
    font-size: 11px;
  }

  .join {
    text-align: right;
    font-size: 14px;
  }

  .btn-rapper {
    position: absolute;
    right: 0;
  }

  .right-btn {
    width: 130px;
    height: 40px;
    line-height: 40px;
    border-radius: 30px;
    text-align: center;
  }

  .success {
    margin: 11px 0 7px 0;
    background: #fff;
    border: #53ffdc solid 1px;
  }

  .error {
    margin: 7px 0;
    background: #fff;
    border: #cecfd0 solid 1px;
  }

  .detail-talk {
    margin: 10px 0;
    background: #66CCFF;
    font-weight: 500;
  }

  .wait {
    padding-top: 15px;
    text-align: right;
    font-size: 14px;
  }

</style>
