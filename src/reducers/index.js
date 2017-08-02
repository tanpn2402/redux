import {combineReducers} from 'redux';
import tracks from './tracks';
import menuSelected from './menu_selected';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
export default combineReducers(({
  tracks,
  menuSelected,
  Intl
}))
