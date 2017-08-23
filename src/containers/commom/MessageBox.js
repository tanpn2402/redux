import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
export default class MessageBox extends Component {

    constructor(){
        super()
       
    }
    componentDidMount(){
        
    }


    render() {
        
        return (
            <Modal
                show={this.props.show}
                aria-labelledby="contained-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">{this.props.messageType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={e => this.props.onHide()}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}
