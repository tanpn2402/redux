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
            skip: false,
            show: true,
        },
        {
            id: 'Type',
            Header: this.props.language.oddlottrading.header.type,
            accessor: 'location',
            skip: false,
            show: true,
        },
        {
            id: 'Volume',
            Header: this.props.language.oddlottrading.header.oddlotquantity,
            accessor: 'oddLotQty',
            skip: false,
            show: true,
        },
        ],
        this.style = {
            height: '200px',
        }
        this.id = 'canceloddlot-popup'
    }
    getOddLotSubmit() {
        this.props.getOddLotSubmit(this.props.rowSelected)
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

    componentDidMount() {
        this.props.getBankInfo(!this.props.reload);
    }

    render(){

        var bankinfo = this.props.bankinfo === undefined ? [] : this.props.bankinfo.mvBankInfoList
        return(
            <div style={{textAlign:'center'}}>
              <div className="oddlotaccount">{this.props.language.oddlottrading.popup.bankaccount}</div>
              <div className="oddlotdropdownlist">
                <select >
                  <option value="MAS">MAS</option>
                    {
                        bankinfo.map(e => {
                            return (
                                <option value={e.mvSettlementAccountDisplayName}>{e.mvSettlementAccountDisplayName}</option>
                            )
                        })
                    }
                </select>
              </div>
                <Modal.Body>
                    <DataTable
                        id={this.id + "-table"}
                        data={this.props.rowSelected}
                        columns={this.columns}
                        maxRows={3}
                        defaultPageSize={15}
                    />
                </Modal.Body>
                <div style={{textAlign:'center',marginLeft:'15px'}}>
                <CheckAuthenticationModal language={this.props.language}/>
                </div>
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
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(OddLotSubmit)
