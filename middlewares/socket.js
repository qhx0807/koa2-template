/**
 * socket.io Middleware
 * ctx = {
 *  event: listener.event,
 *  data: data,
 *  socket: Socket,
 *  acknowledge: cb
 *
 * }
 */

module.exports = async (ctx, next) => {
  let start = new Date()
  await next()
  console.log(`response time: ${ new Date() - start }ms`)
}
