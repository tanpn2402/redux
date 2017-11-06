import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import PageContent from './PageContent'
import StatusBar from './StatusBar'
import config from '../core/config'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Notification from './Notification'
import SettingNav from './SettingNav'
import ProfileNav from './ProfileNav'
import MarqueeBar from '../containers/MarqueeBar'
export default class MainContent extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div id="maincontent" className="maincontent-desktop">
                <StatusBar theme={this.props.theme} language={this.props.language.page} checkSessionID={this.props.checkSessionID} />
                <MarqueeBar language={this.props.language.page} />
                <ProfileNav theme={this.props.theme} language={this.props.language.page} />
                <SettingNav theme={this.props.theme} language={this.props.language} />
                <PageContent theme={this.props.theme} language={this.props.language.page} />
            </div>
        )
    }
}