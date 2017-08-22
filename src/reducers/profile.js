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

    case ActionTypes.CHANGEPASSWORD:
        return Object.assign({},state,{
          changePassword: action.changePassword,
        });
    default:
      return state;
  }
};
