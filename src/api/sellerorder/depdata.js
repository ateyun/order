import axios from 'axios' // http请求插件

import _ from 'lodash' // 相当于JQ的$.extend  合并对象插件

import devData from './devdata' // 引用测试数据

import axiosConfig from './../../config/axiosConfig.js' // axios配置文件
import {getCompanyId} from './../../libs/common'

const $ajax = axios.create(axiosConfig)

const requestApi = {
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
        }
    },
    // 获取微店信息
    getWeiDianInfo: {
        url: '/weidian/weidian/get',
        method: 'get',
        params: {
            weidian_id: '',
            company_id : getCompanyId()
        }
    },

    //获取企业信息
    getCompanyInfo: {
        url:'/company/info/get',
        method : 'get',
        params : {
            company_id : getCompanyId()
        }
    },

    //获取ecash配置
    getEcashConfig : {
        url : '/app/run/config',
        method : 'get',
        params : {
            company_id : getCompanyId(),
            app_code : ''
        }
    },

    //获取收银桌信息
    getCashierDeskInfo : {
        url : '/app/run/api',
        method : 'get',
        params : {
            company_id : getCompanyId(),
            app_code: '',
            action: '',
            id : ''
        }
    },

    //获取收银员权限
    getCashierAuth : {
        url : '/app/run/api',
        method : 'get',
        params : {
            company_id : getCompanyId()
        }
    },

    //提交固定金额订单
    submitFixedAmountOrder : {
        url : '/weidian/order/create',
        method : 'post',
        params : {
            company_id : getCompanyId()
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
        /*if (__STAGE__ == 'dev') {
            req.apiName = obj.apiName
            return devData(req)
        }*/
        delete req.apiName
        return $ajax(req)
    }
}
