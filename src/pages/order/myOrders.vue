<template>
  <div style="height: 100%;">
    <div class="orders-nav">
      <div class="nav-item" :class="{active: navIndex === 0}" @click="navChange(0)">全部</div>
      <div class="nav-item" :class="{active: navIndex === 1}" @click="navChange(1)">待发货</div>
      <div class="nav-item" :class="{active: navIndex === 2}" @click="navChange(2)">待收货</div>
      <div class="nav-item" :class="{active: navIndex === 3}" @click="navChange(3)">已完成</div>
    </div>
    <div class="order-main">
      <div class="empty-box" v-if="!(ordersList&&ordersList.length)">
        <image class="empty-image" src="/static/images/images_order_null.png"></image>
        <div class="empty-word">暂时还没订单，快去下一单吧</div>
      </div>
      <div class="orders-list">
        <div class="orders-item" v-for="(item,index) in ordersList" :key="index">
          <div class="business">
            <div class="business-name">
              <text class="name-text">{{item.shopName}}</text>
              <image class="business-triangle" src="/static/icons/icon-right.png"></image>
            </div>
            <div class="order-state">{{item.orderState}}</div>
          </div>
          <div class="order-commodity" @click="goTo('/pages/order/orderDetail')">
            <div class="commodity-images">
              <image v-for="(pic,picIndex) in item.orderGoods" v-if="picIndex<3" :key="picIndex" class="commodity-image"
                     :src="pic.imgUrl"></image>
            </div>
            <text class="order-number">共{{item.orderGoods.length}}件</text>
            <image class="right-triangle" src="/static/icons/icon-right.png"></image>
          </div>
          <div class="order-price">
            <text class="order-time">{{item.time}}</text>
            <!--<text class="order-number">共{{item.orderGoods.length}}件商品</text>-->
            <text class="total-price">合计¥ {{item.orderMoney}}</text>
          </div>
          <div class="order-button">
            <button class="button-box" plain="true">申请取消</button>
            <button class="button-box red-button" plain="true">再次购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatTime } from '@/utils/index';
  import getData from '@/utils/api';
  import card from '@/components/card';

  export default {
    components: {
      card
    },

    data () {
      return {
        navIndex: 0,
        pageIndex: 1,
        pageSize: 10,
        ordersList: []
      };
    },
    onPullDownRefresh () {
      this.init();
    },
    onReachBottom () {
      this.infinitiveList();
    },
    methods: {
      navChange (index) {
        this.navIndex = index;
        this.init();
      },
      goTo (url) {
        this.$router.push(url);
      },
      typeList (val) {
        switch (val) {
          case 1:
            return '等待商家发货';
          case 2:
            return '等待买家收货';
          case 3:
            return '订单已完成';
        }
      },
      infinitiveList () {
        console.log(111);
        if (this.pageIndex > Math.ceil(this.totalCount / this.pageSize)) {
          return;
        }
        getData.getMyOrders({
          token: 'fdbe58155fd7df598ff01a798d2fd4d3',
          typeId: this.navIndex,
          page: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          this.totalCount = res.count;
          let list = [];
          if (res.data) {
            list = res.data;
            list.forEach(val => {
              val.time = formatTime(new Date(val.orderTime));
              val.orderState = this.typeList(val.orderState);
            });
          }
          this.ordersList = this.ordersList.concat(list);
          this.pageIndex++;
        });
      },
      init () {
        this.ordersList = [];
        this.pageIndex = 1;
        getData.getMyOrders({
          token: 'fdbe58155fd7df598ff01a798d2fd4d3',
          typeId: this.navIndex,
          page: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          let list = [];
          if (res.data) {
            list = res.data;
          }
          this.totalCount = res.count;
          list.forEach(val => {
            val.time = formatTime(new Date(val.orderTime));
            val.orderState = this.typeList(val.orderState);
          });
          this.ordersList = list;
          mpvue.stopPullDownRefresh();
          this.pageIndex = 2;
        });
      }
    },
    onShow () {
      this.init();
    }
  };
</script>

<style lang="scss" scoped>
  .order-main {
    background: #F7F7F7;
    min-height: calc(100% - #{rpx(86)});
    padding-top: rpx(86);
  }

  .empty-box > .empty-image {
    margin-top: rpx(146);
  }

  .empty-box {
    height: calc(100% - #{rpx(86)});
  }

  .orders-nav {
    position: fixed;
    top: 0;
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

  .orders-list {
    .orders-item {
      margin: rpx(20);
      border-radius: rpx(20);
      background: #fff;
      overflow: hidden;
      .business {
        margin-top: rpx(40);
        @include fj();
        align-items: center;
        padding: 0 rpx(30);
        .business-name {
          display: flex;
          align-items: center;
          .name-text {
            @include sc(rpx(36), #1F1F1F);
            font-weight: 700;
          }
          .business-triangle {
            @include wh(rpx(41), rpx(41));
            margin-left: rpx(10);
          }
        }
        .order-state {
          @include sc(rpx(32), #888);
        }
      }
      .order-commodity {
        @include fj();
        align-items: center;
        height: rpx(220);
        .commodity-images {
          display: flex;
          max-width: calc(100% - #{rpx(220)});
          overflow: hidden;
          padding-left: rpx(10);
          .commodity-image {
            margin: 0 0 0 rpx(20);
            @include wh(rpx(140), rpx(140));
            object-fit: contain;
          }
        }
        .order-number {
          @include sc(rpx(32), #888);
          margin: 0 rpx(10) 0 auto;
        }
      }
      .order-price {
        @include fj();
        align-items: center;
        padding: 0 rpx(30);
        .order-time {
          @include sc(rpx(24), #ccc);
        }
        .order-number {
          @include sc(rpx(32), #888);
          margin: 0 rpx(20) 0 auto;
        }
        .total-price {
          @include sc(rpx(36), #1F1F1F);
          font-weight: 700;
          line-height: rpx(38);
        }
      }
      .order-button {
        display: flex;
        margin: rpx(50) 0;
        .button-box {
          @include sc(rpx(28), #888);
          width: rpx(180);
          line-height: rpx(60);
          border: currentColor solid rpx(2);
          border-radius: rpx(30);
          text-align: center;
          margin: 0 rpx(30) 0 auto;
        }
        .button-box + .button-box {
          margin-left: 0;
        }
        .red-button {
          color: #E62D2D;
        }
      }
    }
  }
</style>
