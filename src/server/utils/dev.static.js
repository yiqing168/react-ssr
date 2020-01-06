const axios = require("axios");
const webpack = require("webpack");
const path = require("path");
const memoryFs = require("memory-fs");
const ReactDOMServer = require("react-dom/server");
const proxy = require("http-proxy-middleware");
const serverConfig = require("../../../config/webpack.server");

let serverBundle;
// 获取html模板
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://127.0.0.1:3000/public/index.html")
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
};
const Module = module.constructor;
const mfs = new memoryFs();
const compiler = webpack(serverConfig);
compiler.outputFileSystem = mfs;
compiler.watch({}, (err, stats) => {
  // 错误处理
  if (err) {
    return;
  }
  console.log(
    stats.toString({
      chunks: false, // 使构建过程更静默无输出
      colors: true // 在控制台展示颜色
    })
  );
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );
  const bundle = mfs.readFileSync(bundlePath, "utf8");
  const m = new Module();
  m._compile(bundle, "server.js");
  serverBundle = m.exports.default;
});
module.exports = function(app) {
  app.use(
    "/public",
    proxy({
      target: "http://localhost:3000"
    })
  );
  app.get("*", (req, res) => {
    getTemplate().then(template => {
      try {
        serverBundle(req).then(data => {
          const content = ReactDOMServer.renderToString(data);
          console.log(content);
          res.send(template.replace("<app></app>", content));
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
};
