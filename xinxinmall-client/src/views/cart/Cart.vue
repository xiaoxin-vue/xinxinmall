<template>
  <div class="cart">
    <!-- 1.导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>

    <div class="tiparea" v-if="!eleToken">
      <span>登录后可同步账户购物车中的商品<router-link to='/login'>登录</router-link></span>
    </div>

    <!-- 2.商品列表 -->
    <cart-list/>

    <!-- 3.底部汇总 -->
    <cart-button-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar'

import {mapGetters} from 'vuex'


export default {
  name: 'Cart',
  data() {
    return {
      eleToken: ''
    }
  },
  components: {
    NavBar,
    CartList,
    CartButtonBar
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log(to);
  //   console.log(from);
  //   if(localStorage.eleToken) {
  //     next()
  //   } else {
  //     next({path: '/login'})
  //   } 
  // },
  computed: {
    ...mapGetters([
      'cartListLength'
    ])
  },
  mounted() {
    this.eleToken = localStorage.eleToken
  },
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.tiparea {
  position: fixed;
  width: 100%;
  line-height: 40px;
  background-color: var(--color-tint);
  border-top: 1px solid #ccc;
  text-align: center;
  color: #fff;
  font-size: 13px;
  z-index: 11;
}
.tiparea a {
  display: inline-block;
  width: 50px;
  height: 30px;
  margin-left: 10px;
  background-color: orangered;
  border-radius: 15px;
  color: #fff;
  line-height: 30px;
  font-size: 14px;
}
</style>