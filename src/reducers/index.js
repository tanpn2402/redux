import {combineReducers} from 'redux';
import tracks from './tracks';
import message from './login';
/*
day la nhung state moi ma reducer se tra ve

*/
export default combineReducers({
  tracks,
  message,
});
