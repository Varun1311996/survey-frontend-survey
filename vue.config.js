module.exports = {
  devServer: {
    port: 8081
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/Styles/survey.scss";',
        // implementation: require('node-sass')
      },
    },
  },
}