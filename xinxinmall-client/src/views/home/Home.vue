<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="left" class="nav-left">
      <div id="container"></div>
      <div class="left-info">
        <span class="text">当前城市:</span>
        <span id='left-info'>
          <i class="iconfont icon-dingwei1 my-dingwei"></i>
        </span>
      </div>
    </div>
    <div slot="center" class="nav-center">
      <input type="text" class="search-form-input" placeholder="连衣裙" @focus="searchTo">
    </div>
    <div slot="right" class="nav-right"  @click="drawer = true" >
      <i class="iconfont icon-liebiao my-liebiao"></i>
    </div>
  </nav-bar>
  <tab-control class="tab-control" 
               :title="['流行','新款','精选']" 
               @tabClick="tabClick"
               ref="tabControl1"
               v-show="isTabFixed"/>
  <scroll class="content" 
          ref="scroll" 
          :probe-type-num="3" 
          @scroll="contentScroll" 
          :pull-up-load="true"
          @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/> 
    <home-recommend-view :recommends="recommends"/>
    <home-feature-view/>
    <tab-control :title="['流行','新款','精选']" 
                 @tabClick="tabClick"
                 ref="tabControl2"/>
    <goods-list :goods="showGoodsList"/>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  <el-drawer
    title="我是标题"
    :visible.sync="drawer"
    :with-header="false">
    <div class="goods-item" v-for="(item, index) in newDrawerList" :key="index">
      <img :src="item.url" alt="">
      <div>{{item.info}}</div>
    </div>
  </el-drawer>
</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'Home',
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []}, 
        'sell': {page: 0, list: []}  
      },
      currentData: 'pop',
      offSetTop: 0,
      isTabFixed: false,
      saveScrollY: 0,
      map: null,
      goodsData: [],
      drawer: false,
      newDrawerList: [
        {
          url: require('assets/img/common/NewInAutumn.gif'),
          info: '秋季上新'
        },
        {
          url: require('assets/img/category/skirts/(1).jpeg'),
          info: '裙子'
        },
        {
          url: require('assets/img/category/shoes/(7).jpeg'),
          info: '女鞋'
        },
        {
          url: require('assets/img/category/ornaments/(10).jpeg'),
          info: '配饰'
        },
        {
          url: require('assets/img/category/makeups/(5).jpeg'),
          info: '美妆'
        }
      ]
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentData].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
      
    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
    
    // 3.请求所有商品数据
    for (let i = 1; i < 21; i++) {
      getHomeGoods('pop', i).then(res => {
        this.goodsData.push(...res.data.data.list)
      }) 
    }
  },
  mounted() {
    this.initMap()
  },
  activated() {
    // 活跃状态使其滚动到保存的y值位置，并且设置这个滚动时间为0
    this.$refs.scroll.scrollTo(0, this.saveScrollY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 不活跃时保存滚动y值
    this.saveScrollY = this.$refs.scroll.geScrollY();

    // 不活跃时关闭事件总线上的itemImageLoad事件上的itemImgListener
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  methods: {
    // 事件监听相关的方法
    // 1.通过子组件TabControl发射过来的自定义事件，在父组件Home定义这个事件的方法tabClick()
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentData = 'pop';
          break;
        case 1:
          this.currentData = 'new';
          break;
        case 2:
          this.currentData = 'sell';
      }
      // 让两个tabControl的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 监听回到顶部的点击
      this.listenShowBackTop(position);
      // 监听tab-control的停留
      this.isTabFixed = (-position.y) > this.offSetTop;
    },
    loadMore() {
      // this.$refs.scroll是scrol组件，里面的data（scroll）包含BScroll实例的全部属性和方法
      // console.log(this.$refs.scroll.scroll);
      // scrollerHeight 获取对象的滚动高度
      // console.log(this.$refs.scroll.scroll.scrollerHeight);
      this.getHomeGoods(this.currentData);     
    },
    swiperImageLoad() {
      this.offSetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // 结束上拉加载行为，使其再次刷新数据
        this.$refs.scroll.finishPullUp();
      })  
    },
    initMap () {
      AMapLoader.load({
        "key": "50516e660a00897a6cef2bfff200b108",  // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.CitySearch'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        "AMapUI": {             // 是否加载 AMapUI，缺省不加载
            "version": '1.1',   // AMapUI 缺省 1.1
            "plugins":[],       // 需要加载的 AMapUI ui插件
        },
        "Loca":{                // 是否加载 Loca， 缺省不加载
            "version": '1.3.2'  // Loca 版本，缺省 1.3.2
        }
      }).then((AMap)=>{
        let map = new AMap.Map('container', {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13
        })

        this.showCityInfo(AMap, map)
      }).catch(e => {
        console.log(e);
      })
    },
    //获取用户所在城市信息
    showCityInfo (AMap, map) {
      //实例化城市查询类
      var citysearch = new AMap.CitySearch();
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
                var cityinfo = result.city;
                var citybounds = result.bounds;
                //地图显示当前城市
                map.setBounds(citybounds);
                document.getElementById('left-info').innerHTML = cityinfo
                console.log(cityinfo)
            } else {
              document.getElementById('info').innerHTML = result.info;
            }
          }
      })
    },
    searchTo () {
      console.log(this.goodsData)
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  background-color: #fff;
}

.home-nav {
  /* 为了使用浏览器的原生滚动才使用固定定位，使用了bs的局部滚动就不需要此定位了 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  /* z-index: 9; */
  background-color: #fff;
  color: #fff;
}

.nav-left {
  width: 100%;
  height: 100%;
  color: #999;
  /* background-color: #ff8198; */
}

.left-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  font-size: 14px;
}

.left-info .text {
  font-size: 12px;
}

.text,
#left-info {
  width: 100%;
  height: 20px;
  text-align: left;
  line-height: 20px;
}

.text {
  font-size: 8px;
}

#left-info {
  text-align: left;
  color: #FF9377;
}

.my-dingwei {
  display: inline-block;
  width: 100%;
  height: 100%;
  margin-left: 16px;
  font-size: 23px;
  font-weight: normal;
}

#container {
  display: none;
  width: 100%;
  height: 44px;
}

::v-deep .amap-logo,
::v-deep .amap-copyright {
  display: none !important;
}

.nav-center {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.search-form-input {
  display: block;
  width: 98%;
  height: 90%;
  padding-left: 25px;
  outline: none;
  font-size: 14px;
  color: #999;
  border: none;
  background: #eee url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAAQlBMVEUAAAC8vLy8vLz///+8vLy8vLy8vLy+vr67u7u7u7u9vb2+vr6/v7/ExMTDw8PCwsK+vr68vLy7u7u8vLy+vr67u7v4YfcLAAAAFXRSTlMAnNsB8222J/q8ZT8cGhEMTsLwozoqaKd7AAAAuUlEQVQoz72SyxbDIAhE1fiIRmNe/P+vdhaxtZxUdr0rkREHRd1k5421xrusHih6pptZF8XZLHXYjaUdgZhCrSFFAu77NHbM0qLFIOwrFBTf10+87rii86BxGulOgAr6HWU4R/GeBV3kzlxUjNhZ9ESJ5xORb2tcFng+wFJbw33l+YoOpLxUX/In9Se9z/h9z/H/HGX8v34azQfQ0+/5OnwTPM7nWSbNBHy+mYDxT4ESBJcgCGrEFdQLlUURxlykoysAAAAASUVORK5CYII=) no-repeat 0.15rem center;
  background-size: 20px auto;
  border-radius: 5px;
}

.nav-right {
  /* background-color: orangered; */
  text-align: center;
}

.my-liebiao {
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 23px;
  font-weight: normal;
  color: #999;
}

/* .tab-control {
  /* 当页面滚动到一个位置时会自动将元素的位置设置为固定(position: fixed;)，回退到固定位置自动解除 
  position: sticky;
  top: 44px;
  z-index: 9;
} */

.tab-control {
  position: relative;
  top: -1px;
  z-index: 9;
}

.content {
  /* bug?为什么使用betterscroll不能滚动 */
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
  /* height: calc(100% - 93px);*/
  /* margin-top: 44px;  */
}

.goods-item {
  padding: 10px;
  margin-bottom: 5px;
  text-align: center;
}

.goods-item img {
  width: 100%;
  height: 100%;
}

.goods-item>div {
  padding-top: 3px;
  font-size: 14px;
  color: #FF9377;
}
</style>