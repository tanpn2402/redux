import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/table/index'
import * as Utils from '../../utils'
import { button } from 'react-bootstrap'
import moment from "moment"

class OrderJournal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    id: 'market',
                    accessor: 'mvMarketID',
                    minWidth: 80,
                    maxWidth: 90,
                    show: true,
                    skip: false,
                    
                },
                {
                    id: 'cb',
                    maxWidth: 50,
                    width: 40,
                    sortable: false,
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') {
                                if (props.original.mvCancelIcon && props.original.mvCancelIcon != '') {
                                    return (
                                        <input type='checkbox' style={{ }}
                                            className={this.id + "-row-checkbox"}
                                            onChange={() => { this.onRowSelected(props.original) }} />
                                    )
                                }
                            }
                        }
                    },
                    skip: true,
                    reorderable: false,
                    mobile: false
                },
                {
                    id: 'cancelmodify',
                    maxWidth: 200,
                    width: 120,
                    sortable: false,
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            var child = []
                            if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') {
                                if (props.original.mvCancelIcon && props.original.mvCancelIcon != '') {
                                    child.push(
                                        <button className="hks-btn sm btn-cancel-order" type="button"
                                            onClick={() => this.handleCancelOrder(props.original)}>
                                            <span className="glyphicon glyphicon-remove"></span>
                                        </button>
                                    )
                                }
                            }

                            if (props.original.mvShowModifyIcon !== null && props.original.mvShowModifyIcon === 'Y') {
                                if (props.original.mvModifyIcon && props.original.mvModifyIcon != '') {
                                    child.push(
                                        <button className="hks-btn sm btn-modify" type="button"
                                            onClick={() => this.handleModifyOrder(props.original)}>
                                            <span className="glyphicon glyphicon-edit"></span>
                                        </button>
                                    )
                                }
                            }

                            return (
                                    <div>
                                        {
                                            child
                                        }
                                    </div>
                            )
                        }
                    },
                    skip: true,
                    mobile: false
                },
                {
                    id: 'stockid',
                    accessor: 'mvStockID',
                    width: 80,
                    skip: false,
                    show: true,
                    reorderable: false,
                    background: props.theme.table.colText,
                    Aggregated: props => {
                        return <span></span>
                    }
                },
                {
                    id: 'buysell',
                    accessor: 'mvBS',
                    width: 60,
                    Aggregated: props => {
                        return <span></span>
                    },
                    Cell: props => {
                        if (props.aggregated) {
                            
                        } else {
                            if (props.original.mvBSValue == this.props.language.global.buysell.B) {
                                return (
                                    <div style={{ backgroundColor: '#39b567', color: '#fff', width: '100%' }}>
                                        {this.props.language.searchbar.buy}
                                    </div>
                                )
                            } else {
                                return (
                                    <div style={{ backgroundColor: '#b5383e', color: '#fff', width: '100%' }}>
                                        {this.props.language.searchbar.sell}
                                    </div>
                                )
                            }
                        }
                    },
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    accessor: 'mvPrice',
                    Cell: props =>  Utils.formatCurrency(props.value),
                    width: 80,
                    skip: false,
                    show: true,
                    Aggregated: props => {
                        return <span></span>
                    },
                    background: props.theme.number.col2
                        
                },
                {
                    id: 'quantity',
                    accessor: 'mvQty',
                    Cell: props =>  Utils.formatQty(props.value),
                    width: 80,
                    skip: false,
                    show: true,
                    Aggregated: props => {
                        return <span></span>
                    },
                    background: props.theme.number.col2
                },
                {
                    id: 'pendingQty',
                    accessor: 'mvPendingQty',
                    Cell: props =>  Utils.formatQty(props.value),
                    width: 100,
                    skip: false,
                    show: true,
                    Aggregated: props => {
                        return <span></span>
                    },
                    background: props.theme.number.col2
                },
                {
                    id: 'executedQty',
                    accessor: 'mvPendingQty',
                    Cell: props =>  Utils.formatQty(props.value),
                    width: 100,
                    skip: false,
                    show: true,
                    Aggregated: props => {
                        return <span></span>
                    },
                    background: props.theme.number.col2
                },
                {
                    id: 'avgprice',
                    accessor: 'mvAvgPriceValue',
                    Cell: props =>  Utils.formatCurrency(props.value),
                    width: 80,
                    skip: false,
                    show: true,
                    Aggregated: props => {
                        return <span></span>
                    },
                    background: props.theme.number.col2
                },
                {
                    id: 'status',
                    accessor: 'mvStatus',
                    width: 120,
                    Aggregated: props => {
                        return <span></span>
                    },
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            let text = this.props.language.global.status[props.original.mvStatus]
                            return (
                                Utils.statusRenderer(text, props.original.mvStatus)
                            )
                        }
                    },
                    skip: false,
                    show: true,
                },
                {
                    id: 'ordertype',
                    accessor: 'mvOrderType',
                    Aggregated: props => {
                        return <span></span>
                    },
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            let text = this.props.language.orderjournal.ordertype[props.original.mvOrderTypeValue]
                            return text == undefined ? props.original.mvOrderType : text
                        }
                    },
                    width: 80,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'feetax',
                    width: 90,
                    skip: false,
                    Aggregated: props => {
                        return <span></span>
                    },
                    Cell: props => {
                        var result=0
                        if (props.aggregated) {

                        } else {
                             if (props.original.mvBSValue == this.props.language.global.buysell.B)
                                result=props.original.mvNetAmtValue - props.original.mvGrossAmt
                             
                            else
                                result=props.original.mvGrossAmt - props.original.mvNetAmtValue
                            return  Utils.formatCurrency( Math.round(result*1000)/1000 )
                        }
                    },
                    show: true,
                    background: props.theme.number.col2
                },
                {
                    id: 'bankid',
                    accessor: 'mvBankID',
                    Aggregated: props => {
                        return <span></span>
                    },
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            let text = props.original.mvBankID
                            if(text === null){
                                return ''
                            }
                        }
                    },
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'expirydate',
                    accessor: 'mvDateTime',
                    width: 80,
                    skip: false,
                    show: true,
                    Aggregated: props => {
                        return <span></span>
                    },
                },
                {
                    id: 'rejectreason',
                    accessor: 'mvRejectReason',
                    width: 80,
                    Aggregated: props => {
                        return <span></span>
                    },
                    Cell: p => {
                        if (p.aggregated) {

                        } else {
                            let text=props.language.orderjournal.reject
                            if (p.original.mvRejectReason != "")
                                return (
                                    <div className='rejectReason' style={{color:'blue'}} onClick={() => this.handleReject(p.original.mvRejectReasonDetail)}>
                                        {text}
                                    </div>
                                )
                            else return <span></span>
                        }
                    },
                    skip: false,
                    show: true,
                    mobile: false
                },
                {
                    id: 'mobileaction',
                    mobile: false,
                    skip: true,
                    show: false,
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            return (
                                <div>
                                    <button className="hks-btn btn-cancel-order" onClick={e => this.onCancelOrder(props)}>
                                        <span className="glyphicon glyphicon-remove"></span>
                                        {this.props.language.button.cancel}
                                    </button>
                                    <button className="hks-btn btn-modify" onClick={e => this.onModifyOrder(props)}>
                                        <span className="glyphicon glyphicon-pencil"></span>
                                        {this.props.language.button.modify}
                                    </button>
                                </div>
                            )
                        }
                    }
                }
                

            ],
            pageIndex: 1,
            key: false,
            filterable: false
        }

        this.rowSelected = []
        this.id = 'orderjournal'
        this.defaultPageSize = props.defaultPageSize

        this.param = {
            mvStatus: "ALL",
            mvOrderType: "ALL",
            mvOrderBS: "ALL",
            page: 1,
            start: 0,
            limit: this.defaultPageSize,
            mvStartTime: "01/01/2001",
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
        }
    }

    onCancelOrder(order) {
        this.handleCancelOrder(order)
    }

    onModifyOrder(order) {
        this.handleModifyOrder(order)
    }

    handleReject(detail) {
        this.props.onShowMessageBox(this.props.language.messagebox.title.info, detail)        
    }


    render() {
        let buttonAction = [
            <button style={this.props.theme.searchbar.default.button} type="button" className="hks-btn"
                onClick={() => this.handleCancelOrderChecked()}>{this.props.language.button.CTTCancel}</button>,
        ]

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} widgetID= 'orderjournal'
                    theme={this.props.theme}
                    language={this.props.language}
                    columns={this.state.columns} onToggleFilter={(e) => this.onToggleFilter(e)}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table
                        theme={this.props.theme}
                        id={this.id}
                        language={this.props.language}
                        onRowSelected={this.onRowSelected.bind(this)}

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        tableData={this.props.data.mvOrderBeanList}
                        pivot={['market']}
                        getPivotRowProps={(props) => {
                            return {
                                style: {
                                    backgroundColor: "#969696",
                                    borderLeft: "none",
                                    borderRight: "none",
                                    justifyContent: "left"
                                }
                            }
                        }}
                        
                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={Math.ceil(this.props.data.mvTotalOrders / this.defaultPageSize)}

                        searchParams={['mvStatus', 'mvOrderType', 'mvBuysell']}
                        searchMobileParams={["mvStatus"]}
                        searchActions={buttonAction}
                        searchData={{ stockList: this.props.stockList }}
                        searchDefaultValues={{ mvStatus: this.param.mvStatus }}
                        onSearch={this.onSearch.bind(this)}

                    />
                </Body>
            </div>
        )

    }

    getFSAccount(tradingAccounts) {
        let t = tradingAccounts.filter( e=> e.investorType == "DERIVATIVES")
        if(t.length > 0) {
            return t[0]
        } else {
            return undefined
        }
    }

    componentDidMount() {
        this.props.onSearch(this.param, {
            subAccount: this.getFSAccount(this.props.tradingAccounts)
        })
    }   

    componentWillReceiveProps(nextProps) {
        if(nextProps.updateOrderJournal != this.props.updateOrderJournal) {
            let {currentTrdAccount} = this.props
            this.props.onSearch(this.param, {
                subAccount: this.getFSAccount(nextProps.tradingAccounts)
            })
        }
    }

    handleCancelOrderChecked(e) {

        if (this.rowSelected.length > 0) {
            this.props.showPopup({
                data: { me: this, data: this.rowSelected },
                title: this.props.language.orderjournal.popup.title.cancel,
                language: this.props.language,
                theme: this.props.theme,
                id: 'cancelorder',
                authcard: false
            })
        }
        else {
            this.props.onShowMessageBox(this.props.language.messagebox.title.error, this.props.language.messagebox.message.selectStock)
        }

    }

    handleCancelOrder(param) {
        // cancel one order
        var row = []
        row.push(param)
        this.props.showPopup({
            data: { me: this, data: row },
            title: this.props.language.orderjournal.popup.title.cancel,
            language: this.props.language,
            theme: this.props.theme,
            id: 'cancelorder',
            authcard: false
        })

    }

    handleModifyOrder(param) {
        // modify one order

        this.props.showPopup({
            data: { me: this, data: param },
            title: this.props.language.orderjournal.popup.title.modify,
            language: this.props.language,
            theme: this.props.theme,
            id: 'modifyorder',
            authcard: false
        })
    }

    handleDetailOrder(param) {
        this.props.showPopup({
            data: { me: this, data: param },
            title: this.props.language.orderjournal.popup.title.detail,
            language: this.props.language,
            theme: this.props.theme,
            id: 'detailorder',
            authcard: false
        })
    }


    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById(this.id + '-cb-all').checked
            var checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.data.mvOrderBeanList !== undefined ?
                    this.props.data.mvOrderBeanList.filter(el => el.mvShowCancelIcon !== null && el.mvShowCancelIcon === 'Y') : []
            else
                this.rowSelected = []
        }
        else {
            var index = this.rowSelected.indexOf(param)
            if (index === -1) {
                this.rowSelected.push(param)
            }
            else {
                this.rowSelected.splice(index, 1)
            }

            if (document.getElementsByClassName("orderjournal-row-checkbox").length === this.rowSelected.length)
                document.getElementById("orderjournal-cb-all").checked = true
            else
                document.getElementById("orderjournal-cb-all").checked = false
        }
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = pageIndex
        this.param['page'] = this.state.pageIndex
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
        let {currentTrdAccount} = this.props
        this.props.onSearch(this.param, {
            subAccount: this.getFSAccount(this.props.tradingAccounts)
        })
    }

    onSearch(param) {
        this.param['mvStatus'] = param.mvStatus
        if (param.mvOrderType) {
            this.param['mvOrderType'] = param.mvOrderType
        }
        if (param.mvBuysell) {
            this.param['mvOrderBS'] = param.mvBuysell
        }

        this.param['page'] = this.state.pageIndex
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']

        let {currentTrdAccount} = this.props
        this.props.onSearch(this.param, {
            subAccount: this.getFSAccount(this.props.tradingAccounts)
        })
    }

    updateView() {
        this.rowSelected = []
        let {currentTrdAccount} = this.props
        this.props.onSearch(this.param, {
            subAccount: this.getFSAccount(this.props.tradingAccounts)
        })
    }
}

OrderJournal.defaultProps = {
    defaultPageSize: 15
}

const mapStateToProps = (state) => {
    return {
        data: state.orderjournal.enquiryorder,
        modifyData: state.orderjournal.dataresult,
        menuid: state.orderjournal.menuid,

        updateOrderJournal: state.orderjournal.updateOrderJournal,
        tradingAccounts: state.dologin.tradingAccounts

    }
}

const mapDispatchToProps = (dispatch, props) => ({

    onSearch: (param, fsParams) => {
        dispatch(actions.clearOrderEnquiryData())
        dispatch(actions.getEnquiry(param))
        dispatch(actions.orderEnquiryFS(fsParams))
    },
    getStockInfo: (param) => {
        //dispatch(actions.getstockInfo(param))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    showPopup: (param) => {
        dispatch(actions.showPopup(param))
    },
    orderEnquiryFS: (param) => {
        dispatch(actions.orderEnquiryFS(param))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(OrderJournal)
