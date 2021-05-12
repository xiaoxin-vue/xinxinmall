<template>
  <div class="buy-now">{{goodInfo}}</div>
</template>

<script>
export default {
  name: 'BuyNow',
  data() {
    return {
      goodInfo: {}
    }
  },
  created() {
    this.$bus.$on('payClick12', msg => {
      console.log('创建后')
      this.goodInfo = msg
      console.log(this.goodInfo)
    })
  }
}
</script>

<style scoped>

</style>