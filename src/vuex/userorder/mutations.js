export const state = {
  // 首页错误信息弹出'
  msgTitle: {
    showPositionValue: false,
    msgError: '',
    position: 'default'
  },
  allStates: {
    enterPriseStatus: false,
    appPromissStatus: false,
    userInfoStatus: false,
    businessInfoStatus: false,
    deskInfo: false
  },
  // 应用权限状态
  appState: {
    card: false
  },

  enterPrise: {}, // 企业信息

  appPromiss: {}, // 应用权限

  userInfo: {}, // 用户信息

  businessInfo: {}, // 商家信息

  deskInfo: {}, // 收银桌信息

  orderSumit: {}, // 提交订单信息

  userOrder: {}, // 用户订单信息

  cardInfo: [], // 礼品卡信息

  cardInput: '', // 礼品卡号存储

  payOver: {} // 微信支付结果
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
    state.allStates.userInfoStatus = true
  },
  //   保存微店信息
  saveMicroShop (state, data) {
    state.businessInfo = data
    state.allStates.businessInfoStatus = true
  },
  //   保存企业信息
  saveEnterPrise (state, data) {
    state.enterPrise = data
    state.allStates.enterPriseStatus = true
  },
  //   应用权限
  saveAppPromiss (state, data) {
    state.appPromiss = data
    state.allStates.appPromissStatus = true
  },
  //  收银桌信息
  saveDeskInfo (state, data) {
    state.deskInfo = data
    state.allStates.deskInfo = true
  },
  //  提交订单信息
  saveOrder (state, data) {
    state.orderSumit = data
  },
  //  获取用户订单信息
  saveUserOrder (state, data) {
    state.userOrder = data
  },
  //  获取礼品卡信息
  saveCardInfo (state, data) {
    state.cardInfo = data
  },
  //  礼品卡应用权限信息
  saveAppState (state, data) {
    state.appState.card = data.state
  },
  //  礼品卡号存储
  saveCardCode (state, data) {
    state.cardInput = data
  },
  //  微信支付结果
  savePayOver (state, data) {
    state.payOver = data
  }
}
