const router = require('koa-router')()
const fs = require('fs')
// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

router.get('/',(ctx, next) => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('./index.html')
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/socket.io', async (ctx, next) => {
  ctx.body = {
    title: 'socket'
  }
})


module.exports = router
