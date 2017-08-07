import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store';
import { Router, browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import routes from './routes';
import reducer from './reducers'

import './css/index.css';
import './css/react-bootstrap-table-all.min.css';
import './css/App.css';
require('react-grid-layout/css/styles.css')

// Init the session service
sessionService.initSessionService(store);

render(
  <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app')
)
