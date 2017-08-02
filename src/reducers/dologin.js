import { ActionTypes } from '../core/constants';

export default function(state = {
    isLoginError: null
}, action) {
    switch (action.type) {
        case ActionTypes.SET_LOGIN_ERROR:
            return Object.assign({}, state, {
                isLoginError: action.isLoginError
            });
        default:
            return state;
    }
}