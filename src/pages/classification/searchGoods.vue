<template>
  <div>
    <div class="main-box3" id="mainBox"><!--@scroll="commodityFatherScroll"-->
      <div class="empty-box" v-if="false">
        <image class="empty-image" src="/static/images/images_cart_null.png"></image>
        <div class="empty-word">没有结果，换个关键词试试</div>
      </div>
      <div class="commodity-main">
        <form class="g-search-box" @submit="getGoodsList">
          <button class="icon-search" form-type="submit" plain="true">
            <image src="/static/icons/icon-search.png"></image>
          </button>
          <input name="searchVal" v-model="searchVal" class="search-input" confirm-type="search" type="text"
                 placeholder="搜索商品名称">
        </form>
        <div class="g-sortType-nav">
          <div class="g-sortType-item" :class="{active: sortType === 1}" @click="sortType=1">
            <text class="sort-name">综合</text>
          </div>
          <div class="g-sortType-item" :class="{active: sortType === 2}" @click="sortType=2">
            <text class="sort-name">销量</text>
          </div>
          <div class="g-sortType-item" :class="{active: sortType === 3 || sortType === 4}"
               @click="sortType = sortType === 3?4:3">
            <text class="sort-name">价格</text>
            <div class="icon-order" :class="{'sort-up': sortType === 3,'sort-down': sortType === 4}"></div>
          </div>
          <div class="g-sortType-item" :class="{active: sortType === 5}" @click="sortType=5">
            <text class="sort-name">筛选</text>
          </div>
        </div>
        <div class="commodity-list">
          <scroll-view class="commodity-content" :scroll-y="true" @scrolltolower="infinitiveList">
            <div class="content-item" v-for="(item,index) in commodityList" :key="index">
              <div class="commodity-info">
                <image class="commodity-pic" :src="item.urlImg"></image>
                <div class="commodity-info-box">
                  <div class="commodity-name ellipsis2">{{item.name}}</div>
                  <!--<div class="commodityx-price" @click="chooseUnit(item,index)">
                    <text class="price-word">¥{{item.priceAndKid[item.kid]}}/{{item.kid}}</text>
                    <image class="icon-triangle" src="/static/icons/icon-triangle.png"></image>
                  </div>-->
                  <div class="good-label-box">
                    <div class="good-label">
                      <text class="label-word">特价</text>
                    </div>
                    <div class="good-label c-bg-green">
                      <text class="label-word">当日达</text>
                    </div>
                  </div>
                  <div class="good-price">¥16.00
                    <text class="old-price">¥99.00</text>
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
    <popup v-model="unitShow">
      <template slot="content">
        <div class="unit-box">
          <div class="title-top">选择下单单位</div>
          <div class="content">显示价格为当前单位对应价格</div>
          <div class="unit-button" v-if="commodityList.length">
            <div class="un-button" v-for="(item,index) in commodityList[unitIndex].kids" :key="index"
                 :class="{active:item === commodityList[unitIndex].kid}" @click="unitCheck(item)">{{item}}
              <image src="/static/icons/icon-yes.png"></image>
            </div>
          </div>
        </div>
      </template>
    </popup>
  </div>
</template>

<script>
  import card from '@/components/card';
  import bottomNav from '@/components/bottomNav';
  import buyNumber from '@/components/buyNumber';
  import popup from '@/components/popup';
  import getData from '@/utils/api';

  export default {
    data () {
      return {
        searchVal: '',
        unitShow: false,
        commodityList: [],
        sortType: 1, // 排序类型（1：综合2：销量3：价格从低到高4：价格从高到低5：筛选）
        page: 1,
        pageSize: 10,
        totalCount: 1,
        unitIndex: 0
      };
    },
    components: {
      card,
      bottomNav,
      buyNumber,
      popup
    },
    computed: {
      count () {
        console.log(this.$store);
        return this.$store.state.counter.count;
      }
    },
    onPullDownRefresh () {
      this.getGoodsList();
    },
    methods: {
      buyNumChange (val, index) {
        this.commodityList[index].buyNumber = val;
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));
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
      unitCheck (val) {
        this.commodityList[this.unitIndex].kid = val;
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));
        this.closePopup();
      },
      chooseUnit (item, index) {
        this.unitShow = true;
        this.unitIndex = index;
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
      getGoodsList () {
        this.commodityList = [];
        getData.getGoodsSort({
          page: this.page,
          pageSize: this.pageSize,
          goodsName: this.searchVal,
          sortType: this.sortType
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
      if (this.$route.query.searchVal) {
        this.searchVal = this.$route.query.searchVal;
      }
      this.getGoodsList();
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
    margin-top: rpx(10);
  }

  .g-sortType-nav {
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(232, 232, 232, 0.5);
    .g-sortType-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      height: rpx(90);
      color: #353535;
      .sort-name {
        @include sc(rpx(32), inherit);
      }
      .icon-order {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: rpx(6);
        @include wh(rpx(36), rpx(36));
        &::before, &::after {
          content: "";
          display: block;
          @include wh(rpx(36), rpx(18));
          background-image: url("../../../static/icons/search_icon_price_normal.png");
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
        &::after {
          transform-origin: center;
          transform: rotate(180deg);
        }
        &.sort-up { // 从低到高
          &::after {
            display: none;
          }
        }
        &.sort-down { // 从高到低
          &::before {
            display: none;
          }
          &::after {
            margin-top: rpx(8);
          }
        }
      }
    }
    .active {
      color: #4A90E2;
    }
  }

  .commodity-main {
    @include wh(100%, 100%);
    overflow: hidden;
    .commodity-list {
      display: flex;
      height: calc(100% - #{rpx(190)});
      .commodity-content {
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        .content-item {
          height: rpx(280);
          padding: 0 rpx(30);
          .commodity-info {
            width: 100%;
            height: 100%;
            @include fj(flex-start);
            align-items: center;
            .commodity-pic {
              @include wh(rpx(200), rpx(200));
              margin-right: rpx(30);
            }
            .commodity-info-box {
              width: calc(100% - #{rpx(230)});
            }
            .commodity-name {
              @include sc(rpx(32), #353535);
              font-weight: 700;
              line-height: rpx(48);
              height: rpx(96);
            }
            .good-label-box {
              margin: rpx(14) 0;
            }
            /* .commodity-price {
              display: flex;
              align-items: center;
              margin-top: rpx(34);
              .price-word {
                @include sc(rpx(28), #E62D2D);
                line-height: rpx(28);
                margin-right: rpx(10);
              }
              .icon-triangle {
                @include wh(rpx(32), rpx(32));
              }
            } */
            .good-price {
              @include fj();
              align-items: flex-end;
              @include sc(rpx(40), #E62D2D);
              line-height: rpx(40);
              .old-price {
                @include sc(rpx(24), #888);
                line-height: rpx(24);
                text-decoration: line-through;
                margin: 0 auto 0 rpx(12);
              }
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

  .unit-box {
    @include center;
    @include wh(rpx(518), rpx(340));
    border-radius: rpx(20);
    background: #fff;
    padding: 0 rpx(57);
    .title-top {
      @include sc(rpx(36), #1F1F1F);
      line-height: rpx(36);
      margin-top: rpx(60);
      text-align: center;
    }
    .content {
      @include sc(rpx(28), #ccc);
      line-height: rpx(28);
      margin-top: rpx(30);
      text-align: center;
    }
    .unit-button {
      @include fj();
      align-items: center;
      margin-top: rpx(50);
      .un-button {
        position: relative;
        @include wh(rpx(182), rpx(70));
        @include sc(rpx(36), #1F1F1F);
        line-height: rpx(70);
        text-align: center;
        border-radius: rpx(4);
        background: #E6E6E6;
        image {
          position: absolute;
          right: 2px;
          bottom: 2px;
          @include wh(0, 0);
          z-index: 1;
          filter: grayscale(100%) brightness(500%);
        }
      }
      .active {
        background: #FFB6B6;
        color: #fff;
        overflow: hidden;
        &::after {
          content: '';
          position: absolute;
          left: auto;
          top: auto;
          right: rpx(-22);
          bottom: rpx(-22);
          @include wh(rpx(45), rpx(45));
          transform-origin: center;
          transform: rotate(-45deg);
          background: #E62D2D;
          border-radius: 0;
        }
        image {
          @include wh(rpx(17), rpx(17));
        }
      }
    }
  }
</style>
