<template>
  <div class="list-view">
    <div class="list-item">
      <div class="item-img">
        <img src="~assets/img/profile/order.svg" alt="">
      </div>
      <span class="item-info">{{listData[0]}}</span>
      <i class="item-icon"></i>
    </div>
    <div class="list-item">
      <div class="item-img">
        <img src="~assets/img/profile/integral.svg" alt="">
      </div>
      <span class="item-info">{{listData[1]}}</span>
      <i class="item-icon"></i>
    </div>
    <div class="list-item">
      <div class="item-img">
        <img src="~assets/img/profile/member.svg" alt="">
      </div>
      <span class="item-info">{{listData[2]}}</span>
      <i class="item-icon"></i>
    </div>
    <div class="list-item">
      <div class="item-img">
        <img src="~assets/img/profile/service.svg" alt="">
      </div>
      <span class="item-info">{{listData[3]}}</span>
      <i class="item-icon"></i>
    </div>
    <div class="list-item">
      <div class="item-img">
        <img src="~assets/img/profile/setup.svg" alt="">
      </div>
      <span class="item-info">{{listData[4]}}</span>
      <i class="item-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  data() {
    return {
      listData: [
        '我的订单',
        '积分商城',
        '外卖会员卡',
        '服务中心',
        '设置'
      ]
    }
  },
}
</script>

<style scoped>
.list-view {
  padding: 0 0 0 10px;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.list-item .item-info {
  position: relative;
  left: 5px;
  top: -1px;
  width: 90%;
  font-size: 15px;
  color: #333;
}

.list-item .item-img{
  display: inline-block;
}

.item-img img {
  width: 25px;
  height: 25px;
}

.item-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('~assets/img/profile/arrow(2).svg') no-repeat;
  background-size: 100%;
}
</style>