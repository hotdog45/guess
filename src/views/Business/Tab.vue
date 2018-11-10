<template>
	<div class="tab" style="height:100%;">
		<view-box ref="viewBox">
			<router-view></router-view>
		</view-box>
		<tabbar slot="bottom" style="position: fixed;"  >
			<tabbar-item :selected="selected == 'home'" link="/home" >
        <img slot="icon" style="height: 18px;width: 18px" src="../../assets/images/icon4@2x.png">
				<div slot="label" style="margin-top: -16px; font-size: 10px;">首頁</div>
			</tabbar-item>
      <tabbar-item :selected="selected == 'order'" link="/order">
        <img slot="icon" style="height: 18px;width: 18px" src="../../assets/images/icon5@2x.png">
        <img slot="icon-active" style="height: 18px;width: 18px" src="../../assets/images/icon5@2x.png">
        <div slot="label" style="margin-top: -16px;font-size: 10px;">订单</div>
      </tabbar-item>
      <!--<tabbar-item :selected="selected == 'code'" link="/code">-->
        <!--<img slot="icon" style="height: 18px;width: 18px" src="../../assets/images/logo.png">-->
        <!--<img slot="icon-active" style="height: 18px;width: 18px" src="../../assets/images/logo.png">-->
        <!--<div slot="label" style="margin-top: -16px;font-size: 10px;">激活码</div>-->
      <!--</tabbar-item>-->
			<tabbar-item :selected="selected == 'my'" link="/my">
        <img slot="icon" style="height: 18px;width: 18px" src="../../assets/images/icon16@2x.png">
        <img slot="icon-active" style="height: 18px;width: 18px" src="../../assets/images/icon16@2x.png">
        <div slot="label" style="margin-top: -16px;font-size: 10px;">我的</div>
			</tabbar-item>
		</tabbar>


	</div>
</template>

<script>
	import { ViewBox, Tabbar, TabbarItem } from 'vux'
	export default {
		name: 'tab',
		data() {
			return {
				selected: 'home', //选项卡选中状态
        active: 0,
			}
		},
		mounted() {
			let to = this.$route.name;
			//console.log(to)
			if(to == 'home') {
				this.selected = 'home';
			} else if(to == 'order') {
				this.selected = 'order';
			} else if(to == 'my') {
        this.selected = 'my';
      } else if(to == 'code') {
        this.selected = 'code';
      }


		},
    methods: {

      changeTo(){

      }
    },

    watch: {

		},
		components: {
			ViewBox,
			Tabbar,
			TabbarItem
		}
	}
</script>

<style scoped>
	html,
	body {
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}

	.weui-tabbar {
		background-color: #FFFFFF;
    height: 49px;

    color: #c8b585;
	}


</style>
