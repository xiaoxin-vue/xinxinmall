<template>
  <div class="account-info">
    <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-msg">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance b">0</span>个
        </div>
        <div class="account-msg">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance c">0</span>分
        </div>
        <div class="account-msg">我的积分</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo'
}
</script>

<style scoped>
.account-info {
  display: flex;
  padding: 15px 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.account-item {
  flex: 1;
  border-right: 1px solid rgba(100, 100, 100, 0.1);
}

.account-item:last-child {
  border-right: 0;
}

.account-item .number {
  text-align: center;
  margin-bottom: 7px;
}

.account-item .account-msg {
  text-align: center;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-item .b {
  color: chartreuse;
}

.account-item .c {
  color: rgb(236, 152, 35);
}
</style>