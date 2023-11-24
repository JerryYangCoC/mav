const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
