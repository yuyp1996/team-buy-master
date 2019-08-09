<template>
  <div class="number-box">
    <div class="reduce-button" :class="{active:value>0}" @click="reduceNum"></div>
    <input class="number-input" type="number" :value="value" @input="sendVal($event.target.value)">
    <div class="add-button" :class="{active:true}" @click="addNum"></div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      sendVal (val) {
        if (!val && val !== 0) {
          return;
        }
        if (val === 0) {
          this.$emit('isZero', true);
        }
        this.$emit('input', Number(val));
      },
      reduceNum () {
        if (this.value === 0) {
          return;
        }
        this.sendVal(this.value - 1);
      },
      addNum () {
        this.sendVal(this.value + 1);
      }
    }
  };
</script>

<style scoped lang="scss">
  .number-box {
    border: rpx(3) solid #ccc;
    display: flex;
    .add-button, .reduce-button {
      position: relative;
      @include wh(rpx(60), rpx(60));
      background: #fff;
      color: #ccc;
      &::before {
        content: '';
        @include center;
        @include wh(rpx(32), rpx(3));
        color: inherit;
        background: currentColor;
      }
      &.active {
        color: #888;
      }
    }
    .reduce-button {
      border-right: 1px solid #ccc;
    }
    .add-button {
      border-left: 1px solid #ccc;
      &::after {
        content: '';
        @include center;
        @include wh(rpx(3), rpx(32));
        color: inherit;
        background: currentColor;
      }
    }
    .number-input {
      width: rpx(88);
      height: rpx(60);
      line-height: rpx(60);
      @include sc(rpx(28), #353535);
      text-align: center;
    }
  }
</style>
