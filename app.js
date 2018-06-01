const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const IO = require('koa-socket-2')

const index = require('./routes/index')
const api = require('./routes/api')

const io = new IO()

io.attach(app)

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

app._io.on('connection', (socket) => {
  console.log(`<<<< socket connection >>>>`)
})

app.io.on('message', (ctx, data) => {
  console.log(ctx.data)
})

io.use(require('./middlewares/socket'))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
