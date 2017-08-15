import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

export default class Warning extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        if(this.props.alertVisible){
            return(
                <Alert bsStyle="danger" onDismiss={this.props.handleAlertDismiss} className="modalbody">
                    <h4>Lỗi!</h4>
                    <p>Khối lượng phải là bội của 100. Và giá từ {this.props.modifyData.floor} đến {this.props.modifyData.ceiling}</p>
                </Alert>
            )
        }
        return(
            <div></div>
        )
    }
}