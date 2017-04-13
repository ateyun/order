import req from '../../api/userorder/depdata'

// 获取用户数据
export const getUserInfo = ({ commit }, obj) => {
  req
    .send(obj)
    .then(res => {
      if (res.data.code === 200) {
        commit('saveUserInfo', res.data.data)
      } else {
        commit('editMsg', { msgError: res.data.msg, showPositionValue: true })
      }
    })
    .catch(error => {
      commit('editMsg', { msgError: '连接超时', showPositionValue: true })
    })
}
// 获取微店信息
export const getMicroShop = ({ commit }, obj) => {
  req
    .send(obj)
    .then(res => {
      console.log('actions---' + JSON.stringify(res.data))
      if (res.data.code === 200 && res.data.data.status === 1) {
        commit('saveMicroShop', res.data.data)
      } else {
        commit('editMsg', { msgError: res.data.msg, showPositionValue: true })
      }
    })
    .catch(error => {
      commit('editMsg', { msgError: '连接超时', showPositionValue: true })
    })
}
// 获取企业信息
export const getEnterPrise = ({ commit }, obj) => {
  req
    .send(obj)
    .then(res => {
      console.log('actions---' + JSON.stringify(res.data))
      if (res.data.code === 200 && res.data.data.status === 1) {
        commit('saveEnterPrise', res.data.data)
      } else {
        commit('editMsg', { msgError: res.data.msg, showPositionValue: true })
      }
    })
    .catch(error => {
      commit('editMsg', { msgError: '连接超时', showPositionValue: true })
    })
}
// 获取应用权限
export const getAppPromiss = ({ commit }, obj) => {
  req
    .send(obj)
    .then(res => {
      console.log('actions---' + JSON.stringify(res.data))
      if (res.data.code === 200) {
        if (res.data.data.ecash.config.is_open != "1") {
          commit('editMsg', { msgError: '暂未开通权限', showPositionValue: true })
          return
        }
        if (res.data.data.ecash.state.state != "1") {
          commit('editMsg', { msgError: '权限异常', showPositionValue: true })
          return
        }
        commit('saveAppPromiss', res.data.data)
      } else {
        commit('editMsg', { msgError: res.data.msg, showPositionValue: true })
      }
    })
    .catch(error => {
      commit('editMsg', { msgError: '连接超时', showPositionValue: true })
    })
}
// 获取收银桌信息
export const getDeskInfo = ({ commit }, obj) => {
  req
    .send(obj)
    .then(res => {
      console.log('actions---' + JSON.stringify(res.data))
      debugger
      if (res.data.code === 200 && res.data.data) {
        commit('saveDeskInfo', res.data.data)
      } else {
        if (res.data.msg) {
          commit('editMsg', { msgError: res.data.msg, showPositionValue: true })
        } else {
          commit('editMsg', { msgError: '参数错误', showPositionValue: true })
        }
      }
    })
    .catch(error => {
      commit('editMsg', { msgError: '连接超时', showPositionValue: true })
    })
}
// 提交订单信息
export const submitOrder = ({ commit }, obj) => {
  console.log('22222222222' + JSON.stringify(obj))
  req
    .send(obj)
    .then(res => {
      console.log('actions---' + JSON.stringify(res.data))
      if (res.data.code === 200) {
        // commit('saveMicroShop', res.data.data)
      } else {
        new Promise(function (resolve, reject) {
          commit('editMsg', { msgError: res.data.msg, showPositionValue: true })
          resolve()
        }).then(function (res) {
          setTimeout(
            () => {
              commit('editMsg', { msgError: '', showPositionValue: false })
            },
            1000
          )
        })
      }
    })
    .catch(error => {
      commit('editMsg', { msgError: '连接超时', showPositionValue: true })
    })
}
