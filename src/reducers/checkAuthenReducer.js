import { ActionTypes } from '../core/constants';

const initialState = {
    isAuthenFail: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_AUTHEN_FAIL:
            return Object.assign({}, state, {
                isAuthenFail: action.isAuthenFail
            });
        default: 
            return state;
    }
};