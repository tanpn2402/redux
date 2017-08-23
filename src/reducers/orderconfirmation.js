const { ActionTypes } = require('../core/constants');

const initialState = {
    data: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ENQUIRYCONFIRMORDER:
            return Object.assign({}, state, {
                data: action.data,
                language: action.language,
                reload: action.reload,
            });

        case ActionTypes.CONFIRMORDERSUBMIT:
            return Object.assign({}, state, {
                returnCode: '1',
                message: "ok"
            });

        default:
            return state;
    }
};