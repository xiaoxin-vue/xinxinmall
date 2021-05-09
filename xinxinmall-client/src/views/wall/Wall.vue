<template>
  <div class="wall">
    <wall-nav-bar/>
    <div class="screen">
      <ul>
        <li
          v-for="(item, index) in textList"
          :key="index"
          :class="{active: index === currentIndex}"
          @click="liClick(index)"
        >
        {{item}}
        </li>
        <li class="price"
          :class="{'showColor': isShow}"
          @click="isShow = !isShow"
        >
          价格<i class="iconfont icon-jiantou my-font"></i>
        </li>
        <transition name="my-tran">
          <div class="price_box" v-show="isShow">
            <ul class="price_container">
              <li v-for="(item, index) in priceList" :key="index" class="price-item" @click="priceClick(item)">{{item}}</li>
            </ul>
            <div class="price-input">
              <span>区间(元)</span>
              <span class="input-content">
                <input type="text" v-model="lowprice">
                -
                <input type="text" v-model="highprice">
                <span class="confirmBtn" @click="confirmClick">确认</span>
              </span>
            </div>
          </div>
        </transition>
      </ul>
    </div>
    <goods-list v-if="realGoodsList.length" :goods="realGoodsList" class="wall-goods-list"/>
    <div v-else class="nothing">
      <span>非常抱歉！！！没有找到<i class="styleRed">“{{$route.query.q}}”</i>相关的宝贝</span>
      <img src="~assets/img/search/sorry.jpeg" alt="">
    </div>
  </div>
</template>

<script>
import GoodsList from '../../components/content/goods/GoodsList.vue'
import WallNavBar from './childComps/WallNavBar.vue'

export default {
  name: 'Wall',
  components: {
    GoodsList,
    WallNavBar
  },
  data() {
    return {
      goodsList: [],
      textList: ['综合', '销量', '新品'],
      currentIndex: 0,
      isShow: false,
      priceList: ['30 - 50', '50 - 80', '80 - 100'],
      lowprice: null,
      highprice: null,
      realGoodsList: []
    }
  },
  mounted () {
    this.$bus.$on('searchVla', (msg) => {
      this.goodsList = msg
      this.realGoodsList = JSON.parse(JSON.stringify(this.goodsList))
      this.realGoodsList.sort(this.compare('price'))
    })
  },
  methods: {
    liClick (index) {
      this.currentIndex = index

      if (index === 0) {
        // 点击筛选价格
        this.realGoodsList.sort(this.compare('price'))
      } else if (index === 1) {
        // 点击筛选销量
        this.realGoodsList.sort(this.compare('sale'))
      } else {
        this.realGoodsList.sort(this.compareHigh('sale'))
      }
    },
    priceClick (value) {
      let priceArr = value.split('-')
      const newPriceArr = []

      for (let i = 0; i < priceArr.length; i++) {
        let priceItem = parseInt(priceArr[i].trim())
        newPriceArr.push(priceItem)
      }

      this.lowprice = newPriceArr[0]
      this.highprice = newPriceArr[1]
    },
    confirmClick () {
      this.realGoodsList = this.goodsList.filter(item => {
        return item.price > this.lowprice && item.price < this.highprice
      })
      this.isShow = false
    },
    // 筛选从低到高
    compare (key) {
      return function (a, b) {
        let value1 = a[key]
        let value2 = b[key]
        return value1 - value2
      }
    },
    // 筛选从高到低
    compareHigh (key) {
      return function (a, b) {
        let value1 = a[key]
        let value2 = b[key]
        return value2 - value1
      }
    }
  }
}
</script>

<style scoped>
.wall {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgb(246, 246, 246);
  z-index: 10;
}

.screen {
  width: 100%;
  height: 40px;
  border-top: 1px solid #ccc;
  box-shadow: 0px 1px 2px #ccc;
}

.screen>ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.screen>ul>li {
  display: inline-block;
  width: 25%;
  height: 18px;
  list-style: none;
  text-align: center;
  line-height: 20px;
  border-right: 1px solid #ccc;
  transition: .5s all ease;
}

.active {
  color: #ff5777;
  font-weight: 700;
}

.price {
  border-right: 0;
}

.showColor {
  color: #ff5777;
  font-weight: 700;
}

.price_box {
  position: absolute;
  top: 80px;
  width: 100%;
  padding: 15px 5px;
  z-index: 12;
  background-color: #fff;
}

.price_container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.price-item {
  width: 110px;
  padding: 10px 0;
  list-style: none;
  background-color: rgb(243, 243, 243);
  text-align: center;
}

.price-input {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.price-input span:nth-child(1) {
  width: 70px;
  line-height: 30px;
}

.price-input input {
  width: 80px;
  height: 30px;
  border: 1px solid #ccc;
  outline: none;
  text-align: center;
}

.input-content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}

.confirmBtn {
  width: 100px;
  height: 30px;
  background-color: rgb(255, 91, 118);
  color: #fff;
  text-align: center;
  line-height: 30px;
}

.my-font {
  margin-left: 5px;
}

.wall-goods-list {
  height: calc(100% - 89px);
  background-color: #fff;
  overflow: auto;
}

.my-tran-enter-active, .my-tran-leave-active {
  transition: all .3s;
  height: 105px;
}

.my-tran-enter, .my-tran-leave-to {
  opacity: 0;
  height: 0;
}

.nothing {
  padding-top: 10px;
}

span i {
  font-style: normal;
  color: red;
}

.nothing img {
  width: 100%;
  height: 100%;
}
</style>