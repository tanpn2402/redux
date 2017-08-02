import {combineReducers} from 'redux';
import dologin from './dologin';
import { sessionReducer } from 'redux-react-session';

export default combineReducers({
  dologin,
  session: sessionReducer
});
