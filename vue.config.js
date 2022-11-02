var path = require("path");

module.exports = {
  lintOnSave:false,  //关闭语法检查
  css: {
    loaderOptions: {
      stylus: {
        import: path.resolve(__dirname, "./src/styles/global.styl")
      }
    }
  },
  publicPath: "/",

  //编译时输入的目录
  outputDir: "D:\\Code\\LMHGJCPT\\SPJC\\lmhg_spjc\\src\\main\\resources\\static",
  devServer: {
    proxy: {
      "/api": {
        //后端的访问地址
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
          // [`^${process.env.VUE_APP_API}`]: '',
          //[`^${process.env.VUE_APP_API}`]: '/', //配置出来的接口没有 /api
        }
      }
      // '/api/down/': {
      //   target: 'http://127.0.0.1:8089/'
      // }
    },
    //前端的访问地址
    port: 8081
  }
};
