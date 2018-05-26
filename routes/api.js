const router = require('koa-router')()
const ApiController = require('../controllers/apiController')
const WeChatController = require('../controllers/wechatCtrl')
const UploadController = require('../controllers/uploadCtrl')
const LogController = require('../controllers/logController')

router.prefix('/api')

router
  .get('/user', ApiController.query)
  .get('/wechat/:code', WeChatController.auth)
  .post('/upload', UploadController.upload)
  .get('/log', LogController.query)

module.exports = router
