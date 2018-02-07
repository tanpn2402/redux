import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import '../../css/App.css';
import CheckAuthenticationModal from './CheckAuthenticationModal';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class CashAdvancePopup extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        var language = this.props.language
        var buttonStyle = this.props.theme.button

        return (
            <div>  
                <Modal.Body>
                    <div>
                        {language.cashadvance.popup.message}
                    </div>
                </Modal.Body>
                
                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>

                <Modal.Footer>
                    <button className="hks-btn btn-cancel" style={buttonStyle.cancel} onClick={this.props.onHide}>{language.button.cancel}</button>
                    <button className="hks-btn btn-submit" style={buttonStyle.confirm} onClick={this.submit.bind(this)}> {language.button.submit}</button>
                </Modal.Footer>
            </div>
        );
    }

    submit(e){
        e.preventDefault();
 
        var authParams = this.auth.getParam()
        this.props.submit(this.props.data, authParams , this.props.language)
        this.props.onHide()
        setTimeout(() => this.props.data.callback, 1000)
    }

    
}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch, props) => ({
    submit: (data, authParams, language) => {
        dispatch(actions.submitCashAdvance(data, authParams, language))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CashAdvancePopup);
