import React, { Component } from 'react'
import PageContent from './PageContent'
import SideMenu from './SideMenu'
import Search from './Search'
import FunctionChooser from './FunctionChooser'
import Notification from '../main/Notification'

export default class MainContent extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div id="maincontent" className="maincontent-mobile">
                <SideMenu language={this.props.language} theme={this.props.theme} />
                <Search language={this.props.language} />
                <Notification theme={this.props.theme} language={this.props.language} />
                <FunctionChooser language={this.props.language.page} />
                <PageContent theme={this.props.theme} language={this.props.language.page} />
            </div>
        )
    }
}


