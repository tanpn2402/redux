import {ActionTypes} from '../core/constants';

export function clicked(id){
    console.log("Clicked" + id)
    return{
            type: ActionTypes.CLICK,
            id
    }
    
}