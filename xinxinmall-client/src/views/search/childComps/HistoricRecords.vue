<template>
  <div class="historic-records">
    <div class="his-header">
      <div class="his-left">
        <i class='iconfont icon-sousuo my-font1'></i>
        <span>历史记录</span>
      </div>
      <i class="iconfont icon-shanchu my-font2" @click="deleteHis"></i>
    </div>
    <div class="his-items">
      <div v-if="dynamicTags.length">
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
      <div class="his-nothing" v-else>
        暂无历史搜索
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoricRecords',
  props: {
    dynamicTags: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose(tag) {
      this.$emit('handleClose', tag)
    },
    handleClick (tag) {
      console.log(tag)
      this.$bus.$emit('historyClick', tag)
    },
    deleteHis () {
      this.$emit('deleteHis')
    }
  }
}
</script>

<style scoped>
.historic-records {
  font-size: 12px;
  border-bottom: 1px solid rgba(100 100 100 / 15%);
  padding:10px 10px 10px 20px;
}

.his-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.his-left {
  display: flex;
  align-items: center;
}

.my-font1 {
  font-size: 20px;
}

.my-font2 {
  font-size: 20px;
}

.his-items {
  margin-top: 5px;
  font-size: 12px;
}

.his-nothing {
  padding: 20px;
}

::v-deep .el-tag {
  margin-right: 8px;
  margin-top: 10px;
}
</style>