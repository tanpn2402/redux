import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './components/App'
import MenuBar from './containers/MenuBar'
import FooterPagination from './components/FooterPagination'
import PageContent from './components/PageContent'

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

