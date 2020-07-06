const Redis = require("ioredis")
const redis = new Redis({
  port: 6378,
  password: 'zhou@redis'
})

const getKeys = async () => {
  await redis.set('c',123)
  const keys = await redis.keys('*')
  console.log(keys)
}

getKeys()


