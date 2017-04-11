import axios from 'axios' // http请求插件

import _ from 'lodash' // 相当于JQ的$.extend  合并对象插件

import devData from './devdata' // 引用测试数据

import axiosConfig from './../../config/axiosConfig.js' // axios配置文件

const $ajax = axios.create(axiosConfig)

const requestApi = {
  // 测试
  submitOrder: {
    url: '/submitOrder',
    method: 'post',
    params: {
      id: 1,
      name: 'Sevent'
    }
  },
  // 获取用户信息
  getUserInfo: {
    url: '/member/member/get',
    method: 'get',
    params: {
      token: ''
    }
  },
  // 获取微店信息
  getMicroShop: {
    url: '/weidian/weidian/get',
    method: 'get',
    params: {
      weidian_id: ''
    }
  }
}

function analysis (name) {
  var req = requestApi[name.apiName]

  req = _.merge({}, req, name)

  if (req.method === 'post') {
    req.data = _.merge({}, req.data, req.params)
    delete req.params
  }

  return req
}

export default {
  send: function (obj) {
    const req = analysis(obj)
    // if (__STAGE__ == 'dev') {
    //   req.apiName = obj.apiName
    //   return devData(req)
    // }
    delete req.apiName
    return $ajax(req)
  }
}
