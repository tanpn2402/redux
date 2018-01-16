const {ActionTypes} = require('../core/constants');

const initialState = {
    instrument: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHANGEINSTRUMENT:
            return Object.assign({}, state, {
                instrument: action.instrument,
            });

        default:
            return state;
    }
};