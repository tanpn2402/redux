//render modal body + footer
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
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
            width: 120,
            skip: false,
            show: true,
        },
        {
            id: 'TradingQty',
            Header: this.props.language.oddlottrading.header.tradingquantity,
            accessor: 'settledBal',
            width: 120,
            skip: false,
            show: true,
        },
        {
            id: 'OddLotQty',
            Header: this.props.language.oddlottrading.header.oddlotquantity,
            accessor: 'oddLotQty',
            width: 120,
            skip: false,
            show: true,
        },
        {
            id: 'Curprice',
            Header: this.props.language.oddlottrading.header.currentprice,
            accessor: 'nominalPrice',
            width: 120,
            skip: false,
            show: true,
        },
        {
            id: 'ExePrice',
            Header: this.props.language.oddlottrading.header.exeprice,
            accessor: 'collectionPrice',
            width: 120,
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
        console.log('OH MY GODDDDDD', this.props.rowSelected)
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
        return(
            <div>
              <div className="oddlotaccount">{this.props.language.oddlottrading.popup.bankaccount}</div>
              <div className="oddlotdropdownlist">
                <select >
                  <option value="MAS">MAS</option>
                  <option value="ACB - 125137309">ACB - 125137309</option>
                  <option value="DAB - 3213132">DAB - 3213132</option>
                  <option value="BIDV - 123213">BIDV - 123213</option>
                </select>
              </div>
                <Modal.Body>
                    <DataTable
                        id={this.id + "-table"}
                        data={this.props.rowSelected}
                        columns={this.columns}
                        defaultPageSize={5}
                    />
                </Modal.Body>
                <div style={{textAlign:'center',marginLeft:'15px'}}>
                <CheckAuthenticationModal language={this.props.language}/>
                </div>
                <Modal.Footer>
                    <Button  className="oddlotcancel" onClick={this.props.onHide}>{this.props.language.oddlottrading.popup.cancel}</Button>
                    <Button  className="oddlotsubmit" onClick={this.getOddLotSubmit.bind(this)}>{this.props.language.oddlottrading.popup.submit}</Button>
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
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    getOddLotSubmit: (params) => {
        dispatch(actions.getOddLotSubmit(this.params))
    },
    checkAuthen: (code1, code2, input1, input2, language) => {
        dispatch(actions.checkAuthen(code1, code2, input1, input2, language))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OddLotSubmit)
