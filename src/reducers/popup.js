const {ActionTypes} = require('../core/constants');

const initialState = {
    data: [],
    language: [],
    id: '',
    timestamp: 1,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.POPUP:
            return Object.assign({}, state, {
                data: action.data,
                language: action.language,
                id: action.id,
                title: action.title,
                authcard: action.authcard,
                timestamp: action.timestamp
            });

        default:
            return state;
    }
};