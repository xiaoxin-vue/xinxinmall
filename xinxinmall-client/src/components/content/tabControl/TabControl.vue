<template>
  <div class="tab-control">
    <div v-for="(item, index) in title" class="tab-control-item">
      <span @click="itemClick(index)" :class="{'fontClass': index === currentIndex}">
        {{item}}
        <div class="line" :class="{active: index === currentIndex}"></div>
      </span>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 给父组件发射自定义事件，用于传递index
      this.$emit('tabClick', index);
    }
  },
}
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  position: relative;
  padding: 5px;
  transition: all 1s ease;
}

.line {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 3px;
  background-color: var(--color-tint);
  transform: translateX(-50%);
  border-radius: 4px;
  transition: all 1s ease;
}

.active {
  width: 35px;
}

.fontClass {
  font-weight: 700;
  color: #F4606C;
}
</style>