const { ActionTypes } = require('../core/constants');
const api = require('../api/api_change_language');

const initialState = {
  language: api.getContent(localStorage.getItem("lastLang")!=undefined?localStorage.getItem("lastLang"):"en"), // Loads default language content (en) as an initial state
  style: localStorage.getItem("lastTheme")!=undefined?localStorage.getItem("lastTheme"):'theme_light',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CONFIGUATIONS:
      return {
        language: action.language,
        style: 'theme_' + action.style,
      };

    case ActionTypes.SWITCH_LANGUAGE:
      return {
        language: action.language
      };

    case ActionTypes.SWITCH_THEME:
      return {
        style: 'theme_' + action.style
      };

    case ActionTypes.CHECKSESSION:
      return Object.assign({}, state, {
        sessionState: action.sessionState
      })
    default:
      return state;
  }
};
