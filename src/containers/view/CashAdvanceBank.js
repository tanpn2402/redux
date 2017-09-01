import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Table, Button, Modal } from 'react-bootstrap';
import ReactTable from "react-table"
import "react-table/react-table.css"
import '../../css/App.css';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import Popup from '../Popup'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'

class CashAdvanceBank extends Component {
    constructor(props) {
        super(props);

        this.params = {
            mvBankID: '',
            mvSettlement: '',
            mvLastAction: '',
            mvChildLastAction: '',
            start: '0',
            limit: '15',
            page: '',
            queryBank: '',
        }

        this.state = {
           formValues: {},
            isShow: false,
            columns1: [
                {
                    Header: this.props.language.cashadvancebank.header.contractid,
                    accessor: 'contractid',
                    id: 'contractid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.orderid,
                    accessor: 'orderid',
                    id: 'orderid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.settlementdate,
                    accessor: 'settlementdate',
                    id: 'settlementdate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.tradedate,
                    accessor: 'tradedate',
                    id: 'tradedate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.stockid,
                    accessor: 'stockid',
                    id: 'stockid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.price,
                    accessor: 'price',
                    id: 'price',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.quantity,
                    accessor: 'quantity',
                    id: 'quantity',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.value,
                    accessor: 'value',
                    id: 'value',
                    show: true,
                    skip: false,
                }
            ],
            columns2: [
                {
                    Header: this.props.language.cashadvancebank.header.date,
                    accessor: 'date',
                    id: 'date',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.advanceamount,
                    accessor: 'advanceamount',
                    id: 'advanceamount',
                    show: true,
                    skip: false,

                },
                {
                    Header: this.props.language.cashadvancebank.header.advancefee,
                    accessor: 'advancefee',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.processingstatus,
                    accessor: 'processingstatus',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.lastupdate,
                    accessor: 'lastupdate',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.note,
                    accessor: 'note',
                    id: 'note',
                    show: true,
                    skip: false,
                }
            ],
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.id = 'cashadvancebank'
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns1: [
                {
                    Header: this.props.language.cashadvancebank.header.contractid,
                    accessor: 'mvContractID',
                    id: 'contractid',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.orderid,
                    accessor: 'mvOrderID',
                    id: 'orderid',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.settlementdate,
                    accessor: 'mvSettleDay',
                    id: 'settlementdate',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.tradedate,
                    accessor: 'tranDate',
                    id: 'tradedate',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.stockid,
                    accessor: 'mvStockID',
                    id: 'stockid',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.price,
                    accessor: 'mvPrice',
                    id: 'price',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.quantity,
                    accessor: 'mvAmount',
                    id: 'quantity',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.value,
                    accessor: 'mvAvailableAmount',
                    id: 'value',
                    show: true,
                    skip: false
                }
            ],
            columns2: [
                {
                    Header: this.props.language.cashadvancebank.header.date,
                    accessor: 'creationTime',
                    id: 'date',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.advanceamount,
                    accessor: 'totalLendingAmt',
                    id: 'advanceamount',
                    show: true,
                    skip: false

                },
                {
                    Header: this.props.language.cashadvancebank.header.advancefee,
                    accessor: 'fee',
                    id: 'advancefee',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.processingstatus,
                    accessor: 'status',
                    id: 'processingstatus',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    id: 'lastupdate',
                    show: true,
                    skip: false
                },
                {
                    Header: this.props.language.cashadvancebank.header.note,
                    accessor: 'remark',
                    id: 'note',
                    show: true,
                    skip: false
                }
            ],
        });
    }

    render() {
        var queryAdvancePaymentInfo = this.props.queryAdvancePaymentInfo.mvChildBeanList === undefined ? [] : this.props.queryAdvancePaymentInfo.mvChildBeanList
        var CashAdvanceHistory = this.props.CashAdvanceHistory.list
        var queryBankInfo = this.props.queryBankInfo.historyList
        let lgClose = () => this.setState({ isShow: false })
        let buttonAction1 = [
            <Pagination
                    pageIndex={this.state.pageIndex1} 
                    totalRecord={10} 
                    onPageChange={this.onPageChange1.bind(this)}
                    onNextPage={this.onNextPage1.bind(this)}
                    onPrevPage={this.onPrevPage1.bind(this)}
                    onReloadPage={this.onReloadPage1.bind(this)}
                />,
        ]
        let buttonAction2 = [
            <Pagination
                    pageIndex={this.state.pageIndex2} 
                    totalRecord={10} 
                    onPageChange={this.onPageChange2.bind(this)}
                    onNextPage={this.onNextPage2.bind(this)}
                    onPrevPage={this.onPrevPage2.bind(this)}
                    onReloadPage={this.onReloadPage2.bind(this)}
                />,
        ]
        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
            <div className="component-main cashadvancebank">

            <div className="cashadvancebank-order-list">
                <div className="cashadvancebank-form">
                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                        <span>{this.props.language.cashadvance.header.cashadvanceplace}</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} id="form-cashadvance">
                        <FormGroup>
                            <Table responsive>
                                <tbody >
                                     <tr>
                                        <th className="enterorder">{this.props.language.cashadvancebank.header.bankaccount}</th>
                                        <td>
                                            <input id="mvBank" list="Bank" name="bank" id="mvBank" required />
                                            <datalist id="Bank">
                                                <option value="ACB-125137309" />
                                                <option value="DAB-3213132" />
                                                <option value="BIDV-12321" />
                                            </datalist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="enterorder">{this.props.language.cashadvance.header.cashadvanceavailable}</th>
                                        <td>4.600.630</td>
                                    </tr>
                                    <tr>
                                        <th className="enterorder">{this.props.language.cashadvance.header.advancefee}</th>
                                        <td>
                                        <input type="hidden" id="mvTotalPrice" value={this.calculate()} />
                                            {this.calculate() || 0}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="enterorder">{this.props.language.cashadvance.header.advanceamount}</th>
                                        <td>
                                        <FormGroup controlID="volume">
                                            <input type="number" name="volume" min="0" onChange={this.onChange}  id="volume" required />
                                        </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <div className="button">
                                                <Button className="btn btn-default" type="submit" className="submit">
                                                    Submit
                                                </Button>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="button">
                                                <Button className="btn btn-default" type="reset" className="cancel">
                                                    Clear
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                              </tbody>
                          </Table>
                        </FormGroup>
                        <Popup
                            id='cashadvance'
                            show={this.state.isShow}
                            onHide={lgClose}
                            advanceAmount={this.mvVolume}
                            language={this.props.language}
                            title = {this.props.language.cashadvancebank.popup.cashadvancebank}/>
                    </Form>
                </div>
                <div className="cashadvancebank-table1">
                    <div className="table-main">
                        <DataUpperTable
                            key={this.id + "-table1"}
                            id={this.id + "-table1"}
                            defaultPageSize={15}
                            columns={this.state.columns1}/>

                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.cashadvance.header.ordermatchinglist}</span>
                        </div>
                        <SearchBar
                          key={this.id + '-search3'}
                          id={this.id + '-search3'}
                          onSearch={[]}
                          hideSearchButton={true}
                          buttonAction={buttonAction1}
                          stockList={this.props.stockList}
                          language={this.props.language.searchbar}
                          theme={this.props.theme}
                          columns={this.state.columns1}
                          onChangeStateColumn={this.onChangeStateColumn1.bind(this)}
                          param={['dropdown']}
                          data={queryAdvancePaymentInfo}/>
                    </div>
                 </div>
            </div>

            <div className="cashadvancebank-table2">
                <div className="table-main">
                    <DataUpperTable
                        key={this.id + "-table2"}
                        id={this.id + "-table2"}
                        defaultPageSize={15}
                        columns={this.state.columns2}/>
                </div>
                <div className="table-header">
                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                        <span>{this.props.language.cashadvance.header.ordermatchinglist}</span>
                    </div>
                    <SearchBar
                      key={this.id + '-search3'}
                      id={this.id + '-search3'}
                      onSearch={[]}
                      hideSearchButton={true}
                      buttonAction={buttonAction2}
                      stockList={this.props.stockList}
                      language={this.props.language.searchbar}
                      theme={this.props.theme}
                      columns={this.state.columns2}
                      onChangeStateColumn={this.onChangeStateColumn2.bind(this)}
                      param={['dropdown']}
                      data={CashAdvanceHistory}/>
                </div>
                
            </div>    

            </div>
            </div>
        );
    }
/// 1//
    onChangeStateColumn1(e) {
        const id = e.target.id
        this.setState({
            columns1: this.state.columns1.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage1(){
        if(this.state.pageIndex > 0){
            // this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onPrevPage1(){
        if(this.state.pageIndex > 1){
            // this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onReloadPage1(){
        // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
    }

    onPageChange1(pageIndex) {
        if(pageIndex > 0){
            // this.state.pageIndex = pageIndex
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }
///2///
    onChangeStateColumn2(e) {
        const id = e.target.id
        this.setState({
            columns2: this.state.columns2.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage2(){
        if(this.state.pageIndex > 0){
            // this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onPrevPage2(){
        if(this.state.pageIndex > 1){
            // this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onReloadPage2(){
        this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
    }

    onPageChange2(pageIndex) {
        if(pageIndex > 0){
            // this.state.pageIndex = pageIndex
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.setState({ isShow: true })
    }

    onChange(e) {
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value;
        this.setState({ formValues })
    }

    calculate() {
        this.state.value = this.state.formValues.volume / 2500;
        return this.state.value;
    }

    componentDidMount(){
        this.props.getqueryAdvancePaymentInfo(this.params, !this.props.reload);
        this.props.getCashAdvance(this.params, !this.props.reload);
        this.props.getqueryBankInfo(this.params, !this.props.reload);
    }
}

const mapStateToProps = (state) => {
    return {
        queryAdvancePaymentInfo: state.cashadvancebank.queryAdvancePaymentInfo,
        CashAdvanceHistory: state.cashadvancebank.CashAdvanceHistory,
        queryBankInfo: state.cashadvancebank.queryBankInfo,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getqueryAdvancePaymentInfo: (params) => {
        dispatch(actions.getqueryAdvancePaymentInfo({mvBank: '', mvSettlement: ''}))
    },
    getCashAdvance: (params) => {
        dispatch(actions.getCashAdvance({mvLastAction: '', mvChildLastAction: '', start: '', limit: '', page: '', queryBank: ''}))
    },
    getqueryBankInfo: (params) => {
        dispatch(actions.getqueryBankInfo({key: ''}))
    },
})




export default connect(mapStateToProps, mapDispatchToProps)(CashAdvanceBank)
