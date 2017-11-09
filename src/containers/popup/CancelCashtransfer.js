import React, { Component } from 'react';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import CheckAuthenticationModal from './CheckAuthenticationModal'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'

class CancelCashtransfer extends Component{

    constructor(props) {
        super(props)
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.style = {
            height: '200px',
        }

        this.id = 'Cancelcashtrans'
        this.submitCancelCashTransfer = this.submitCancelCashTransfer.bind(this);
    }
    getOddLotSubmit() {
        this.props.getOddLotSubmit(this.props.rowSelected)
        this.props.onHide()
    }

    checkAuthentication(e) {
        // Prevent from reloading page when submit
        e.preventDefault();
        const code1 = document.getElementById("code1").innerText;
        const code2 = document.getElementById("code2").innerText;
        const input1 = document.getElementById("input1").value;
        const input2 = document.getElementById("input2").value;
        this.props.checkAuthen(code1, code2, input1, input2, this.props.language.matrixcard);
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <Modal.Body>
                    <div>
                        {this.props.language.cashtransfer.popup.message}
                    </div>
                </Modal.Body>
                <div style={{textAlign:'center',marginLeft:'15px'}}>
                <CheckAuthenticationModal language={this.props.language}/>
                </div>
                <Modal.Footer>
                    <Button  className="cance;" onClick={this.props.onHide}>Cancel</Button>
                    <Button  className="submit" onClick={this.submitCancelCashTransfer.bind(this)}>Confirm</Button>
                </Modal.Footer>
            </div>
        )
    }

    submitCancelCashTransfer() {
        this.props.submitCancelCashTransfer(this.props.data, this.props.language)
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenFail: state.checkAuthen.isAuthenFail,
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    submitCancelCashTransfer: (data, language) => {
        dispatch(actions.CancelCashtransfer(data, language))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CancelCashtransfer)
