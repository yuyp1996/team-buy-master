<template>
  <footer class="footer">
    <navigator url="/pages/index" open-type="switchTab" class="footer-item">
      <image v-if="tabIndex === 1" src="/static/tabs/home_icon_store_selected.png"></image>
      <image v-else src="/static/tabs/home_icon_store_normal.png"></image>
      <text class="item-name" :class="{active:tabIndex === 1}">店铺</text>
    </navigator>
    <navigator url="/pages/classification/index" open-type="switchTab" class="footer-item">
      <image v-if="tabIndex === 2" src="/static/tabs/home_icon_category_selected.png"></image>
      <image v-else src="/static/tabs/home_icon_category_normal.png"></image>
      <text class="item-name" :class="{active:tabIndex === 2}">分类</text>
    </navigator>
    <div @click="goCart" class="footer-item">
      <image v-if="tabIndex === 3" src="/static/tabs/home_icon_cart_selected.png"></image>
      <image v-else src="/static/tabs/home_icon_cart_normal.png"></image>
      <text class="item-name" :class="{active:tabIndex === 3}">购物车</text>
    </div>
    <navigator url="/pages/mine" open-type="switchTab" class="footer-item">
      <image v-if="tabIndex === 4" src="/static/tabs/home_icon_mine_selected.png"></image>
      <image v-else src="/static/tabs/home_icon_mine_normal.png"></image>
      <text class="item-name" :class="{active:tabIndex === 4}">我的</text>
    </navigator>
    <wxinfo :value="slideShow" @input="slideHidden"></wxinfo>
    <popup v-model="wxLoginShow">
      <template slot="content">
        <div class="privilege-failed">
          <div class="privilege-title">授权失败</div>
          <div class="privilege-content">你已拒绝获取微信绑定手机号登录授权，可使用其他手机号验证登录</div>
          <div class="privilege-button-box">
            <button plain="true" class="privilege-button" @click="closePopup">知道了</button>
            <button plain="true" class="privilege-button" @click="goTo('/pages/login/loginMain')">验证登录</button>
          </div>
        </div>
      </template>
    </popup>
  </footer>
</template>

<script>
  import wxinfo from '@/components/wxinfo';
  import popup from '@/components/popup';

  export default {
    props: ['text'],
    data () {
      return {
        tabIndex: 1,
        slideShow: false,
        wxLoginShow: false
      };
    },
    methods: {
      closePopup () {
        this.slideShow = false;
        this.wxLoginShow = false;
      },
      goCart () { // 跳转购物车
        mpvue.switchTab({url: '/pages/shoppingCart/index'});
        // if (mpvue.getStorageSync("authorization")) {
        //   mpvue.switchTab({ url: "/pages/shoppingCart" });
        // } else {
        //   this.slideShow = true;
        // }
      },
      goTo (url) {
        this.closePopup();
        this.$router.push(url);
      },
      slideHidden (e) { // 微信个人信息获取显隐
        this.wxLoginShow = true;
        this.slideShow = e;
      }
    },
    components: {
      wxinfo,
      popup
    },
    mounted () {
      console.log(this.$root.$mp.page.route);
      if (this.$root.$mp.page.route === 'pages/index') {
        this.tabIndex = 1;
      } else if (this.$root.$mp.page.route === 'pages/classification/index') {
        this.tabIndex = 2;
      } else if (this.$root.$mp.page.route === 'pages/shoppingCart/index') {
        this.tabIndex = 3;
      } else {
        this.tabIndex = 4;
      }
    }
  };
</script>

<style scoped lang="scss">
  .footer {
    display: flex;
    height: rpx(98);
    .footer-item {
      flex: 1;
      image {
        display: block;
        @include wh(rpx(48), rpx(48));
        margin: rpx(9) auto rpx(6);
      }
      .item-name {
        display: block;
        @include sc(rpx(20), #888);
        text-align: center;
        line-height: rpx(24);
        &.active {
          color: #EA2F2F;
        }
      }
    }
  }
</style>
