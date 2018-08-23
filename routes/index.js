const compose = require('koa-compose')
const api = require('./api')

const routes = () => {
  let arr = []
  arr.push(api.routes())
  arr.push(api.allowedMethods())
  return compose(arr)
}

module.exports = routes
