import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

export default class Warning extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        if(this.props.alertVisible){
            return(
                <Alert  bsStyle="danger" onDismiss={this.props.handleAlertDismiss}>
                    <h4>Lỗi!</h4>
                    <p>Khối lượng phải là bội của 10. Và giá từ 22.000 đến 24.000</p>
                </Alert>
            )
        }
        return(
            <div></div>
        )
    }
}