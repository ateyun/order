import _ from 'lodash'

const urlConfig = {
  production: {
    baseUrl: 'http://api.ateyun.com/'
  },
  development: {
    baseUrl: 'http://test.api.ateyun.com/'
  }
}

function Config () {
  var env = 'production'

  if (__STAGE__ === 'development') {
    env = 'development'
  }

  this.constants = urlConfig[env]
}

Config.prototype.getUrl = function (name) {
  return name ? this.constants[name] : null
}

Config.prototype.setUrl = function (name, val) {
  name ? (this.constants[name] = val) : null
  return this
}

export default new Config()
