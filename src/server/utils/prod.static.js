const ReactDOMServer = require("react-dom/server");

const path = require("path");
const fs = require("fs");

module.exports = function (app) {
  let template = fs.readFileSync(path.resolve(__dirname, "../../../dist/index.html"), "utf8");
  const serverEntry = require("../../../dist/server").default;
  let appString = ReactDOMServer.renderToString(serverEntry);
  app.use("/public", express.static(path.resolve(__dirname, "../../client")));
  app.get('*', (req, res) => {
    res.send(template.replace("<app></app>", appString));
  });
}