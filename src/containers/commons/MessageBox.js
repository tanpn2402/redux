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
        this.version = "desktop"
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.version = "mobile"
        }
    }


    componentWillReceiveProps(nextProps) {
        if (this.state.lastMessageID !== nextProps.id && nextProps.id !== 0) {
            let msg = this.state.listMessage
            msg.push(nextProps)

            this.setState({ listMessage: msg, lastMessageID: nextProps.id })
        }
    }

    render() {
        let widgetHeader = this.props.theme.widget.widgetHeader.backgroundColor
        let font = this.props.theme.font.sub1.color
        return (
            <div>
                {
                    this.state.listMessage.map(msg => {
                        return (
                            <Modal show={true} key={msg.id}
                                onHide={e => this.onClose(msg.id)} 
                                className={this.version + " messagebox"}>
                                <div className="modal-wrapper">
                                    <div className="modal-inner">
                                        <Modal.Header closeButton style={{ backgroundColor: widgetHeader, color: font }}>
                                            <Modal.Title>{this.props.type}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="msg-content">
                                                {this.props.message}
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={e => this.onClose(msg.id)}>OK</Button>
                                        </Modal.Footer>
                                    </div>
                                </div>
                            </Modal>

                        )
                    })
                }
            </div>
        );
    }

    onClose(id) {
        let msg = this.state.listMessage
        msg = msg.filter(e => e.id !== id)

        this.setState({ listMessage: msg })
        
        if (this.props.handleFunction != null) {
            this.props.handleFunction()
        }
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
