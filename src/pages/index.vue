<template>
  <div>
    <div class="main-box">
      <div class="g-now-position">
        <image class="icon-address" src="/static/icons/icon-address.png"></image>
        <text class="position-name">{{userPosition}}</text>
        <image class="right-triangle" src="/static/icons/icon-right.png"></image>
      </div>
      <form class="g-search-box" @submit="findGoods">
        <button class="icon-search" form-type="submit" plain="true">
          <image src="/static/icons/icon-search.png"></image>
        </button>
        <input name="searchVal" class="search-input" type="text" placeholder="搜索商品名称">
      </form>
      <div class="g-index-banner">
        <image src="/static/images/mall_banner_top.png"></image>
      </div>
      <div class="g-index-classification">
        <div v-for="(item,index) in classificationList" :key="index" class="classification-item">
          <image class="classification-icon" :src="'/static/icons/' + item.iconName"></image>
          <div class="classification-name">{{item.name}}</div>
        </div>
      </div>
      <div class="g-group-buying">
        <div class="group-buying-title">
          <div class="title-box">
            <div class="big-title">社区团购</div>
            <div class="small-title">拼着买才划算</div>
          </div>
          <div class="white-arrow"></div>
        </div>
        <div class="g-goods-line-list">
          <div v-for="(item,index) in 5" :key="index" class="normal-good-item"
               @click="goTo('/pages/classification/goodDetail')">
            <image class="good-image" src="/static/images/logo.png"></image>
            <div class="good-name ellipsis2">红富士苹果4个装250g礼盒</div>
            <div class="good-price">¥16.00</div>
          </div>
        </div>
      </div>
      <div class="g-bg-grey">
        <div class="g-good-classification">
          <div class="classification-title">
            <div class="main-title">鲜果到家
              <div class="white-arrow"></div>
            </div>
            <div class="subheading">FRUITS</div>
            <div class="white-triangle"></div>
          </div>
          <div class="g-goods-line-list">
            <div v-for="(item,index) in 5" :key="index" class="add-good-item">
              <image class="good-image" src="/static/images/logo.png"></image>
              <div class="good-name ellipsis">红富士苹果4个装250g礼盒</div>
              <div class="good-price">¥16.00
                <div class="red-add-button"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="g-good-classification yellow-bg">
          <div class="classification-title yellow-bg">
            <div class="main-title">休闲食光
              <div class="white-arrow"></div>
            </div>
            <div class="subheading">SNACK</div>
            <div class="white-triangle"></div>
          </div>
          <div class="g-goods-line-list">
            <div v-for="(item,index) in 5" :key="index" class="add-good-item">
              <image class="good-image" src="/static/images/logo.png"></image>
              <div class="good-name ellipsis">红富士苹果4个装250g礼盒</div>
              <div class="good-price">¥16.00
                <div class="red-add-button"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="g-recommend-goods">
          <div class="g-recommend-title" @click="goTo('/pages/classification/antShop')">
            <div class="recommend-title-box">
              <image class="icon-title" src="/static/icons/bg_title_decration.png"></image>
              蚂蚁小店
            </div>
            <image class="right-triangle" src="/static/icons/icon-right.png"></image>
          </div>
          <div class="g-goods-line-list">
            <div v-for="(item,index) in 5" :key="index" class="add-good-item">
              <image class="good-image" src="/static/images/logo.png"></image>
              <div class="good-name ellipsis2">红富士苹果4个装250g礼盒</div>
              <div class="good-price">¥16.00</div>
            </div>
          </div>
        </div>
        <div class="g-recommend-goods" style="margin-bottom: 30rpx">
          <div class="g-recommend-title">
            <div class="recommend-title-box">
              <image class="icon-title" src="/static/icons/bg_title_decration.png"></image>
              优质精选
            </div>
            <image class="right-triangle" src="/static/icons/icon-right.png"></image>
          </div>
          <div class="g-two-column-list">
            <div v-for="(item,index) in 5" :key="index" class="two-column-item">
              <image class="good-image" src="/static/images/logo.png"></image>
              <div class="good-name ellipsis">红富士苹果4个装250g礼盒</div>
              <div class="good-label-box">
                <div class="good-label">
                  <text class="label-word">特价</text>
                </div>
                <div class="good-label c-bg-green">
                  <text class="label-word">当日达</text>
                </div>
              </div>
              <div class="good-price">¥16.00
                <div class="red-add-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bottomNav @showLogin="slideShow=true"></bottomNav>
  </div>
</template>

<script>
  // import card from "@/components/card";
  import bottomNav from '@/components/bottomNav';
  // import buyNumber from "@/components/buyNumber";
  // import popup from "@/components/popup";
  import getData from '@/utils/api';

  export default {
    data () {
      return {
        userPosition: '',
        classificationList: [
          {
            id: 1,
            name: '食品零食',
            iconName: 'home_images_snack.png'
          }, {
            id: 2,
            name: '粮油调味',
            iconName: 'home_images_food.png'
          }, {
            id: 3,
            name: '生鲜水果',
            iconName: 'home_images_fruit.png'
          }, {
            id: 4,
            name: '酒水饮料',
            iconName: 'home_images_drink.png'
          }, {
            id: 5,
            name: '美容洗护',
            iconName: 'home_images_beauty.png'
          }, {
            id: 6,
            name: '家居生活',
            iconName: 'home_images_life.png'
          }, {
            id: 7,
            name: '服装服饰',
            iconName: 'home_images_clothing.png'
          }, {
            id: 8,
            name: '原装进口',
            iconName: 'home_icon_import.png'
          }, {
            id: 9,
            name: '地方特产',
            iconName: 'home_icon_specialty.png'
          }, {
            id: 10,
            name: '全部分类',
            iconName: 'home_icon_all.png'
          }]
      };
    },
    components: {
      // card,
      bottomNav
      // buyNumber,
      // popup
    },
    computed: {},
    methods: {
      findGoods (e) {
        if (e.mp.detail.value.searchVal) {
          console.log(e.mp.detail.value.searchVal);
          this.$router.push({
            path: '/pages/classification/searchGoods',
            query: {searchVal: e.mp.detail.value.searchVal}
          });
        } else {
          this.$router.push('/pages/classification/searchGoods');
        }
      },
      goTo (url) {
        this.$router.push(url);
      }
    },
    created () {
      mpvue.login({
        success: function (res) {
          if (res.code) { // 发起网络请求
            console.log(res.code);
          } else {
            console.log('获取用户登录态失败！' + res.errMsg);
          }
        }
      });
    },
    onShow () {
      // let app = getApp()
      const _this = this;
      getData.getTopCat({}).then(res => {
        this.commodityTypeList = res.data;
        // this.getGoodsList(this.commodityTypeList[0].id);
      });
      getData.getShopDetail().then(res => {
        // this.shopDetail = res.data;
      });
      mpvue.getLocation({
        type: 'wgs84',
        success (res) {
          console.log(res);
          const locationString = res.latitude + ',' + res.longitude;
          wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
              'key': 'RBIBZ-U7ZWX-ABF4O-ZZOGA-EGWX2-B5BBX',
              'location': locationString
            },
            method: 'GET',
            success: function (r) {
              // 输出一下位置信息
              console.log('用户位置信息', r.data.result.address);
              _this.userPosition = r.data.result.address;
              // 这步是将位置信息保存到本地缓存中，key = value的形式
            }
          });
        }
      });
      /* wx.getUserInfo({
        success(res) {
          const userInfo = res.userInfo
          console.log(userInfo)
        }
      }); */
    }
  };
</script>

<style scoped lang="scss">
  .g-now-position {
    @include fj(flex-start);
    align-items: center;
    margin: rpx(14) rpx(30) 0;
    .icon-address {
      @include wh(rpx(48), rpx(48));
      margin-right: rpx(12);
    }
    .position-name {
      @include sc(rpx(32), #353535);
    }
  }

  .g-index-banner {
    margin: rpx(30) rpx(30) 0;
    border-radius: rpx(18);
    overflow: hidden;
    height: rpx(260);
    image {
      @include wh(100%, 100%);
    }
  }

  .g-index-classification {
    margin: rpx(50) 0 rpx(10) rpx(48);
    @include fj();
    flex-wrap: wrap;
    .classification-item {
      margin-bottom: rpx(40);
      margin-right: rpx(40);
      .classification-icon {
        display: block;
        @include wh(rpx(100), rpx(100));
      }
      .classification-name {
        margin-top: rpx(13);
        line-height: rpx(23);
        @include sc(rpx(22), #666);
        text-align: center;
      }
    }
  }

  .g-group-buying {
    position: relative;
    background: #fff;
    margin: 0 rpx(30);
    z-index: 1;
    .group-buying-title {
      @include fj();
      align-items: center;
      background: linear-gradient(to right, #FF7C73, #F74F4F);
      height: rpx(80);
      .title-box {
        @include fj();
        align-items: flex-end;
        margin-left: rpx(20);
        .big-title {
          @include sc(rpx(36), #fff);
          font-weight: 700;
        }
        .small-title {
          @include sc(rpx(28), #fff);
          margin-left: rpx(15);
        }
      }
      .white-arrow {
        margin-right: rpx(19);
      }
    }
  }

  .g-goods-line-list {
    display: flex;
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    .normal-good-item {
      @include wh(rpx(200), rpx(300));
      .good-image {
        display: block;
        @include wh(rpx(140), rpx(135));
        margin: rpx(19) auto rpx(12);
      }
      .good-name {
        margin: 0 rpx(20);
        line-height: rpx(33);
        @include sc(rpx(22), #353535);
      }
      .good-price {
        min-width: rpx(160);
        margin: rpx(8) rpx(20) 0;
        @include sc(rpx(32), #E62D2D);
        line-height: rpx(32);
      }
    }
    .add-good-item {
      @include wh(rpx(200), rpx(300));
      .good-image {
        display: block;
        @include wh(rpx(140), rpx(140));
        margin: rpx(24) auto rpx(14);
      }
      .good-name {
        margin: 0 rpx(20);
        line-height: rpx(36);
        @include sc(rpx(24), #353535);
      }
      .good-price {
        min-width: rpx(160);
        @include fj();
        align-items: center;
        margin: rpx(20) rpx(20) 0;
        @include sc(rpx(32), #E62D2D);
        line-height: rpx(32);
      }
    }
  }

  .g-bg-grey {
    margin-top: rpx(-51);
    background: #F7F7F7;
    overflow: hidden;
  }

  .g-good-classification {
    margin: rpx(92) rpx(30) 0;
    background: #fff;
    border-radius: rpx(20);
    overflow: hidden;
    .classification-title {
      position: relative;
      background: linear-gradient(to right, #55DB89, #4EDC9F);
      height: rpx(160);
      overflow: hidden;
      .main-title {
        display: flex;
        align-items: center;
        margin: rpx(20) rpx(20) 0;
        line-height: rpx(70);
        @include sc(rpx(50), #fff);
        .white-arrow {
          margin-left: rpx(19);
        }
      }
      .subheading {
        margin-left: rpx(20);
        @include sc(rpx(80), #fff);
        opacity: .2;
        line-height: rpx(80);
      }
      .white-triangle {
        position: absolute;
        @include wh(0, 0);
        border-style: solid;
        border-width: rpx(20) rpx(18);
        border-color: transparent transparent #fff transparent;
        bottom: 0;
        left: rpx(52);
      }
    }
    .g-goods-line-list {
      margin-top: rpx(10);
    }
    &.yellow-bg {
      margin-top: rpx(20);
      .classification-title {
        background: linear-gradient(to right, #F9A32F, #FAD852);
      }
    }
  }

  .g-recommend-goods {
    overflow: hidden;
    background: #fff;
    border-radius: rpx(20);
    margin: rpx(30) rpx(30) 0;
    .g-recommend-title {
      @include fj();
      height: rpx(80);
      align-items: center;
      border-bottom: 2px solid #F7F7F7;
      .recommend-title-box {
        display: flex;
        align-items: center;
        margin-left: rpx(31);
        @include sc(rpx(31), #1F1F1F);
        font-weight: 700;
        .icon-title {
          @include wh(rpx(48), rpx(48));
          margin-right: rpx(14);
        }
      }
    }
    .g-goods-line-list .add-good-item {
      .good-image {
        margin-top: rpx(20);
      }
      .good-price {
        margin-top: rpx(10);
      }
    }
  }

  .g-two-column-list {
    background: #F7F7F7;
    @include fj();
    flex-wrap: wrap;
    .two-column-item {
      width: calc((100% - #{rpx(2)}) / 2);
      margin-bottom: 2px;
      background: #fff;
      padding-bottom: rpx(32);
      .good-image {
        display: block;
        @include wh(rpx(260), rpx(260));
        margin: rpx(30) auto rpx(16);
      }
      .good-name {
        margin: 0 rpx(20);
        line-height: rpx(28);
        @include sc(rpx(28), #353535);
      }
      .good-price {
        @include fj();
        align-items: center;
        margin: rpx(20) rpx(30) 0;
        @include sc(rpx(36), #EA2F2F);
        line-height: rpx(36);
      }
    }
  }
</style>
