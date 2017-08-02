const {ActionTypes} = require('../core/constants');

let actions = {
  switchLanguage(language) {
    return {
      type: ActionTypes.SWITCH_LANGUAGE,
      language
    }
  }
};

module.exports = actions;