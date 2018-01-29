import React, { Component } from 'react'
import { Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import generatePopup from './index'
import {checkIfMobile} from "../../utils"

class Popup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            lastPopup: 1,
        }
        this.version = "desktop"
        if ( checkIfMobile() ) {
            this.version = "mobile"
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.lastPopup !== nextProps.timestamp) {
            this.setState({ show: true, lastPopup: nextProps.timestamp })
        }
    }

    render() {
        let widgetHeader = this.props.theme.popup.header
        let widgetBody = this.props.theme.popup.body
        let font = this.props.theme.font.sub1
        // console.log("AAAA", widgetBody)
        
        if (this.state.show) {
            return (
                <Modal show={true} className={this.version} dialogClassName='popup' >
                    <div className="modal-wrapper">
                        <div className="modal-header popup-main-header" style={{...widgetHeader, ...font }} >
                            <button type="button" className="close" onClick={e => this.onClose()}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="title modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-inner" style={{...widgetBody }}>
                            {generatePopup(this.version, this.props, this.onClose.bind(this))}
                        </div>
                    </div>
                </Modal>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    onClose() {
        this.setState({ show: false })
    }
}
const mapStateToProps = state => ({
    data: state.popup.data,
    language: state.popup.language,
    id: state.popup.id,
    title: state.popup.title,
    authcard: state.popup.authcard,
    timestamp: state.popup.timestamp
});

const mapDispatchToProps = (dispatch, props) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
