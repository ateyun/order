import req from '../../api/sellerorder/depdata'

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
export const getWeiDianInfo = ({commit}, obj) => {
    req
        .send(obj)
        .then(res => {
          //console.log('actions---' + JSON.stringify(res.data))
            if (res.data.code === 200) {
                commit('saveWeiDianInfo', res.data.data)
            } else {
                commit('editMsg', {msgError: res.data.msg, showPositionValue: true})
            }
        })
        .catch(error => {
            commit('editMsg', {msgError: '连接超时', showPositionValue: true})
        })
}
//获取企业信息
export const getCompanyInfo = ({commit}, obj) => {
    req
        .send(obj)
        .then(res => {
            if (res.data.code === 200) {
                commit('saveCompanyInfo', res.data.data)
            } else {
                commit('editMsg', {msgError: res.data.msg, showPositionValue: true})
            }
        })
        .catch(error => {
            commit('editMsg', {msgError: '连接超时', showPositionValue: true})
        })
}
//获取ecash配置
export const getEcashConfig = ({commit}, obj) => {
    req
        .send(obj)
        .then(res => {
            if (res.data.code === 200) {
                commit('saveEcashConfig', res.data.data)
            } else {
                commit('editMsg', {msgError: res.data.msg, showPositionValue: true})
            }
        })
        .catch(error => {
            commit('editMsg', {msgError: '连接超时', showPositionValue: true})
        })
}
//获取收银桌信息
export const getCashierDeskInfo = ({commit}, obj) => {
    req
        .send(obj)
        .then(res => {
            if (res.data.code === 200) {
                commit('saveCashierDeskInfo', res.data.data)
            } else {
                commit('editMsg', {msgError: res.data.msg, showPositionValue: true})
            }
        })
        .catch(error => {
            commit('editMsg', {msgError: '连接超时', showPositionValue: true})
        })
}
//获取用户权限
export const getCashierAuth = ({commit}, obj) => {
    req
        .send(obj)
        .then(res => {
            if (res.data.code === 200) {
                commit('saveCashierAuth', res.data.data)
            } else {
                commit('editMsg', {msgError: res.data.msg, showPositionValue: true})
            }
        })
        .catch(error => {
            commit('editMsg', {msgError: '连接超时', showPositionValue: true})
        })
}
//提交固定金额订单
export const submitFixedAmountOrder = ({commit}, obj) => {
    req
        .send(obj)
        .then(res => {
            if (res.data.code === 200) {
                commit('saveFixedAmountOrder', res.data.data)
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
            commit('editMsg', {msgError: '连接超时', showPositionValue: true})
        })
}


