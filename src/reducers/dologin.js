import { ActionTypes } from '../core/constants';

const initialState = {
    loginResult: {
        mvMessage: "",
        needChangePwd: "",
        success: false
    },
    loginStatus: "WAIT",

    userSavedData: {
        mvCfgList: [],
        mvResult: null,
        success: false,
    },

    userService: {
        mvListCustServiceBean: [],
        mvListDefaultServiceBean: []
    },

    tradingAccounts: []
}
export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.DOLOGINACTION:
            return Object.assign({}, state, {
                loginResult: action.loginResult,
            });
            
        case ActionTypes.CHECKAUTH:
            
            let acctradinglist = action.tradingAccount == undefined ? 
                state.tradingAccounts : action.tradingAccount.mvTradingAccountBean.tradingAccountSelection
                
            return Object.assign({}, state, {
                loginStatus: action.status,
                userSavedData: action.userSavedData,
                userService: action.userService,

                tradingAccounts: acctradinglist.concat(state.tradingAccounts)
            });

        case ActionTypes.GETFSSUBACCOUNT:
            let list = action.listAccounts == undefined ? [] : action.listAccounts
            let acctrading1 = state.tradingAccounts.concat(list)
            return Object.assign({}, state, {
                tradingAccounts: acctrading1
            })

        case ActionTypes.CHECKSESSION:
            return Object.assign({}, state, {
                sessionState: action.sessionState
            })
        default:
            return state;
    }
}