<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="nav-center">
      <input type="text" v-model="placeVlaue" class="search-form-input" placeholder="连衣裙" @focus="focusSearch" :class="{'active': isActive}">
    </div>
    <div slot="right" class="right-search">
      <span @click="searchTo">搜索</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'SearchNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      isActive: false,
      placeVlaue: ''
    }
  },
  mounted() {
    this.$bus.$on('historyClick', (msg) => {
      this.placeVlaue = msg
    })

    this.$bus.$on('hotClick', (msg) => {
      this.placeVlaue = msg
    })
  },
  methods: {
    backClick () {
      this.$router.back()
    },
    focusSearch () {
      this.isActive = true
    },
    searchTo () {
      // console.log(this.placeVlaue)
      this.$emit('searchVla', this.placeVlaue)
    }
  }
}
</script>

<style scoped>
.back img {
  position: relative;
  top: 6px;
  left: 18px;
}

.nav-center {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.search-form-input {
  display: block;
  width: 98%;
  height: 90%;
  padding-left: 25px;
  outline: none;
  font-size: 14px;
  color: #333;
  border: none;
  background: #eee url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAAQlBMVEUAAAC8vLy8vLz///+8vLy8vLy8vLy+vr67u7u7u7u9vb2+vr6/v7/ExMTDw8PCwsK+vr68vLy7u7u8vLy+vr67u7v4YfcLAAAAFXRSTlMAnNsB8222J/q8ZT8cGhEMTsLwozoqaKd7AAAAuUlEQVQoz72SyxbDIAhE1fiIRmNe/P+vdhaxtZxUdr0rkREHRd1k5421xrusHih6pptZF8XZLHXYjaUdgZhCrSFFAu77NHbM0qLFIOwrFBTf10+87rii86BxGulOgAr6HWU4R/GeBV3kzlxUjNhZ9ESJ5xORb2tcFng+wFJbw33l+YoOpLxUX/In9Se9z/h9z/H/HGX8v34azQfQ0+/5OnwTPM7nWSbNBHy+mYDxT4ESBJcgCGrEFdQLlUURxlykoysAAAAASUVORK5CYII=) no-repeat 0.15rem center;
  background-size: 20px auto;
  border-radius: 5px;
}

.active {
  border: 1px solid #ff5777;
}

.right-search {
  text-align: center;
  font-size: 14px;
}
</style>