const LogModel = require('../model/logModel')

class LogController {

  static async add (data) {
    return await LogModel.create(data)
  }

  static async query (ctx) {
    const page = ctx.query.page || 1
    const result = await LogModel.findAndCountAll({ order: [['id', 'DESC']], offset: 10 * (page - 1), limit: 10 })
    return ctx.success({data: result})
  }
}

module.exports = LogController
