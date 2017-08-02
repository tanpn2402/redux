import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App';
import store from './store';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router-dom'

require('fixed-data-table-2/dist/fixed-data-table.css');

render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('app')
)
