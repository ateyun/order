const _token = '_token' // 保存用户的token
const _ids = '_ids' // 保存用户的token

export default {
  setToken: function (val) {
    window.localStorage.setItem(_token, JSON.stringify(val))
  },
  getToken: function () {
    return JSON.parse(window.localStorage.getItem(_token))
  },
  setIds: function (val) {
    window.localStorage.setItem(_ids, JSON.stringify(val))
  },
  getIds: function () {
    return JSON.parse(window.localStorage.getItem(_ids))
  }
}
