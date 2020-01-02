# 跨域问题解决


```bash
cnpm i -D http-proxy-middleware
```

在src目录下新建`setupProxy.js`

```js
const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://localhost:3001/",
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' // 这样处理后，最终得到的接口路径为： http://localhost:3001/xxx
      }
    })
  );
}
```
`scripts/start.js` 中

```js
const devServer = new WebpackDevServer(compiler, serverConfig);
// 在这里添加
require('../src/setupProxy')(devServer);
```