import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import MenuBar from '../containers/MenuBar'

import PageContent from './PageContent'

export default class App extends Component {

 /* constructor(){
    super()
  }
*/
  render() {
    console.log('render in App')
    ReactDOM.render(<PageContent />,document.getElementById('app'));
    return (
       <PageContent/>
    )
  }
}



