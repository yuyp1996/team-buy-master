<template>
  <div class="main-box3">
    <div class="g-order-state g-content-box">
      <text class="order-state">待发货</text>
      <image class="icon-order-state" src="/static/icons/order_images_setoff.png"></image>
    </div>
    <!--<div class="business-info">
      <text class="business-name">集杰缘</text>
      <image class="right-triangle" src="/static/icons/icon-right.png"></image>
    </div>-->
    <div class="g-content-box">
      <div class="content-title">商品信息</div>
      <div class="commodity-list">
        <div class="commodity-item">
          <image class="commodity-image" src="/static/images/wx-icon.jpg"></image>
          <div class="commodity-info">
            <div class="name-number">
              <text class="commodity-name">新包装江小白40度100ml* 48瓶</text>
              <text class="commodity-number">*2</text>
            </div>
            <div class="price-box">
              <text class="unit-price">100ml*48瓶/箱</text>
              <text class="total-price">¥ 345.60</text>
            </div>
          </div>
        </div>
      </div>
      <div class="order-content">
        <text class="content-name">商品金额</text>
        <text class="content-value">¥ 678.00</text>
      </div>
      <div class="order-content">
        <text class="content-name">优惠券</text>
        <text class="content-value">-¥ 10.00</text>
      </div>
      <div class="final-price">
        <text class="save-price">共节省¥10.00</text>
        <text class="pay-money">实付¥ 345.60</text>
      </div>
    </div>

    <div class="order-detail g-content-box">
      <div class="detail-title">订单信息</div>
      <div class="detail-box">
        <text class="detail-name">订单状态：</text>
        <text class="detail-value">已完成</text>
      </div>
      <div class="detail-box">
        <text class="detail-name">订单号码：</text>
        <text class="detail-value">98765467899029</text>
      </div>
      <div class="detail-box">
        <text class="detail-name">下单时间：</text>
        <text class="detail-value">2019-03-27 16:00:00</text>
      </div>
      <div class="detail-box">
        <text class="detail-name">支付方式：</text>
        <text class="detail-value">货到付款</text>
      </div>
      <div class="detail-box">
        <text class="detail-name">送货信息：</text>
        <text class="detail-value">程金星 18275689871\n浙江省杭州市拱墅区祥园路10号</text>
      </div>
    </div>
  </div>
</template>

<script>
  // import { formatTime } from "@/utils/index";
  import card from '@/components/card';

  export default {
    components: {
      card
    },

    data () {
      return {};
    },

    created () {
    }
  };
</script>

<style scoped lang="scss">
  .main-box3 {
    background: #F7F7F7;
  }

  .business-info {
    @include fj();
    height: rpx(96);
    background: #fff;
    .business-name {
      margin-left: rpx(30);
      @include sc(rpx(36), #1F1F1F);
      font-weight: 700;
    }
  }

  .g-order-state {
    height: rpx(120);
    @include fj();
    align-items: center;
    background: #fff;
    // background:linear-gradient(135deg,rgba(255,104,87,1) 0%, rgba(237,86,86,1) 100%);
    .order-state {
      @include sc(rpx(36), #1F1F1F);
      margin-left: rpx(30);
      font-weight: 700;
    }
    .icon-order-state {
      @include wh(rpx(64), rpx(64));
      margin-right: rpx(58);
    }
  }

  .g-content-box {
    margin: rpx(20);
    border-radius: rpx(20);
    background: #fff;
    overflow: hidden;
    .content-title {
      margin: rpx(10) rpx(30) 0;
      @include sc(rpx(36), #1F1F1F);
      line-height: rpx(76);
      font-weight: 700;
    }
  }

  .commodity-list {
    margin: rpx(20);
    border-radius: rpx(20);
    background: #fff;
    .commodity-item {
      @include fj();
      align-items: center;
      height: rpx(200);
      padding: 0 rpx(30);
      .commodity-image {
        @include wh(rpx(140), rpx(140));
      }
      .commodity-info {
        width: calc(100% - #{rpx(200)});
        .name-number {
          height: rpx(96);
          @include fj();
          .commodity-name {
            width: rpx(365);
            @include sc(rpx(32), #353535);
            line-height: rpx(48);
          }
          .commodity-number {
            @include sc(rpx(32), #353535);
            line-height: rpx(50);
          }
        }
        .price-box {
          margin-top: rpx(18);
          @include fj();
          .unit-price {
            @include sc(rpx(32), #ccc);
            line-height: rpx(32);
          }
          .total-price {
            @include sc(rpx(32), #353535);
            line-height: rpx(32);
          }
        }
      }
    }
  }

  .order-content {
    @include fj();
    padding: 0 rpx(30);
    align-items: center;
    height: rpx(110);
    background: #fff;
    .content-name {
      @include sc(rpx(32), #888);
    }
    .content-value {
      @include sc(rpx(32), #353535);
    }
  }

  .final-price {
    @include fj();
    padding: 0 rpx(30);
    align-items: center;
    height: rpx(110);
    margin-bottom: rpx(20);
    background: #fff;
    .save-price {
      @include sc(rpx(32), #888);
      margin-left: auto;
    }
    .pay-money {
      @include sc(rpx(36), #1F1F1F);
      font-weight: 700;
      margin-left: rpx(20);
    }
  }

  .order-detail {
    padding: 0 rpx(30);
    background: #fff;
    overflow: hidden;
    .detail-title {
      margin-top: rpx(30);
      @include sc(rpx(36), #1F1F1F);
      font-weight: 700;
    }
    .detail-box {
      display: flex;
      margin: rpx(21) 0;
      .detail-name {
        margin-top: rpx(11);
        width: rpx(160);
        @include sc(rpx(32), #888);
        line-height: rpx(32);
      }
      .detail-value {
        display: block;
        width: calc(100% - #{rpx(160)});
        @include sc(rpx(32), #353535);
        line-height: rpx(54);
      }
    }
  }
</style>
