import {ActionTypes} from '../core/constants';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TRACKS_SET:
      return setTracks(state, action);
    
    case ActionTypes.ADD_TRACK:
      return addTrack(state, action);

      case ActionTypes.CLICK:
      return clicked(state,action);

    default:
      break;
     
  }

  return state;
}

function setTracks(state, action) {
  const {tracks} = action;
  //state = ["hello","1234"];
      console.log('state', state);
      console.log('action', action);
      console.log('combine', [...state, ...tracks]);
  return [...state, ...tracks];
}

function addTrack(state, action) {
  //state = ["hello","1234"];
      /*console.log('state', state);
      console.log('action', action);
      console.log('combine', [...state, {id: action.id, title: action.title}]);*/
  return [...state, {id: action.id, title: action.title}];
}

function clicked(state,action){
  const {id}=action;
  console.log('state', state);
      console.log('action', action);
      console.log('combine', [...state, ...id]);
  return [...state, ...id];
}