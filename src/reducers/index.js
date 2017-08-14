import {combineReducers} from 'redux'
import dologin from './dologin'
import { sessionReducer } from 'redux-react-session'
import menuSelected from './menu_selected'
import config from './configurations'
import enterOrder from './enterorder'
import checkAuthen from './checkAuthenReducer'
import orderjournal from './orderjournal'
import pagination from './pagination'
import stock from './stockreducer'
import cashtranshistory from './cashtranshistory'

export default combineReducers({
  dologin,
  session: sessionReducer,
  menuSelected,
  config,
  enterOrder,
  checkAuthen,
  orderjournal,
  pagination,
  stock,
  cashtranshistory,
  
});
