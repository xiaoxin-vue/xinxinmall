<template>
  <div class="order-list">
    <Scroll ref="scroll" class="content">
      <order-list-item v-for="(item, index) in orderList"
                       :key="index" 
                       :item-info="item"
                       :is-delete="isDelete"
                       :user-data="userInfo"
      />
    </Scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import OrderListItem from './OrderListItem'

export default {
  name: 'OrderList',
  props: {
    isDelete: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: {}
    }
  },
  components: {
    Scroll,
    OrderListItem
  },
  data() {
    return {
      orderList: []
    }
  },
  mounted() {
    this.$axios({
      method: 'get',
      url: 'api/orders/currentUserOrder',
      params: {
        name: this.userInfo.name  // ?id=XXX 参数 后端 req.query 接收
      }
    }).then(res => {
      this.orderList = res.data[0].goods
      this.$refs.scroll.refresh()
    })
    this.$refs.scroll.refresh()
  },
  activated() {
    this.$axios({
      method: 'get',
      url: 'api/orders/currentUserOrder',
      params: {
        name: this.userInfo.name  // ?id=XXX 参数 后端 req.query 接收
      }
    }).then(res => {
      this.orderList = res.data[0].goods
      this.$refs.scroll.refresh()
    })
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.order-list {
  position: relative;
  height: 100%;
  z-index: 100;
}

.content {
  width: 100%;
  height: 622px;
  overflow: hidden;
}

</style>