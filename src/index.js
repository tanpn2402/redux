import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Router from './components/Router';
import store from './store';

render(
  <Provider store={store}>
       <Router /> 
  </Provider>,
  document.getElementById('app')
)
