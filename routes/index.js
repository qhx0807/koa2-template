const router = require('koa-router')()
const fs = require('fs')
const mail = require('../middlewares/mail')

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

router.get('/mail', async (ctx, next) => {
  let content = '把邮件的标题和内容写的正规点(像平常写邮件一样),就不会出现这种情况了'
  let res = await mail('', '到期续费通知', content)
  ctx.data = {
    title: res
  }
})

module.exports = router
