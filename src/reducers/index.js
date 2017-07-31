import {combineReducers} from 'redux';
import tracks from './tracks';
import menuSelected from './menu_selected';
export default combineReducers({
  tracks,
  menuSelected
});
