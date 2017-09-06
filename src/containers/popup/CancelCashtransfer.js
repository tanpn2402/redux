import React, { Component } from 'react';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
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
        this.handleSubmit = this.handleSubmit.bind(this);
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
            <div className="modalbody">
                
                <div style={{textAlign:'center',marginLeft:'15px'}}>
                <CheckAuthenticationModal language={this.props.language}/>
                </div>
                <Modal.Footer>
                    <Button  className="oddlotcancel" onClick={this.props.onHide}>Cancel</Button>
                    <Button  className="oddlotsubmit" onClick={this.checkmatrix.bind(this)}>Confirm</Button>
                </Modal.Footer>
            </div>
        )
    }

    handleSubmit(e) {
      e.preventDefault();
    }

    checkmatrix() {

    }
}


export default (CancelCashtransfer)
