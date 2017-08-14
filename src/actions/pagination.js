const {ActionTypes} = require('../core/constants');

export function changePage(pageIndex, windowID) {
    return {
      type: ActionTypes.PAGINATION,
      page: pageIndex,
      window: windowID,
    }
}
