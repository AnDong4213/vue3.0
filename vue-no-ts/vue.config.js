module.exports = {
  chainWebpack: config => {
    config.module.rule('images').use('url-loader').loader('url-loader')
      .tap(options => {
        console.log(options)
        return Object.assign(options, { limit: 10240 })
      })
  }
}

/* 
    isAbsoluteUrl
    /^([a-z][a-z\d\+\-\.]*:)?\/\//i

  /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.
*/