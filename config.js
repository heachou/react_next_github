const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const github = {
  request_token_url: 'https://github.com/login/oauth/access_token',
  client_id: 'Iv1.34ccc885fa712f48',
  client_secret: '3e1a1426bc5a286fa26702c9500b093e10a516fa',
  github_user_url: 'https://api.github.com/user'
}
module.exports = {
  github,
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${github.client_id}&scope=${SCOPE}`,
}