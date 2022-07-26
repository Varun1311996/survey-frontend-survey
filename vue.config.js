module.exports = {
  devServer: {
    port: 8081
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/Styles/survey.scss";',
        // implementation: require('node-sass')
      },
    },
  },
}