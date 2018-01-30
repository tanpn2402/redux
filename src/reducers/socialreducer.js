const {ActionTypes} = require('../core/constants')

const initialState = {
    reload: false,
    show: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SHOWUSERDETAIL: 
        return Object.assign({},state,{          
            user: action.user,
            reload: !state.reload,
            show: action.show
        }); 
        break;
        default: return state
        break;
    }
}