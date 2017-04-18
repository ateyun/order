import req from '../../api/userorder/depdata'
import getToken from '../../config/loginConfig'

var urlDelToken = getToken.funcUrlDel('token')

export const actions = {
  // 获取用户信息
  getUserInfo ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200) {
            commit('saveUserInfo', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            commit('editMsg', {
              msgError: res.data.msg,
              showPositionValue: true
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 获取微点信息
  getMicroShop ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200 && res.data.data.status === 1) {
            commit('saveMicroShop', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            commit('editMsg', {
              msgError: res.data.msg,
              showPositionValue: true
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 获取企业信息
  getEnterPrise ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200 && res.data.data.status === 1) {
            commit('saveEnterPrise', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            commit('editMsg', {
              msgError: res.data.msg,
              showPositionValue: true
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 获取应用权限
  getAppPromiss ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200) {
            if (obj.params.app_code.indexOf('ecash') != -1) {
              if (res.data.data.ecash == '-1') {
                commit('editMsg', {msgError: '应用不存在', showPositionValue: true})
                return
              }
              if (res.data.data.ecash.config.is_open != '1') {
                commit('editMsg', {
                  msgError: '暂未开通权限',
                  showPositionValue: true
                })
                return
              }
              if (res.data.data.ecash.state.state != '1') {
                commit('editMsg', {msgError: '权限异常', showPositionValue: true})
                return
              }
            }
            if (obj.params.app_code.indexOf('card') != -1) {
              if (res.data.data.card == '-1') {
                commit('editMsg', {msgError: '应用不存在', showPositionValue: true})
                commit('saveAppState', {state: true})
                return
              }
              if (res.data.data.card.config.is_open != '1') {
                commit('editMsg', {
                  msgError: '暂未开通权限',
                  showPositionValue: true
                })
                commit('saveAppState', {state: true})
                return
              }
              if (res.data.data.card.state.state != '1') {
                commit('editMsg', {msgError: '权限异常', showPositionValue: true})
                commit('saveAppState', {state: true})
                return
              }
            }
            commit('saveAppPromiss', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            commit('editMsg', {
              msgError: res.data.msg,
              showPositionValue: true
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 获取收银桌信息
  getDeskInfo ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            commit('saveDeskInfo', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            if (res.data.msg) {
              commit('editMsg', {
                msgError: res.data.msg,
                showPositionValue: true
              })
            } else {
              commit('editMsg', {msgError: '收银桌参数错误', showPositionValue: true})
            }
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 提交订单信息
  submitOrder ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200) {
            commit('saveOrder', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            new Promise(function (resolve, reject) {
              commit('editMsg', {
                msgError: res.data.msg,
                showPositionValue: true
              })
              resolve()
            }).then(function (res) {
              setTimeout(
                () => {
                  commit('editMsg', {msgError: '', showPositionValue: false})
                },
                1000
              )
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 获取订单信息
  getUserOrder ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200 && res.data.data.status === 0) {
            commit('saveUserOrder', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else if (res.data.data.status != 0) {
            commit('editMsg', {
              msgError: '订单已付款',
              showPositionValue: true
            })
          } else {
            commit('editMsg', {
              msgError: res.data.msg,
              showPositionValue: true
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 刷新订单信息
  getOrderRefersh ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200) {
            commit('saveUserOrder', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            commit('editMsg', {
              msgError: res.data.msg,
              showPositionValue: true
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 获取礼品卡信息
  getCardInfo ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200) {
            commit('saveCardInfo', res.data.rows)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            commit('editMsg', {
              msgError: res.data.msg,
              showPositionValue: true
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  },
  // 微信支付信息
  getPayOver ({commit}, obj) {
    return new Promise((resolve, reject) => {
      req
        .send(obj)
        .then(res => {
          if (res.data.code === 200) {
            commit('savePayOver', res.data.data)
            resolve(res.data)
          } else if (res.data.code === 403) {
            getToken.refreshToken(
              getToken.typePay(),
              obj.companyId,
              urlDelToken
            )
          } else {
            commit('editMsg', {
              msgError: res.data.msg,
              showPositionValue: true
            })
          }
        })
        .catch(error => {
          commit('editMsg', {msgError: '连接超时', showPositionValue: true})
          reject(error)
        })
    })
  }
}
