import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import generatePopup from './popup/index'

class Popup extends Component {
    render() {
        let widgetheader = this.props.theme.widget == undefined ? undefined : this.props.theme.widget.widgetheader
        let font = this.props.theme.font == undefined ? undefined : this.props.theme.font
        return (
            <Modal animation {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton style={widgetheader}>
                    <Modal.Title style={font} id="contained-modal-title-lg" className="title">{this.props.title}</Modal.Title>
                </Modal.Header>
                {generatePopup(this.props)}
            </Modal>
        );
    }
}

export default Popup;
