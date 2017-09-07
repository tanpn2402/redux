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
            mvOddList:'HA|ACB|TDCN|40',
            annoucementId:'10003413',
            mvInterfaceSeq:'-1',
            mvSeriNo:'[5,A]|[4,F]',
            mvAnswer:'7|4',
            mvSaveAuthenticate:'true',
        }
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.columns = [
            {
                id: 'stockID',
                Header: this.props.language.oddlottrading.header.stockid,
                accessor: 'stockCode',
                width: 200,
                sortable: false,
            },
            {
                id: 'Type',
                Header: this.props.language.oddlottrading.header.type,
                accessor: 'location',
                width: 200,
                sortable: false,
            },
            {
                id: 'Volume',
                Header: this.props.language.oddlottrading.header.oddlotquantity,
                Cell: props => {
                    console.log(props)
                    return (
                        <input id={props.original.stockCode + '-qty'} type="number" defaultValue={props.original.oddLotQty} />
                    )
                },
                width: 200,
                sortable: false,
            },
        ],
        
        this.id = 'canceloddlot-popup'
    }


    getOddLotSubmit() {
        let data = this.props.rowSelected
        let overQty = false
        data.map(e => {
            let qty = document.getElementById(e.stockCode + '-qty').value
            if(qty > e.oddLotQty){
                overQty = true
            }
            else{
                e.oddLotQty = qty
            }
        })

        if(!overQty){
            this.props.getOddLotSubmit(data)
            this.props.onHide()
        }
        else{
            this.props.onShowMessageBox(0, "Vượt quá số lượng CK lô lẻ của mã KLS mà Quý khách hiện có. Vui lòng kiểm tra lại thông tin đăng ký.")
        }
        
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

    componentDidMount() {
        this.props.getBankInfo(!this.props.reload);
    }

    render(){

        var bankinfo = this.props.bankinfo === undefined ? [] : this.props.bankinfo.mvBankInfoList
        return(
            <div style={{textAlign:'center'}}>
                <Modal.Body>
                    <div className="oddlotdropdownlist">
                        <span>
                            <div className="oddlotaccount">{this.props.language.oddlottrading.popup.bankaccount}</div>
                            <select>
                                <option value="MAS">MAS</option>
                                {
                                    bankinfo.map(e => {
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
                        data={this.props.rowSelected}
                        columns={this.columns}
                        maxRows={5}
                        defaultPageSize={15}
                    />
                </Modal.Body>

                <CheckAuthenticationModal language={this.props.language}/>
               
                <Modal.Footer>
                    <Button  className="cancel" onClick={this.props.onHide}>{this.props.language.oddlottrading.popup.cancel}</Button>
                    <Button  className="submit" onClick={this.getOddLotSubmit.bind(this)}>{this.props.language.oddlottrading.popup.submit}</Button>
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
    getOddLotSubmit: (params) => {
        dispatch(actions.getOddLotSubmit(this.params))
    },
    checkAuthen: (code1, code2, input1, input2, language) => {
        dispatch(actions.checkAuthen(code1, code2, input1, input2, language))
    },
    getBankInfo: () => {
      dispatch(actions.getBankInfo({key: ""}))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(OddLotSubmit)
