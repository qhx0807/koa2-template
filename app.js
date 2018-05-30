const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body')
// const IO = require('koa-socket')

const index = require('./routes/index')
const api = require('./routes/api')



// const io = new IO({
//   ioOptions: {
//     pingTimeout: 10000,
//     pingInterval: 5000
//   },
//   origins:'*'
// })

// io.attach(app)

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/upload'))

// app.use(async function(ctx, next) {
//   ctx.set("Access-Control-Allow-Origin", "*")
//   ctx.set("Access-Control-Allow-Credentials", true)
//   ctx.set("Access-Control-Max-Age", 86400)
//   ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
//   ctx.set("Access-Control-Allow-Headers", "x-requested-with, content-type")
//   ctx.set("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With")
//   await next()
// })

// koa-body
app.use(koaBody({
  formLimit: 1048576,
  textLimit: 1048576,
  formidable: {
    keepExtensions: true,
    onFileBegin (name, file) {
      file.path = __dirname + '/public/images/' + file.name
    },
    uploadDir: __dirname + '/public/images'
  },
  multipart: true
}))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// middlewares
app.use(require('./middlewares/response'))
app.use(require('./middlewares/log'))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(api.routes(), api.allowedMethods())

const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

io.on('connect', (socket) => {
  console.log(`<<<< connection`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
