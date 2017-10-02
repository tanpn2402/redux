//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import config from '../../core/config'

class SaveLayout extends Component{
    constructor(props) {
        super(props)
        this.params = {}
        this.id = 'savelayout-popup'
        this.logout = this.logout.bind(this)
        this.logoutAndSave = this.logoutAndSave.bind(this)
    }

    componentDidMount(){
        this.params['mvAction'] = 'QUERYDEFAULT'
        this.props.onGetSavedContentLayout(this.params)
    }

    logout(){
        this.props.onLogoutClick(this.props.checkSessionID)
    }

    logoutAndSave(){
        const groupId = this.props.savedcontent.mvCfgList[0].GROUPID
        this.params['mvGroupName'] = 'User1'
        this.params['mvIsDefault'] = 'Y'
        this.params['mvGroupType'] = 'U'
        this.params['mvGroupID'] = groupId
        this.params['mvSavedContent'] = JSON.stringify(this.props.config)
        this.params['mvAction'] = 'MODIFY'
        this.props.onSaveLayout(this.params)
        this.props.onLogoutClick(this.props.checkSessionID)
    }

    render(){
        return(
            <div>
                <Modal.Body>
                    {this.props.language.messagebox.message.saveLayoutConfirm}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.logout}>Don't save and logout</Button>
                    <Button onClick={this.logoutAndSave}>Save and logout</Button>
                </Modal.Footer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    savedcontent: state.menuSelected.savedcontent
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    onGetSavedContentLayout: (params) => {
        dispatch(actions.getSavedContentLayout(params))
    },
    onLogoutClick: (params) => {
        dispatch(actions.logout(params))
    },
    onSaveLayout: (params) => {
        dispatch(actions.saveLayout(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SaveLayout)
