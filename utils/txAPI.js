const request = require("request");
const qs = require("qs");

// 修改config文件中的key即可使用天行api 

// 彩虹屁
const rainbowFart = function (params) {
  return new Promise((resolve, reject) => {
    let url =
      "http://api.tianapi.com/txapi/caihongpi/index?" + qs.stringify(params);

    request.get(url, (params = params), function (error, response, body) {
      let data = JSON.parse(body);
      console.log(data);
      if (data.code == 200) {
        let content = data.newslist[0].content;
        resolve(content);
      } else {
        console.log("请求失败！");
        resolve("你在说什么，我听不懂");
      }
    });
  });
};

// 朋友圈文案
const circle = function (params) {
  return new Promise((resolve, reject) => {
    let url =
      "http://api.tianapi.com/txapi/pyqwenan/index?" + qs.stringify(params);

    request.get(url, (params = params), function (error, response, body) {
      let data = JSON.parse(body);
      console.log(data);
      if (data.code == 200) {
        let content = data.newslist[0].content;
        resolve(content);
      } else {
        console.log("请求失败！");
        resolve("你在说什么，我听不懂");
      }
    });
  });
};


const drugInstruction = function (params) {
  return new Promise((resolve, reject) => {
    let url =
      "http://api.tianapi.com/txapi/yaopin/index?" + qs.stringify(params);

    request.get(url, (params = params), function (error, response, body) {
      let data = JSON.parse(body);
      console.log(data);
      if (data.code == 200) {
        let content = data.newslist[0].content;
        resolve(content.replace(/\s+/g,'').replace(/<br/g,'\n').replace(/[/>]/g,''));
      } else {
        console.log("请求失败！");
        resolve("你在说什么，我听不懂");
      }
    });
  });
};

module.exports = {
  rainbowFart,
  circle,
  drugInstruction
};
