module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common', 
        'components': '@/components', 
        'network': '@/network', 
        'views': '@/views'         
      }
    }
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: { // 配置跨域
      '/api': {
          target: 'http://localhost:8080/api/',
          ws: true,
          changOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
      }
    },
    before: app => { }
  }
}

