<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的</div>
    </nav-bar>

    <div class="profile-container">
      <!-- 用户信息 -->
      <user-info :userInfo="user"/>

      <!-- 账户信息 -->
      <account-info/>

      <!-- 菜单列表 -->
      <list-view/>

      <div class="exit"
        @click="exit"
        :class="{active: isActive}"
        @touchstart="changeActive1" 
        @touchend="changeActive2"
      >退出当前账号</div>
    </div>
  </div>
</template>

<script>
import UserInfo from './childComps/UserInfo'
import AccountInfo from './childComps/AccountInfo'
import ListView from './childComps/ListView'

import NavBar from 'components/common/navbar/NavBar'

import jwt_decode from "jwt-decode"

import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    ListView
  },
  data() {
    return {
      userInfoName: {},
      isActive: false
    }
  },
  created() {
    if(localStorage.eleToken) {
      // 解析token
      const decoded = jwt_decode(localStorage.eleToken)
      // 解析好的token储存到vuex中
      this.$store.dispatch('setIsAutnenticated', !this.isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  },
  computed: {
    ...mapGetters([
      'isAutnenticated',
      'user'
    ])
  },
  mounted() {
    this.$bus.$on('userLogin', (msg) => {
      this.$axios.post('/api/users/login', msg)
                 .then(res => {
                   console.log(res)
                   const decoded = jwt_decode(res.data.token)
                   this.userInfoName = decoded
                 })
    })
  },
  methods: {
    exit() {
      // 清除token
      if(localStorage.eleToken) {
        localStorage.removeItem('eleToken') 
        this.$message({
          message: '退出账号成功',
          type: 'success',
          offset: 1
        })
        // 强制刷新页面
        setTimeout(() => {
          location.reload();
        }, 500)
      } else {
        this.$message({
          message: '账号已退出',
          type: 'success',
          offset: 1
        })
      }
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      )
    },
    changeActive1() {
      this.isActive = true;
    },
    changeActive2() {
      this.isActive = false;
    }
  }
}
</script>

<style scoped>
#profile {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 14px;
}

.profile-container {
  width: 100%;
  height: calc(100% - 89px);
  overflow: auto;
}

.exit {
  height: 40px;
  margin-top: 8px;
  background-color: rgba(239,79,79, 0.9);
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}

.active {
  background-color: rgba(239,79,79, 0.5);
}
</style>