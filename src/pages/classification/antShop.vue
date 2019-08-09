<template>
  <div>
    <div class="main-box6" id="mainBox">
      <div class="commodity-main">
        <div class="g-shop-position">
          <image class="icon-address" src="/static/icons/icon-address.png"></image>
          <text class="position-name">{{shopPosition}}</text>
          <image class="right-triangle" src="/static/icons/icon-right.png"></image>
        </div>
        <form class="g-search-box" @submit="findGoods">
          <button class="icon-search" form-type="submit" plain="true">
            <image src="/static/icons/icon-search.png"></image>
          </button>
          <input name="searchVal" confirm-type="search" class="search-input" type="text" placeholder="搜索商品名称">
        </form>
        <div class="orders-nav">
          <div class="nav-item" :class="{active: navIndex === 0}" @click="navChange(0)">选购商品</div>
          <div class="nav-item" :class="{active: navIndex === 1}" @click="navChange(1)">店家详情</div>
          <div class="nav-item" :class="{active: navIndex === 2}" @click="navChange(2)">用户评价</div>
        </div>
        <div class="commodity-list">
          <scroll-view class="commodity-type" :scroll-y="true">
            <div v-for="(item,index) in commodityTypeList" :key="index" class="type-item"
                 :class="{active:commodityTypeIndex===index}" @click="getGoodsList(item.id)">
              {{item.name}}
            </div>
          </scroll-view>
          <scroll-view class="commodity-content" :scroll-y="true" @scrolltolower="infinitiveList">
            <div class="content-item" v-for="(item,index) in commodityList" :key="index">
              <div class="commodity-info">
                <image class="commodity-pic" :src="item.urlImg"></image>
                <div class="commodity-info-box">
                  <div class="commodity-name ellipsis2">{{item.name}}</div>
                  <!--<div class="commodity-price" @click="chooseUnit(item,index)">
                    <text class="price-word">¥{{item.priceAndKid[item.kid]}}/{{item.kid}}</text>
                    <image class="icon-triangle" src="/static/icons/icon-triangle.png"></image>
                  </div>-->
                  <div class="good-price">¥16.00
                    <button class="red-add-button2"></button>
                  </div>
                </div>
              </div>
              <!--<div class="buy-info">
                <buyNumber :value="item.buyNumber" @input="buyNumChange($event,index)"></buyNumber>
                <button class="add-cart" @click="addCart(item)">加入购物车</button>
              </div>-->
            </div>
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="settlement-box">
      <div class="g-goCart-button">
        <image src="/static/icons/cart-white.png"></image>
        <div class="g-cart-goodsNumber">7</div>
      </div>
      <div class="all-price">¥ {{finalPrice}}</div>
      <button class="go-settlement" @click="goToSettlement">去结算</button>
    </div>
  </div>
</template>

<script>
  import card from '@/components/card';
  import buyNumber from '@/components/buyNumber';
  import popup from '@/components/popup';
  import getData from '@/utils/api';

  export default {
    data () {
      return {
        shopDetail: {},
        searchVal: '',
        unitShow: false,
        shopPosition: '云蚂蚁智慧产业园店', // 商店位置
        allPrice: 99,
        commodityTypeList: [],
        commodityTypeIndex: 0,
        commodityList: [],
        page: 1,
        pageSize: 10,
        totalCount: 1,
        navIndex: 0 // 标签栏选择位置
      };
    },
    components: {
      card,
      buyNumber,
      popup
    },
    computed: {
      finalPrice () {
        return this.allPrice.toFixed(2);
      }
    },
    methods: {
      navChange (index) {
        this.navIndex = index;
      },
      buyNumChange (val, index) {
        this.commodityList[index].buyNumber = val;
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));
      },
      findGoods (e) {
        console.log(e.mp.detail.value);
        this.$router.push('/pages/classification/searchGoods');
      },
      verifyLogin () {
        if (mpvue.getStorageSync('authorization')) {
          return true;
        } else {
          this.slideShow = true;
        }
      },
      addCart (item) {
        this.verifyLogin();
      },
      closePopup () {
        this.slideShow = false;
        this.wxLoginShow = false;
        this.unitShow = false;
      },
      goTo (url) {
        this.closePopup();
        this.$router.push(url);
      },
      scanCode () {
        mpvue.scanCode({
          success (res) {
            console.log(res);
          }
        });
      },
      infinitiveList () {
        if (this.page > Math.ceil(this.totalCount / this.pageSize)) {
          return;
        }
        getData.getGoodsListByCid({
          id: this.commodityTypeIndex,
          page: this.page,
          pageSize: this.pageSize,
          goodsName: this.searchVal
        }).then(res => {
          let list = JSON.parse(JSON.stringify(res.data));
          list.forEach(val => {
            val.buyNumber = 0;
            val.kids = Object.keys(val.priceAndKid);
            val.kid = val.kids[0];
          });
          this.commodityList = this.commodityList.concat(list);
          this.page++;
          this.totalCount = res.count;
        });
      },
      getGoodsList (id) {
        console.log(id);
        if (id !== undefined) {
          this.commodityTypeIndex = id;
        }
        this.commodityList = [];
        getData.getGoodsListByCid({
          id: this.commodityTypeIndex,
          page: this.page,
          pageSize: this.pageSize,
          goodsName: this.searchVal
        }).then(res => {
          let list = res.data;
          list.forEach(val => {
            val.buyNumber = 0;
            val.kids = Object.keys(val.priceAndKid);
            val.kid = val.kids[0];
          });
          this.commodityList = list;
          this.page = 2;
          this.totalCount = res.count;
        });
      },
      del () {
        this.$store.commit('decrement');
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
      getData.getTopCat({}).then(res => {
        this.commodityTypeList = res.data;
        this.getGoodsList(this.commodityTypeList[0].id);
      });
      getData.getShopDetail().then(res => {
        this.shopDetail = res.data;
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
  .g-search-box {
    margin-top: rpx(30);
  }

  .settlement-box {
    position: relative;
    .g-goCart-button {
      position: absolute;
      top: rpx(-22);
      left: rpx(68);
      @include wh(rpx(100), rpx(100));
      border-radius: 50%;
      background: linear-gradient(90deg, rgba(255, 124, 115, 1) 0%, rgba(247, 79, 79, 1) 100%);
      image {
        @include center;
        @include wh(rpx(48), rpx(48));
      }
      .g-cart-goodsNumber {
        position: absolute;
        top: rpx(-4);
        right: rpx(-4);
        width: rpx(34);
        line-height: rpx(34);
        text-align: center;
        @include sc(rpx(24), #fff);
        border-radius: 50%;
        background: linear-gradient(90deg, rgba(255, 216, 95, 1) 0%, rgba(255, 184, 96, 1) 100%);
      }
    }
    .all-price {
      margin-left: rpx(190);
    }
  }

  .g-shop-position {
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

  .commodity-main {
    @include wh(100%, 100%);
    overflow: hidden;
    .commodity-list {
      display: flex;
      margin-top: rpx(20);
      height: calc(100% - #{rpx(278)});
      .commodity-type, .commodity-content {
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
      }
      .commodity-type {
        background: #F7F7F7;
        width: rpx(200);
        .type-item {
          position: relative;
          @include sc(rpx(32), #888);
          width: rpx(200);
          line-height: rpx(100);
          text-align: center;
          &.active {
            color: #353535;
            background: #fff;
            font-weight: 700;
            &::before {
              content: '';
              @include ct;
              left: 0;
              @include wh(rpx(6), rpx(58));
              background: #EA2F2F;
            }
          }
        }
      }
      .commodity-content {
        width: calc(100% - #{rpx(200)});
        .content-item {
          height: rpx(200);
          padding: 0 rpx(30);
          .commodity-info {
            width: 100%;
            height: 100%;
            @include fj(flex-start);
            align-items: center;
            .commodity-pic {
              @include wh(rpx(120), rpx(120));
              margin-right: rpx(30);
            }
            .commodity-info-box {
              width: calc(100% - #{rpx(150)});
            }
            .commodity-name {
              @include sc(rpx(28), #353535);
              font-weight: 700;
              line-height: rpx(42);
              height: rpx(84);
            }
            .good-price {
              @include fj();
              align-items: center;
              @include sc(rpx(36), #EA2F2F);
              line-height: rpx(32);
            }
          }
          .buy-info {
            @include fj();
            align-items: center;
            margin: rpx(30) rpx(10) 0;
            .add-cart {
              width: rpx(180);
              @include sc(rpx(28), #fff);
              line-height: rpx(60);
              text-align: center;
              border-radius: rpx(4);
              background: #E62D2D;
            }
          }
        }
      }
    }
  }

  .orders-nav {
    width: 100%;
    background: #fff;
    padding: 0 rpx(30);
    z-index: 1;
    @include fj();
    .nav-item {
      position: relative;
      @include sc(rpx(32), #888);
      line-height: rpx(86);
      &.active {
        @include sc(rpx(36), #E62D2D);
        &::after {
          content: '';
          @include cl;
          bottom: 0;
          @include wh(rpx(48), rpx(4));
          border-radius: rpx(2);
          background: #E62D2D;
        }
      }
    }
  }
</style>
