const UserModel = require('../model/userModel')

class UserController {

  static async query (ctx) {
    let result = await UserModel.findAll()
    if (!result) {
      return ctx.error({msg: '查询失败！'})
    }
    return ctx.success({ data: result })
  }

  static async create (ctx) {
    let data = ctx.request.body.fields
    try {
      let user = await UserModel.create(data)
      let result = user.get({ 'plain': true })
      return ctx.success({ data: {id: result.id} })
    } catch (error) {
      return ctx.error({msg: error.original.sqlMessage || error})
    }
  }

  static async update (ctx) {
    let row = ctx.request.body.fields
    let $data = {
      name: row.name,
      sex: row.sex,
      age: row.age,
    }
    let $where = { where: {id: row.id}}
    try {
      let user = await UserModel.update($data, $where)
      return ctx.success({ Data: user })
    } catch (error) {
      return ctx.error({msg: error.original.sqlMessage || error})
    }
  }

  static async destroy (ctx) {
    let $where = { where: { id: ctx.params.id } }
    try {
      let user = await UserModel.destroy($where)
      global.log.desc = `delete user`
      return ctx.success({ Data: user })
    } catch (error) {
      return ctx.error({msg: error.original.sqlMessage || error})
    }
  }
}

module.exports = UserController
