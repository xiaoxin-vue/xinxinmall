<template>
  <transition name="modal-fade">
    <div class="xx-modal_wrapper" v-show="visible" @click.self="handleClose">
      <div class="xx-modal" :style="{width: width, marginTop: marginTop}">
        <div class="xx-modal_header">
          <slot name="title">
            <span class="xx-modal_title">{{title}}</span>
          </slot>
          <button class="xx-modal_headerbtn" @click="handleClose">
            <i class="iconfont icon-x xx-icon-close"></i>
          </button>
        </div>
        <div class="xx-modal_body">
          <!-- 默认插槽 -->
          <slot></slot>
        </div>
        <div class="xx-modal_footer">
          <slot name="footer">
            <xx-button @handleClick="handleClose">取消</xx-button>
            <xx-button type="primary" @handleClick="handleClose">确定</xx-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import xxButton from './xxButton.vue'

export default {
  name: 'xxModal',
  components: {
    xxButton
  },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '50%'
    },
    marginTop: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: false  
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  },
}
</script>

<style scoped lang="scss">
.xx-modal_wrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, .5);

  .xx-modal {
    position: relative;
    margin: 15vh auto 50px;
    // background-color: #fff;
    border-radius: 2px;
    // box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
    width: 30%;

    &_header {
      // padding: 20px 20px 10px;

      .xx-modal_title {
        line-height: 24px;
        font-size: 18px;
        color: #333;
      }
      .xx-modal_headerbtn {
        position: absolute;
        // top: 20px;
        right: 20px;
        padding: 0;
        background-color: transparent;
        border: 0;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        
        .xx-icon-close {
          color: #fff;
        }
      }
    }

    &_body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }

    &_footer {
      // 上 左右 下
      // padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;

      .xx-button:nth-child(1) {
        margin-right: 20px;
      }
    }
  }
}

.modal-fade-enter, 
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  // opacity: 1;
  transition: all 1s ease;
}

</style>