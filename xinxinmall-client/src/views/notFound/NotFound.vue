<template>
  <div class="notFound">
    <img src="~assets/img/login-register-notFound/404.gif" alt="">
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.notFound {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  z-index: 10;
}
.notFound img {
  width: 100%;
  height: 100%;
}
</style>