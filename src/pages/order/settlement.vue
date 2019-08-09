<template>
  <div class="main-box3">
    <div class="other-box">
      <div class="box-item">
        <text class="item-name">收货方式</text>
        <text class="item-content">自提取货</text>
        <image class="right-triangle" src="/static/icons/icon-right.png"></image>
      </div>
    </div>
    <div class="choose-address">
      <div class="address-main" :class="{'have-choose':addressInfo.address}">
        <image class="address-icon" src="/static/icons/icon-address.png"></image>
        <div class="address-info">
          <div class="user-name">{{addressInfo.userName || '选择收货地址'}}</div>
          <div class="address-detail" v-if="addressInfo.address">{{addressInfo.address}}</div>
        </div>
      </div>
      <image class="right-triangle" src="/static/icons/icon-right.png"></image>
    </div>
    <div class="order-commodity">
      <div class="commodity-images">
        <image v-for="(item,index) in goodsList" v-if="index<3" :key="index" class="commodity-image"
               :src="item.urlImg"></image>
      </div>
      <div class="commodity-number">
        <text class="total-quantity">共{{goodsList.length}}件</text>
        <image class="right-triangle" src="/static/icons/icon-right.png"></image>
      </div>
    </div>
    <div class="other-box">
      <div class="box-item">
        <text class="item-name">支付方式</text>
        <text class="item-content">微信</text>
      </div>
      <div class="box-item">
        <text class="item-name">备注</text>
        <input class="item-input" type="text" placeholder="选填" v-model="remarks">
      </div>
      <div class="box-item">
        <text class="item-name">商品金额</text>
        <text class="item-content">¥ {{finalPrice}}</text>
      </div>
      <div class="box-item">
        <text class="item-name">优惠券</text>
        <text class="item-content">-¥ 10.00</text>
        <image class="right-triangle" src="/static/icons/icon-right.png"></image>
      </div>
    </div>
    <div class="settlement-box">
      <div class="all-price">实付：¥ {{finalPrice}}</div>
      <button class="go-settlement" @click="goToSettlement">去付款</button>
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
      return {
        addressInfo: {
          userName: '王大陆 17657897890',
          address: '浙江省杭州市余杭区仓前街道656号'
        },
        remarks: '',
        goodsList: [],
        finalPrice: 0
      };
    },

    onShow () {
      this.goodsList = [];
      this.goodsList = this.$store.state.checkedGoods.goodsList;
      this.finalPrice = this.goodsList.reduce((pre, cur) => {
        return pre + cur.priceAndKid[cur.kid] * cur.buyNumber;
      }, 0);
    }
  };
</script>

<style scoped lang="scss">
  .main-box3 {
    padding-bottom: rpx(100);
    background: #F7F7F7;
  }

  .choose-address {
    margin: rpx(20);
    border-radius: rpx(20);
    @include fj();
    align-items: center;
    height: rpx(140);
    background: #fff;
    .address-main {
      display: flex;
      align-items: center;
      margin-left: rpx(23);
      .address-icon {
        @include wh(rpx(48), rpx(48));
        margin-right: rpx(27);
      }
      .address-info {
        .user-name {
          @include sc(rpx(32), #353535);
          font-weight: 700;
          line-height: rpx(32);
        }
        .address-detail {
          @include sc(rpx(32), #888);
          line-height: rpx(32);
          margin-top: rpx(20);
        }
      }
      &.have-choose {
        align-items: flex-start;
        .address-info {
          margin-top: rpx(3);
        }
      }
    }
  }

  .order-commodity {
    margin: rpx(20);
    border-radius: rpx(20);
    @include fj();
    align-items: center;
    height: rpx(220);
    background: #fff;
    .commodity-images {
      display: flex;
      max-width: calc(100% - #{rpx(210)});
      overflow: hidden;
      .commodity-image {
        margin: 0 rpx(30) 0 0;
        @include wh(rpx(140), rpx(140));
        object-fit: contain;
        &:first-child {
          margin-left: rpx(30);
        }
      }
    }
    .commodity-number {
      @include fj();
      width: rpx(210);
      align-items: center;
      .total-quantity {
        @include sc(rpx(32), #888);
      }
    }
  }

  .other-box {
    background: #fff;
    margin: rpx(20);
    border-radius: rpx(20);
    padding-left: rpx(30);
    .box-item {
      border-bottom: 1px solid #F5F5F5;
      display: flex;
      align-items: center;
      height: rpx(110);
      .item-name {
        @include sc(rpx(32), #888);
        width: rpx(184);
      }
      .item-content {
        @include sc(rpx(32), #353535);
        margin: 0 rpx(30) 0 auto;
      }
      .item-input {
        flex: 1;
        margin-right: rpx(30);
        @include sc(rpx(32), #353535);
        line-height: rpx(36);
        &::placeholder {
          @include sc(rpx(32), #ccc);
        }
      }
      .right-triangle {
        margin-left: rpx(-29);
      }
      &:last-child {
        border-bottom: 0 none;
      }
    }
  }

  .settlement-box {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    justify-content: space-between;
  }
</style>
