const Router = require('koa-router')
const { requestGithub } = require('../lib/api')

let router = new Router()

// https://github.com/vercel/next.js/issues/9705
router.all('(.*)', async (ctx) => {
  const { session, url, method } = ctx
  const { githubAuth } = session || {}
  const { access_token, token_type } = githubAuth || {}
  const headers = {}
  if (access_token) {
    headers.Authorization = `${token_type} ${access_token}`
  }
  const result = await requestGithub(
    method,
    url.replace('/github/', '/'),
    ctx.request.body || {},
    headers,
  )
  ctx.status = result.status
  ctx.body = result.data
  ctx.set('Content-Type','application/json')
})

module.exports = router