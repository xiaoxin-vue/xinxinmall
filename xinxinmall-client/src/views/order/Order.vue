<template>
  <div class="Order">
    <!-- 1.导航 -->
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <i class="iconfont icon-jiantou my-font"></i>
      </div>
      <div slot="center">订单中心</div>
      <div slot="right">
        <span class="setting"
          @click="settingClick"
          :class="{active: isActive}"
          @touchstart="changeActive1" 
          @touchend="changeActive2"
          >管理</span>
      </div>
    </nav-bar>
    <!-- 2.订单列表 -->
    <order-list :is-delete="isDelete" :user-info="userInfo" v-if="orderGoods.goods.length !== 0"/>
    <div v-else class="empty-order">
      <img src="~assets/img/order/EmptyOrder.jpeg" alt="">
    </div>

    <div class="deleteAll" :class="{'opacityType': isDelete}" @click="deleteAll" v-show="orderGoods.goods.length !== 0">
      <span>全部删除</span>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import OrderList from './childComps/OrderList'

import jwt_decode from "jwt-decode"

export default {
  name: 'Order',
  components: {
    NavBar,
    OrderList
  },
  data() {
    return {
      orderGoods: [],
      isDelete: false,
      userInfo: {},
      isActive: false
    }
  },
  activated () {
    console.log('活跃的');
    if(localStorage.eleToken) {
      // 解析token
      const decoded = jwt_decode(localStorage.eleToken)
      this.userInfo = decoded
    }
    console.log(this.userInfo.name)

    this.$axios({
      method: 'get',
      url: 'api/orders/currentUserOrder',
      params: {
        name: this.userInfo.name  // ?id=XXX 参数 后端 req.query 接收
      }
    }).then(res => {
      this.orderGoods = res.data[0]
      console.log(this.orderGoods)
    })
  },
  // mounted() {
  //   if(localStorage.eleToken) {
  //     // 解析token
  //     const decoded = jwt_decode(localStorage.eleToken)
  //     this.userInfo = decoded
  //   }
  //   console.log(this.userInfo.name)

  //   this.$axios({
  //     method: 'get',
  //     url: 'api/orders/currentUserOrder',
  //     params: {
  //       name: this.userInfo.name  // ?id=XXX 参数 后端 req.query 接收
  //     }
  //   }).then(res => {
  //     this.orderGoods = res.data[0]
  //     console.log(this.orderGoods)
  //   })
  // },
  methods: {
    backClick () {
      this.$router.back()
    },
    settingClick () {
      this.isDelete = !this.isDelete
    },
    deleteAll () {
      this.$axios({
        method: 'delete',
        url: 'api/orders/delete/allOrderGood',
        params: {
          name: this.userInfo.name  // ?id=XXX 参数 后端 req.query 接收
        }
      }).then(() => {
        location.reload()
      })
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
.Order {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgb(246, 246, 246);
  z-index: 10;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.setting {
  padding: 4px 6px;
  background-color: rgb(225, 243, 216);
  font-size: 14px;
  color: rgb(103, 194, 58);
  border-radius: 4px;
}

.active {
  background-color: rgb(225, 243, 216, .5);
}

.back {
  transform: rotate(90deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-font {
  color: #fff;
  font-size: 25px;
}

.deleteAll {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 49px;
  background-color: #f00;
  transition: all 1s ease;
  opacity: 0;
  z-index: 100;
}

.opacityType {
  opacity: 1;
}

.deleteAll span {
  color: #fff;
  font-weight: 700;
}

.empty-order {
  width: 100%;
  height: 100%;
  background: rgb(248, 249, 251);
}

.empty-order img {
  width: 100%;
}
</style>