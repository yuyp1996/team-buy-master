<template>
  <div>
    <div class="main-box3">
      <div class="empty-box" v-if="false">
        <image class="empty-image" src="/static/images/images_address_null.png"></image>
        <div class="empty-word">您还没有添加过地址</div>
      </div>
      <div class="address-list">
        <div class="address-item" v-for="(item,index) in 2" :key="2">
          <div class="address-info">
            <div class="addressee-name">王大陆
              <text class="addressee-phone">17657897890</text>
            </div>
            <div class="address-detail">浙江省杭州市余杭区仓前街道656号</div>
          </div>
          <button class="edit-address" plain="true" @click="goTo('/pages/address/editAddress')">
            <image src="/static/icons/icon-adressEdit.png"></image>
          </button>
        </div>
      </div>
    </div>
    <button class="add-address" @click="goTo('/pages/address/addAddress')">添加地址</button>
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
    methods: {
      goTo (url) {
        this.$router.push(url);
      }
    },
    created () {
    }
  };
</script>

<style scoped lang="scss">
  .main-box3 {
    background: #F7F7F7;
    padding-bottom: rpx(130);
  }

  .add-address {
    position: fixed;
    bottom: rpx(40);
    left: 0;
    right: 0;
    margin: 0 auto;
    width: calc(100% - #{rpx(60)});
    @include sc(rpx(36), #fff);
    line-height: rpx(88);
    text-align: center;
    background: linear-gradient(90deg, rgba(255, 124, 115, 1) 0%, rgba(247, 79, 79, 1) 100%);
    border-radius: rpx(44);
  }

  .address-list {
    .address-item {
      @include fj();
      align-items: center;
      background: #fff;
      height: rpx(174);
      margin: rpx(20);
      border-radius: rpx(20);
      .address-info {
        width: calc(100% - #{rpx(74)} - #{rpx(30)} - #{rpx(10)});
        margin-left: rpx(30);
        .addressee-name {
          @include sc(rpx(32), #353535);
          line-height: rpx(32);
          .addressee-phone {
            @include sc(rpx(32), #353535);
            line-height: rpx(32);
            margin-left: rpx(44);
          }
        }
        .address-detail {
          @include sc(rpx(32), #888);
          line-height: rpx(32);
          margin-top: rpx(30);
        }
      }
      .edit-address {
        position: relative;
        @include wh(rpx(48), rpx(48));
        margin-right: rpx(34);
        overflow: hidden;
        background: #fff;
        border-radius: 0;
        border: 0 none;
        image {
          @include center;
          @include wh(rpx(48), rpx(48));
        }
      }
    }
  }
</style>
