//render modal body + footer
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'

class AdvancePopup extends Component{
    constructor(props) {
        super(props)
        this.params = {
            lvAmount:'100',
            mvSeriNo:'[5,A]|[4,F]',
            mvAnswer:'7|4',
            mvSaveAuthenticate:'true',
            key:''
        }
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.style = {
            height: '200px',
        }
        this.id = 'Advance-popup'
    }
    getAdvanceSubmit() {
        this.props.getAdvanceSubmit()
        this.props.onHide()
    }

    checkAuthentication(e) {
        // Prevent from reloading page when submit
        e.preventDefault();
        const code1 = document.getElementById("code1").innerText;
        const code2 = document.getElementById("code2").innerText;
        const input1 = document.getElementById("input1").value;
        const input2 = document.getElementById("input2").value;
        this.props.checkAuthen(code1, code2, input1, input2, this.props.language.matrixcard);
    }

    render(){
        console.log(this.props.returnCode)
        console.log(this.props.message)
        return(<div>

                <div style={{textAlign:'center',marginLeft:'15px'}}>
                <CheckAuthenticationModal language={this.props.language}/>
                </div>

                <div>
                <Modal.Footer>
                    <Button  className="Advancecancel" onClick={this.props.onHide}>{this.props.language.loanrefund.popup.cancel}</Button>
                    <Button  className="Advancesubmit" onClick={this.getAdvanceSubmit.bind(this)}>{this.props.language.loanrefund.popup.submit}</Button>
                </Modal.Footer>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
  return {
    isAuthenFail: state.checkAuthen.isAuthenFail,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  getAdvanceSubmit: (params) => {
      dispatch(actions.getAdvanceSubmit(this.params))
  },
    checkAuthen: (code1, code2, input1, input2, language) => {
        dispatch(actions.checkAuthen(code1, code2, input1, input2, language))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancePopup)
