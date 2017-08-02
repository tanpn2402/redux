import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import MenuBar from './containers/MenuBar'
import PageContent from './components/PageContent'

import './css/index.css';
import './css/react-bootstrap-table-all.min.css';
import './css/App.css';

require('react-grid-layout/css/styles.css')
const store = createStore(reducer)

render(
  <Provider store={store}>
    <MenuBar />
  </Provider>,
  document.getElementById('menubar')
)
render(
  <Provider store={store}>
    <PageContent />
  </Provider>,
  document.getElementById('content')
)

