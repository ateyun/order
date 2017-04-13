export const state = {
    // 首页错误信息弹出'
    msgTitle: {
        showPositionValue: false,
        msgError: '',
        position: 'default'
    },
    userInfo: {}, // 用户信息
    weiDianInfo: {}, // 商家信息
    companyInfo : {},
    ecashConfig : {},
    cashierDeskInfo : {},
    cashierAuth : {},
    fixedAmountOrder : {}
}

export const mutations = {
    // 首页错误信息弹出
    editMsg (state, data) {
        state.msgTitle.msgError = data.msgError
        state.msgTitle.showPositionValue = data.showPositionValue
    },
    //保存用户信息
    saveUserInfo (state, data) {
        state.userInfo = data
    },
    //保存微店信息
    saveWeiDianInfo (state, data) {
        state.weiDianInfo = data
    },

    saveCompanyInfo (state , data) {
        state.companyInfo = data
    },

    saveEcashConfig (state , data) {
        state.ecashConfig = data
    },

    saveCashierDeskInfo (state , data) {
        state.cashierDeskInfo = data
    },

    saveCashierAuth (state , data) {
        state.cashierAuth = data
    },

    saveFixedAmountOrder (state , data){
        state.fixedAmountOrder = data
    }
}
