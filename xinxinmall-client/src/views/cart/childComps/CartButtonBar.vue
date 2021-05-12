<template>
  <div class="botton-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkedAll"/>
      <span class="select-all">全选</span>
    </div>
    <div class="total-price">合计:￥{{totalPrice}}</div>
    <div class="calculate" 
      @click="calcClick"
      :class="{active: isActive}"
      @touchstart="changeActive1" 
      @touchend="changeActive2"
    >
      提交订单({{checkedCartListLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'CartButtonBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters([
      'checkedCartListLength',
      'totalPrice',
      'isSelectAll',
      'isNotSelectAll',
      'cartList',
      'user'
    ])
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    checkedAll() {
      this.$store.commit('checkedAll', this.isSelectAll);
    },
    calcClick() {
      if(this.isNotSelectAll) {
        // 使用toast组件
        this.$toast.show('请选择购买的商品');
      } else {
        const param = {
          name: this.user.name,
          goods: this.cartList
        }
        this.$axios({
          method: 'post',
          url: 'api/orders/add',
          data: param, // 传递json字段时，需要加头部'Content-Type': 'application/json', 后端 req.body 接收
          params: {
            id: this.user.id  // ?id=XXX 参数 后端 req.query 接收
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          console.log(res)
          this.$message({
            message: '提交订单成功',
            type: 'success',
            offset: 1,
            duration: 2000
          })
        })
        setTimeout(() => {
          location.reload()
        }, 500)
      }
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
.botton-bar {
  display: flex;
  width: 100%;
  height: 42px;
  padding-left: 10px;
  box-shadow: 0 -2px 3px rgba(100, 100, 100, 0.2);
  background-color: pink;
  font-size: 14px;
  color: #888; 
}

.check-content {
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
}

.select-all {
  margin-left: 5px;
}

.total-price {
  flex: 1;
  margin-left: 20px;
  font-size: 17px;
  color: #666;
  line-height: 40px;
}

.calculate {
  width: 100px;
  height: 40px;
  background-color: orangered;
  font-size: 15px;
  color: #fff;
  text-align: center;
  line-height: 40px;
}

.botton-bar .active {
  background-color: rgba(255, 0, 0, 0.4);
}
</style>