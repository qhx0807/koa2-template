const Router = require('koa-router')
const router = new Router()
const UserController = require('../controllers/userController')
const WeChatController = require('../controllers/wechatCtrl')
const UploadController = require('../controllers/uploadCtrl')
const LogController = require('../controllers/logController')

router.prefix('/api')

router
  .get('/users', UserController.query)
  .post('/users/new', UserController.create)
  .put('/users/edit', UserController.update)
  .delete('/users/:id', UserController.destroy)
  .get('/wechat/:code', WeChatController.auth)
  .post('/upload', UploadController.upload)
  .get('/log', LogController.query)
  .post('/uploadqn', UploadController.uploadQiniu)

module.exports = router
