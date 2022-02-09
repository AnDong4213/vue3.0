const registerRouter = require('./backend/router')
const TerserPlugin = require('terser-webpack-plugin')

console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_SECRET_KEY)

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'src/index/main.js',
    },
    subpage: {
      entry: 'src/subpage/main.js',
      template: 'public/subpage.html',
      filename: 'subpage.html',
      title: 'subpage Page',
    }
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量，共享全局变量
        additionalData: `
          @import "~@/assets/scss/variable.scss";
          @import "~@/assets/scss/mixin.scss";
        `
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                output: {
                  comments: false
                },
                // warnings: false,
                sourceMap: false,
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ['console.log'], //移除console
                }
              }
            })
          ],
          splitChunks: {
            cacheGroups: {
              vendor: {
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                minSize: 0,
                minChunks: 1,
                priority: 10,
                chunks: 'initial'
              },
              common: {
                name: 'common',
                test: /[\\/]src[\\/]/,
                chunks: 'all',
                minSize: 0,
                minChunks: 2
              }
            }
          }
        }
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
    },
    /* proxy: {
      '/api': {
        target: 'https://tc39.es/',
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    } */
  }
}
