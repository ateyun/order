import axios from 'axios' // http请求插件

import _ from 'lodash' // 相当于JQ的$.extend  合并对象插件

import devData from './devdata' // 引用测试数据

import axiosConfig from './../../config/axiosConfig.js' // axios配置文件

const $ajax = axios.create(axiosConfig)

$ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

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
  // 判断企业是否存在
  getEnterPriseStatus: {
    url: '/company/info/get',
    method: 'get',
    params: {
      company_id: ''
    }
  },
  // 判断应用权限
  getAppPromiss: {
    url: '/app/run/config',
    method: 'get',
    params: {
      app_code: '',
      company_id: ''
    }
  },
  // 获取用户信息
  getUserInfo: {
    url: '/member/member/get',
    method: 'get',
    params: {
    }
  },
  // 获取微店信息
  getMicroShop: {
    url: '/weidian/weidian/get',
    method: 'get',
    params: {
      weidian_id: ''
    }
  },
  // 获取收银桌信息
  getdesk: {
    url: '/app/run/api',
    method: 'get',
    params: {
      company_id: '',
      app_code: 'ecash',
      action: 'get_desk',
      id: ''
    }
  },
  // 提交订单
  submitUserOrder: {
    url: '/weidian/order/create',
    method: 'post',
    data: {
      order_type: '',
      uid: '',
      weidian_id: '',
      company_id: '',
      express_type: 0,
      cash_amount: '',
      payment_name: ''
    }
  },
  // 获取订单信息
  getUserOrder: {
    url: '/weidian/order/get',
    method: 'get',
    params: {
      order_id: ''
    }
  }
}

function analysis(name) {
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
