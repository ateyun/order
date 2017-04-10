import axios from 'axios' // http请求插件

import _ from 'lodash' // 相当于JQ的$.extend  合并对象插件

import devData from './devdata' // 引用测试数据

import axiosConfig from './../../config/axiosConfig.js' // axios配置文件

const $ajax = axios.create(axiosConfig)

const requestApi = {
  submitOrder: {
    url: '/submitOrder',
    method: 'post',
    params: {
      id: 1,
      name: 'Sevent'
    }
  }
}

function analysis (name) {
  var req = requestApi[name.apiName]

  req = _.merge({}, req, name)

  if (req.method == 'post') {
    req.data = _.merge({}, req.data, req.params)
    delete req.params
  }

  return req
}

export default {
  send: function (obj) {
    const req = analysis(obj)
    if (__STAGE__ == 'dev') {
      req.apiName = obj.apiName
      return devData(req)
    }
    delete req.apiName
    return $ajax(req)
  }
}
