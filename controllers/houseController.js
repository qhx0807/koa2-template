const HouseCheckModal = require('../model/housecheckModal')

class HouseController {

  static async query (ctx) {
    let result = await HouseCheckModal.findAll()
    if (!result) {
      return ctx.error({msg: '查询失败！'})
    }
    return ctx.success({ data: result })
  }

  static async create (ctx) {
    let data = ctx.request.body.fields
    try {
      let user = await HouseCheckModal.create(data)
      let result = user.get({ 'plain': true })
      return ctx.success({ data: {id: result.id} })
    } catch (error) {
      return ctx.error({msg: error.original.sqlMessage || error})
    }
  }

  static async update (ctx) {
    let row = ctx.request.body.fields
    let $data = {
      room: row.room,
      imgs: row.imgs,
      desc: row.desc,
    }
    let $where = { where: {id: row.id}}
    try {
      let user = await HouseCheckModal.update($data, $where)
      return ctx.success({ Data: user })
    } catch (error) {
      return ctx.error({msg: error.original.sqlMessage || error})
    }
  }

  static async destroy (ctx) {
    let $where = { where: { id: ctx.params.id } }
    try {
      let user = await HouseCheckModal.destroy($where)
      global.log.desc = `delete housecheck`
      return ctx.success({ Data: user })
    } catch (error) {
      return ctx.error({msg: error.original.sqlMessage || error})
    }
  }
}

module.exports = HouseController
