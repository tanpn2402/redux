const { ActionTypes } = require('../core/constants');

const initialState = {
    data: [],
};

export default function (state = initialState, action) {
    switch (action.type) {

        case ActionTypes.ENQUIRYMARGINLOAN:
            return Object.assign({}, state, {
                data: action.data,
                language: action.language,
                reload: action.reload,
            });

        default:
            return state;
    }
};
