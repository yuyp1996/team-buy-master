<template>
  <div class="main-box3">
    <image class="logo" src="/static/images/logo.png"></image>
    <button class="wx-login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信用户一键登录</button>
    <button class="phone-login" @click="goTo('/pages/login/login')">手机号验证码登录/注册</button>
    <text class="company-name">技术支持：浙江云之涞网络科技有限公司</text>
    <text class="company-number">浙ICP备19004626号-1</text>
    <wxlogin v-model="slideShow"></wxlogin>
  </div>
</template>

<script>
  // import { formatTime } from "@/utils/index";
  import card from '@/components/card';
  import wxlogin from '@/components/wxlogin';

  export default {
    components: {
      card,
      wxlogin
    },

    data () {
      return {
        slideShow: false
      };
    },
    methods: {
      goTo (url) {
        this.$router.push(url);
      },
      getPhoneNumber (e) {
        console.log(e.mp.detail.errMsg);
        console.log(e.mp.detail.iv);
        console.log(e.mp.detail.encryptedData);
      }
    },
    created () {
    }
  };
</script>

<style scoped lang="scss">
  .logo {
    display: block;
    @include wh(rpx(260), rpx(260));
    margin: rpx(216) auto 0;
  }

  .wx-login {
    @include cl;
    bottom: rpx(318);
    width: calc(100% - #{rpx(60)});
    @include sc(rpx(36), #fff);
    text-align: center;
    line-height: rpx(88);
    background: #E62D2D;
    border-radius: 8px;
  }

  .phone-login {
    @include cl;
    bottom: rpx(190);
    width: calc(100% - #{rpx(60)});
    @include sc(rpx(36), #E62D2D);
    text-align: center;
    line-height: rpx(84);
    background: #fff;
    border: rpx(2) solid #E62D2D;
    border-radius: 8px;
  }

  .company-name, .company-number {
    @include cl;
    bottom: rpx(58);
    line-height: rpx(28);
    @include sc(rpx(24), #ccc);
    width: max-content;
  }

  .company-number {
    bottom: rpx(20);
  }
</style>
