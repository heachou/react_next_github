const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const RedisSessionStore = require('./session-store')
const githubRoutes = require('./github_routes')
const auth = require('./auth')

const dev = process.env.NODE_ENV != "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = 8000

// 实例化一个redisclient
const redisClient = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  const sessionConfig = {
    key: 'ssid',
    signed: false,
    store: new RedisSessionStore(redisClient)
  }

  // server.keys = ['sid']
  server.use(session(sessionConfig, server))

  router.get('/b/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/b',
      query: { id }
    })
    ctx.respond = false
  })

  router.get('/api/user/set', (ctx) => {
    ctx.session.user = {
      username: 'test zhou',
      age: 18
    }
    ctx.body = 'session set success'
  })

  router.get('/api/user/get', (ctx) => {
    const session = ctx.session
    ctx.body = JSON.stringify(session)
  })

  router.use('/github', githubRoutes.routes(), githubRoutes.allowedMethods())

  auth(router)

  server.use(router.routes())

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
  })
})


