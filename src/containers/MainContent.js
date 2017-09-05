import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import PageContent from './PageContent'
import SideBar from './SideBar'
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
                <SideBar theme={this.props.theme} language= {this.props.language}/>
                <PageContent theme={this.props.theme} language= {this.props.language} title={this.props.title}/>
                
            </div>
        )
    }

    componentDidMount(){
        
        var h1 = document.getElementById('pageheader').offsetHeight
        var h2 = document.getElementById('pagemenu').offsetHeight
        var h3 = window.innerHeight
        document.getElementById('maincontent').style.height = h3 - h1 - h2 + 'px'

    }

    
}