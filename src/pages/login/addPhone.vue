<template>
  <div class="login-main">
    <form @bindsubmit="formSubmit">
      <div class="input-box">
        <label for="userPhone">手机号码</label>
        <input placeholder="请输入您的手机号" placeholder-class="input-place" id="userPhone" type="text"
               v-model="userInfo.phone">
        <button plain="true" class="code-button">获取验证码</button>
      </div>
      <div class="input-box">
        <label for="userCode">验证码</label>
        <input placeholder="请输入您的验证码" placeholder-class="input-place" id="userCode" type="text"
               v-model="userInfo.code">
      </div>
      <div class="save-phone" @click="isSave=!isSave">
        <div class="check-box" :class="{active:isSave}">
          <image src="/static/icons/icon-check-selected.png"></image>
        </div>
        <text class="save-word">保存此号码供以后授权使用</text>
      </div>
      <button plain="true" form-type="submit" class="submit-button" :class="{active: canLogin}">保存</button>
    </form>
  </div>
</template>

<script>
  // import { rule } from "@/utils/index";

  export default {
    data () {
      return {
        userInfo: {
          phone: '',
          code: ''
        },
        isSave: false
      };
    },
    computed: {
      canLogin () {
        return this.userInfo.phone && this.userInfo.code && this.userInfo.phone.length === 11;
      }
    },
    methods: {
      formSubmit () {
        this.$http.get('/mock')
          .then((res) => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
</script>

<style lang='scss' scoped>

  .input-place {
    @include sc(rpx(32), #ccc);
  }

  .login-main {
    padding-top: rpx(20);
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .input-box {
      @include fj(flex-start);
      align-items: center;
      height: rpx(110);
      margin-left: rpx(30);
      border-bottom: 1px solid #F5F5F5;
      label {
        width: rpx(184);
        @include sc(rpx(32), #888);
      }
      input {
        width: calc(100% - #{rpx(184)} - #{rpx(210)});
        @include sc(rpx(32), #353535);
        line-height: rpx(60);
      }
      .code-button {
        width: rpx(180);
        @include sc(rpx(28), #E62D2D);
        text-align: center;
        line-height: rpx(56);
        border: rpx(2) solid #E62D2D;
        border-radius: rpx(4);
      }
    }
    .save-phone {
      margin: rpx(30) rpx(30) 0;
      display: flex;
      align-items: center;
      .check-box {
        position: relative;
        @include wh(rpx(40), rpx(40));
        border: 1px solid #979797;
        border-radius: 50%;
        overflow: hidden;
        margin-right: rpx(10);
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
      .save-word {
        @include sc(rpx(28), #888);
      }
    }
    .submit-button {
      margin: rpx(40) rpx(30) 0;
      @include sc(rpx(36), #fff);
      line-height: rpx(88);
      text-align: center;
      background: #E6E6E6;
      border-radius: rpx(8);
      border: 0 none;
      &.active {
        background: #E62D2D;
      }
    }
  }
</style>

