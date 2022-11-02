const path = require('path')
// 最终会在nodejs执行， 这是commonJS的规范
module.exports = {
  // 1.配置方式一: CLI提供的属性
  // outputDir: './build/vue3-admin',
  publicPath: './',
  // assetsDir: './static',
  assetsDir: 'static',
  // indexPath: './html/index.html',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 解决跨域
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'https://sailing.kiccer.com:7802',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  // 配置方式二: 和webpack属性完全一致, 最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 3.配置方式三:
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
}
