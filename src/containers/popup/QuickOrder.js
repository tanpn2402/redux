import React from 'react';
import { Button, Modal, } from 'react-bootstrap'
import PlaceOrder from '../widget/PlaceOrder'
export default class QuickOrder extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>  
                <div className="modal-body" style={{height: "244px", padding: "2px"}}>
                    <PlaceOrder showTitle={false} {...this.props} />
                </div>
            </div>
        )
    }
}