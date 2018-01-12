const {ActionTypes} = require('../core/constants');

const initialState = {
    stockCode: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.STOCKMARKET:
            return Object.assign({}, state, {
                stockCode: action.stockCode,
            });

        default:
            return state;
    }
};