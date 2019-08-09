<template>
  <div class="wxinfo-main" :style="{clip:value?'auto':'rect(0,0,0,0)'}">
    <div class="wxinfo-box" :style="{transform:value?'translateY(0)':'translateY(100%)'}">
      <div class="box-title">
        <image src="/static/images/circle-logo.png"></image>
        <text>蚂蚁采购 申请</text>
      </div>
      <div class="box-tips">获取你的昵称、头像、地区、性 别及手机号码</div>
      <div class="user-info">
        <open-data class="userAvatarUrl" type="userAvatarUrl"></open-data>
        <div>
          <open-data type="userNickName" class="user-name">王天天</open-data>
          <text class="user-wx">微信个人信息</text>
        </div>
      </div>
      <div class="wxinfo-button">
        <button @click="showClose">取消</button>
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo" class="agree">允许</button>
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
      onGotUserInfo (e) {
        console.log(e);
        this.$store.state.userInfo.userInfo = e.mp.detail.userInfo;
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
      .user-info {
        display: flex;
        align-items: center;
        margin: rpx(58) 0 rpx(105);
        border-top: 1px solid #E5E5E5;
        border-bottom: 1px solid #E5E5E5;
        padding: rpx(20) 0;
        .userAvatarUrl {
          @include wh(rpx(80), rpx(80));
          margin-right: rpx(20);
        }
        .user-name {
          display: block;
          @include sc(rpx(32), #353535);
          line-height: rpx(34);
          margin-bottom: rpx(14);
        }
        .user-wx {
          display: block;
          @include sc(rpx(28), #ccc);
          line-height: rpx(30);
        }
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
        }
        .agree {
          background: #09BB07;
          color: #fff;
        }
      }
    }
  }
</style>
