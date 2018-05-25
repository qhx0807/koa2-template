const router = require('koa-router')()
const ApiController = require('../controllers/apiController')
const WeChatController = require('../controllers/wechatCtrl')
const UploadController = require('../controllers/uploadCtrl')

router.prefix('/api')

router
  .get('/', ApiController.query)
  .get('/wechat/:code', WeChatController.auth)
  .post('/upload', UploadController.upload)

module.exports = router
