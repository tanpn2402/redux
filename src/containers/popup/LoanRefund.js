import React, { Component } from 'react';
import {  Table, Modal,Button} from 'react-bootstrap';
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
                    <Button className="cancel" onClick={this.props.onHide}>{language.button.cancel}</Button>
                    <Button className="submit" onClick={this.submit.bind(this)}> {language.button.submit}</Button>
                </Modal.Footer>
            </div>
        );
    }

    submit(e){
        e.preventDefault()
        var authParams = this.auth.getParam()
        console.log(authParams)
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
