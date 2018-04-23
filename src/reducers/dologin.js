import { ActionTypes } from '../core/constants';
import { iTradeSERVER, FSSERVER } from "../api/serverconfig"


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

    tradingAccounts: [],

    currentTrdAccount: {}
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
            
            // add prefix for call api to server
            acctradinglist.map(e => e.prefix = iTradeSERVER)
                
            return Object.assign({}, state, {
                loginStatus: action.status,
                userSavedData: action.userSavedData,
                userService: action.userService,

                currentTrdAccount: acctradinglist[0],
                tradingAccounts: acctradinglist.concat(state.tradingAccounts)
            });

        case ActionTypes.GETFSSUBACCOUNT:
            let list = action.listAccounts == undefined ? [] : action.listAccounts
            // add prefix for call api to server
            list.map(e => e.prefix = FSSERVER)
            console.log(list)
            let acctrading1 = state.tradingAccounts.concat(list)
            console.log(acctrading1)
            return Object.assign({}, state, {
                tradingAccounts: acctrading1
            })

        case ActionTypes.CHECKSESSION:
            return Object.assign({}, state, {
                sessionState: action.sessionState
            })

        case ActionTypes.SWITCHACCOUNT:
            return Object.assign({}, state, {
                currentTrdAccount: action.account
            })
        default:
            return state;
    }
}