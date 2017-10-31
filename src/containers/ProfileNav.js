import React, { Component } from 'react'
import MenuItem from './SideMenu/MenuItem'
import config from '../core/config'
import { connect } from "react-redux"
import * as actions from "../actions"
import { FormControl, Button } from 'react-bootstrap'
import * as $ from 'jquery'

class ProfileNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuitem: config.menu_items,
            language: this.props.language,
            theme: this.props.theme
        }

        this.params = {
            oldPassword: '',
            password: '',
            mvSeriNo: '',
            mvAnswer: '',
            mvSaveAuthenticate: true
        }

        this.list = config.profiles
        this.retypePass = ''

        this.responseMap = {}
    }

    render() {
        let personalprofile = this.props.language.personalprofile
        let profiletitle = this.props.theme.profile.profiletitle
        let profilepanel = this.props.theme.profile.profilepanel

        this.doResponseMapping()
        return (
            <div id="profilenav" className="profilenav">
                <div className="overlay" onClick={e => this.closeSetting()}></div>
                <div className="profile-panel" style={profilepanel} >
                    <div className="title" style={profiletitle} >
                        Profile
                    </div>
                    <div className="profile-list">
                        {
                            this.list.map(e => {
                                return (
                                    <div>
                                        <div data-toggle="collapse" data-target={'#' + e.id} className="st-header">
                                            <div className="st-icon"><i className="material-icons md-36">{e.icon}</i></div>
                                            <label aria-expanded="true" className="main-menu-header">{personalprofile[e.id].title}</label>
                                        </div>
                                        <ul id={e.id} className="nav nav-list tree profile-item" aria-expanded="true">
                                            {
                                                e.value.map(v => {
                                                    if (e.id === 'changepassword' && v === 'save') {
                                                        return (
                                                            <Button bsStyle='primary' className='profile-buttonsave' 
                                                                onClick={() => this.onChangePassword()}>
                                                                {personalprofile[e.id][v]}
                                                            </Button>
                                                        )
                                                    } else {
                                                        return (
                                                            <li id={e.id + '_' + v} style={this.props.theme.font2} >
                                                                {personalprofile[e.id][v]}
                                                                <input type={e.id === 'changepassword' ? 'password' : 'text'} 
                                                                    value={this.responseMap[e.id + '_' + v]} id={v} 
                                                                    className='form-control' readOnly={e.id !== 'changepassword'} 
                                                                    onChange={(e) => this.onChangeValue(e)} />
                                                            </li>
                                                        )
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getClientInfo([])
    }


    doResponseMapping() { // append actual data into each list item of the list instead of hardcode all in the render part
        
        try {
            let clientDetails = this.props.clientDetails.mvPersonnalProfileBean == undefined ? [] : this.props.clientDetails.mvPersonnalProfileBean
            this.responseMap = {
                'holderinformation_holdername': clientDetails.mvName,
                'holderinformation_accountno': clientDetails.mvAccountNumber,
                'holderinformation_email': clientDetails.mvEmail,
                'holderinformation_telephone': clientDetails.mvPhoneNumber,
                'holderinformation_address': clientDetails.mvAddress,
                'holderinformation_personalid': clientDetails.mvIDNumber,
                'personinformation_authorizedname': clientDetails.mvAgentList[0].agentName,
                'personinformation_idno': clientDetails.mvAgentList[0].agentIDNumber,
                'personinformation_authorization': clientDetails.mvAgentList[0].agentAttorney,
                'personinformation_telephone': clientDetails.mvAgentList[0].agentPhone
            }
        } catch (error) {
            console.log('ERROR_', error)
        }
    }

    onChangePassword() {
        if (this.params['oldPassword'] === '') {
            this.props.onShowMessageBox(this.state.language.page.personalprofile.message.error, this.state.language.page.personalprofile.message.emptypass)
        }
        else if (this.params['password'].length < 6 || this.params['password'].length > 30) {
            this.props.onShowMessageBox(this.state.language.page.personalprofile.message.error, this.state.language.page.personalprofile.message.newpassunaccepted)
        }
        else if (this.retypePass !== this.params['password']) {
            this.props.onShowMessageBox(this.state.language.page.personalprofile.message.error, this.state.language.page.personalprofile.message.notmatched)
        }
        else {
            this.props.changePassword(this.params)
        }
    }

    onChangeValue(e) {
        switch (e.target.id) {
            case 'currentpassword':
                this.params['oldPassword'] = e.target.value
                break;
            case 'newpassword':
                this.params['password'] = e.target.value
                break;
            case 'retypepassword':
                this.retypePass = e.target.value
                break;
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.changePasswordResult.length > 0) {
            let result = nextProps.changePasswordResult.changePasswordBean
            this.props.onShowMessageBox(
                result.PData === 'fail_to_change' ?
                    this.state.language.page.personalprofile.message.error
                    : this.state.language.page.personalprofile.message.notification,
                result.PData === 'fail_to_change' ?
                    this.state.language.page.personalprofile.message.changefailed
                    : this.state.language.page.personalprofile.message.changesuccess
            )
        }
    }

    closeSetting() {
        document.getElementById('profilenav').classList.toggle("open")
    }

}

const mapStateToProps = state => ({
    clientDetails: state.profile.clientDetails,
    changePasswordResult: state.profile.changePassword
});

const mapDispatchToProps = (dispatch, props) => ({
    getClientInfo: (param) => { 
        dispatch(actions.getClientInfo(param)) 
    },
    changePassword: (param) => { 
        dispatch(actions.changePassword(param)) 
    },
    onShowMessageBox: (type, message, handleFunction) => {
        dispatch(actions.showMessageBox(type, message, handleFunction))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNav)