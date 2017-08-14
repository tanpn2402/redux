import {combineReducers} from 'redux'
import dologin from './dologin'
import { sessionReducer } from 'redux-react-session'
import menuSelected from './menu_selected'
import config from './configurations'
import orderjournal from './orderjournal'
import pagination from './pagination'
import stock from './stockreducer'

export default combineReducers({
  dologin,
  session: sessionReducer,
  menuSelected,
  config,
  orderjournal,
  pagination,
  stock,

  
});
