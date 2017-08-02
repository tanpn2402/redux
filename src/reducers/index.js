import {combineReducers} from 'redux';

import menuSelected from './menu_selected';
import lang_reducers from './lang_reducers'

export default combineReducers({
  menuSelected,
  lang_reducers
});
