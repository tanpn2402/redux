const {ActionTypes} = require('../core/constants');

export function changeConfig(language, style) {
  console.log(language, style)
    return {
      type: ActionTypes.CONFIGUATIONS,
      language,
      style,
    }
}
