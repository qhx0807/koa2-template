const LogModel = require('../model/logModel')

class LogController {

  static async add (data) {
    return await LogModel.create(data)
  }

  static async query (ctx) {

  }
}

module.exports = LogController
