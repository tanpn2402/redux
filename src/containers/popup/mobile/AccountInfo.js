import React from 'react'
import config from '../../../core/config'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import {getLanguage, getTheme } from '../../../utils'
import {Button, Modal, Col} from 'react-bootstrap';
class Setting extends React.Component {
    constructor(props) {
        super(props)

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
        this._ref = {}

        this.subAcc = [
            "C0800011",
            "C0800012",
            "C0800013",
            "C0800014"            
        ]
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

    onClick(id) {
        let x = this._ref[id]
        // if(x) {
        //     var f = x.classList
        //     if(f[f.length - 1] == "in") {
        //         f.remove("in")
        //     }
        // }
        // this._ref.map(r => {
        //     // r.classList.remove("in")
        // })
        
    }

    onSubAccChange(e) {
        let val = e.target.value
        console.log("Sub Account Id: " + val)
    }
    
    render() {
        let language = this.props.data.language.page
        let theme = this.props.data.theme

        let personalProfile = language.personalprofile
       
        this.doResponseMapping()
        return (
            <div>
                <div className="modal-body profile-panel" >
                    <div className="profile-list">

                        <div>
                            <div data-toggle="collapse" data-target={'#subaccount'} className="st-header" onClick={() => this.onClick("subaccount")}>
                                <div className="st-icon"><i className="material-icons md-24">account_balance_wallet</i></div>
                                <label aria-expanded="true" className="main-menu-header">
                                    {"SubAccount"}
                                </label>
                            </div>
                            <div id='subaccount' className="nav nav-list tree profile-item collapse in" ref={r => this._ref["subaccount"]=r}
                                aria-expanded="true" style={{textAlign: "center", margin: "20px 0"}}>
                                <select style={{border: "1px solid: #ccc", borderRadius: "5px", padding:"4px 10px", height: "32px"}}
                                    onChange={(e) => this.onSubAccChange(e)}>
                                    {
                                        this.subAcc.map(e => <option value={e}>{e}</option>)
                                    }
                                </select>
                            </div>
                           
                        </div>

                        {
                            this.list.map(e => {
                                if(e.id === 'changepassword')
                                    return;
                                return (
                                    <div>
                                        <div data-toggle="collapse" data-target={'#' + e.id} className="st-header" onClick={() => this.onClick(e.id)}>
                                            <div className="st-icon"><i className="material-icons md-24">{e.icon}</i></div>
                                            <label aria-expanded="true" className="main-menu-header">
                                                {personalProfile[e.id].title}
                                            </label>
                                        </div>
                                        <ul id={e.id} className="nav nav-list tree profile-item collapse" aria-expanded="true" ref={r => this._ref[e.id]=r}>
                                            {
                                                e.value.map(v => {
                                                    
                                                    return (
                                                        <li id={e.id + '_' + v} >
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
                                                    )}
                                                    
                                                )
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="modal-footer" ref={r => this.footer = r}>
                    <button className="hks-btn btn-cancel" onClick={this.props.onHide}>{language.button.close}</button>
                </div>
            </div>

            
        )
    }

    componentDidMount() {
        this.props.getClientInfo([])



        //this.
        console.log(this.footer.offsetHeight)
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting)