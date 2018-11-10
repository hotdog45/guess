<template>
  <div class="receiptAddress">
    <div class="addres-item" v-for="(item ,index) in addressList" @click.stop.prevent="seletedItem(index)"
         style="margin: 15px">
      <p>{{item.name}}&nbsp;&nbsp;{{item.phone}}</p>
      <p style="font-size: 13px">{{item.codeAddress}}</p>

    </div>
    <x-button style="background: #eecc7f" type="primary" class="add-btn"
              @click.native="handleAddAddress">添加地址
    </x-button>
  </div>
</template>

<script>
  import {CheckIcon, XButton} from 'vux'
  import {
    getQueryAllAddress,
  } from '@/api/sulan'


  export default {
    name: 'receiptAddress',
    data() {
      return {
        checked: true,
        addressList: [],
        addressDel: {
          addressId: ""  //订单id
        },
        //设置默认
        addressDefault: {
          addressId: "",  //订单id
          isDefault: 1
        },
        jump: false,
        orderDatas: {},
      }
    },

    created() {
      this.addressNewList();
    },
    methods: {

      seletedItem(index) {
        const address = {'address': [this.addressList[index]]}
        sessionStorage.setItem('address', JSON.stringify(address))
        this.$router.push({
          path: '/ordersettlement',
        })


      },

      //获取地址列表
      addressNewList(){
        var data = {"userId": window.localStorage.userId}
        getQueryAllAddress(data).then((res)=> {
          if (res.success) {
            this.addressList = res.module.list
          }
        })
      },
      //设置默认地址
      handleCheckedItem(index){
        console.log('isDefault修改之前:' + this.addressList[index].isDefault);
        this.addressDefault.isDefault = this.addressList[index].isDefault == 0 ? 1 : 0; //三目运算符
        this.addressDefault.addressId = this.addressList[index].addressId
        console.log('this.addressDefault:' + this.addressDefault);
        getAddressDefault(this.addressDefault).then((res)=> {
          console.log(res);
//          Toast(res.msg)
          if (res.status == 0) {      //成功之后重新请求,刷新数据
            this.addressNewList();
          }
        })
      },

      //删除地址
      goDelAddress(index){
        console.log("index:" + index);
        this.addressDel.addressId = this.addressList[index].addressId;
        console.log("addressId:" + this.addressList[index])
        getAddressDel(this.addressDel).then((res)=> {
          console.log(res);
//          Toast(res.msg)
          if (res.status == 0) { //成功之后重新请求,刷新数据
            this.addressNewList();
          }

        })
      },
      //编辑地址
      addressEdit(item) {

        this.$router.push({
          path: 'addadress',
          query: {
            addressData: item
          }
        })
      },

      handleAddAddress(){
        this.$router.push({
          path: 'addadress'
        })
      }
    },
    components: {
      CheckIcon,
      XButton
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .receiptAddress {
    padding-bottom: 10px;
  }

  .addres-item {
    height: 90px;
    padding: 5px 20px;
    background-color: #FFFFFF;
    font-size: 13px;
    p:first-of-type {
      font-size: 14px;
      color: #333;
    }
    p:last-of-type {
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .add-btn {
    /*position: fixed;*/
    /*bottom: 0px;*/
    /*left: 0px;*/
    margin-top: 50px;
    font-size: 14px;
    height: 50px;
  }
</style>
