import req from '../../api/userorder/depdata'

// 获取用户数据
export const getUserInfo = ({commit}, obj) => {
  req
    .send(obj)
    .then(res => {
      if (res.data.code === 200) {
        commit('saveUserInfo', res.data.data)
      } else {
        commit('editMsg', {msgError: res.data.msg, showPositionValue: true})
      }
    })
    .catch(error => {
      commit('editMsg', {msgError: '连接超时', showPositionValue: true})
    })
}
// 获取微店信息
export const getMicroShop = ({commit}, obj) => {
  req
    .send(obj)
    .then(res => {
      console.log('actions---' + JSON.stringify(res.data))
      if (res.data.code === 200) {
        commit('saveMicroShop', res.data.data)
      } else {
        commit('editMsg', {msgError: res.data.msg, showPositionValue: true})
      }
    })
    .catch(error => {
      commit('editMsg', {msgError: '连接超时', showPositionValue: true})
    })
}
