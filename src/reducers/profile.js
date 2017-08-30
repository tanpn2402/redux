const {ActionTypes} = require('../core/constants');

const initialState = {
  clientDetails: [],
  changePassword: []
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
    case ActionTypes.GETHEADERCHART:
        return Object.assign({},state,{
          headerChart: action.headerChart,
        });  
    default:
      return state;
  }
};
