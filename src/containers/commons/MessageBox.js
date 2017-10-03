import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class MessageBox extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            listMessage: [],
            lastMessageID: 1,
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (this.state.lastMessageID !== nextProps.id && nextProps.id !== 0) {
            let msg = this.state.listMessage
            msg.push(nextProps)

            this.setState({ listMessage: msg, lastMessageID: nextProps.id })
        }
    }

    compoenentWillUnmount() {
        if (this.props.handleFunction != null) {
            this.props.handleFunction()
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.listMessage.map(msg => {
                        return (
                            <Modal show={true} onHide={e => this.onClose(msg.id)} className="messagebox">
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.props.type}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {this.props.message}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={e => this.onClose(msg.id)}>OK</Button>
                                </Modal.Footer>
                            </Modal>

                        )
                    })
                }
            </div>
        );
    }

    onClose(id) {
        console.log('sssssssssssssssssssssssss', id)
        let msg = this.state.listMessage
        msg = msg.filter(e => e.id !== id)

        this.setState({ listMessage: msg })
        console.log('listMessage', msg)
        if (this.props.handleFunction != null) {
            this.props.handleFunction()
        }
        //this.setState({ show: false });
    }

}

const mapStateToProps = state => ({
    message: state.notification.message,
    type: state.notification.type,
    id: state.notification.id,
    handleFunction: state.notification.handleFunction
});

const mapDispatchToProps = (dispatch, props) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox)
