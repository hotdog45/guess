<template>
  <div class="addAddress">
    <group>
      <x-input title="收件人" placeholder="请输入您的姓名" v-model="addressData.name" label-width="100px"></x-input>
      <x-input title="联系电话" placeholder="请输入您的手机号" v-model="addressData.phone" label-width="100px"></x-input>
    </group>
    <group>
      <x-address title="所在地区" v-model="value" raw-value :list="addressDatas" value-text-align="left"
                 label-width="100px"></x-address>
      <x-textarea title="详细地址" v-model="addressData.address" placeholder="请填写详细信息" :show-counter="false" :rows="3"
                  label-width="100px"></x-textarea>
    </group>
    <!--<check-icon style="font-size: 16px;"class="is-default" :value.sync="isDefault" @click.native="handleCheckedItem">默认地址</check-icon>-->
    <!--<group>-->
    <!--<x-switch title="设为默认地址" v-model="addressData.isDefault" @click.native="handleCheckedItem"></x-switch>-->
    <!--</group>-->

    <x-button style="background: #eecc7f;" type="primary" class="add-btn" @click.native="handleAddAddress">确认添加
    </x-button>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XButton,
    XAddress,
    ChinaAddressV4Data,
    Value2nameFilter,
    CheckIcon,
    XSwitch,
    XTextarea
  } from 'vux'
  import {
    getAddAddress,
    getAreaCode

  } from '@/api/sulan'
  import request from '@/api/request';

  export default {
    name: 'addAddress',
    data() {
      return {
        value: [],
        address: [],
        addressDatas: ChinaAddressV4Data,
        addressData: {
          userId: window.localStorage.userId,//"42897",//
          areaCode: "000000",//
          address: "",//上海市上海市浦东新区陆家嘴街道
          phone: "",//1582955467
          addressName: "",//浙江省杭州市余杭区藕花洲大街303号
          longitude: 120.29832,
          latitude: 30.41557,
          type: 0,
          orgId: 1,
          shopId: 1,
          name: ""
        },
      }
    },

    created(){

      this.getLocation()
      this.AreaCode()
    },

    methods: {
      getLocation(){
        var wx = require('weixin-js-sdk');
        var that = this
        wx.getLocation({
          type: 'wgs84', //
          success: function (res) {
//            alert("定位" + JSON.stringify(res))
            that.addressData.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            that.addressData.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            that.AreaCode()
          }
        });
      },
      AreaCode(){
//        alert("AreaCode地址")
        var url = 'baidu?lat=' + this.addressData.latitude + '&lng=' + this.addressData.longitude
        request.get(url, null).then((res) => {
//          alert("AreaCode地址" + JSON.stringify(res))

          this.addressData.areaCode = res
        })

      },

      //确认添加地址
      handleAddAddress(){
        var role = {}
        for (var i in this.addressDatas) {
          var obj = this.addressDatas[i].value;
          role[obj] = this.addressDatas[i].name;
        }
        this.addressData.codeAddress = role[this.value[0]] + role[this.value[1]] + role[this.value[2]]
        this.addressData.addressName = this.addressData.codeAddress
        if (this.addressData.name.length < 2) {
          alert("收件人不能为空!")
          return
        }
        if (this.addressData.phone.length < 3) {
          alert("联系电话不能为空!")
          return
        }
        if (this.addressData.codeAddress.length < 5) {
          alert("请选择地址!")
          return
        }
        if (this.addressData.address.length < 2) {
          alert("详细不能为空!")
          return
        }
//        alert("this.addressData" + JSON.stringify(this.addressData))
        getAddAddress(this.addressData).then((res) => {
          if (!res.success) {
            alert(JSON.stringify(res.errorMsg));
          } else {
            this.$router.push({
              path: '/addresslist',
            })
          }
        })

      },

      onShadowChange(ids, names){
        console.log(ids, names)
      },

      getName(value){
        return Value2nameFilter(value, ChinaAddressV4Data)
      }

    },
    components: {
      XInput,
      XButton,
      Group,
      XAddress,
      CheckIcon,
      XSwitch,
      XTextarea
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  /*.is-default{*/
  /*margin-left: 10px;*/
  /*margin-top: 10px;*/
  /*}*/
  .add-btn {
    position: fixed;
    bottom: 0px;
    left: 0px;
    font-size: 14px;
    height: 50px;
  }

  .div {
    font-size: 15px;
  }
</style>
