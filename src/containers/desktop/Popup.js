import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import generatePopup from './popup/index'

class Popup extends Component {
    render() {
        let widgetHeader = this.props.theme.widget.widgetHeader
        let font = this.props.theme.font.main.color
        return (
            <Modal animation {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton style={widgetHeader}>
                    <Modal.Title style={font} id="contained-modal-title-lg" className="title">{this.props.title}</Modal.Title>
                </Modal.Header>
                {generatePopup(this.props)}
            </Modal>
        );
    }
}

export default Popup;
