// 1. 引入配置好的multerConfig
const multerConfig = require("./multerConfig");
const dotenv = require("dotenv");

// 2. 定义静态变量
const { serverAddress } = dotenv.config().parsed;
const updateBaseUrl = serverAddress; // 上传到服务器地址
const imgPath = "/images/avatar/"; // 上传到服务器的虚拟目录

// 上传接口的 请求参数req  响应参数res
function upload(req, res) {
  return new Promise((resolve, reject) => {
    let fileType = req.path.slice(1, req.path.length);
    multerConfig.single(fileType)(req, res, function (err) {
      if (err) {
        reject(err);
      } else {
        // `updateBaseUrl + imgPath + req.file.filename` 完整的服务器虚拟目录
        resolve(imgPath + req.file.filename);
      }
    });
  });
}

module.exports = upload;
