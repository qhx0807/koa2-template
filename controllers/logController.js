const LogModel = require('../model/logModel')

class LogController {

  static async add (data) {
    return await LogModel.create(data)
  }

  static async query (ctx) {
    const result = await LogModel.findAndCountAll()
    return ctx.success({data: result})
  }
}

module.exports = LogController
