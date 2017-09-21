import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import PageContent from './PageContent'
import StatusBar from './StatusBar'
import config from '../core/config'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Notification from './Notification'
import SettingNav from './SettingNav'
export default class MainContent extends Component {

    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div id="maincontent">
                <StatusBar theme={this.props.theme} language= {this.props.language} title={this.props.title}/>
                <SettingNav theme={this.props.theme} language= {this.props.language}/>
                <PageContent theme={this.props.theme} language= {this.props.language} title={this.props.title}/>
                

                
            </div>
        )
    }
}