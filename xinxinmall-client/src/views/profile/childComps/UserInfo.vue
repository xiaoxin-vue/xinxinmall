<template>
  <div class="user-info">
    <div class="user-header">
      <div class="login-image">
        <img src="~assets/img/profile/login.svg" alt=""/>
      </div>
      <div class="login-info">
        <p class="login-info-top" @click="login">{{userInfo.name || '登录/注册'}}</p>
        <p class="login-info-bottom">
          <span class="login-icon">
            <i></i>
          </span>
          <span class="icon-mobile-number">{{userInfo.phone || '暂无绑定手机号'}}</span>
        </p>
      </div>
      <div class="left-icon">
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      // src引入图片需要使用require
      // imgUrl: require('assets/img/profile/login.svg')
    }
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    login() {
      this.$router.push('./login')
    }
  }
}
</script>

<style scoped>
.user-info {
  border-top: 1px solid rgba(100, 100, 100, 0.1);
}
.user-header {
  display: flex;
  padding: 10px;
  background-color: var(--color-tint);
  align-items: center;
}

.login-image {
  width: 60px;
  height: 60px;
  border: 1px solid rgb(216,216,216);
  border-radius: 50%;
  text-align: center;
}

.login-image img {
  width: 53px;
  height: 53px;
}

.login-info {
  flex: 1;
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
}

.login-info .login-info-top {
  margin-left: 3px;
}

.login-info .icon-mobile-number {
  font-size: 12px;
}

.login-info .login-info-bottom {
  margin-top: 5px;
}

.login-icon i {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 2px;
  background: url('~assets/img/profile/phone.svg') no-repeat;
  background-size: 100%;
  vertical-align: middle;
}

.left-icon {
  width: 20px;
  height: 20px;
}

.left-icon i {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('~assets/img/profile/arrow.svg') no-repeat;
  background-size: 100%;
} 
</style>