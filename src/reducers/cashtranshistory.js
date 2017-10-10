const { ActionTypes } = require('../core/constants');

const initialState = {
    cashTransHistory: {
        list: [],
        totalCount: 0,
    }
};

export default function (state = initialState, action) {
    switch (action.type) {

        case ActionTypes.ENQUIRYCASHTRANSACTION:
            action.data.list = action.data.list === null ? [] : action.data.list
            return Object.assign({}, state, {
                cashTransHistory: action.data
            });

        default:
            return state;
    }
};
