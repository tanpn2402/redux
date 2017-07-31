import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import LoginForm from './components/LoginForm';
import store from './store';

render(
  <Provider store={store}>
      <LoginForm />
  </Provider>,
  document.getElementById('app')
)
