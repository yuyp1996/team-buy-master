<template>
  <div>
    <div class="main-box2">
      <div class="empty-box" v-if="false">
        <image class="empty-image" src="/static/images/images_cart_null.png"></image>
        <div class="empty-word">您的购物车空空的</div>
      </div>
      <div class="cart-content-list">
        <div class="list-item" v-for="(item,index) in commodityList" :key="index" @click="checkItem(item,item.id)">
          <div class="check-box" :class="{active:item.checked}">
            <image src="/static/icons/icon-check-selected.png"></image>
          </div>
          <image class="item-picture" :src="item.urlImg"></image>
          <div class="order-info">
            <div class="order-name">{{item.name}}</div>
            <div class="order-number" @click.stop="">
              <text class="order-price">¥{{item.kid}}/{{item.priceAndKid[item.kid]}}</text>
              <buyNumber v-model="item.buyNumber" @isZero="deleteCheck($event,index)"></buyNumber>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="settlement-box">
      <div class="check-box" :class="{active:allCheck}" @click="checkAll">
        <image src="/static/icons/icon-check-selected.png"></image>
      </div>
      <div class="all-check" @click="checkAll">全选</div>
      <div class="all-price">合计：¥ {{finalPrice}}</div>
      <button class="go-settlement" @click="goToSettlement">去结算</button>
    </div>
    <bottomNav></bottomNav>
    <popup v-model="deleteShow" @input="deleteCancel">
      <template slot="content">
        <div class="privilege-failed">
          <div class="privilege-title">删除商品</div>
          <div class="privilege-content">您确定要删除该商品？</div>
          <div class="privilege-button-box">
            <button plain="true" class="privilege-button" @click.stop="deleteCancel">取消</button>
            <button plain="true" class="privilege-button" @click.stop="deleteGood">确定</button>
          </div>
        </div>
      </template>
    </popup>
  </div>
</template>

<script>
  // import { formatTime } from "@/utils/index";
  import card from '@/components/card';
  import bottomNav from '@/components/bottomNav';
  import buyNumber from '@/components/buyNumber';
  import getData from '@/utils/api';
  import popup from '@/components/popup';

  export default {
    components: {
      card,
      bottomNav,
      buyNumber,
      popup
    },

    data () {
      return {
        commodityList: [],
        allCheck: false, // 是否全部选择
        deleteShow: false,
        deleteIndex: 0, // 商品数量置零删除时商品在列表的下标
        checkList: []
      };
    },
    computed: {
      finalPrice () {
        let checkInfo = [];
        this.checkList.forEach(val => {
          checkInfo = checkInfo.concat(
            this.commodityList.filter(value => {
              if (value.id === val) {
                return true;
              }
            })
          );
        });
        const price = checkInfo.reduce((pre, cur) => {
          return pre + cur.priceAndKid[cur.kid] * cur.buyNumber;
        }, 0);
        return price;
      }
    },
    onPullDownRefresh () {
      this.init();
    },
    methods: {
      isChecked (value) {
        return this.checkList.some(val => {
          if (val === value) {
            return true;
          }
        });
      },
      deleteCheck (e, index) {
        this.deleteIndex = index;
        this.deleteShow = true;
      },
      deleteGood () {
        if (this.isChecked(this.commodityList[this.deleteIndex].id)) { // 已选中
          try {
            this.checkList.forEach((val, index) => {
              if (val === this.commodityList[this.deleteIndex].id) {
                this.checkList.splice(index, 1);
                throw new Error('已删除');// 抛出异常截住循环
              }
            });
          } catch (e) {
            console.log(e);
          }
        }
        this.commodityList.splice(this.deleteIndex, 1);
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));// 重建数组，深入响应
        this.deleteShow = false;
      },
      deleteCancel () {
        this.commodityList[this.deleteIndex].buyNumber = 1;
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));// 重建数组，深入响应
        this.deleteShow = false;
      },
      checkItem (item, value) {
        if (this.isChecked(value)) { // 已选中
          try {
            this.checkList.forEach((val, index) => {
              if (val === value) {
                this.checkList.splice(index, 1);
                throw new Error('已删除');// 抛出异常截住循环
              }
            });
          } catch (e) {
            console.log(e);
          }
          item.checked = false;
        } else { // 未选中
          this.checkList.push(value);
          item.checked = true;
        }
        if (this.checkList.length === this.commodityList.length) { // 如果全部选中
          this.allCheck = true;
        } else {
          this.allCheck = false;
        }
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));// 重建数组，深入响应
      },
      checkAll () {
        this.checkList = [];
        if (this.allCheck) { // 已全选
          this.commodityList.forEach((val, index) => { // 循环删除
            val.checked = false;
          });
          this.allCheck = false;
        } else { // 未全选
          this.commodityList.forEach((val, index) => { // 循环添加
            this.checkList.push(val.id);
            val.checked = true;
          });
          this.allCheck = true;
        }
        this.commodityList = JSON.parse(JSON.stringify(this.commodityList));// 重建数组，深入响应
      },
      goToSettlement () {
        this.$store.state.checkedGoods.goodsList = [];
        this.checkList.forEach(val => {
          this.$store.state.checkedGoods.goodsList = this.$store.state.checkedGoods.goodsList.concat(
            this.commodityList.filter(item => {
              if (item.id === val) {
                return item;
              }
            })
          );
        });
        console.log(this.$store.state.checkedGoods.goodsList);
        this.$router.push('/pages/order/settlement');
      },
      init () {
        this.checkList = [];
        getData.getShoppingCart({}).then(res => {
          if (res.code === 'success') {
            let list = res.data;
            list.forEach(val => {
              val.kid = Object.keys(val.priceAndKid)[0];
            });
            this.commodityList = list;
          } else {
            mpvue.showToast({
              title: res.code,
              duration: 2000
            });
          }
          mpvue.stopPullDownRefresh();
        });
      }
    },
    onShow () {
      this.init();
    }
  };
</script>

<style scoped lang="scss">
  .main-box2 {
    background: #F7F7F7;
  }

  .cart-content-list {
    .list-item {
      display: flex;
      align-items: center;
      height: rpx(220);
      background: #fff;
      .check-box {
        position: relative;
        @include wh(rpx(40), rpx(40));
        border: 1px solid #979797;
        border-radius: 50%;
        overflow: hidden;
        margin-left: rpx(30);
        image {
          @include center;
          @include wh(0, 0);
        }
        &.active {
          border: 0 none;
          image {
            @include wh(100%, 100%);
          }
        }
      }
      .item-picture {
        @include wh(rpx(151), rpx(151));
        margin-left: rpx(14);
      }
      .order-info {
        margin-left: rpx(25);
        width: calc(100% - #{rpx(260)} - #{rpx(30)});
        .order-name {
          height: rpx(84);
          line-height: rpx(42);
          @include sc(rpx(28), #353535);
          font-weight: 700;
          margin-bottom: rpx(8);
        }
        .order-number {
          @include fj();
          align-items: center;
          .order-price {
            @include sc(rpx(32), #E62D2D);
          }
        }
      }
    }
  }

</style>
