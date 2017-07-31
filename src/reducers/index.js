import {combineReducers} from 'redux';
import tracks from './tracks';
import dologin from './dologin';

export default combineReducers({
  tracks,
  dologin
});
