const mongoose = require('mongoose')
const util = require('util')
const redis = require('redis')

const client = redis.createClient('redis://127.0.0.1:6379');
client.hget = util.promisify(client.hget)

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true
  this.hashKey = JSON.stringify(options.key || '');
  this.exp = options.exp || 10

  return this
}

mongoose.Query.prototype.exec = async function () {
  if(!this.useCache) {
    return exec.apply(this, arguments)
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  )

  const cacheValue = await client.hget(this.hashKey, key)

  if(cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc)
  }

  const result = await exec.apply(this, arguments)
  client.hset(this.hashKey, key, JSON.stringify(result))

  return result
}

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey))
  }
}