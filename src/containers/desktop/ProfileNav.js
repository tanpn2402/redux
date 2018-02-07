import React, { Component } from 'react'
import config from '../../core/config'
import { connect } from "react-redux"
import * as actions from "../../actions"
import { FormControl, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap'
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
        let personalProfile = this.props.language.personalprofile
        let profileTitle = this.props.theme.profile.profileTitle
        let profilePanel = this.props.theme.profile.profilePanel
        
        let buttonStyle = this.props.theme.form.button.submit
        this.doResponseMapping()
        return (
            <div id="profilenav" className="profilenav">
                <div className="overlay" onClick={e => this.closeSetting()}></div>
                <div className="profile-panel" style={profilePanel} >
                    <div className="title" style={profileTitle} >
                        {this.props.language.menu.personalprofile}
                    </div>
                    <div className="profile-list">
                        {
                            this.list.map(e => {
                                return (
                                    <div>
                                        <div data-toggle="collapse" data-target={'#' + e.id} className="st-header">
                                            <div className="st-icon"><i className="material-icons md-24">{e.icon}</i></div>
                                            <label aria-expanded="true" className="main-menu-header">{personalProfile[e.id].title}</label>
                                        </div>
                                        <ul id={e.id} className="nav nav-list tree profile-item collapse in" aria-expanded="true">
                                            {
                                                e.value.map(v => {
                                                    if (e.id === 'changepassword' && v === 'save') {
                                                        return (
                                                            <div style={{textAlign: "center"}} >
                                                                <button className='hks-btn btn-submit' style={buttonStyle}
                                                                    onClick={() => this.onChangePassword()}>
                                                                    {personalProfile[e.id][v]}
                                                                </button>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <li id={e.id + '_' + v} style={this.props.theme.font.sub1} >
                                                                <div style={{display: "table", width: "100%"}}>
                                                                    <Col xs={4}>
                                                                        {personalProfile[e.id][v]}
                                                                    </Col>
                                                                    <Col xs={8}>
                                                                        <input type={e.id === 'changepassword' ? 'password' : 'text'} 
                                                                            value={this.responseMap[e.id + '_' + v]} id={v} 
                                                                            className='form-control' readOnly={e.id !== 'changepassword'} 
                                                                            onChange={(e) => this.onChangeValue(e)} />
                                                                    </Col>
                                                                </div>
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
        this.props.getClientInfo({})
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
            this.props.onShowMessageBox(this.state.language.page.personalProfile.message.error, this.state.language.page.personalProfile.message.emptypass)
        }
        else if (this.params['password'].length < 6 || this.params['password'].length > 30) {
            this.props.onShowMessageBox(this.state.language.page.personalProfile.message.error, this.state.language.page.personalProfile.message.newpassunaccepted)
        }
        else if (this.retypePass !== this.params['password']) {
            this.props.onShowMessageBox(this.state.language.page.personalProfile.message.error, this.state.language.page.personalProfile.message.notmatched)
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
                    this.state.language.page.personalProfile.message.error
                    : this.state.language.page.personalProfile.message.notification,
                result.PData === 'fail_to_change' ?
                    this.state.language.page.personalProfile.message.changefailed
                    : this.state.language.page.personalProfile.message.changesuccess
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