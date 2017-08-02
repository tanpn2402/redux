const {ActionTypes} = require('../core/constants');
const api = require('./api');

const initialState = {
  content: api.getContent() // Loads default language content (en) as an initial state
};

let lang_reducer = function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SWITCH_LANGUAGE:
      return {
        content: api.getContent(action.language)
      };
    default:
      return state;
  }
};

module.exports = lang_reducer;
