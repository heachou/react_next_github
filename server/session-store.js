// 加上前缀
function getRedisSessionId(sessionId) {
  return `ssid:${sessionId}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  async get(sessionId) {
    const id = getRedisSessionId(sessionId)
    const data = await this.client.get(id)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      return result
    } catch (error) {
      console.error('error:', error)
    }
  }

  async set(sessionId, session, ttl) {
    const id = getRedisSessionId(sessionId)
    let ttlSecond
    if (typeof ttl === 'number') {
      ttlSecond = Math.ceil(ttl / 1000)
    }
    try {
      const sessionStr = JSON.stringify(session)
      if (ttl) {
        await this.client.setex(id, ttlSecond, sessionStr)
      } else {
        await this.client.set(id, sessionStr)
      }
    } catch (error) {
      console.error('error:', error)
    }
  }

  async destroy(sessionId) {
    const id = getRedisSessionId(sessionId)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore











