import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store';
import MenuBar from './containers/MenuBar'
import PageContent from './components/PageContent'
import rootReduces from './reducers/index';
import Page from './containers/Page'
import './css/index.css';
import './css/react-bootstrap-table-all.min.css';
import './css/App.css';

require('react-grid-layout/css/styles.css')


render(
  <Provider {... { store }}>
    <Page />
  </Provider>,
  document.getElementById('menubar')
)
render(
  <Provider store={store}>
    <PageContent />
  </Provider>,
  document.getElementById('content')
)

