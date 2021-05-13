<template>
  <div class="pay">
    <!-- 1.导航 -->
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <i class="iconfont icon-jiantou my-font"></i>
      </div>
      <div slot="center">支付订单</div>
    </nav-bar>

    <div class="pay-info">
      <img src="~assets/img/pay/pay_bg.jpg" alt="">
      <div class="info-content">
        <p class="time-container">剩余时间：<djs/></p>
        <p>{{goodInfo.title}}</p>
        <p>￥{{totalPrice || goodInfo.price}}</p>
        <p>订单号：<span>{{orderNumber}}</span></p>
      </div>
    </div>

    <div class="pay-method">
      <ul>
        <li @click.stop="liClick1" data-iid='0'>
          <div class="pay-left">
            <i class="iconfont icon-weixinzhifu my-pay-icon weixinzhifu"></i>
            <span>微信支付</span>
          </div>
          <div class="pay-right">
            <i class="iconfont icon-xuanzhong my-checked" v-if="currentIndex === 0"></i>
            <i class="iconfont icon-weixuanzhong my-nochecked" v-else></i>
          </div>
        </li>
        <li @click.stop="liClick2" data-iid='1'>
          <div class="pay-left">
            <i class="iconfont icon-zhifubao my-pay-icon zhifubao"></i>
            <span>支付宝支付</span>
          </div>
          <div class="pay-right">
            <i class="iconfont icon-xuanzhong my-checked" v-if="currentIndex === 1"></i>
            <i class="iconfont icon-weixuanzhong my-nochecked" v-else></i>
          </div>
        </li>
        <li @click.stop="liClick3" data-iid='2'>
          <div class="pay-left">
            <i class="iconfont icon-balance my-pay-icon balance"></i>
            <span>余额支付</span>
          </div>
          <div class="pay-right">
            <i class="iconfont icon-xuanzhong my-checked" v-if="currentIndex === 2"></i>
            <i class="iconfont icon-weixuanzhong my-nochecked" v-else></i>
          </div>
        </li>

        <el-collapse-transition>
          <div v-show="isShow">
            <li @click.stop="liClick4" data-iid='3'>
              <div class="pay-left">
                <i class="iconfont icon-tubiao_zhifu-yinhangkazhifu-95 my-pay-icon yinlian"></i>
                <span>银联支付</span>
              </div>
              <div class="pay-right">
                <i class="iconfont icon-xuanzhong my-checked" v-if="currentIndex === 3"></i>
                <i class="iconfont icon-weixuanzhong my-nochecked" v-else></i>
              </div>
            </li>
            <li @click.stop="liClick5" data-iid='4'>
              <div class="pay-left">
                <i class="iconfont icon-jiansheyinhang my-pay-icon jiansheyinhang"></i>
                <span>中国建设银行</span>
              </div>
              <div class="pay-right">
                <i class="iconfont icon-xuanzhong my-checked" v-if="currentIndex === 4"></i>
                <i class="iconfont icon-weixuanzhong my-nochecked" v-else></i>
              </div>
            </li>
            <li @click.stop="liClick6" data-iid='5'>
              <div class="pay-left">
                <i class="iconfont icon-yinhanglogo-1 my-pay-icon youzheng"></i>
                <span>中国邮政储蓄银行</span>
              </div>
              <div class="pay-right">
                <i class="iconfont icon-xuanzhong my-checked" v-if="currentIndex === 5"></i>
                <i class="iconfont icon-weixuanzhong my-nochecked" v-else></i>
              </div>
            </li>
            <li @click.stop="liClick7" data-iid='6'>
              <div class="pay-left">
                <i class="iconfont icon-yinhanglogo- my-pay-icon nongye"></i>
                <span>中国农业银行</span>
              </div>
              <div class="pay-right">
                <i class="iconfont icon-xuanzhong my-checked" v-if="currentIndex === 6"></i>
                <i class="iconfont icon-weixuanzhong my-nochecked" v-else></i>
              </div>
            </li>
          </div>
        </el-collapse-transition>

        <li class="morePay" @click="morePay" v-show="!isShow"
          :class="{active: isActive1}"
          @touchstart="changeActive1Start" 
          @touchend="changeActive1End"
        >
          <span>查看更多支付方式<i class="iconfont icon-jiantou"></i></span>
        </li>
        <li class="morePay" @click="litterPay" v-show="isShow"
          :class="{active: isActive1}"
          @touchstart="changeActive1Start" 
          @touchend="changeActive1End"
        >
          <span>收起更多支付方式<i class="iconfont icon-jiantou-shang"></i></span>
        </li>
      </ul>
    </div>

    <div class="pay-money" @click="visible = true">
      <span>确认支付：￥{{totalPrice || goodInfo.price}}</span>
    </div>

    <xx-modal title="温馨提示" width="60%" margin-top="100px" :visible.sync="visible">
      <!-- 具名插槽 加上template heade内容-->
      <template v-slot:title>
        <h4></h4>
      </template>
      <template>
        <img src="~assets/img/pay/Wechatpay.png" alt="" class="pay-img" v-if="currentIndex === 0">
        <img src="~assets/img/pay/Alipay.jpg" alt="" class="pay-img" v-if="currentIndex === 1">
        <span v-if="currentIndex === 2" class="other-pay">请使用余额支付</span>
        <span v-if="currentIndex === 3" class="other-pay">请使用银联支付</span>
        <span v-if="currentIndex === 4" class="other-pay">请使用建行卡支付</span>
        <span v-if="currentIndex === 5" class="other-pay">请使用邮政储蓄卡支付</span>
        <span v-if="currentIndex === 6" class="other-pay">请使用农行卡支付</span>
      </template>
      <template v-slot:footer>
        <span></span>
      </template>
    </xx-modal>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Djs from './djs.vue'
import jwt_decode from "jwt-decode"
import xxButton from './xx-components/xxButton'
import xxModal from './xx-components/xxModal'

export default {
  name: 'Pay',
  components: {
    NavBar,
    Djs,
    xxButton,
    xxModal
  },
  data() {
    return {
      goodInfo: {},
      goodId: '',
      userInfo: {},
      orderGoods: {},
      currentIndex: 0,
      visible: false,
      isShow: false,
      isActive1: false
    }
  },
  activated () {
    console.log('活跃后')
    // this.$bus.$on('payClick12', msg => {
    //   console.log(msg)
    // })
    // 获取url中的iid
    this.goodId = this.$route.query.iid

    if(localStorage.eleToken) {
      // 解析token
      const decoded = jwt_decode(localStorage.eleToken)
      this.userInfo = decoded
    }

    this.$axios({
      method: 'get',
      url: 'api/orders/currentUserOrder',
      params: {
        name: this.userInfo.name
      }
    }).then(res => {
      console.log(res.data[0])
      this.orderGoods = res.data[0]
      this.goodInfo = this.orderGoods.goods.find(item => item.iid === this.goodId)
      console.log(this.goodInfo)
    })
  },
  updated() {
  },
  created() {
  },
  mounted() {
  },
  computed: {
    totalPrice () {
      return parseFloat(this.goodInfo.price) * parseInt(this.goodInfo.count)
    },
    orderNumber () {
      return this.random_No(5)
    }
  },
  methods: {
    backClick () {
      this.$router.back()
      clearInterval(this.timer)
    },
    random_No (randomLen) {
      var random_no = "";
      for (var i = 0; i < randomLen; i++)
      {
        random_no += Math.floor(Math.random() * 10);
      }
      random_no = new Date().getTime() + random_no;
      return random_no;
    },
    morePay () {
      this.isShow = true
    },
    litterPay () {
      this.isShow = false
    },
    liClick1 (event) {
      console.log(event.target)
      // 获取自定义属性值 当不用组件时
      // console.log(event.target.getAttribute('data-iid'))
      // console.log(event.target.dataset.iid)
      this.currentIndex = parseInt(event.target.dataset.iid)
    },
    liClick2 (event) {
      console.log(event.target.dataset.iid)
      this.currentIndex = parseInt(event.target.dataset.iid)
    },
    liClick3 (event) {
      console.log(event.target.dataset.iid)
      this.currentIndex = parseInt(event.target.dataset.iid)
    },
    liClick4 (event) {
      console.log(event.target.dataset.iid)
      this.currentIndex = parseInt(event.target.dataset.iid)
    },
    liClick5 (event) {
      console.log(event.target.dataset.iid)
      this.currentIndex = parseInt(event.target.dataset.iid)
    },
    liClick6 (event) {
      console.log(event.target.dataset.iid)
      this.currentIndex = parseInt(event.target.dataset.iid)
    },
    liClick7 (event) {
      console.log(event.target.dataset.iid)
      this.currentIndex = parseInt(event.target.dataset.iid)
    },
    changeActive1Start () {
      this.isActive1 = true;
    },
    changeActive1End () {
      this.isActive1 = false;
    }
  },
  watch: {
    goodInfo(newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
      this.goodInfo = newValue
    }
  }
}
</script>

<style scoped>
.pay {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #F2F2F2;
  z-index: 10;
}

.nav-bar {
  background-color: #65BF65;
  color: #fff;
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

.pay-info {
  width: 100%;
}

.pay-info img {
  width: 100%;
}

.info-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #fff;
  color: #A6A6A6;
}

.time-container {
  display: flex;
}

.info-content p:nth-child(2) {
  width: 250px;
  margin-top: 10px;
  font-size: 14px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.info-content p:nth-child(3) {
  margin: 10px 0;
  font-size: 20px;
  color: #333;
}

.info-content p:nth-child(4) {
  font-size: 14px;
}

.pay-method {
  width: 100%;
  height: 52.5%;
  margin-top: 20px;
  background-color: #fff;
  overflow: auto;
}

.pay-method ul {
  width: 100%;
}

.pay-method ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 10px;
  border-bottom: 1px solid #ccc;
}

.pay-left {
  display: flex;
  align-items: center;
}

.pay-left span {
  margin-left: 10px;
  color: #333;
}

.my-pay-icon {
  font-size: 30px;
}

.my-checked {
  font-size: 20px;
  color: #62B660;
}

.my-nochecked {
  font-size: 22px;
}

.weixinzhifu {
  color: #06C505;
}

.zhifubao {
  color: #00A0EA;
}

.balance {
  color: #6CC571;
}

.yinlian {
  color: #d81e06;
}

.jiansheyinhang {
  color: rgb(0, 58, 144);
}

.youzheng {
  color: rgb(16, 140, 62);
}

.nongye {
  color: rgb(0, 145, 116);
}

.pay-method ul .morePay {
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  color: #333;
}

.pay-method ul .active {
  background-color: rgba(101, 191, 101, .5);
}

.pay-money {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #65BF65;
  color: #fff;
  font-size: 18px;
}

.pay-img {
  width: 100%;
}

.other-pay {
  display: inline-block;
  padding: 10px;
  background: rgb(240, 249, 235);
  font-size: 16px;
  color: rgb(103, 194, 58);
  text-align: center;
  border-radius: 5px;
}
</style>