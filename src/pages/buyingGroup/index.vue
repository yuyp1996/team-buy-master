<template>
  <div class="main-box3" id="mainBox">
    <div class="g-group-banner"></div>
    <div class="g-group-nav">
      <button plain="true" class="group-item-left" :class="{active: navIndex === 1}" @click="navIndex=1">精选团</button>
      <button plain="true" class="group-item-right" :class="{active: navIndex === 2}" @click="navIndex=2">当日达</button>
    </div>
    <div class="commodity-main">
      <div class="commodity-list">
        <scroll-view class="commodity-content" :scroll-y="true" @scrolltolower="infinitiveList">
          <div class="content-item" v-for="(item,index) in commodityList" :key="index">
            <div class="commodity-info">
              <image class="commodity-pic" :src="item.urlImg"></image>
              <div class="commodity-info-box">
                <div class="commodity-name ellipsis2">{{item.name}}</div>
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
                  <button class="open-group-button" @click="goTo('/pages/buyingGroup/groupDetail')">去开团</button>
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
</template>

<script>
  import card from '@/components/card';
  import buyNumber from '@/components/buyNumber';
  import popup from '@/components/popup';
  import getData from '@/utils/api';

  export default {
    data () {
      return {
        searchVal: '',
        unitShow: false,
        commodityList: [],
        navIndex: 1,
        page: 1,
        pageSize: 10,
        totalCount: 1,
        unitIndex: 0
      };
    },
    components: {
      card,
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
  .g-group-banner {
    height: rpx(283);
    background: linear-gradient(180deg, rgba(255, 124, 117, 1) 0%, rgba(251, 107, 107, 1) 100%);
    image {
      @include wh(100%, 100%);
    }
  }

  .g-group-nav {
    display: flex;
    width: fit-content;
    margin: rpx(30) auto rpx(5);
    .group-item-left, .group-item-right {
      width: rpx(200);
      text-align: center;
      line-height: rpx(66);
      @include sc(rpx(32), #E62D2D);
      border: rpx(2) solid #FE665D;
      &.active {
        background: linear-gradient(90deg, rgba(255, 105, 94, 1) 0%, rgba(247, 79, 79, 1) 100%);
        color: #fff;
      }
    }
    .group-item-left {
      border-radius: 300px 0 0 300px;
    }
    .group-item-right {
      border-radius: 0 300px 300px 0;
    }
  }

  .commodity-main {
    @include wh(100%, calc(100% - #{rpx(384)}));
    overflow: hidden;
    .commodity-list {
      height: 100%;
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
              .open-group-button {
                @include sc(rpx(28), #fff);
                line-height: rpx(56);
                width: rpx(120);
                text-align: center;
                background: linear-gradient(90deg, rgba(255, 105, 94, 1) 0%, rgba(247, 79, 79, 1) 100%);
                border-radius: 28px;
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
</style>
