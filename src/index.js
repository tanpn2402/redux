import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import store from './store';
import { Router, browserHistory } from 'react-router';
import { sessionService } from 'redux-react-session';
import routes from './routes';

// Init the session service
sessionService.initSessionService(store);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app')
)
