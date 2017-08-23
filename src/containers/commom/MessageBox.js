import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
export default class MessageBox extends Component {

    constructor(){
        super()
        this.state = {
            show :true,
        }
    }
    componentDidMount(){
        
    }


    render() {
        return (
            <Modal
                show={this.state.show}
                aria-labelledby="contained-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={e => this.onHide()}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }


    onHide(){
        this.setState({
            show: false,
        });
    }
}
