import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { sessionService } from 'redux-react-session'
import reducer from './reducers'
import AppRouter from './components/AppRouter'
import * as actions from './actions'

import './css/App.css';

require('react-grid-layout/css/styles.css')

// Init the session service
sessionService.initSessionService(store);

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>, document.getElementById('app')
)
