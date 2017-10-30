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
        success: false
    },

    userService: {
        mvListCustServiceBean: [],
        mvListDefaultServiceBean: []
    }
}
export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.DOLOGINACTION:
            return Object.assign({}, state, {
                loginResult: action.loginResult,
            });
            
        case ActionTypes.CHECKAUTH:
            return Object.assign({}, state, {
                loginStatus: action.status,
                userSavedData: action.userSavedData,
                userService: action.userService
            });

        case ActionTypes.CHECKSESSION:
            return Object.assign({}, state, {
                sessionState: action.sessionState
            })
        default:
            return state;
    }
}