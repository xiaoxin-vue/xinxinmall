<template>
  <div class="shop-item">
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{itemInfo.price}} <span>x{{itemInfo.count || 1}}</span>  </div>
        <div
          class="item-count right"
          :class="{active: isActive1}"
          @touchstart="changeActive1Start" 
          @touchend="changeActive1End"
          @click="paidClick(itemInfo)"
        >
          待付款
        </div>
      </div>
    </div>
    <div class="item-selector" :class="{'width50': isDelete}" @click="deleteClick(itemInfo)">
      <span>删除</span>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartListItem',
  data() {
    return {
      isActive: false,
      isActive1: false
    }
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object,
      default: {}
    }
  },
  components: {
    CheckButton
  },
  mounted() {
  },
  methods: {
    deleteClick (itemInfo) {
      this.$axios({
        method: 'delete',
        url: 'api/orders/delete/orderGood',
        params: {
          name: this.userData.name,  // ?id=XXX 参数 后端 req.query 接收
          iid: itemInfo.iid
        }
      }).then(() => {
        this.$axios({
          method: 'get',
          url: 'api/orders/currentUserOrder',
          params: {
            name: this.userData.name
          }
        })
        .then(res => {
          location.reload()
        })
      })
    },
    changeActive() {
      this.isActive = true;
    },
    changeActive1Start () {
      this.isActive1 = true;
    },
    changeActive1End () {
      this.isActive1 = false;
    },
    paidClick (itemInfo) {
      console.log(itemInfo)
      this.$router.push({
        path: './pay',
        query: {
          iid: itemInfo.iid
        }
      })
      this.$bus.$emit('paidClick', itemInfo)
    }
  }
}
</script>

<style scoped>
.shop-item {
  position: relative;
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 0;
  background-color: rgba(255, 0, 0, .7);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  z-index: 20;
  transition: all 1s ease;
  overflow: hidden;
}

.item-selector span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 50px;
  text-align: center;
}

.transparentFont {
  color: transparent;
}

.width50 {
  width: 50px;
}

.item-img {
  padding: 5px;
}

.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
}

.item-info {
  position: relative;
  overflow: hidden;
  padding: 5px 10px;
  font-size: 17px;
  color: #333;
}

.item-info .item-desc {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-bottom {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  margin-top: 10px;
}

.item-bottom .item-price {
  color: orangered;
  position: relative;
  top: 3px;
}

.item-price span {
  font-size: 13px;
  color: skyblue;
}

.item-bottom .item-count {
  padding: 3px;
  background-color: orange;
  font-size: 14px;
  color: #fff;
  border-radius: 3px;
}

.item-bottom .active {
  background-color: rgba(255, 232, 23, 0.4);;
}
</style>