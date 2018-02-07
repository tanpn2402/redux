//render modal body + footer
import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../commons/DataTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'
import Select from '../commons/Select'
import Input from "../commons/Input"

class OddLotSubmit extends Component {
    constructor(props) {
        super(props)
        this.state={
            bankname:''
        }
        this.params = {
            mvOddList: '',
            annoucementId: '',
            mvInterfaceSeq: '',
            mvSeriNo: '',
            mvAnswer: '',
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
                    return (
                          <Input  type="number" 
                                step={1}
                                defaultValue={props.original.oddLotQty}
                                maxValue={props.original.oddLotQty}
                                idInput={props.original.stockCode + '-qty'}
                                    />
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

    compnentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.columns = [
                {
                    id: 'stockID',
                    Header: nextProps.language.oddlottrading.header.stockid,
                    accessor: 'stockCode',
                    sortable: false,
                    show: true,
                },
                {
                    id: 'Type',
                    Header: nextProps.language.oddlottrading.header.type,
                    accessor: 'location',
                    sortable: false,
                    show: true,
                },
                {
                    id: 'Volume',
                    Header: nextProps.language.oddlottrading.header.oddlotquantity,
                    accessor: 'oddLotQty',
                    Cell: props => {
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
        }
    }

    submitOddLot() {
        // this.props.getOddLotSubmit(this.params,this.props.rowSelected,!this.props.reload)
        // this.props.onHide()

        let data = this.props.data.rowSelected
        let language = this.props.language
         var MaxValue=data.map(e=>{
             return e.oddLotQty
         }) 
       let overQty = false
        data.map(e => {
            let qty = document.getElementById(e.stockCode + '-qty').value
            if (qty <= 0) {
                overQty = true
            }
            else if (qty > e.oddLotQty) {
                overQty = true
            }
            else {
                e.oddLotQty = qty
            }
        })

        if (!overQty) {

            this.props.submitOddLot({
                oddLotData: data,
                maxValue:MaxValue,
                annoucementId: this.props.data.annoucementId,
                mvInterfaceSeq: this.mvInterfaceSeq,
                authParams: this.authParams,
                language: this.props.language,
                me: this.props.data.me,
                popup: this
            })
            this.props.onHide()
            setTimeout(() => this.props.data.me.reloadData, 1000)
        }
        else {
            this.props.onShowMessageBox(language.messagebox.title.error, language.oddlottrading.message.wrongQty)
        }

    }

    handleChange(e) {
        var bank = this.props.bankinfo.mvBankInfoList.filter(el => el.mvSettlementAccountDisplayName === e.target.value)
        if (bank.length > 0) {
            this.mvInterfaceSeq = bank[0].mvInterfaceSeq
        }
        else if (e.target.value === "MAS") {
            this.mvInterfaceSeq = -1
        }
    }

    componentDidMount() {
        this.props.getBankInfo(this.getBankInfoParams)
    }

    closePopup() {
        this.props.onHide()
    }

    render() {
        var bankinfo = this.props.bankinfo
        var buttonStyle = this.props.theme.button
        
        return (
            <div style={{ textAlign: 'center' }}>
                <Modal.Body>
                    <div className="oddlotdropdownlist" style={{padding: "5px"}}>
                        <span>
                            <div className="oddlotaccount" style={{marginRight: "4px", display: "inline-block"}}>
                                {this.props.language.oddlottrading.popup.bankaccount}
                            </div>
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
                        theme={this.props.theme}
                        id={this.id + "-table"}
                        language={this.props.language}
                        tableData={this.props.data.rowSelected}
                        columns={this.columns}
                        maxRows={5}
                        pageSize={15}
                        searchEnable={false}
                        footerEnable={false}

                    />
                </Modal.Body>
                {
                    this.props.authcard === false ? '' : <CheckAuthenticationModal language={this.props.language} />
                }

                <Modal.Footer>
                    <button className="hks-btn btn-cancel" style={buttonStyle.cancel} onClick={this.props.onHide}>{this.props.language.oddlottrading.popup.cancel}</button>
                    <button className="hks-btn btn-submit" style={buttonStyle.confirm} onClick={this.submitOddLot.bind(this)}>{this.props.language.oddlottrading.popup.submit}</button>
                </Modal.Footer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        returnCode: state.orderjournal.returnCode,
        message: state.orderjournal.message,
        bankinfo: state.oddlottrading.bankinfo,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    submitOddLot: (params) => {
        dispatch(actions.submitOddLot(params))
    },
    getBankInfo: (params) => {
        dispatch(actions.getBankInfo(params))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(OddLotSubmit)
