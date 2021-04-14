const MD5 = require("./md5");
const request = require("request");
const qs = require("qs");
var reg = /^[\u4e00-\u9fa5]+$/; // 文字正则
/**
 * @description 接收信息英汉互转
 * @param {Object} msg 消息对象
 */
// 免费的接口，所以需要把appid,key替换自己的
const translate = function(msg) {
  let url = "http://api.fanyi.baidu.com/api/trans/vip/translate";
  // appid
  let appid = "appid";
  // 秘钥
  let key = "key";
  // 用户输入
  let q = msg.text();
  // 随机数
  let salt = new Date().getTime().toString().substring(0, 10) + 0;
  // md5 加密
  let sign = MD5(appid + q + salt + key);
  let from, to;
  if (reg.test(q)) {
    from = "zh";
    to = "en";
  }
  let data = qs.stringify({
    q,
    appid,
    salt,
    from: from || "en",
    to: to || "zh",
    sign,
  });
  request.post(
    {
      url,
      json: true,
      body: data,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        let reply  = "输入:" + body.trans_result[0].src + "\n翻译:" + body.trans_result[0].dst;
        console.log(reply);
        msg.say(reply)
      } else{
        console.log('获取失败!请重试!')
      }
    }
  );
}

module.exports = translate;