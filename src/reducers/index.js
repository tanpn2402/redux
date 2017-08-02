import {combineReducers} from 'redux';
import dologin from './dologin';
import { sessionReducer } from 'redux-react-session';


import menuSelected from './menu_selected';
export default combineReducers({
  dologin,
  session: sessionReducer,
  menuSelected
});
