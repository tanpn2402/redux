import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import MenuBar from '../containers/MenuBar'
import FooterButtons from './FooterButtons'
import PageContent from './PageContent'

export default class App extends Component {

 /* constructor(){
    super()
  }
*/
  render() {
    console.log('render in App')
    return (
      <div>
        <MenuBar />
        <PageContent />
        <FooterButtons />
        </div>
             
      
    )
  }
}



