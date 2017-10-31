import React, { Component } from 'react'
import PageContent from '../PageContent'
import SideMenu from './SideMenu'
import Search from './Search'
export default class MainContent extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div id="maincontent" className="maincontent-mobile">
                <SideMenu language={this.props.language}/>
                <Search language={this.props.language}/>
                <PageContent theme={this.props.theme} language={this.props.language.page}   />
            </div>
        )
    }
}