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

export default {
  // 获取url参数
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
  isWeiXin: function () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return 'weixin'
    } else if (ua.match(/MicroMessenger/i) == 'aplipayclient') {
      return 'alipay'
    }
  },
  // 判断登陆
  login: function (type, company, url) {
    window.location.href = 'http://sso.ateyun.com/login?type=' +
      type +
      '&company_id=' +
      company +
      '&reurl=' +
      url
  }
}
