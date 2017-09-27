import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import generatePopup from './popup/index'

class Popup extends Component {
    render() {
        return (
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg" className="title">{this.props.title}</Modal.Title>
                </Modal.Header>
                {generatePopup(this.props)}
            </Modal>
        );
    }
}

export default Popup;
