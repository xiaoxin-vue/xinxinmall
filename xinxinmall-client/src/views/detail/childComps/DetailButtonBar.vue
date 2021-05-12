<template>
  <div class="button-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="changeSelect">
        <i class="icon select" :class="{select2: isSelect}"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" 
           @click="addToCart"
           :class="{active: isActive}"
           @touchstart="changeActive1" 
           @touchend="changeActive2"
           >加入购物车</div>
      <div class="buy"
           @click="payClick11"
           :class="{active1: isActive1}"
           @touchstart="changeActive3" 
           @touchend="changeActive4">立即购买</div>
    </div>
  </div>
</template>

<script>
import { getDetail, Goods } from 'network/detail'

import jwt_decode from "jwt-decode"

export default {
  name: 'DetailButtonBar',
  data() {
    return {
      isActive: false,
      isActive1: false,
      isSelect: false,
      goodsId: '',
      goodsInfo: {},
      topImages: [],
      userInfo: {},
      count: 0
    }
  },
  created() {
    if(localStorage.eleToken) {
      // 解析token
      const decoded = jwt_decode(localStorage.eleToken)
      this.userInfo = decoded
    }

    console.log(this.$route.params.iid)
    this.goodsId = this.$route.params.iid

    getDetail(this.goodsId).then(res => {
      // 1.获取商品信息
      this.goods = new Goods(res.data.result.itemInfo, res.data.result.columns, res.data.result.shopInfo.services)
      this.topImages = res.data.result.itemInfo.topImages

      this.goodsInfo = {}
      this.goodsInfo.image = this.topImages[0]
      this.goodsInfo.title = this.goods.title
      this.goodsInfo.desc = this.goods.desc
      this.goodsInfo.price = this.goods.realPrice
      this.goodsInfo.iid = this.goodsId
      console.log(this.goodsInfo)
    })
  },
  methods: {
    addToCart() {
      this.$emit('addToCart');
    },
    payClick11 () {
      console.log('点击购买')
      console.log(this.goodsInfo)
      // this.$emit('payClick11', {
      //   goodsInfo: this.goodsInfo,
      //   userInfo: this.userInfo
      // })

      const param = {
        name: this.userInfo.name,
        goods: this.goodsInfo
      }
      console.log(param)
      this.$axios({
        method: 'post',
        url: 'api/orders/add',
        data: param, // 传递json字段时，需要加头部'Content-Type': 'application/json', 后端 req.body 接收
        params: {
          id: this.userInfo.id // ?id=XXX 参数 后端 req.query 接收
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

      this.$router.push({
        path: '/pay',
        query: {
          iid: this.goodsId
        }
      })
    },
    changeActive1() {
      this.isActive = true;
    },
    changeActive2() {
      this.isActive = false;
    },
    changeActive3() {
      this.isActive1 = true;
    },
    changeActive4() {
      this.isActive1 = false;
    },
    changeSelect() {
      this.isSelect = !this.isSelect;
    }
  }
}
</script>

<style scoped>
.button-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  background-color: #fff;
  text-align: center;
}

.bar-item {
  display: flex;
  flex: 1;
}

.bar-item>div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 6px auto 2px;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
}

.bar-left .select2 {
  background-position: 0 -26px;
}

.bar-left .service {
  background-position:0 -53px;
}

.bar-left .shop {
  background-position:0 -98px;
}

.bar-right {
  padding: 2px 0;
  font-size: 15px;
  line-height: 49px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
  border-radius: 24px 0 0 24px;
}

.bar-right .buy {
  background-color: #f69;
  color: #fff;
  border-radius: 0 24px 24px 0;
}

.bar-right .active {
  background-color: rgba(255, 232, 23, 0.4);
}

.bar-right .active1 {
  background-color: rgba(255, 0, 0, 0.4);
}
</style>