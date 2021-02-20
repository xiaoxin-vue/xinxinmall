import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '../router'

//定义loading变量
let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(
  config => {
  // 加载动画
  startLoading()

  // 设置统一的请求头
  if(localStorage.eleToken) config.headers.Authorization = localStorage.eleToken 

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(
  res => {
  // 结束加载动画
  endLoading()
  // 返回数据
  console.log(res)
  return res
}, error => {
  // 结束加载动画
  endLoading()
  Message.error(error.response.data.msg)

  const { status } = err.response
  // 获取错误状态码
  if(status === 401) {
    Message.error('token值无效，请重新登录！')
    // 清除token
    localStorage.removeItem('eleToken')
    // 页面跳转
    router.push('/login')
  }

  // 处理错误响应并结束
  return Promise.reject(error)
})

export default axios