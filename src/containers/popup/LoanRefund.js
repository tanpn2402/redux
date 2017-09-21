//render modal body + footer
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'

class LoanRefundPopup extends Component{
    constructor(props) {
        super(props)
        this.params = {
            lvLoanPay:'900',
            lvAmount:'900',
            lvRemark:'',
            mvSeriNo:'[5,A]|[4,F]',
            mvAnswer:'7|4',
            key:'true',
        }
        this.id = 'loanrefund-popup'
    }


    render(){
        return(
            <div>
                <Modal.Body>
                    <div>
                        {this.props.language.loanrefund.popup.message}
                    </div>
                </Modal.Body>
                {
                    this.props.authcard === false ? '' : <CheckAuthenticationModal language={this.props.language}/>
                }
                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{this.props.language.button.cancel}</Button>
                    <Button className="submit" onClick={this.submit.bind(this)}> {this.props.language.button.submit}</Button>
                </Modal.Footer>
            </div>
        )
    }

    submit(e){

    }
}


const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  getLoanRefundSubmit: (params) => {
      dispatch(actions.getLoanRefundSubmit(params))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoanRefundPopup)
