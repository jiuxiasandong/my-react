//获取加密模块
var crypto = require("crypto");

var enc = text => {
    var md5 = crypto.createHash("md5");
    md5.update(text);
    return md5.digest("hex");
};

module.exports = enc;