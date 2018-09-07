const Router = require('koa-router')
const router = new Router()
const HouseController = require('../controllers/houseController')

router.prefix('/api')

router
  .get('/housecheck', HouseController.query)
  .post('/housecheck/new', HouseController.create)
  .put('/housecheck/edit', HouseController.update)
  .delete('/housecheck/:id', HouseController.destroy)

  module.exports = router
