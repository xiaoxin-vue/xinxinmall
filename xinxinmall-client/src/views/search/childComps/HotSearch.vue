<template>
  <div class="hot-search">
    <div class="hot-header">
      <div class="hot-left">
        <i class='iconfont icon-remen my-font1'></i>
        <span>热门搜索</span>
      </div>
    </div>
    <div class="hot-items">
      <el-tag
        :key="tag"
        :type="'info'"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        @click="handleClick(tag)"
      >
        {{tag}}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSearch',
  data() {
    return {
      dynamicTags: ['卫衣', '外套', '短袖', '背带裤', '包包', '睡衣', '衬衫', '连衣裙', '内衣', '裙子']
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleClick (tag) {
      console.log(tag)
      this.$bus.$emit('hotClick', tag)
    }
  }
}
</script>

<style scoped>
.hot-search {
  font-size: 12px;
  border-bottom: 1px solid rgba(100 100 100 / 15%);
  padding:10px 10px 10px 20px;
}

.hot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.hot-left {
  display: flex;
  align-items: center;
}

.my-font1 {
  margin-right: 3px;
  font-size: 20px;
}

.hot-items {
  margin-top: 5px;
  font-size: 12px;
}

::v-deep .el-tag {
  margin-right: 8px;
  margin-top: 10px;
}

::v-deep .el-tag:nth-child(2),
::v-deep .el-tag:nth-child(8),
::v-deep .el-tag:nth-child(10) {
  color: #ff5777;
}
</style>
