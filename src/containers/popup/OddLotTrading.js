//render modal body + footer
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataUpperTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'

class OddLotSubmit extends Component{
    constructor(props) {
        super(props)
        
        this.params = {
            mvOddList:'',
            annoucementId:'',
            mvInterfaceSeq:'',
            mvSeriNo:'',
            mvAnswer:'',
            mvSaveAuthenticate: false
        }
        
        this.getBankInfoParams = {
            key: (new Date()).getTime()
        }     
        this.authParams = {
            matrixKey01: '[5,A]',
            matrixKey02: '[4,F]',
            matrixValue01: '7',
            matrixValue02: '4',
            savedAuthen: true,
        }

        this.columns = [
            {
                id: 'stockID',
                Header: this.props.language.oddlottrading.header.stockid,
                accessor: 'stockCode',
                sortable: false,
                show: true,
            },
            {
                id: 'Type',
                Header: this.props.language.oddlottrading.header.type,
                accessor: 'location',
                sortable: false,
                show: true,
            },
            {
                id: 'Volume',
                Header: this.props.language.oddlottrading.header.oddlotquantity,
                accessor: 'oddLotQty',
                Cell: props => {
                    console.log(props)
                    return (
                        <input id={props.original.stockCode + '-qty'} type="number" defaultValue={props.original.oddLotQty}
                            min="0" max={props.original.oddLotQty} />
                    )
                },
                width: 200,
                sortable: false,
                show: true,
            }
        ]

        this.id = 'canceloddlot-popup'
        this.mvInterfaceSeq = -1
    }

    submitOddLot() {
        // this.props.getOddLotSubmit(this.params,this.props.rowSelected,!this.props.reload)
        // this.props.onHide()

        let data = this.props.data.rowSelected
        let language = this.props.language

        let overQty = false
        data.map(e => {
            let qty = document.getElementById(e.stockCode + '-qty').value
            if(qty <= 0){
                overQty = true
            }
            else if(qty > e.oddLotQty){
                overQty = true
            }
            else{
                e.oddLotQty = qty
            }
        })

        if(!overQty){

            if(this.props.authcard){
                this.authParams = {
                    matrixKey01: document.getElementById("matrix-key01").value,
                    matrixKey02: document.getElementById("matrix-key02").value,
                    matrixValue01: document.getElementById("matrix-value01").value.toUpperCase(),
                    matrixValue02: document.getElementById("matrix-value02").value.toUpperCase(),
                    savedAuthen: document.getElementById("matrix-save-authen").checked,
                }
            }
            
            console.log(this.authParams)
            this.props.submitOddLot({
                oddLotData: data,
                annoucementId: this.props.data.annoucementId,
                mvInterfaceSeq: this.mvInterfaceSeq,
                authParams: this.authParams,
                language: this.props.language,
                me: this.props.data.me,
                popup: this
            })
            //this.props.onHide()
        }
        else{
            this.props.onShowMessageBox(language.messagebox.title.error, language.oddlottrading.message.wrongQty)
        }

    }

    handleChange(e){
        var bank = this.props.bankinfo.mvBankInfoList.filter(el => el.mvSettlementAccountDisplayName === e.target.value)
        if(bank.length > 0){
            this.mvInterfaceSeq = bank[0].mvInterfaceSeq
        }
        else if(e.target.value === "MAS"){
            this.mvInterfaceSeq = -1
        }
    }

    componentDidMount() {
        this.props.getBankInfo(this.getBankInfoParams)
    }

    closePopup(){
        this.props.onHide()
    }

    render(){
        var bankinfo = this.props.bankinfo
        return(
            <div style={{textAlign:'center'}}>
                <Modal.Body>
                    <div className="oddlotdropdownlist">
                        <span>
                            <div className="oddlotaccount">{this.props.language.oddlottrading.popup.bankaccount}</div>
                            <select onChange={this.handleChange.bind(this)}>
                                {
                                    bankinfo.mvBankInfoList.map(e => {
                                        return (
                                            <option value={e.mvSettlementAccountDisplayName}>{e.mvSettlementAccountDisplayName}</option>
                                        )
                                    })
                                }
                            </select>
                        </span>
                    </div>
                    <DataTable
                        id={this.id + "-table"}
                        data={this.props.data.rowSelected}
                        columns={this.columns}
                        maxRows={5}
                        defaultPageSize={15}
                    />
                </Modal.Body>
                {
                    this.props.authcard === false ? '' : <CheckAuthenticationModal language={this.props.language}/>
                }

                <Modal.Footer>
                    <Button  className="cancel" onClick={this.props.onHide}>{this.props.language.oddlottrading.popup.cancel}</Button>
                    <Button  className="submit" onClick={this.submitOddLot.bind(this)}>{this.props.language.oddlottrading.popup.submit}</Button>
                </Modal.Footer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    returnCode: state.orderjournal.returnCode,
    message: state.orderjournal.message,
    isAuthenFail: state.checkAuthen.isAuthenFail,
    bankinfo: state.oddlottrading.bankinfo,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    submitOddLot: (params) => {
        dispatch(actions.submitOddLot(params))
    },
    checkAuthen: (code1, code2, input1, input2, language) => {
        dispatch(actions.checkAuthen(code1, code2, input1, input2, language))
    },
    getBankInfo: (params) => {
      dispatch(actions.getBankInfo(params))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(OddLotSubmit)
