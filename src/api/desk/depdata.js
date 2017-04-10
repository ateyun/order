import axios from 'axios'; // http请求插件

import _ from 'lodash'; // 相当于JQ的$.extend  合并对象插件

import devData from './devdata'; // 引用测试数据

import axiosConfig from './../../config/axiosConfig.js'; // axios配置文件

const $ajax = axios.create(axiosConfig);

const requestApi = {
  desk: {
    url: '/deskonline',
    method: 'get',
    params: {
      id: 1,
      name: 'kevin',
    },
  },
  mobiles: {
    url: '/mobilesonline',
    method: 'get',
    params: {
      id: 1,
      name: 'Sevent',
    },
  },
};

function analysis(name) {
  const req = requestApi[name.apiName];

  req = _.merge({}, req, name);

  if (req.method == 'post') {
    req.data = _.merge({}, req.data, req.params);
    delete req.params;
  }

  return req;
}

export default {
  send: function(obj) {
    const req = analysis(obj);
    if (__STAGE__ == 'dev') {
      req.apiName = obj.apiName;
      return devData(req);
    }
    delete req.apiName;
    return $ajax(req);
  },
};
