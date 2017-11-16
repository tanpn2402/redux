import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import '../../css/App.css';
import CheckAuthenticationModal from './CheckAuthenticationModal';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LoanRefundPopup extends Component{
    constructor(props) {
        super(props)
    }


    render() {
        var language = this.props.language
        return (
            <div>  
                <Modal.Body>
                    <div>
                        {language.loanrefund.popup.message}
                    </div>
                </Modal.Body>
                
                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>

                <Modal.Footer>
                    <button className="hks-btn btn-cancel" onClick={this.props.onHide}>{language.button.cancel}</button>
                    <button className="hks-btn btn-submit" onClick={this.submit.bind(this)}> {language.button.submit}</button>
                </Modal.Footer>
            </div>
        );
    }

    submit(e){
        e.preventDefault()
        var authParams = this.auth.getParam()
        this.props.getLoanRefundSubmit({
            me: this.props.data.me,
            language: this.props.data.language,
            authParams: authParams
        })
        this.props.onHide()
    }
}


const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  getLoanRefundSubmit: (params) => {
      dispatch(actions.doSubmitLoanRefund(params))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoanRefundPopup)
