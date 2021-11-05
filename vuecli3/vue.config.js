module.exports = {
  transpileDependencies: ["vue-echarts", "resize-detector"],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api/": ""
        }
      }
    }
  }
};
