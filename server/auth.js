const axios = require('axios')
const config = require('../config')
const qs = require('qs')

const { client_id, client_secret, request_token_url, github_user_url } = config.github

module.exports = (router) => {
  // 获取Oauth鉴权信息
  router.get('/auth', async (ctx) => {
    const { code } = ctx.query
    if (code) {
      // 获取Oauth鉴权信息
      const result = await axios.post(request_token_url, {
        client_id,
        client_secret,
        code,
      })
      if (result.status === 200 && (result.data && !result.data.error)) {
        try {
          let githubAuth = qs.parse(result.data)
          ctx.session.githubAuth = githubAuth
          const { access_token, token_type } = githubAuth
          // 获取用户信息
          const { data: userInfo } = await axios({
            method: 'GET',
            url: github_user_url,
            headers: {
              Authorization: `${token_type} ${access_token}`,
            },
          })

          ctx.session.user = userInfo
          // 重定向到登录前的页面或首页
          ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
          ctx.session.urlBeforeOAuth = ''
        } catch (error) {
          ctx.redirect('/error')
        }

      } else {
        ctx.body = `request token failed ${result.data && result.data.error}`
      }
    }
  })

  router.post('/logout', async (ctx) => {
    ctx.session = null
    ctx.body = {
      code: 200,
      data: null,
      msg: 'ok'
    }
    ctx.set('Content-Type', 'application/json')
  })

  router.get('/prepare-auth', async (ctx) => {
    const { url } = ctx.query
    //存储 url
    ctx.session.urlBeforeOAuth = url
    //跳转授权重定向 维持OAuth之前得页面访问
    ctx.redirect(config.OAUTH_URL)
  })
}