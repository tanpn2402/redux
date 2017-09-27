const {ActionTypes} = require('../core/constants');

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ENQUIRYORDERHISTORY:
        //console.log(action.data)
        return Object.assign({},state,{
          data: action.data,
        });

    default:
      return state;
  }
};
