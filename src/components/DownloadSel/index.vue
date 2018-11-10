<template>
  <div class="download-sel">
   <x-dialog v-model="showScrollBoxWeixin" class="dialog-demo">
      <img class="imgs" src="@/assets/images/shares/weixin.png">
    </x-dialog>
    <x-dialog v-model="showScrollBoxQQ" class="dialog-demo">
      <img class="imgs" src="@/assets/images/shares/QQ.png">
    </x-dialog>
  </div>
</template>

<script>
import { XDialog } from 'vux';

export default {
  name: 'DownloadSel',
  components: {
    XDialog,
  },
  data() {
    return {
      showScrollBoxWeixin: false,
      showScrollBoxQQ: false,
    };
  },
  created() {
    this.openApp();
  },
  methods: {
    openApp() {
      const browser = {
        versions: function () {
          const u = navigator.userAgent;
          return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') === -1,
            souyue: u.indexOf('souyue') > -1,
            superapp: u.indexOf('superapp') > -1,
            weixin: u.toLowerCase().indexOf('micromessenger') > -1,
            Safari: u.indexOf('Safari') > -1,
            QQ: u.toLowerCase().indexOf(' qq') > -1 && u.indexOf('mqqbrowser') < 0,
          };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
      };
      const ua = window.navigator.appVersion;
      if (browser.versions.weixin) {
        if (ua.indexOf('MicroMessenger') > -1) {
          this.showScrollBoxWeixin = true;
        } else {
          this.showScrollBoxWeixin = false;
        }
      } else if (browser.versions.QQ) {
        if (ua.indexOf('mqqbrowser') < 0) {
          this.showScrollBoxQQ = true;
        } else {
          this.showScrollBoxQQ = false;
        }
      } else if (browser.versions.ios) {
        const loadDateTime = new Date();
        window.setTimeout(() => {
          const timeOutDateTime = new Date();
          if (timeOutDateTime - loadDateTime < 5000) {
            window.location.href = 'https://itunes.apple.com/cn/app/大风车商城厂家版/id1211932020?mt=8';
          } else {
            window.close();
          }
        },
        25);
        window.location.href = 'DFCAdmin://';
      } else if (browser.versions.android) {
        window.location = 'buyer://com.dfcapp.dfcbugers';
        window.setTimeout(() => {
          window.location.href = 'https://shop.dfcshop.com/mobile/rd.html#seller';
        }, 3000);
        window.location.href = 'dfcseller://dfcseller';
      }
    },
  },
};
</script>
<style lang="scss">
.download-sel{
  .weui-dialog{
    background: none;
    .imgs{
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
