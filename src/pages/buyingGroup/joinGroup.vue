<template>
  <scroll-view class="main-box3" id="mainBox" :scroll-y="true" @scrolltolower="infinitiveList">
    <div class="g-group-good" v-if="commodityList.length">
      <div class="commodity-info">
        <image class="commodity-pic" :src="commodityList[0].urlImg"></image>
        <div class="commodity-info-box">
          <div class="commodity-name ellipsis2">{{commodityList[0].name}}</div>
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
            <text class="open-group-remainder">仅剩199份</text>
          </div>
        </div>
      </div>
    </div>
    <div class="g-group-people">
      <div class="g-people-number">
        还差
        <text class="g-red-word">2</text>
        人即可成团，赶快邀请好友来拼单吧
      </div>
      <div class="g-people-image">
        <div class="g-image-box">
          <image src="/static/images/user.png"></image>
          <div class="g-caption-label">团长</div>
        </div>
        <div class="g-image-box" v-for="(item,index) in 2" :key="index">
          <image src="/static/images/user.png" v-if="false"></image>
          <div class="g-none-people">？</div>
        </div>
      </div>
      <button plain="true" class="g-join-button">立即参团</button>
    </div>
    <div class="commodity-main">
      <div class="main-title">猜你喜欢</div>
      <div class="commodity-list">
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
        </div>
      </div>
    </div>

  </scroll-view>
</template>

<script>
  import getData from '@/utils/api';
  // Use Vuex

  export default {
    data () {
      return {
        commodityList: [],
        page: 1,
        pageSize: 10,
        totalCount: 1,
        goodDetail: {}
      };
    },
    computed: {},
    onShow () {
      this.goodDetail = this.$store.state.groupGood.goodDetail;
      mpvue.setNavigationBarTitle({
        title: this.goodDetail.goodName
      });
      this.getGoodsList();
    },
    methods: {
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
      }
    }
  };
</script>

<style scoped lang="scss">
  .g-group-good {
    padding: rpx(10) rpx(30);
    .commodity-info {
      width: 100%;
      height: 100%;
      @include fj(flex-start);
      align-items: center;
      .commodity-pic {
        @include wh(rpx(260), rpx(260));
        margin-right: rpx(30);
      }
      .commodity-info-box {
        width: calc(100% - #{rpx(290)});
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
        .open-group-remainder {
          @include sc(rpx(28), #888);
          line-height: rpx(28);
        }
      }
    }
  }

  .g-group-people {
    padding: rpx(30) 0 rpx(40) 0;
    background: #fff;
    .g-people-number {
      margin: 0 auto;
      width: rpx(366);
      @include sc(rpx(36), #1F1F1F);
      text-align: center;
      font-weight: 700;
      .g-red-word {
        margin: 0 rpx(10);
        font-size: inherit;
        color: #E62D2D;
      }
    }
    .g-people-image {
      @include fj(center);
      align-items: center;
      margin: rpx(40) 0 rpx(50);
      .g-image-box {
        position: relative;
        margin: 0 rpx(25);
        @include wh(rpx(90), rpx(90));
        border-radius: 50%;
        image {
          @include wh(100%, 100%);
        }
        .g-none-people {
          @include wh(100%, 100%);
          border: rpx(2) dashed #E62D2D;
          border-radius: 50%;
          line-height: rpx(90);
          text-align: center;
          @include sc(rpx(36), #E62D2D);
          background: #FFF6F5;
        }
        .g-caption-label {
          @include cl;
          bottom: 0;
          width: 100%;
          line-height: rpx(30);
          @include sc(rpx(22), #fff);
          text-align: center;
          border-radius: rpx(15);
          background: linear-gradient(90deg, rgba(255, 207, 61, 1) 0%, rgba(255, 176, 79, 1) 100%);
        }
      }
    }
    .g-join-button {
      margin: 0 rpx(125);
      line-height: rpx(88);
      text-align: center;
      @include sc(rpx(36), #fff);
      background: linear-gradient(90deg, rgba(255, 124, 115, 1) 0%, rgba(247, 79, 79, 1) 100%);
      border-radius: rpx(44);
    }
  }

  .commodity-main {
    border-top: rpx(20) solid #F7F7F7;
    padding-top: rpx(20);
    background: #fff;
    .main-title {
      @include fj();
      padding: 0 rpx(30);
      line-height: rpx(52);
      @include sc(rpx(32), #353535);
    }
  }

  .commodity-list {
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
    }
  }
</style>
