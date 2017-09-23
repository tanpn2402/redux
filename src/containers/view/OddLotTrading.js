import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import * as Utils from '../../utils'

class OddLotTrading extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShow: false,
            oddLotOrderPageIndex: 1,
            oddLotTransPageIndex: 1,
            enquirycolumns: [
                {
                    // Create a select-all checkbox
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                                onChange={() => { this.onRowSelected(props.original)}} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
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
            historycolumns: [
                {
                    id: 'createTime',
                    Header: this.props.language.oddlottrading.header.transdate,
                    accessor: 'createTime',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'valueDate',
                    Header: this.props.language.oddlottrading.header.approvedate,
                    accessor: 'valueDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'instrumentId',
                    Header: this.props.language.oddlottrading.header.StockIDH,
                    accessor: 'instrumentId',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'appliedQty',
                    Header: this.props.language.oddlottrading.header.oddlotquantityH,
                    accessor: 'appliedQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.oddlottrading.header.exepriceH,
                    accessor: 'price',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'fee',
                    Header: this.props.language.oddlottrading.header.tax,
                    accessor: 'fee',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'aaa',
                    Header: this.props.language.oddlottrading.header.fee,
                    accessor: '',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'settleAmt',
                    Header: this.props.language.oddlottrading.header.value,
                    accessor: 'settleAmt',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: this.props.language.oddlottrading.header.status,
                    accessor: 'status',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
        }

        this.rowSelected = []
        this.popupType = 'none'
        this.id = 'oddlottrading'
        this.defaultPageSize = 15
        
        this.paramsOddLotHisEnquiry = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ODDLOT',
            key: (new Date()).getTime(),
            start: '0',
            page: 1,
            limit: this.defaultPageSize,
        }

        this.paramsEnquiryOddLot = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ODDLOTENQUIRY'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            enquirycolumns: [
                {
                    // Create a select-all checkbox
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                              onChange={() => { this.onRowSelected(props.original)}} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'stockID',
                    Header: nextProps.language.oddlottrading.header.stockid,
                    accessor: 'stockCode',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'TradingQty',
                    Header: nextProps.language.oddlottrading.header.tradingquantity,
                    accessor: 'settledBal',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'OddLotQty',
                    Header: nextProps.language.oddlottrading.header.oddlotquantity,
                    accessor: 'oddLotQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'Curprice',
                    Header: nextProps.language.oddlottrading.header.currentprice,
                    accessor: 'nominalPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'ExePrice',
                    Header: nextProps.language.oddlottrading.header.exeprice,
                    accessor: 'collectionPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],

            historycolumns: [
                {
                    id: 'TransDate',
                    Header: nextProps.language.oddlottrading.header.transdate,
                    accessor: 'createTime',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'valueDate',
                    Header: nextProps.language.oddlottrading.header.approvedate,
                    accessor: 'valueDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'StockIDH',
                    Header: nextProps.language.oddlottrading.header.stockid,
                    accessor: 'instrumentId',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'oddlotquantityH',
                    Header: nextProps.language.oddlottrading.header.oddlotquantityH,
                    accessor: 'appliedQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'exepriceH',
                    Header: nextProps.language.oddlottrading.header.exepriceH,
                    Cell: props => {
                        console.log(props.original.price)
                        if(props.original.price === '0E-9')
                            return 0
                        else
                            return Utils.currencyShowFormatter(props.original.price, ",", "vi-VN")
                    },
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'tax',
                    Header: nextProps.language.oddlottrading.header.tax,
                    accessor: 'fee',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'fee',
                    Header: nextProps.language.oddlottrading.header.fee,
                    //accessor: 'fee',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'value',
                    Header: nextProps.language.oddlottrading.header.value,
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.settleAmt, ",", "vi-VN")
                    },
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: nextProps.language.oddlottrading.header.status,
                    Cell: props => {
                        if(props.original.status === 'H')
                            return nextProps.language.oddlottrading.status.waiting;
                        if(props.original.status === 'D')
                            return nextProps.language.oddlottrading.status.approve;
                        else
                            return props.original.status
                    
                    },
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
        })
    }


    render() {
        
        let oddlotenquiry = this.props.oddlotenquiry
        let oddlothistory = this.props.oddlothistory
        
        // table 1
        let buttonActionOddLotOrder = [
            <Pagination
                pageIndex={this.state.oddLotOrderPageIndex}
                totalRecord={Math.ceil(oddlotenquiry.oddLotList.length / this.defaultPageSize)}
                onPageChange={this.onOddLotOrderPageChange.bind(this)}
                onNextPage={this.onOddLotOrderNextPage.bind(this)}
                onPrevPage={this.onOddLotOrderPrevPage.bind(this)}
            />,
            <Button style={this.props.theme.buttonClicked} bsStyle="primary" type="button"
                onClick={this.registerOddLotOrder.bind(this)}>
                {this.props.language.oddlottrading.header.register}
            </Button>
        ]

        // table 2
        let buttonActionOddLotTrans = [
            <Pagination
                pageIndex={this.state.oddLotTransPageIndex}
                totalRecord={Math.ceil(oddlothistory.totalCount / this.defaultPageSize )}
                onPageChange={this.onOddLotTransPageChange.bind(this)}
                onNextPage={this.onOddLotTransNextPage.bind(this)}
                onPrevPage={this.onOddLotTransPrevPage.bind(this)}
                onReloadPage={this.onOddLotTransReloadPage.bind(this)}
            />
        ]
        return (
        <div style={{height: '100%'}}>
            <div className="component-header" >
                <span className="content-block-head">
                    {this.props.language.menu[this.id]}
                </span>
                <ul className="btn-action">
                    <li className="btn-close">
                        <span className="glyphicon glyphicon-remove" ></span>
                    </li>
                </ul>
            </div>
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
            <div className="component-main oddlottrading">
                <div className="oddlotorder">
                    <div className="oddlotorder-table">
                        <div className="table-main">
                            <DataUpperTable
                                columns={this.state.enquirycolumns}
                                data={oddlotenquiry.oddLotList.slice( 
                                        (this.state.oddLotOrderPageIndex - 1)*this.defaultPageSize, 
                                        this.state.oddLotTransPageIndex*this.defaultPageSize )}
                                defaultPageSize={this.defaultPageSize}/>
                        </div>
                        <div className="table-header">
                            <div className="title" style={this.props.theme.oddlottrading.titleoddlotorder}>
                                <span>{this.props.language.oddlottrading.header.oddlotorder}</span>
                            </div>
                            <SearchBar
                                id={this.id}
                                buttonAction={buttonActionOddLotOrder}
                                language={this.props.language.searchbar}
                                theme={this.props.theme}
                                onChangeStateColumn={this.onChangeOddLotOrderStateColumn.bind(this)}
                                data={{stockList: [], columns: this.state.enquirycolumns}}
                                param={['dropdown']} />
                        </div>


                    </div>
                    <div className="oddlotorder-note">
                        <div className="title" style={this.props.theme.oddlottrading.titleoddlotorder}>
                            <span>{this.props.language.oddlottrading.header.notes}</span>
                        </div>
                        <div style={{ padding: "5px", fontSize: "12px", }}>
                            <span>{this.props.language.oddlottrading.header.notesinfo}</span>
                        </div>
                    </div>
                </div>
                <div className="oddlothistory">
                    <div className="table-main">
                        <DataUpperTable
                            columns={this.state.historycolumns}
                            data={oddlothistory.historyList}
                            defaultPageSize={this.defaultPageSize}/>
                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.oddlottrading.titleoddlottransactionhistory}>
                            <span>{this.props.language.oddlottrading.header.oddlotransactionhistory}</span>
                        </div>
                        <SearchBar
                                id={this.id}
                                buttonAction={buttonActionOddLotTrans}
                                language={this.props.language.searchbar}
                                theme={this.props.theme}
                                onChangeStateColumn={this.onChangeOddLotTransStateColumn.bind(this)}
                                data={{stockList: [], columns: this.state.historycolumns}}
                                param={['dropdown']} />
                    </div>


                </div>
            </div>
            </div>
        </div>
        )
    }

    componentDidMount() {
        this.props.onshowenquiry(this.paramsEnquiryOddLot, !this.props.reload);
        this.props.onshowhistory(this.paramsOddLotHisEnquiry, !this.props.reload);
    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById(this.id + '-cb-all')
                .checked
            var checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.oddlotenquiry.oddLotList !== undefined ? this.props.oddlotenquiry.oddLotList : []
            else
                this.rowSelected = []
        } else {
            var index = this.rowSelected.indexOf(param)
            if (index === -1) {
                this.rowSelected.push(param)
            } else {
                this.rowSelected.splice(index, 1)
            }

            if (document.getElementsByClassName(this.id + '-row-checkbox')
                .length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all")
                .checked = true
            else
                document.getElementById(this.id + "-cb-all")
                .checked = false
        }
    }

    registerOddLotOrder(e) {
        e.preventDefault();
        if(this.rowSelected.length > 0){
            this.props.beforeRegisterOddLot({
                language: this.props.language,
                data: {rowSelected: this.rowSelected, me: this}
            })
        }
        else {
            this.props.onShowMessageBox(this.props.language.messagebox.title.error, 'Vui long chon 1 ma CK')
        }
    }

    reloadData(){
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.props.onshowenquiry(this.paramsEnquiryOddLot)
        this.props.onshowhistory(this.paramsOddLotHisEnquiry)
    }

    /// table 2 ///
    onOddLotTransPageChange(pageIndex) {
        this.state.oddLotTransPageIndex = pageIndex
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.onshowhistory(this.paramsOddLotHisEnquiry)
    }

    onOddLotTransNextPage(){
        this.state.oddLotTransPageIndex = parseInt(this.state.oddLotTransPageIndex) + 1
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.onshowhistory(this.paramsOddLotHisEnquiry)
    }

    onOddLotTransPrevPage(){
        this.state.oddLotTransPageIndex = parseInt(this.state.oddLotTransPageIndex) - 1
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.onshowhistory(this.paramsOddLotHisEnquiry)
    }

    onOddLotTransReloadPage(){
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.props.onshowhistory(this.paramsOddLotHisEnquiry)
    }

    /// table 1 ///
    onOddLotOrderNextPage(){
        this.setState({oddLotOrderPageIndex: parseInt(this.state.oddLotOrderPageIndex) + 1})
    }

    onOddLotOrderPrevPage(){
        this.setState({ oddLotOrderPageIndex: parseInt(this.state.oddLotOrderPageIndex) - 1 })
    }

    onOddLotOrderPageChange(pageIndex) {
        this.setState({ oddLotOrderPageIndex: pageIndex })
    }



    onChangeOddLotOrderStateColumn(e) {
        const id = e.target.id
        this.setState({
            enquirycolumns: this.state.enquirycolumns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onChangeOddLotTransStateColumn(e) {
        const id = e.target.id
        this.setState({
            historycolumns: this.state.historycolumns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

}
const mapStateToProps = (state) => {
    return {
        oddlotenquiry: state.oddlottrading.oddlotenquiry,
        oddlothistory: state.oddlottrading.oddlothistory,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onshowenquiry: (param) => {
        dispatch(actions.getOddlotEnquiry(param))
    },
    onshowhistory: (param) => {
        dispatch(actions.getOddlotHistory(param))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    beforeRegisterOddLot: (params) => {
        dispatch(actions.beforeRegisterOddLot(params))
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(OddLotTrading)
