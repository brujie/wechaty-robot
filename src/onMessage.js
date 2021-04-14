const { UrlLink } = require("wechaty");
const request = require("request");
const urlencode = require("urlencode");
const config = require("./config");
const miniProrReply = require("../utils/miniProReply");  // 小程序参数
const translate = require("../utils/translate"); // 百度翻译
const { rainbowFart, circle ,drugInstruction} = require("../utils/txAPI");  // 天行api
const name = config.name;
const roomList = config.room.roomList;

// 消息监听回调
module.exports = (bot) => {
  return async function onMessage(msg) {
    // 判断消息来自自己，直接return
    if (msg.self()) return;
    // 消息类型判断
    switch (msg.type()) {
      case 7:
        var reg = /^[\u4e00-\u9fa5]+$/; // 文字正则
        console.log("获取到文本");
        // 回复信息是关键字 “加群”     测试成功
        if (await isAddRoom(msg)) return;
        // 回复信息是所管理的群聊名    测试成功
        if (await isRoomName(bot, msg)) return;
          // 开启机器人
          if (msg.payload.roomId) {
            // 添加判断 不是指定群聊的信息不触发  [不加判断机器人，机器人会回复任意所在群聊内容。。。]
            console.log("获取到群聊消息");
            if (msg.payload.roomId === "20856899751@chatroom") {
            // 判断群内回复内容不为文字
              if(!reg.test(msg.text())){
                translate(msg);
                return;
              } else{
                roomMessageReply(msg);
                return;
              }
            }
          }
        break;
      case 9:
        console.log("获取到小程序"); // 测试成功
        miniProrReply(msg);
        break;
      case 14:
        console.log("获取到卡片链接"); // 测试成功
        break;
      default:
        console.log("暂时不支持该类型的接收!");
        break;
    }
  };
};

/**
 * @description 回复群聊信息 处理函数
 * @param {Object} msg 消息对象
 * @return {Promise} true-是 false-不是
 */
async function roomMessageReply(msg) {
  const room = msg.room();
  const text = msg.text();
  if (await msg.mentionSelf()) {
    // 获取消息内容，拿到整个消息文本，去掉 @名字
    const sendText = msg.text().replace("@蔚蓝", "");
    // 请求机器人接口回复
    let res = await requestRobot(sendText);
    // 返回消息，并@来自人 只可以padplus调用
    // room.say(res, msg.fromId());
    // 此处替换为群内回话
    // padlocal使用 msg函数@指定人
    // 获取@你的群友 
    // let member = msg.talker();
    // 群聊@群友回复
    // msg.room().say(response,member);
    room.say(res);  
  } else {
    let content = await requestRobot(msg.text());
    room.say(content);
    return 
  }

  // 指定关键字触发
  if (/互动/.test(text)) {
    room.say("互动测试");
    return 
  } else if(/彩虹屁/.test(text)){
    let reply = await rainbowFart(params);
    room.say(reply);
    return 
  } else if(/文案/.test(text)){
    let reply = await circle(params);
    room.say(reply);
    return 
  }else if (/蔚蓝工作室/.test(text)) {
    room.say(new UrlLink(config.personal.introUrl));
    return 
  } else if(/药品/.test(text)){
    params.word = text.substring(2);
    console.log(params);
    let reply = await drugInstruction(params);
    room.say(reply);
    return 
  }
}

/**
 * @description 回复信息是关键字 “加群” 处理函数
 * @param {Object} msg 消息对象
 * @return {Promise} true-是 false-不是
 */
async function isAddRoom(msg) {
  // 关键字 加群 处理
  if (msg.text() == "加群") {
    let roomListName = Object.keys(roomList);
    let info = `${name}当前管理群聊有${roomListName.length}个，回复群聊名即可加入哦\n\n`;
    roomListName.map((v) => {
      info += "【" + v + "】" + "\n";
    });
    msg.say(info);
    return true;
  }
  return false;
}

/**
 * @description 回复信息是所管理的群聊名 处理函数
 * @param {Object} bot 实例对象
 * @param {Object} msg 消息对象
 * @return {Promise} true-是群聊 false-不是群聊
 */
async function isRoomName(bot, msg) {
  // 回复信息为管理的群聊名
  if (Object.keys(roomList).some((v) => v == msg.text())) {
    // 通过群聊id获取到该群聊实例
    const room = await bot.Room.find({ id: roomList[msg.text()] });
    // 获取当前room信息
    console.log(room);
    // 判断是否在房间中 在-提示并结束
    if (await room.has(msg.from())) {
      await msg.say("您已经在房间中了");
      return true;
    }

    // 发送群邀请
    await room.add(msg.from());
    await msg.say("已发送群邀请");
    return true;
  }
  return false;
}

/**
 * @description 机器人请求接口 处理函数
 * @param {String} info 发送文字
 * @return {Promise} 相应内容
 */
function requestRobot(info) {
  return new Promise((resolve, reject) => {
    let url = `https://open.drea.cc/bbsapi/chat/get?keyWord=${urlencode(info)}`;
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let res = JSON.parse(body);
        if (res.isSuccess) {
          let send = res.data.reply;
          // 免费的接口，所以需要把机器人名字替换成为自己设置的机器人名字
          send = send.replace(/Smile/g, name);
          resolve(send);
        } else {
          if (res.code == 1010) {
            resolve("没事别老艾特我，我还以为爱情来了");
          } else {
            resolve("你在说什么，我听不懂");
          }
        }
      } else {
        resolve("你在说什么，我脑子有点短路诶！");
      }
    });
  });
}

