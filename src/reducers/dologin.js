import { ActionTypes } from '../core/constants';

const initialState = {
    result: {
        mvMessage: "",
        needChangePwd: "",
        success: false
    },
    loginStatus: "WAIT",
}
export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.DOLOGINACTION:
            return Object.assign({}, state, {
                result: action.result
            });
        case ActionTypes.CHECKAUTH:
        console.log(action)
            return Object.assign({}, state, {
                loginStatus: action.status
            });
        default:
            return state;
    }
}