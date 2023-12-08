const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: process.env.BASE_URL,
  transpileDependencies: true,
  runtimeCompiler: true,
  assetsDir: '',
  configureWebpack: {
    resolve: {
        alias: {
            "jquery-ui": "jquery-ui-dist/jquery-ui.js",
            "jquery-ui-css": "jquery-ui-dist/jquery-ui.css",
        }
    }
  }
})
