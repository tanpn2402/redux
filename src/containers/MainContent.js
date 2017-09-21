import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import PageContent from './PageContent'
import StatusBar from './StatusBar'
import config from '../core/config'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Notification from './Notification'

export default class MainContent extends Component {

    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div id="maincontent">
                {/* <SideBar theme={this.props.theme} language= {this.props.language}/> */}
                <PageContent theme={this.props.theme} language= {this.props.language} title={this.props.title}/>
                <StatusBar theme={this.props.theme} language= {this.props.language} title={this.props.title}/>
            </div>
        )
    }
}