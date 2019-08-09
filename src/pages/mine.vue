<template>
  <div>
    <div class="main-box">
      <div class="g-user-bg">
        <div class="g-circle"></div>
        <div class="g-circle g-circle-small"></div>
      </div>
      <div class="user-info"> <!--@click="goTo('/pages/login/loginMain')"-->
        <image class="user-portrait" src="/static/images/user.png"></image>
        <div class="user-detail">
          <div class="user-name">王大大</div>
          <div class="user-phone">18287656987</div>
        </div>
        <div class="take-goods-code">
          <image class="code-image" src="/static/icons/icon_erweima.png"></image>
          <text class="code-name">提货码</text>
        </div>
      </div>
      <div class="function-list">
        <div class="function-type" @click="goTo('/pages/order/myOrders')">
          <text class="type-name">我的订单</text>
          <image class="right-triangle" src="/static/icons/icon-right.png"></image>
        </div>
        <div class="item-main">
          <div class="function-main1">
            <image class="function-icon" src="/static/icons/icon_me_pay.png"></image>
            <text class="function-info">待付款</text>
          </div>
          <div class="function-main1">
            <image class="function-icon" src="/static/icons/icon_me_delivery.png"></image>
            <text class="function-info">待发货</text>
          </div>
          <div class="function-main1">
            <image class="function-icon" src="/static/icons/icon_me_pick.png"></image>
            <text class="function-info">待收货</text>
          </div>
          <div class="function-main1">
            <image class="function-icon" src="/static/icons/icon_me_accomplish.png"></image>
            <text class="function-info">已完成</text>
          </div>
        </div>
      </div>
      <div class="function-list">
        <div class="function-type">
          <text class="type-name">我的服务</text>
        </div>
        <div class="item-main">
          <div class="function-main2">
            <image class="function-icon" src="/static/icons/icon_me_coupon.png"></image>
            <text class="function-info">优惠券</text>
          </div>
          <div class="function-main2">
            <image class="function-icon" src="/static/icons/icon_me_group.png"></image>
            <text class="function-info">我的团长</text>
          </div>
          <div class="function-main2" @click="goTo('/pages/address/myAddress')">
            <image class="function-icon" src="/static/icons/icon_me_adress.png"></image>
            <text class="function-info">收货地址</text>
          </div>
          <div class="function-main2">
            <image class="function-icon" src="/static/icons/icon_me_set.png"></image>
            <text class="function-info">系统设置</text>
          </div>
        </div>
      </div>
      <div class="function-list">
        <div class="function-type">
          <text class="type-name">团长特权</text>
        </div>
        <div class="item-main">
          <div class="function-main2" @click="goTo('/pages/buyingGroup/index')">
            <image class="function-icon" src="/static/icons/icon_mine_group.png"></image>
            <text class="function-info">社区团</text>
          </div>
          <div class="function-main2">
            <image class="function-icon" src="/static/icons/icon_me_groupmember.png"></image>
            <text class="function-info">我的团员</text>
          </div>
        </div>
      </div>
      <button class="login-out" plain="true">退出登录</button>
    </div>
    <bottomNav></bottomNav>
  </div>
</template>

<script>
  // import { formatTime } from "@/utils/index";
  import card from '@/components/card';
  import bottomNav from '@/components/bottomNav';

  export default {
    components: {
      card,
      bottomNav
    },

    data () {
      return {};
    },
    methods: {
      goTo (url) {
        this.$router.push(url);
      }
    },
    created () {
    }
  };
</script>

<style scoped lang="scss">
  .main-box {
    background: #F7F7F7;
  }

  .g-user-bg {
    @include cl;
    top: 0;
    @include wh(110%, rpx(356));
    background: linear-gradient(360deg, rgba(255, 124, 115, 1) 0%, rgba(247, 79, 79, 1) 100%);
    border-radius: 0 0 375px 375px/ 0 0 70px 70px;
    overflow: hidden;
    .g-circle {
      position: absolute;
      left: rpx(-61);
      bottom: rpx(-299);
      @include wh(rpx(644), rpx(644));
      border-radius: 50%;
      background: linear-gradient(180deg, rgba(255, 124, 117, 1) 0%, rgba(251, 107, 107, 1) 100%);
      box-shadow: 0 4px 8px 0 rgba(248, 87, 87, 0.2);
      opacity: 0.3;
    }
    .g-circle-small {
      left: rpx(2);
      bottom: rpx(-257);
      @include wh(rpx(536), rpx(536));
    }
  }

  .user-info {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    margin: rpx(20) rpx(30) 0;
    .user-portrait {
      display: block;
      margin: 0 rpx(20) 0 0;
      @include wh(rpx(120), rpx(120));
      border-radius: 50%;
      object-fit: contain;
    }
    .user-detail {
      margin-right: auto;
      .user-name {
        @include sc(rpx(36), #fff);
        line-height: rpx(36);
        font-weight: 700;
      }
      .user-phone {
        @include sc(rpx(24), #fff);
        text-align: center;
        margin: rpx(26) 0 0;
        line-height: rpx(24);
      }
    }
    .take-goods-code {
      margin-left: auto;
      .code-image {
        display: block;
        margin: 0 auto;
        @include wh(rpx(48), rpx(48));
      }
      .code-name {
        @include sc(rpx(24), #fff);
      }
    }
  }

  .function-list {
    position: relative;
    z-index: 1;
    background: #fff;
    margin: rpx(30) rpx(30) 0;
    border-radius: rpx(20);
    overflow: hidden;
    .function-type {
      @include fj();
      align-items: center;
      margin: rpx(30) 0;
      .type-name {
        margin-left: rpx(30);
        @include sc(rpx(32), #353535);
      }
    }
    .item-main {
      @include fj(flex-start);
      flex-wrap: wrap;
      padding-bottom: rpx(20);
      .function-main1 {
        width: 25%;
        margin-bottom: rpx(20);
        .function-icon {
          display: block;
          @include wh(rpx(80), rpx(80));
          margin: 0 auto;
        }
        .function-info {
          display: block;
          width: 100%;
          margin-top: rpx(2);
          @include sc(rpx(24), #353535);
          text-align: center;
          line-height: rpx(24);
        }
      }
      .function-main2 {
        width: 25%;
        margin-bottom: rpx(20);
        .function-icon {
          display: block;
          @include wh(rpx(64), rpx(64));
          margin: 0 auto;
        }
        .function-info {
          display: block;
          width: 100%;
          margin-top: rpx(18);
          @include sc(rpx(24), #353535);
          text-align: center;
          line-height: rpx(24);
        }
      }
    }
  }

  .login-out {
    display: block;
    margin: rpx(40) rpx(30) 0;
    line-height: rpx(90);
    border: 2px solid #ccc;
    border-radius: rpx(10);
    @include sc(rpx(36), #ccc);
    text-align: center;
  }
</style>
