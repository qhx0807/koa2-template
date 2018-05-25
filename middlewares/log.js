const LogController = require('../controllers/logController')

module.exports = async (ctx, next) => {
  const start = new Date()
  global.log = {
    method: ctx.request.method,
    host: ctx.request.header.host,
    url: ctx.request.url,
    status: null,
    desc: null
  }
  await next()
  const ms = new Date() - start
  global.log.ms = ms

  if (global.log.desc) {
    global.log.status = ctx.response.status
    LogController.add(global.log)
  }
}
