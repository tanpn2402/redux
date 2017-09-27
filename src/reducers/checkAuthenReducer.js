import { ActionTypes } from '../core/constants';

const initialState = {
    isAuthenFail: null,
    matrixResponse: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_AUTHEN_FAIL:
            return Object.assign({}, state, {
                isAuthenFail: action.isAuthenFail
            });
        case ActionTypes.MATRIXCARD:
            console.log(action.data.mvSuccess)
            return Object.assign({}, state, {
                matrixResponse: action.data.mvSuccess
            });
        default:
            return state;
    }
};