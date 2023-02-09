const multer = require("multer");
const md5 = require("md5");

const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, "./", dir);
};

const imageType = ["image/jpeg", "image/png", "image/jpg"];
// 3. multer的配置对象
let storage = multer.diskStorage({
  // 3.1 存储路径
  destination: function (req, file, cb) {
    console.log('你上传的文件：',file)
    // 3.1.1 允许图片上传
    if (imageType.includes(file.mimetype)) {
      cb(null, resolve("../images/avatar"));
    } else {
      // 3.1.2 限制其他文件上传类型
      cb({ error: "Mime type not supported" });
    }
  },
  //  3.2 存储名称
  filename: function (req, file, cb) {
    let fileFormat = file.originalname.split(".");
    cb(null, md5(+new Date()) + "." + fileFormat[fileFormat.length - 1]);
  },
});

// 4. 添加配置
const multerConfig = multer({
  storage: storage,
});

// 5. 导出配置好的multerConfig
module.exports = multerConfig;
