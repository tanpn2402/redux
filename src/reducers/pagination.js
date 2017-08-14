const {ActionTypes} = require('../core/constants');

const initialState = {
  window: '',
  page: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PAGINATION:
      return Object.assign({},state,{        
        window: action.window,
        page: action.page,
      })
    default:
      return state;
  }
};
