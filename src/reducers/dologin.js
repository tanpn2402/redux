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

    tradingAccount: {
        tradingAccountSelection: []
    }
}
export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.DOLOGINACTION:
            return Object.assign({}, state, {
                loginResult: action.loginResult,
            });
            
        case ActionTypes.CHECKAUTH:
            
            let acctrading = action.tradingAccount == undefined ? state.tradingAccount : action.tradingAccount.mvTradingAccountBean
            acctrading.tradingAccountSelection.push(
                {
                    "investorGroupID":"KOREAN",
                    "aeID":"ALEX",
                    "productID":"HKS",
                    "subAccountName":"Derivatives Account",
                    "subAccountID":"460487D",
                    "enableMargin":"N",
                    "tradingAccSeq":"1",
                    "investorClassID":"NORMAL.01",
                    "accountSeq":"1",
                    "type": "DERIVATIVES"
                }
            )
            
            return Object.assign({}, state, {
                loginStatus: action.status,
                userSavedData: action.userSavedData,
                userService: action.userService,

                tradingAccount: acctrading
            });

        case ActionTypes.CHECKSESSION:
            return Object.assign({}, state, {
                sessionState: action.sessionState
            })
        default:
            return state;
    }
}