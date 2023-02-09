const dotenv = require("dotenv");
let { dbUrl } = dotenv.config().parsed;
const mongoose = require("mongoose");
mongoose.connect(dbUrl);
mongoose.connection.on("connected", () => {
  console.log(dbUrl + "数据库连接成功！");
});
module.exports = mongoose;
