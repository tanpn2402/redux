//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import config from '../../core/config'

class SaveLayout extends Component {
    constructor(props) {
        super(props)
        this.params = {}
        this.id = 'savelayout-popup'
        this.logout = this.logout.bind(this)
        this.logoutAndSave = this.logoutAndSave.bind(this)
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    logout() {
        this.props.onLogoutClick(this.props.checkSessionID)
    }

    logoutAndSave() {
        console.log(this.props)
        let userSavedData = this.props.userSavedData
        if(userSavedData && userSavedData.mvCfgList.length > 0) {
            let groupId = userSavedData.mvCfgList[0].GROUPID
            
            this.props.onSaveLayout(groupId, this.props.language)
            this.props.onLogoutClick(this.props.checkSessionID)
        }
    }

    render() {
        let buttonConfirm = this.props.theme.buttons.confirm
        let buttonCancel = this.props.theme.buttons.cancel
        return (
            <div>
                <Modal.Body style={{ textAlign: 'center' }}>
                    {this.props.language.messagebox.message.saveLayoutConfirm}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={buttonCancel} onClick={this.logout}>{this.props.language.button.no}</Button>
                    <Button style={buttonConfirm} onClick={this.logoutAndSave}>{this.props.language.button.yes}</Button>
                </Modal.Footer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userSavedData: state.dologin.userSavedData,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onLogoutClick: (params) => {
        dispatch(actions.doLogout(params))
    },
    onSaveLayout: (params) => {
        dispatch(actions.saveLayout(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SaveLayout)
