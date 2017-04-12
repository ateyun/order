function UrlSearch() {
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
  // 获取url参数

  getCookieAuth: function (type, companyId, hrefs) {
    // storage.setToken(encodeURIComponent('476dQGFhb+wXGCvvrvhijuk2O9Nu1VoF4+9up2CU5JUcZ/YdMmg6XquxuhyKkYAwgaMPcvzBeilQEE0'))
    if (this.request.token) {
      var tokenCode = this.request.token

      if (tokenCode.indexOf("#") != -1) {
        tokenCode = tokenCode.substring(0, tokenCode.indexOf("#"))
      }
      storage.setToken(encodeURIComponent(tokenCode))
      axios.defaults.headers.common['Authorization'] = encodeURIComponent(tokenCode)
      return tokenCode
    }
    if (storage.getToken()) {
      axios.defaults.headers.common['Authorization'] = storage.getToken()
      return storage.getToken()
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
  // 判断登陆
  login: function (type, company, url) {
    window.location.href = 'http://dev.sso.pizzadiy.com/login?type=' +
      type +
      '&company_id=' +
      company +
      '&reurl=' +
      url
  }
}
