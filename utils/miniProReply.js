const { pareMiniProgramMsg, pareseXmlToJson } = require("./utils");

module.exports = (msg, length) => {
  return new Promise((resolve, reject) => {
    // 限制群聊
    if (
      msg.payload.roomId === "20856899751@chatroom"
    ) {
      var response;
      // 获取返回的小程序信息
      let text = msg.payload.text;
      // 格式化为xml
      let tmp = pareMiniProgramMsg(text);
      // xml转化为对象
      result = pareseXmlToJson(tmp);
      result = JSON.parse(result);
      let appid = result.msg.appmsg.weappinfo.appid._text;
      let path = result.msg.appmsg.weappinfo.pagepath._cdata;
      console.log('appid:',appid)
      console.log('appid:',path)
      if (path) {
        response = "小程序路径为：" + path.replace(".html", "");
      }
      let member = msg.talker();
      msg.room().say(response,member);
      // 返回
      console.log("发起请求小程序检查", data);
      resolve(response);
    }
  });
};



