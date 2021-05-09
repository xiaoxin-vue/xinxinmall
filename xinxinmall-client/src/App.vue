<template>
  <div id="app">
    <!-- 保存页面(移动或者滚动)位置，Detail页面不需要保存 -->
    <div class="container">
      <keep-alive exclude="Detail">
        <router-view
          :class="[
            {'fadeInRight': isFadeRight === true}, 
            {'fadeInLeft': isFadeRight == false}
          ]"
          class="page-toggle-enter-active"
        />
      </keep-alive>
    </div>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar'

export default {
  name: 'App',
  data() {
    return {
      routerTo: ['home', 'category', 'cart', 'profile'],
      isFadeRight: true
    }
  },
  components: {
    MainTabBar
  },
  watch: {
    $route(to, from) {
      let ToIndex = this.routerTo.indexOf(to.path.substr(1))
      let FromIndex = this.routerTo.indexOf(from.path.substr(1))
      if(ToIndex > FromIndex) {
        this.isFadeRight = true
      } else {
        this.isFadeRight = false
      }
    }
  }
}
</script>

<style scoped>
  @import "assets/css/base.css";
  
  .fadeInRight {
    animation: my-fadeInRight 1s ease;
    -webkit-animation: my-fadeInRight 1s ease;
  }

  @keyframes my-fadeInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .fadeInLeft {
    width: 100%;
    height: 100%;
    animation: my-fadeInLeft 1s ease;
    -webkit-animation: my-fadeInLeft 1s ease;
  }

  @keyframes my-fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('~assets/img/common/shopping.jpg') no-repeat;
    background-size: 100% 100%;
  }
</style>
