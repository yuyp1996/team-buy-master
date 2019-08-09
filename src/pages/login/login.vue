<template>
  <div class="login-main">
    <form @submit="formSubmit">
      <div class="input-box">
        <label for="userPhone">手机号码</label>
        <input placeholder="请输入您的手机号" placeholder-class="input-place" id="userPhone" type="text"
               v-model="userInfo.phone">
        <button plain="true" class="code-button" @click="sendCode">{{codeWord}}</button>
      </div>
      <div class="input-box">
        <label for="userCode">验证码</label>
        <input maxlength="4" placeholder="请输入您的验证码" placeholder-class="input-place" id="userCode" type="text"
               v-model="userInfo.code">
      </div>
      <button plain="true" form-type="submit" class="submit-button" :class="{active: canLogin}">登录</button>
      <div class="login-tips">新号码首次登录自动注册</div>
    </form>
    <div class="wx-login">
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="wx-icon" plain="true">
        <image src="/static/images/wx-icon.jpg" mode="scaleToFill"></image>
      </button>
      <p class="wx-word">微信手机号一键登录</p>
      <div class="agreement">登录注册即表示你同意
        <navigator
          class="go-agreement"
          url="/pages/index"
        >《蚂蚁采购服务协议》
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>
  import { rule } from '@/utils/index';
  import getData from '@/utils/api';

  export default {
    data () {
      return {
        userInfo: {
          phone: '',
          code: ''
        },
        codeWord: '获取验证码'
      };
    },
    computed: {
      canLogin () {
        return this.userInfo.phone && this.userInfo.code && this.userInfo.phone.length === 11;
      }
    },
    methods: {
      formSubmit () {
        if (rule.phone(this.userInfo.phone) && this.userInfo.code) {
          getData.loginByCode({userPhone: this.userInfo.phone, code: this.userInfo.code}).then((res) => {
            console.log(res);
            if (res.info === '登陆成功') {
              mpvue.setStorageSync('authorization', {userPhone: this.userInfo.phone, token: res.data});
              mpvue.switchTab({url: '/pages/index'});
            }
          }).catch(error => {
            console.log(error);
          });
        }
      },
      getPhoneNumber (e) {
        console.log(e.mp.detail.encryptedData);
      },
      sendCode () {
        if (rule.phone(this.userInfo.phone) && typeof this.codeWord === 'string') {
          getData.getCode({userPhone: this.userInfo.phone}).then(res => {
            mpvue.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 1000
            });
            this.codeWord = 60;
            const timeInterval = setInterval(() => {
              if (this.codeWord === 0) {
                this.codeWord = '获取验证码';
                clearInterval(timeInterval);
              } else {
                this.codeWord--;
              }
            }, 1000);
          });
        }
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
    .submit-button {
      margin: rpx(60) rpx(30) 0;
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
    .login-tips {
      margin: rpx(30) 0 0;
      @include sc(rpx(24), #ccc);
      text-align: center;
    }
    .wx-login {
      .wx-icon {
        position: relative;
        display: block;
        margin: 0 auto;
        @include wh(rpx(120), rpx(120));
        border-radius: 50%;
        border: 0 none;
        overflow: hidden;
        background: #3cb035;
        image {
          @include center;
          @include wh(70%, 70%);
          border-radius: 50%;
        }
      }
      .wx-word {
        margin: rpx(30) 0 0;
        @include sc(rpx(28), #888);
        line-height: rpx(30);
        text-align: center;
      }
      .agreement {
        margin: rpx(65) 0 rpx(50);
        @include sc(rpx(24), #888);
        text-align: center;
        line-height: rpx(26);
        .go-agreement {
          display: inline-block;
          padding: 0 rpx(5);
          line-height: rpx(26);
          @include sc(rpx(24), #576B95);
        }
      }
    }
  }
</style>

