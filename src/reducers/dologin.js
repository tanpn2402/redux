import { ActionTypes } from '../core/constants';

const initialState = {
    result: {
        mvMessage: "",
        needChangePwd: "",
        success: false
    },
    mvClientID: ""
}
export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.DOLOGINACTION:
            return Object.assign({}, state, {
                result: action.result,
                mvClientID: action.mvClientID
            });
        default:
            return state;
    }
}