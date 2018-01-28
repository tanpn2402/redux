import React from 'react';
import { Button, Modal, } from 'react-bootstrap'
import AccountBalance from '../widget/AccountInfo'

export default class AccountBalancePopup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>  
                <div className="modal-body" style={{height: "244px", padding: "2px"}}>
                    <AccountBalance {...this.props} />
                </div>
            </div>
        )
    }
}