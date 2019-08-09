<template>
  <div class="main-box3">
    <div class="new-address">
      <picker @change="bindPickerChange" :value="index" :range="array">
        <view class="form-item">
          <text class="item-name">所在城市</text>
          <view class="item-value">
            {{array[index]}}
          </view>
          <image class="right-triangle" src="/static/icons/icon-right.png"></image>
        </view>
      </picker>
      <div class="form-item">
        <label for="addressDetail" class="item-name">详细地址</label>
        <input class="item-input" v-model="addressInfo.addressDetail" id="addressDetail" type="text"
               placeholder="例如：xxx路xxx号xxx室">
      </div>
      <div class="form-item">
        <label for="addresseeName" class="item-name">收货人</label>
        <input class="item-input" v-model="addressInfo.addresseeName" id="addresseeName" type="text"
               placeholder="请填写收货人姓名">
      </div>
      <div class="form-item">
        <label for="addresseePhone" class="item-name">联系电话</label>
        <input class="item-input" v-model="addressInfo.addresseePhone" id="addresseePhone" type="number"
               placeholder="请填写收货人手机号">
      </div>
    </div>
    <div class="address-button-box">
      <button class="address-button">确定修改</button>
      <button class="address-button red-button">删除地址</button>
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
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        addressInfo: {
          city: '',
          addressDetail: '',
          addresseeName: '',
          addresseePhone: ''
        }
      };
    },
    methods: {
      bindPickerChange (e) {
        this.index = e.mp.detail.value;
      }
    },
    created () {
    }
  };
</script>

<style scoped lang="scss">
  .main-box3 {
    background: #F7F7F7;
  }
</style>
