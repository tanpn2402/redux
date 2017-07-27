import {ActionTypes} from '../core/constants';
let i = 0
export function setTracks(tracks) {
  return {
    type: ActionTypes.TRACKS_SET,
    tracks
  };
};

export function addTrack(tracks) {
	console.log('action addtrack', tracks)
	var name = tracks;
	if(tracks === '1'){
		name = ' tan nhat'
	}
  return {
    type: ActionTypes.ADD_TRACK,
    title: name,
    id: i++,
  };
};
