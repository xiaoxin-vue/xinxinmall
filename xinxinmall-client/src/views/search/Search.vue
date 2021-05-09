<template>
  <div class="search">
    <!-- 搜索框 -->
    <search-nav-bar
      @searchVla="searchVla"
    />

    <!-- 历史记录 -->
    <historic-records
      :dynamic-tags="HistoricArr"
      @deleteHis="deleteHis"
      @handleClose="handleClose"
    />

    <!-- 热门搜索 -->
    <hot-search/>
    <!-- <div>{{goodsData}}</div> -->
  </div> 
</template>

<script>
import SearchNavBar from './childComps/SearchNavBar.vue'
import HistoricRecords from './childComps/HistoricRecords.vue'
import HotSearch from './childComps/HotSearch.vue'

import {getHomeGoods} from 'network/home'

export default {
  name: 'Search',
  components: {
    SearchNavBar,
    HistoricRecords,
    HotSearch
  },
  data() {
    return {
      HistoricArr: [],
      newArr: [],
      goodsData: []
    }
  },
  created() {
    // 1.请求所有商品数据
    for (let i = 1; i < 21; i++) {
      getHomeGoods('pop', i).then(res => {
        this.goodsData.push(...res.data.data.list)
      })
    }

    console.log(this.goodsData)
  },
  methods: {
    searchVla (value) {
      console.log(value)
      if (value && !this.HistoricArr.find(item => item === value)) {
        this.HistoricArr.push(value)
      }
      console.log(this.goodsData);

      let roles = new RegExp(value, "i")
      if (value) {
        this.newArr = this.goodsData.filter(item => {
          return roles.test(item.title)
        })

        this.$router.push({
          path: '/wall',
          query: { q: value }
        })
      }
      console.log(this.newArr)
      // 传递数据给Wall组件
      this.$bus.$emit('searchVla', this.newArr)
      this.$bus.$emit('searchVla1', value)
    },
    deleteHis () {
      // 清空数组
      this.HistoricArr.splice(0)
    },
    handleClose (tag) {
      this.HistoricArr.splice(this.HistoricArr.indexOf(tag), 1)
    }
  }
}
</script>

<style scoped>
.search {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 10;
}
</style>