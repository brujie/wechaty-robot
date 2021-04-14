# wechaty-Robot

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://github.com/chatie/wechaty)
[![Wechaty开源激励计划](https://img.shields.io/badge/Wechaty-开源激励计划-green.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://wechaty.js.org)
[![Wechaty Contributor Program](https://img.shields.io/badge/Wechaty-Contributor%20Program-green.svg)](https://wechaty.js.org/docs/contributor-program)
[![Juzi.BOT Developer Program](https://img.shields.io/badge/Wechaty%Contributor%20Program-Juzi.BOT-orange.svg)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty/)

基于 wechaty-puppet-padlocal 的微信机器人助手
[wechaty官网示例](https://wechaty.js.org/docs/tutorials/examples)

[wachaty插件](https://github.com/wechaty/wechaty-plugin-contrib)

[掘金Node.js结合wechaty实现个人微信机器人助手](https://juejin.cn/post/6950829527605968903/)

#### 运行代码之前
准备好可运行Wechaty的微信号,已经申请前缀为puppet_padlocal的token

#### 目前实现功能

- 自动通过好友验证
  - 当有人添加机器人时，判断验证消息关键字后通过或直接通过
  - 通过验证后自动回复并介绍机器人功能
- 私聊关键字回复
  - 例如回复 `加群` 推送群聊邀请
  - 例如回复 `群聊名称` 自动拉群
- 自动聊天
  - 群聊中配置和自己的机器人聊天
  - 私聊发送消息即可聊天
- 加入群聊自动欢迎
  - 当新的小伙伴加入群聊后自动 `@[新的小伙伴]` 发一个文字欢迎
  - 关键字触发,发送个人卡片链接
  - 群内发送小程序可获取小程序`相关信息`
  - 群内发送英文开启翻译功能，最多不可超多2000字

#### api接口

[有道翻译](https://ai.youdao.com/#/ )
[百度翻译](https://fanyi-api.baidu.com/ )


#### 提示

github wechaty-puppet-padplus升级说明如下：

卸载wechaty-puppet-padplus，安装wechaty-puppet-hostie
代码中启动wechaty的wechaty-puppet-padplus更换成【wechaty-puppet-hostie】

npm官网  Wechaty-Puppet-Hostie模块已重命名为wechaty-puppet-service，请改用【wechaty-puppet-service】
使用wechaty-puppet-service代替Wechaty-Puppet-Hostie

[协议使用服务兼容性](https://wechaty.js.org/docs/puppet-services/compatibility/)


#### 免费token

[padlocal 7天免费（推荐）](https://github.com/padlocal/wechaty-puppet-padlocal/wiki/TOKEN-%E7%94%B3%E8%AF%B7%E6%96%B9%E6%B3%95)

[paimon	 7天免费](http://175.27.139.176/#/order)


#### 最后

探索token和对应协议的过程有点痛苦,不过我已经搭建好了，我会给你提供最简单的搭建个人机器人的方式,一起交流学习添加机器人体验
