const registerRouter = require('./backend/router')

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_SECRET_KEY)


module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('images').use('url-loader').loader('url-loader')
      .tap(options => {
        console.log(options)
        return Object.assign(options, { limit: 10240 })
      })
  },
  devServer: {
    before(app) {
      registerRouter(app)
    }
  }
}
