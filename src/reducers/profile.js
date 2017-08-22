const {ActionTypes} = require('../core/constants');

const initialState = {
  clientDetails: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PROFILE:
        return Object.assign({},state,{
          clientDetails: action.clientDetails,
        });

    default:
      return state;
  }
};
