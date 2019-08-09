<template>
  <div>
    <div class="main-box5">
      <div class="g-good-banner-box">
        <swiper
          class="g-good-banner"
          indicator-dots="true"
          autoplay="false"
          @change="swiperChange"
        >
          <block v-for="(item,index) in imgUrls" :key="index">
            <swiper-item>
              <image :src="item"></image>
            </swiper-item>
          </block>
        </swiper>
        <div class="swiper-index">{{swiperIndex+1}}/{{imgUrls.length}}</div>
      </div>
      <div class="group-price-box">
        <div class="g-group-price">
          <div class="now-price">
            <text class="unit">¥</text>
            69.00
          </div>
          <div class="old-price">¥ 99.9</div>
        </div>
        <div class="g-group-number">n人团·仅剩199份</div>
      </div>
      <div class="g-good-info">
        <div class="g-good-name">
          <div class="good-name ellipsis2">旺旺仙贝原味加量不加价礼包装共25 8g，加送20g</div>
          <button plain="true" open-type="share" class="good-share" @click="shareDetail">
            <image></image>
            <div class="share-word">分享</div>
          </button>
        </div>
        <div class="good-label-box">
          <div class="good-label c-bg-yellow">
            <text class="label-word">n人团</text>
          </div>
          <div class="good-label c-bg-green">
            <text class="label-word">当日达</text>
          </div>
        </div>
      </div>
      <div class="g-groups-info g-detail-box">
        <div class="info-title">
          <text class="people-number">a人已开团，可直接参与</text>
          <image class="right-triangle" src="/static/icons/icon-right.png"></image>
        </div>
        <div class="g-group-item" v-for="(item,index) in 2" :key="index">
          <image class="captain-image" src="/static/images/user.png"></image>
          <div class="group-people-info">
            <text class="captain-name">王西小的团</text>
            <text class="people-start">还差
              <text class="red-number">3</text>
              人即可成团
            </text>
          </div>
          <button plain="true" class="join-in-group" @click="goTo('/pages/buyingGroup/joinGroup')">去参团</button>
        </div>
      </div>
      <div class="g-join-way g-detail-box">
        <div class="info-title">
          <text class="people-number">拼团玩法</text>
          <image class="right-triangle" src="/static/icons/icon-right.png"></image>
        </div>
        <div class="g-way-show">
          <div class="g-show-circle">一键参<br/>团/开团</div>
          <div class="g-show-arrow"></div>
          <div class="g-show-circle">付款成功邀请好友</div>
          <div class="g-show-arrow"></div>
          <div class="g-show-circle">成功收货失败退款</div>
        </div>
      </div>
    </div>
    <div class="g-good-bottom">
      <button class="go-other-page" plain="true">
        <image src="/static/tabs/home_icon_store_normal.png"></image>
        <text class="page-name">首页</text>
      </button>
      <button class="go-other-page" plain="true">
        <image src="/static/tabs/home_icon_cart_normal.png"></image>
        <text class="page-name">购物车</text>
      </button>
      <button class="g-buy-button" plain="true">
        <text class="g-price">¥99.00</text>
        <text class="g-button-name">单独购买</text>
      </button>
      <button class="g-buy-button c-red-bg" plain="true" @click="isAddCart=true">
        <text class="g-price">¥69.00</text>
        <text class="g-button-name">我要开团</text>
      </button>
    </div>
    <slide-popup v-model="isAddCart">
      <template slot="content">
        <div class="g-addCart-popup">
          <div class="good-info">
            <image class="good-image" src="https://goss2.veer.com/creative/vcg/veer/612/veer-133071017.jpg"></image>
            <div class="g-good-price">
              <text class="now-price">￥{{goodDetail.unitPrice}}</text>
              <text class="old-price">￥{{goodDetail.oldPrice}}</text>
            </div>
          </div>
          <div class="buying-number">
            <text class="number-label">数量</text>
            <buyNumber v-model="buyNumber"></buyNumber>
          </div>
          <button class="g-buy-button" plain="true">加入购物车</button>
        </div>
      </template>
    </slide-popup>
  </div>
</template>

<script>
  // Use Vuex
  import getData from '@/utils/api';
  import slidePopup from '@/components/slidePopup';
  import buyNumber from '@/components/buyNumber';

  export default {
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(this.goodDetail.goodName);
      }
      return {
        title: this.goodDetail.goodName,
        path: '/pages/buyingGroup/groupDetail'
      };
    },
    data () {
      return {
        imgUrls: [
          'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
          'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ],
        isAddCart: false,
        goodDetail: {},
        buyNumber: 0,
        swiperIndex: 0
      };
    },
    components: {
      slidePopup,
      buyNumber
    },
    computed: {
      count () {
        return 1;
      }
    },
    onShow () {
      getData.getGoodDetail({id: 1}).then(res => {
        console.log(res);
        this.goodDetail = res.data;
        mpvue.setNavigationBarTitle({
          title: res.data.goodName
        });
      });
    },
    methods: {
      swiperChange (e) {
        this.swiperIndex = e.mp.detail.current;
      },
      goTo (url) {
        this.$store.state.groupGood.goodDetail = this.goodDetail;
        this.$router.push(url);
      },
      shareDetail () {
      }
      // increment () {
      //   store.commit('increment')
      // },
      // decrement () {
      //   store.commit('decrement')
      // }
    }
  };
</script>

<style scoped lang="scss">
  .g-good-banner-box {
    position: relative;
    .g-good-banner {
      box-sizing: content-box;
      padding: rpx(40) 0;
      height: rpx(520);
      image {
        display: block;
        margin: 0 auto;
        @include wh(rpx(520), rpx(520));
      }
    }
    .swiper-index {
      position: absolute;
      right: rpx(30);
      bottom: 0;
      width: rpx(76);
      text-align: center;
      line-height: rpx(40);
      border-radius: rpx(21);
      background: rgba(0, 0, 0, .4);
      @include sc(rpx(22), #fff);
    }
  }

  .good-label-box {
    margin: 0;
  }

  .group-price-box {
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    .g-group-price {
      position: relative;
      display: flex;
      @include wh(rpx(380), rpx(100));
      /*&::before {
        content: '';
        position: absolute;
        @include wh(100%,104rpx);
        left: rpx(-30);
        transform: skew(16.7deg);
        background: linear-gradient(135deg,rgba(255,104,87,1) 0%,rgba(237,86,86,1) 100%);
        z-index: 0;
      }*/
      background: linear-gradient(135deg, rgba(255, 104, 87, 1) 0%, rgba(237, 86, 86, 1) 100%);
      border-radius: 0 70px 70px 0;
      .now-price {
        position: relative;
        z-index: 1;
        margin-top: rpx(25);
        margin-left: rpx(30);
        @include sc(rpx(50), #fff);
        line-height: rpx(50);
        .unit {
          display: inline-block;
          margin-top: rpx(11);
          @include sc(rpx(36), #fff);
          margin-right: rpx(8);
        }
      }
      .old-price {
        position: relative;
        z-index: 1;
        @include sc(rpx(28), #fff);
        line-height: rpx(28);
        text-decoration: line-through;
        margin: rpx(43) auto 0 rpx(23);
        font-weight: lighter;
      }
    }
    .g-group-number {
      width: rpx(420);
      margin-left: rpx(-50);
      line-height: rpx(80);
      padding-right: rpx(30);
      text-align: right;
      @include sc(rpx(28), #fff);
      background: linear-gradient(127deg, rgba(255, 192, 82, 1) 0%, rgba(255, 107, 102, 1) 100%);
    }
  }

  .g-good-info {
    padding-bottom: rpx(30);
    .g-good-name {
      @include fj();
      align-items: center;
      padding: rpx(30);
      .good-name {
        width: calc(100% - #{rpx(106)});
        @include sc(rpx(36), #1f1f1f);
        font-weight: 700;
        height: rpx(108);
        line-height: rpx(54);
      }
      .good-share {
        image {
          display: block;
          @include wh(rpx(48), rpx(48));
          background: #D8D8D8;
        }
        .share-word {
          line-height: rpx(52);
          @include sc(rpx(24), #353535);
          text-align: center;
        }
      }
    }
    .good-label-box {
      margin: 0 rpx(30);
    }
  }

  .g-good-bottom {
    height: rpx(100);
    @include fj();
    align-items: center;
    .go-other-page {
      margin: 0 auto 0 rpx(55);
      &:first-child {
        margin: 0 0 0 rpx(50);
      }
      image {
        display: block;
        margin: 0 auto;
        @include wh(rpx(48), rpx(48));
      }
      .page-name {
        display: block;
        margin-top: rpx(8);
        text-align: center;
        @include sc(rpx(20), #888);
        line-height: rpx(24);
      }
    }
    .g-buy-button {
      @include wh(rpx(220), auto);
      border-radius: rpx(50);
      background: linear-gradient(to right, #FFCF3D, #FFB04F);
      margin-right: rpx(30);
      overflow: hidden;
      .g-price {
        display: block;
        margin-top: rpx(10);
        @include sc(rpx(36), #fff);
        text-align: center;
        line-height: rpx(36);
      }
      .g-button-name {
        display: block;
        margin: rpx(6) 0;
        @include sc(rpx(24), #fff);
        text-align: center;
        line-height: rpx(24);
      }
      &.c-red-bg {
        background: linear-gradient(to right, #FF7C73, #F74F4F);
      }
    }
  }

  .g-addCart-popup {
    width: 100%;
    background: #fff;
    padding-bottom: rpx(40);
    .good-info {
      display: flex;
      .good-image {
        @include wh(rpx(200), rpx(200));
        margin-left: rpx(30);
        margin-top: rpx(-80);
      }
      .g-good-price {
        @include fj();
        align-items: flex-end;
        height: rpx(50);
        margin: rpx(40) 0 0 rpx(30);
        .now-price {
          @include sc(rpx(50), #EA2F2F);
          line-height: rpx(50);
        }
        .old-price {
          @include sc(rpx(28), #ccc);
          line-height: rpx(28);
          text-decoration: line-through;
          margin: 0 auto 0 rpx(12);
        }
      }
    }
    .buying-number {
      @include fj();
      margin: rpx(40) rpx(30) 0;
      .number-label {
        @include sc(rpx(32), #353535);
      }
    }
    .g-buy-button {
      display: block;
      @include wh(auto, rpx(88));
      @include sc(rpx(36), #fff);
      text-align: center;
      line-height: rpx(88);
      border-radius: rpx(44);
      background: linear-gradient(to right, #FF7C73, #F74F4F);
      margin: rpx(60) rpx(30) 0;
    }
  }

  .g-groups-info {
    .g-group-item {
      display: flex;
      align-items: center;
      padding: 0 rpx(30);
      margin-bottom: rpx(20);
      .captain-image {
        @include wh(rpx(100), rpx(100));
        border-radius: 50%;
        margin-right: rpx(30);
      }
      .group-people-info {
        .captain-name {
          display: block;
          @include sc(rpx(28), #888);
          line-height: rpx(28);
        }
        .people-start {
          display: block;
          margin-top: rpx(20);
          @include sc(rpx(24), #ccc);
          line-height: rpx(24);
          .red-number {
            @include sc(rpx(24), #E62D2D);
            line-height: rpx(24);
          }
        }
      }
      .join-in-group {
        width: rpx(120);
        margin-left: auto;
        line-height: rpx(56);
        text-align: center;
        border: rpx(2) solid #EA2F2F;
        @include sc(rpx(28), #EA2F2F);
        border-radius: rpx(28);
      }
    }
  }

  .g-detail-box {
    border-top: rpx(20) solid #F7F7F7;
    padding-bottom: rpx(10);
    background: #fff;
    .info-title {
      @include fj();
      align-items: center;
      padding: 0 rpx(30);
      height: rpx(88);
      .people-number {
        @include sc(rpx(32), #353535);
        line-height: rpx(32);
      }
    }
  }

  .g-join-way {
    .g-way-show {
      margin-top: rpx(4);
      @include fj(center);
      align-items: center;
      padding-bottom: rpx(40);
      .g-show-circle {
        @include wh(rpx(130), rpx(130));
        border-radius: 50%;
        @include sc(rpx(22), #666);
        text-align: center;
        line-height: rpx(33);
        padding: rpx(32) rpx(12) 0;
        border: 1px solid #979797;
      }
      .g-show-arrow {
        margin: 0 rpx(6);
        position: relative;
        @include wh(rpx(97), rpx(3));
        background: #979797;
        &::before {
          content: '';
          @include ct;
          right: rpx(-10);
          @include wh(0, 0);
          border-width: rpx(4) rpx(10);
          border-style: solid;
          border-color: transparent transparent transparent #979797;
        }
      }
    }
  }

  .right-triangle {
    margin-right: 0;
  }
</style>
