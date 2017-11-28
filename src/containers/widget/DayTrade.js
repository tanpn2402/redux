import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import { button } from 'react-bootstrap'
import moment from "moment"
import config from '../../core/config'
class DayTrade extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    id: 'cb',
                    maxWidth: 50,
                    width: 40,
                    sortable: false,
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            if (props.original.IsCancelable !== null && props.original.IsCancelable === 'Y') {
                                return (
                                    <input type='checkbox' style={{ position: 'relative', top: '6px' }}
                                        className={this.id + "-row-checkbox"}
                                        onChange={() => { this.onRowSelected(props.original) }} />
                                )
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
                    width: 140,
                    sortable: false,
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            var child = []
                            if (props.original.IsCancelable !== null && props.original.IsCancelable === 'Y') {
                                child.push(
                                    <button className="hks-btn sm btn-cancel-order" type="button"
                                        onClick={() => this.handleCancelOrder(props.original)}>
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </button>
                                )
                            }

                            if (props.original.IsModifiable !== null && props.original.IsModifiable === 'Y') {
                               child.push(
                                        <button className="hks-btn sm btn-modify" type="button"
                                            onClick={() => this.handleModifyOrder(props.original)}>
                                            <span className="glyphicon glyphicon-edit"></span>
                                        </button>
                                )
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
                // {
                //     id: 'Detail',
                //     maxWidth: 200,
                //     width: 80,
                //     sortable: false,
                //     Cell: props => {
                //         if (props.aggregated) {

                //         } else {
                //             var child = []
                //             child.push(
                //                 <button className="hks-btn sm btn-detail" type="button"
                //                     onClick={() => this.handleDetailOrder(props.original)}>
                //                     <span className="glyphicon glyphicon-folder-open"></span>
                //                 </button>
                //             )

                //             return (
                //                 <div style={{ display: "table", height: '100%', width: '100%' }}>
                //                     <div style={{ display: 'table-cell', verticalAlign: 'middle' }} >
                //                         {
                //                             child
                //                         }
                //                     </div>
                //                 </div>)
                //         }
                //     },
                //     skip: true,
                //     mobile: false
                // },
                {
                    id: 'orderNo',
                    accessor: 'OrderGroupID',
                    width: 90,
                    skip: false,
                    show: true,
                    reorderable: false,
                },
                {
                    id: 'stockid',
                    accessor: 'InstrumentID',
                    width: 90,
                    skip: false,
                    show: true,
                    reorderable: false,
                },
                {
                    id: 'quantity',
                    accessor: 'mvQty',
                    width: 100,
                    skip: false,
                    show: true,
                    style: {textAlign: "right"}
                },
                {
                    id: 'price',
                    accessor: 'mvPrice',
                    width: 100,
                    skip: false,
                    show: true,
                    style: { textAlign: "right" }
                },
                {
                    id: 'market',
                    accessor: 'MarketID',
                    width: 80,
                    skip: false,
                    show: true,
                    reorderable: false,
                },
                {
                    id: 'currency',
                    accessor: 'CurrencyID',
                    width: 80,
                    skip: false,
                    show: true,
                    reorderable: false,
                },
                {
                    id: 'buysell',
                    accessor: 'BS',
                    width: 80,
                    Cell: props => {
                        if (props.aggregated) {
                            
                        } else {
                            if (props.original.BS == this.props.language.global.buysell.B) {
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
                    id: 'filled',
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    accessor: 'mvStatus',
                    width: 80,
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
                    id: 'triggerprice',
                    accessor: 'mvOrderType',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'gtd',
                    accessor: 'mvOrderType',
                    width: 90,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mobileaction',
                    mobile: false,
                    skip: true,
                    show: false,
                    Cell: props => {
                        var child = []
                        if (props.original.IsCancelable !== null && props.original.IsCancelable === 'Y') {
                            child.push(
                                <button className="hks-btn btn-cancel-order" onClick={e => this.onCancelOrder(props)}>
                                    <span className="glyphicon glyphicon-remove"></span>
                                    {this.props.language.button.cancel}
                                </button>
                            )
                        }
                        if (props.original.IsModifiable !== null && props.original.IsModifiable === 'Y') {
                           child.push(
                                <button className="hks-btn btn-modify" onClick={e => this.onModifyOrder(props)}>
                                    <span className="glyphicon glyphicon-pencil"></span>
                                    {this.props.language.button.modify}
                                </button>
                            )
                        }

                        return (<div>{child}</div>)
                    }
                }

            ],
            pageIndex: 1,
            key: false,
            filterable: true
        }

        this.rowSelected = []
        this.id = this.props.id
        console.log(this.id)
        this.defaultPageSize = 15

        /*
        ClientID
        SessionID

        MarketID
        StartDate
        EndDate
        OrderGroupID
        TradingAccSeq
        InstrumentID
        BranchID
        OperatorID
        ChannelID
        Status
        FetchCountLimit
        Language


        if(IsModifiable
            IsCancelable
        )  => show/hide icon cancel/modify
        */

        this.param = {
            ClientID: config.cache.clientID,        // mandatory
            SessionID: config.cache.sessionID,        // mandatory
    
            MarketID: config.marketid[0],
            // StartDate: "",
            // EndDate: "",
            
            TradingAccSeq: config.cache.tradingAccSeq,
            // BranchID: "",
            // OperatorID: "",
            // ChannelID: "MOB",
            Status: "",
            // FetchCountLimit: "",
            Language: config.cache.lang
        }
    }

    onCancelOrder(order) {
        this.handleCancelOrder(order)
    }

    onModifyOrder(order) {
        this.handleModifyOrder(order)
    }


    render() {
        let buttonAction = [
            <button style={this.props.theme.searchbar.default.button} type="button" className="hks-btn"
                onClick={() => this.handleCancelOrderChecked()}>{this.props.language.button.CTTCancel}</button>,
        ]
        let data = this.props.data.OrderInfo
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id}
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
                        tableData={data}

                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={Math.ceil(data.length / this.defaultPageSize)}

                        searchParams={['mvStatus', "mvMarket"]}
                        searchMobileParams={["mvStatus", "mvMarket"]}
                        searchActions={buttonAction}
                        searchData={{mvStatus: []}}
                        searchDefaultValues={{ mvStatus: this.param.Status, mvMarket: this.param.MarketID }}
                        onSearch={this.onSearch.bind(this)}
                    />
                </Body>
            </div>
        )

    }

    componentDidMount() {
        this.props.queryOrderInfo(this.param)
    }

    handleCancelOrderChecked(e) {

        if (this.rowSelected.length > 0) {
            this.props.showPopup({
                data: { me: this, data: this.rowSelected },
                title: this.props.language.orderjournal.popup.title.cancel,
                language: this.props.language,
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
            id: 'modifyorder',
            authcard: false
        })
    }

    handleDetailOrder(param) {
        this.props.showPopup({
            data: { me: this, data: param },
            title: this.props.language.orderjournal.popup.title.detail,
            language: this.props.language,
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

    showPopup() {
        // get all row selected
        this.setState({
            lgShow: true
        });
        this.title = this.props.language.orderjournal.popup.title.cancel
        this.popupType = 'CANCELORDER'
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });

        // console.log(this.state.columns)
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
        this.props.queryOrderInfo(this.param)
    }

    onSearch(param) {
        // this.param['mvStatus'] = param.mvStatus
        // if (param.mvOrderType) {
        //     this.param['mvOrderType'] = param.mvOrderType
        // }
        // if (param.mvBuysell) {
        //     this.param['mvOrderBS'] = param.mvBuysell
        // }

        // this.param['page'] = this.state.pageIndex
        // this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']

        // this.props.onSearch(this.param)

        this.param.MarketID = param.mvMarket
        this.param.Status = param.mvStatus

        this.props.queryOrderInfo(this.param)
    }

    updateView() {
        this.rowSelected = []
        this.props.onSearch(this.param)
    }


}

function feeTaxParser(utils, mvBSValue, mvNetAmtValue, mvGrossAmt) {
    let tmp = 0
    if (mvBSValue == 'B') {
        tmp = mvNetAmtValue - mvGrossAmt
    } else {
        tmp = mvGrossAmt - mvNetAmtValue
    }
    return utils.currencyShowFormatter(tmp)
}

function headerRenderer(component, id, text) {
    return (
        <div id={id} onMouseLeave={e => component.handleOnMouseLeave(e)} onMouseEnter={e => component.handleOnMouseEnter(e)} onMouseDown={e => component.handleOnMouseDown(e)} onMouseUp={(e) => component.handleOnMouseUp(e)} >{text}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.daytrade.response,
    }
}

const mapDispatchToProps = (dispatch, props) => ({

    queryOrderInfo: (param) => {
        dispatch(actions.queryOrderInfo(param))
    },
    
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    showPopup: (param) => {
        dispatch(actions.showPopup(param))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(DayTrade)
