import React from 'react'
import { render } from 'react-dom'
import {createStore} from 'redux';
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './containers/App'
import MenuBar from './containers/MenuBar'
import PageContent from './components/PageContent'
import translations from './languages/translation'
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <IntlProvider translations={translations}>
    <MenuBar />
    </IntlProvider>
  </Provider>,
  document.getElementById('menubar')
)
render(
  <Provider store={store}>
    <PageContent />
  </Provider>,
  document.getElementById('content')
)

