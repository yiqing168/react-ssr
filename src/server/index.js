const express = require("express");

// 环境区分
const ieDev = process.env.NODE_ENV === 'development';
const app = express();

if (!ieDev) {
  const prodStatic = require("./utils/prod.static");
  prodStatic(app);
} else {
  const devStatic = require("./utils/dev.static");
  devStatic(app);
}
app.listen(3500, () => console.log('Example app listening on port 3500!'))