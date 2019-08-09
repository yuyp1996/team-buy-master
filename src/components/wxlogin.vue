<template>
  <div class="wxinfo-main" :style="{clip:value?'auto':'rect(0,0,0,0)'}">
    <div class="wxinfo-box" :style="{transform:value?'translateY(0)':'translateY(100%)'}">
      <div class="box-title">
        <image src="/static/images/circle-logo.png"></image>
        <text>蚂蚁采购 申请</text>
      </div>
      <div class="box-tips">你的手机号码</div>
      <div class="phone-list">
        <div class="phone-item" :class="{active: true}">
          <text class="phone-number">18687567808</text>
          <text class="phone-tips">微信绑定号码</text>
          <image class="choose-tip" src="/static/icons/icon-yes.png"></image>
        </div>
      </div>
      <div class="use-other-phone" @click="goTo('/pages/login/addPhone')">使用其他手机号码</div>
      <div class="wxinfo-button">
        <button @click="showClose">拒绝</button>
        <button plain="true" class="agree">允许</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      showClose () {
        this.$emit('input', false);
      },
      goTo (url) {
        this.$router.push(url);
      }
    }
  };
</script>

<style scoped lang="scss">
  .wxinfo-main {
    position: fixed;
    top: 0;
    left: 0;
    @include wh(100vw, 100vh);
    overflow: hidden;
    background: rgba(0, 0, 0, .5);
    z-index: 9;
    .wxinfo-box {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      padding: 0 rpx(40);
      background: #fff;
      transition: transform .5s;
      .box-title {
        display: flex;
        align-items: center;
        margin: rpx(39) 0 rpx(32);
        height: rpx(48);
        image {
          @include wh(rpx(48), rpx(48));
          margin-right: rpx(17);
        }
        text {
          @include sc(rpx(32), #353535);
        }
      }
      .box-tips {
        @include sc(rpx(48), #1F1F1F);
        line-height: rpx(62);
        font-weight: 700;
      }
      .phone-list {
        margin: rpx(42) 0 rpx(40);
        border-top: 1px solid #E5E5E5;
        .phone-item {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #E5E5E5;
          height: rpx(112);
          .phone-number {
            @include sc(rpx(32), #353535);
          }
          .phone-tips {
            @include sc(rpx(28), #cc);
            margin-left: rpx(39);
          }
          .choose-tip {
            @include wh(rpx(0), rpx(0));
            margin: 0 0 0 auto;
          }
        }
        .active {
          .choose-tip {
            @include wh(rpx(28), rpx(28));
          }
        }
      }
      .use-other-phone {
        @include sc(rpx(28), #576B95);
        line-height: rpx(48);
        margin-top: rpx(30);
      }
      .wxinfo-button {
        @include fj();
        margin: rpx(102) 0;
        button {
          width: calc((100% - #{rpx(30)}) / 2);
          line-height: rpx(80);
          @include sc(rpx(32), #353535);
          text-align: center;
          border-radius: rpx(8);
          background: #EDEDED;
          border: 0 none;
        }
        .agree {
          background: #09BB07;
          color: #fff;
        }
      }
    }
  }
</style>
