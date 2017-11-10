import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import { Button } from 'react-bootstrap'
import moment from "moment"

class OrderJournal extends Component {
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
                            if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') {
                                if (props.original.mvCancelIcon && props.original.mvCancelIcon != '') {
                                    return (
                                        <input type='checkbox' style={{ position: 'relative', top: '6px' }}
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
                    width: 140,
                    sortable: false,
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            var child = []
                            if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') {
                                if (props.original.mvCancelIcon && props.original.mvCancelIcon != '') {
                                    child.push(
                                        <Button bsClass="hks-btn btn-orderjournal" type="button"
                                            onClick={() => this.handleCancelOrder(props.original)}>
                                            <span className="glyphicon glyphicon-remove"></span>
                                        </Button>
                                    )
                                }
                            }

                            if (props.original.mvShowModifyIcon !== null && props.original.mvShowModifyIcon === 'Y') {
                                if (props.original.mvModifyIcon && props.original.mvModifyIcon != '') {
                                    child.push(
                                        <Button bsClass="hks-btn btn-orderjournal" type="button"
                                            onClick={() => this.handleModifyOrder(props.original)}>
                                            <span className="glyphicon glyphicon-edit"></span>
                                        </Button>
                                    )
                                }
                            }

                            return (
                                <div style={{ display: "table", height: '100%', width: '100%' }}>
                                    <div style={{ display: 'table-cell', verticalAlign: 'middle' }} >
                                        {
                                            child
                                        }
                                    </div>
                                </div>)
                        }
                    },
                    skip: true,
                    mobile: false
                },
                {
                    id: 'Detail',
                    maxWidth: 200,
                    width: 80,
                    sortable: false,
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            var child = []
                            child.push(
                                <Button bsClass="hks-btn btn-orderjournal" type="button"
                                    onClick={() => this.handleDetailOrder(props.original)}>
                                    <span className="glyphicon glyphicon-folder-open"></span>
                                </Button>
                            )

                            return (
                                <div style={{ display: "table", height: '100%', width: '100%' }}>
                                    <div style={{ display: 'table-cell', verticalAlign: 'middle' }} >
                                        {
                                            child
                                        }
                                    </div>
                                </div>)
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
                },
                {
                    id: 'buysell',
                    accessor: 'mvBS',
                    width: 80,
                    Cell: props => {
                        if (props.aggregated) {

                        } else {
                            if (props.original.mvBSValue == this.props.language.global.buysell.B) {
                                return (
                                    <div style={{ backgroundColor: '#39b567', color: '#fff' }}>
                                        {this.props.language.searchbar.buy}
                                    </div>
                                )
                            } else {
                                return (
                                    <div style={{ backgroundColor: '#b5383e', color: '#fff' }}>
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
                    width: 100,
                    skip: false,
                    show: true,
                    style: { textAlign: "right" }
                },
                {
                    id: 'quantity',
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'pendingQty',
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'executedQty',
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'avgprice',
                    accessor: 'mvAvgPriceValue',
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
                    id: 'ordertype',
                    accessor: 'mvOrderType',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'feetax',
                    accessor: 'mvOrderType',
                    width: 90,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bankid',
                    accessor: 'mvBankID',
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
                },
                {
                    id: 'rejectreason',
                    accessor: 'mvRejectReason',
                    width: 80,
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
                        return (
                            <div>
                                <button className="hks-btn btn-cancel" onClick={e => this.onCancelOrder(props)}>
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

            ],
            pageIndex: 1,
            key: false,
            filterable: true
        }

        this.rowSelected = []
        this.id = 'orderjournal'
        this.defaultPageSize = 15

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
        console.log(order)
    }


    render() {
        let buttonAction = [
            <button style={this.props.theme.button} type="button" className="hks-btn"
                onClick={() => this.handleCancelOrderChecked()}>{this.props.language.button.CTTCancel}</button>,
        ]

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title id={this.id}
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

    componentDidMount() {
        this.props.onSearch(this.param)

    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         columns: 
    //     })
    // }

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


    // handleOnMouseDown(e) { // begin dragging
    //     let idA = e.target.id
    //     let result = this.state.columns.findIndex((column) => {
    //         return column.id == idA
    //     })
    //     this.indexA = result != -1 ? result : 0
    // }

    // handleOnMouseUp(e) { // end dragging
    //     let idB = e.target.id
    //     let result = this.state.columns.findIndex((column) => {
    //         return column.id == idB
    //     })
    //     this.indexB = result != -1 ? result : 0
    //     let arr = this.state.columns.slice()
    //     let a = arr[this.indexA]
    //     arr[this.indexA] = arr[this.indexB]
    //     arr[this.indexB] = a
    //     this.setState({
    //         columns: arr
    //     })
    // }

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
        this.props.onSearch(this.param, !this.props.reload)
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

        this.props.onSearch(this.param)
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
        data: state.orderjournal.enquiryorder,
        modifyData: state.orderjournal.dataresult,
        menuid: state.orderjournal.menuid,

    }
}

const mapDispatchToProps = (dispatch, props) => ({

    onSearch: (param, reload) => {
        dispatch(actions.getEnquiry(param, reload))
    },
    getStockInfo: (param) => {
        //dispatch(actions.getstockInfo(param))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    showPopup: (param) => {
        dispatch(actions.showPopup(param))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(OrderJournal)
