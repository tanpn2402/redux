import {combineReducers} from 'redux';
import tracks from './tracks';
import dologin from './dologin';
import { sessionReducer } from 'redux-react-session';

export default combineReducers({
  dologin,
  session: sessionReducer
});
