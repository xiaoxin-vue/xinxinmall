import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Login = () => import('views/login/Login')
const Register = () => import('views/register/Register')
const notFound = () => import('views/notFound/NotFound')
const Search = () => import('views/search/Search')
const Wall = () => import('views/wall/Wall')
const Order = () => import('views/order/Order')
const Pay = () => import('views/pay/Pay')
const BuyNow = () => import('views/pay/BuyNow')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/wall',
    component: Wall
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/buynow',
    component: BuyNow
  },
  {
    path: '*',
    component: notFound
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router 