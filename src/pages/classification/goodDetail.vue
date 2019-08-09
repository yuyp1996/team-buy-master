<template>
  <div>
    <div class="main-box6">
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
      <div class="g-good-info">
        <div class="g-good-name">
          <div class="good-name ellipsis2">旺旺仙贝原味加量不加价礼包装共25 8g，加送20g</div>
          <button plain="true" class="good-share">
            <image></image>
            <div class="share-word">分享</div>
          </button>
        </div>
        <div class="g-good-price">
          <text class="now-price">￥{{goodDetail.unitPrice}}</text>
          <text class="old-price">￥{{goodDetail.oldPrice}}</text>
          <div class="good-label-box">
            <div class="good-label">
              <text class="label-word">特价</text>
            </div>
            <div class="good-label c-bg-green">
              <text class="label-word">当日达</text>
            </div>
          </div>
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
      <button class="g-buy-button c-yellow-bg" plain="true">立即购买</button>
      <button class="g-buy-button c-red-bg" plain="true" @click="isAddCart=true">加入购物车</button>
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
      bottom: rpx(80);
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

  .g-good-info {
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
    .g-good-price {
      @include fj();
      align-items: flex-end;
      height: rpx(110);
      padding: rpx(30);
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

  .g-good-bottom {
    height: rpx(108);
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
      @include wh(rpx(200), rpx(78));
      @include sc(rpx(32), #fff);
      text-align: center;
      line-height: rpx(78);
      border-radius: rpx(39);
      background: linear-gradient(to right, #FF7752, #FFA568);
      margin-right: rpx(30);
      &.c-red-bg {
        background: linear-gradient(to right, #FF7C73, #F74F4F);
      }
      &.c-yellow-bg {
        background: linear-gradient(90deg, rgba(255, 207, 61, 1) 0%, rgba(255, 176, 79, 1) 100%);
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
</style>
