import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import '../../css/App.css';
import CheckAuthenticationModal from './CheckAuthenticationModal';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class CashTransferPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        var buttonStyle = this.props.theme.button
        return (
            <div>
                <Modal.Body>
                    <div>
                        {this.props.language.cashtransfer.popup.message}
                    </div>
                </Modal.Body>
                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={this.props.language} />
                <Modal.Footer>
                    <button className="hks-btn btn-cancel" style={buttonStyle.cancel} onClick={this.props.onHide}>{this.props.language.cashtransfer.popup.cancel}</button>
                    <button className="hks-btn btn-submit" style={buttonStyle.confirm} onClick={this.submit.bind(this)}> {this.props.language.cashtransfer.popup.ok}</button>
                </Modal.Footer>
            </div>
        );
    }

    submit(e){
        e.preventDefault();

        var defaultParam = {
            matrixKey01: '[5,A]',
            matrixKey02: '[4,F]',
            matrixValue01: '7',
            matrixValue02: '4',
            savedAuthen: true,
        }

        this.props.submit(this.props.data.paramsTransfer, defaultParam , this.props.language)
        this.props.onHide()
        
        this.props.data.callback()
    }


}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    submit: (data, authParams, language) => {
        dispatch(actions.submitCashTransfer(data, authParams, language))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CashTransferPopup);
