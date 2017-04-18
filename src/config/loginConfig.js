function UrlSearch () {
  var name, value
  var str = location.href // 取得整个地址栏
  var num = str.indexOf('?')
  str = str.substr(num + 1) // 取得所有参数   stringvar.substr(start [, length ]

  var arr = str.split('&') // 各个参数放到数组里
  for (var i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      this[name] = value
    }
  }
}
var Request = new UrlSearch() // 实例化

import storage from './storage'
import _ from 'lodash'
import axios from 'axios'

export default {
  refreshToken: function (type, companyId, hrefs) {
    window.location.href = 'http://sso.ateyun.com/login?type=' +
      type +
      '&company_id=' +
      companyId +
      '&reurl=' +
      encodeURIComponent(hrefs)
  },
  // 获取url参数
  getCookieAuth: function (type, companyId, hrefs) {
    storage.setToken(
      encodeURIComponent(
        '476dQGFhb+wXGCvvrvhijuk2O9Nu1VoF4+9up2CU5JUcZ/YdMmg6XquxuhyKkYAwgaMPcvzBeilQEE0'
      )
    )
    if (storage.getToken()) {
      axios.defaults.headers.common['Authorization'] = storage.getToken()
      return storage.getToken()
    }
    if (this.request.token) {
      var tokenCode = this.request.token
      storage.setToken(encodeURIComponent(tokenCode))
      axios.defaults.headers.common['Authorization'] = encodeURIComponent(
        tokenCode
      )
      return tokenCode
    }

    if (!this.request.token && !storage.getToken()) {
      window.location.href = 'http://sso.ateyun.com/login?type=' +
        type +
        '&company_id=' +
        companyId +
        '&reurl=' +
        encodeURIComponent(hrefs)
    }
  },
  /**
   * 获取方法：name.request.id
   * if(name.request.id){
   * }
   */
  request: Request,
  // 判断浏览器内核
  /**
   * 获取方法：name.isWeiXin()
   * if(name.request.id){
   * }
   */
  typePay: function () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return 'weixin'
    } else if (ua.match(/MicroMessenger/i) == 'aplipayclient') {
      return 'alipay'
    }
  },
  // 转换时间
  getNowFormatDate: function () {
    var date = new Date(),
      seperator1 = '-',
      seperator2 = ':',
      month = date.getMonth() + 1,
      strDate = date.getDate(),
      strHours = date.getHours(),
      strMinutes = date.getMinutes(),
      strSeconds = date.getSeconds()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    if (strHours >= 0 && strHours <= 9) {
      strHours = '0' + strHours
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
      strMinutes = '0' + strMinutes
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
      strSeconds = '0' + strSeconds
    }
    var currentdate = date.getFullYear() +
      seperator1 +
      month +
      seperator1 +
      strDate +
      ' ' +
      strHours +
      seperator2 +
      strMinutes +
      seperator2 +
      strSeconds
    return currentdate
  },
  // 判断是否在数组中
  contains: function (arr, obj) {
    var i = arr.length
    while (i--) {
      if (arr[i] === obj) {
        return true
      }
    }
    return false
  },
  // 从数组中删除
  removeByValue: function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1)
        break
      }
    }
  },
  // 删除链接中的token
  funcUrlDel: function (name) {
    var loca = window.location
    var baseUrl = loca.origin + loca.pathname + '?'
    var query = loca.search.substr(1)
    if (query.indexOf(name) > -1) {
      var obj = {}
      var arr = query.split('&')
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=')
        obj[arr[i][0]] = arr[i][1]
      }
      delete obj[name]
      var url = baseUrl +
        JSON.stringify(obj)
          .replace(/[\"\{\}]/g, '')
          .replace(/\:/g, '=')
          .replace(/\,/g, '&')
      return url
    }
    return baseUrl + query
  }
}
