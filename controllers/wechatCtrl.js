const config = require('../config/wechat')
const superagent = require('superagent')

class WeChatController {

  static async auth (ctx) {
    let queryObj = {
      appid: config.appID,
      secret: config.appSecret,
      code: ctx.params.code,
      grant_type: 'authorization_code'
    }
    let result = await superagent.get('https://api.weixin.qq.com/sns/oauth2/access_token').query(queryObj)
    let tokenObj = JSON.parse(result.text)
    if (tokenObj.errcode) {
      return ctx.error({data: tokenObj})
    } else {
      let infoQuery = {
        access_token: tokenObj.access_token,
        openid: tokenObj.openid,
        lang: 'zh_CN'
      }
      let info = await superagent.get('https://api.weixin.qq.com/sns/userinfo').query(infoQuery)
      return ctx.success({data: JSON.parse(info.text)})
    }
  }
}

module.exports = WeChatController
