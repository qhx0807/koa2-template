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
  console.log(ctx)
  let start = new Date()
  await next()
  console.log(`response time: ${ new Date() - start }ms`)
}
