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
import orderconfirmation from './orderconfirmation'
import porfolio from './porfolio'
import orderhistory from './orderhistory'
import stockstatement from './stockstatement'
import cashstatement from './cashstatement'

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
  orderconfirmation,
  porfolio,
  orderhistory,
  stockstatement,
  cashstatement,
  
});
