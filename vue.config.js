module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "~@/assets/scss/app.scss";      
        `
      }
    }
  },
  chainWebpack: config => {
    config.performance.maxEntrypointSize(400000).maxAssetSize(400000);
  }
};
