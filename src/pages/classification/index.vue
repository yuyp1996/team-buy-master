<template>
  <div>
    <div class="main-box" id="mainBox">
      <div class="commodity-main">
        <form class="g-search-box" @submit="findGoods">
          <button class="icon-search" form-type="submit" plain="true">
            <image src="/static/icons/icon-search.png"></image>
          </button>
          <input name="searchVal" confirm-type="search" class="search-input" type="text" placeholder="搜索商品名称">
        </form>
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
    <bottomNav @showLogin="slideShow=true"></bottomNav>
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
        searchVal: '', // 用户查找的字段
        unitShow: false,
        commodityTypeList: [],
        commodityTypeIndex: 0,
        commodityList: [],
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
    methods: {
      buyNumChange (val, index) { // 商品购买数量增减
        this.commodityList[index].buyNumber = val;
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));
      },
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
      scanCode () { // 微信扫码
        mpvue.scanCode({
          success (res) {
            console.log(res);
          }
        });
      },
      unitCheck (val) { // 单位变换
        this.commodityList[this.unitIndex].kid = val;
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));
        this.closePopup();
      },
      chooseUnit (item, index) { // 单位变换弹框显示
        this.unitShow = true;
        this.unitIndex = index;
      },
      infinitiveList () { // 上拉加载
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
      getGoodsList (id) { // 获取商品列表
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

  .commodity-main {
    @include wh(100%, 100%);
    overflow: hidden;
    .commodity-list {
      display: flex;
      margin-top: rpx(20);
      height: calc(100% - #{rpx(110)});
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
