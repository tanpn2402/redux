import config from '../core/config';
const {ActionTypes} = require('../core/constants');

// we not initstate here because we use config variables instead
// se at actions/dologin.js
const initialState = {
    language: "",
    style: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SWITCH_LANGUAGE:
            return Object.assign({}, state, {
                language: action.language
            })

        case ActionTypes.SWITCH_THEME:
            return Object.assign({}, state, {
                style: action.style
            })
        default:
            return state;
    }
};