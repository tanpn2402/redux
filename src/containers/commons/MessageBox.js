import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
export default class MessageBox extends Component {

    constructor(){
        super()
       this.style={
           width: "50%",
           marginLeft: "-20%"
       }
    }
    componentDidMount(){
        
    }


    render() {
        
        return (
            <Modal dialogClassName="messagebox"
                show={this.props.show}
                aria-labelledby="contained-modal-title">
                <Modal.Header closeButton onClick={e => this.props.onHide()}>
                    <Modal.Title id="contained-modal-title" className="messagebox-title">{this.props.messageType}</Modal.Title>
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
