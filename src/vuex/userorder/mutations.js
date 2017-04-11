export const state = {
  // 首页错误信息弹出'
  msgTitle: {
    showPositionValue: false,
    msgError: '',
    position: 'default'
  },
  userInfo: {}, // 用户信息
  businessInfo: {} // 商家信息
}

export const mutations = {
  // 首页错误信息弹出
  editMsg (state, data) {
    state.msgTitle.msgError = data.msgError
    state.msgTitle.showPositionValue = data.showPositionValue
  },
  //   保存用户信息
  saveUserInfo (state, data) {
    state.userInfo = data
  },
  //   保存微店信息
  saveMicroShop (state, data) {
    state.businessInfo = data
  }
}
