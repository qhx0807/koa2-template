const UserModel = require('../model/userModel')

class ApiController {

  static async query (ctx) {
    const result = await UserModel.findAll()
    // global.log.desc = `test log`
    if (!result) {
      return ctx.error({msg: '查询失败！'})
    }
    return ctx.success({data: result})
  }

}

module.exports = ApiController
