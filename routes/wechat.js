const router = require('koa-router')()
const WeChatController = require('../controllers/wechatCtrl')

router.get('/wechat/:code', WeChatController.auth)

module.exports = router
