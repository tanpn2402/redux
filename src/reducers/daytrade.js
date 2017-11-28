import config from '../core/config';
const {ActionTypes} = require('../core/constants');

const initialState = {
    response: {
        OrderInfo: []
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.QUERYORDERINFO:
            return Object.assign({}, state, {
                response: action.data
            })

        default:
            return state;
    }
};