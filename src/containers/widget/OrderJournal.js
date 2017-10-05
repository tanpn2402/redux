import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import { Button } from 'react-bootstrap'
import Popup from '../Popup'
class OrderJournal extends Component {
    constructor(props) {
        super(props)


        this.state = {
            columns: [
                {
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') {
                            if (props.original.mvCancelIcon && props.original.mvCancelIcon != '') {
                                return (
                                    <input type='checkbox' className={this.id + "-row-checkbox"}
                                        onChange={() => { this.onRowSelected(props.original) }} />
                                )
                            }
                        }

                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'can',
                    Header: this.props.language.orderjournal.header.cancelmodify,
                    maxWidth: 80,
                    Cell: props => {
                        var child = []
                        if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') {
                            if (props.original.mvCancelIcon && props.original.mvCancelIcon != '') {
                                child.push(
                                    <Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall" type="button"
                                        onClick={() => this.handleCancelOrder(props.original)}>
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </Button>
                                )
                            }
                        }

                        if (props.original.mvShowModifyIcon !== null && props.original.mvShowModifyIcon === 'Y') {
                            if (props.original.mvModifyIcon && props.original.mvModifyIcon != '') {
                                child.push(
                                    <Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall" type="button"
                                        onClick={() => this.handleModifyOrder(props.original)}>
                                        <span className="glyphicon glyphicon-edit"></span>
                                    </Button>
                                )
                            }
                        }

                        return (
                            <span>
                                {
                                    child
                                }
                            </span>)
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'mvStockID',
                    Header: this.props.language.orderjournal.header.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: this.props.language.orderjournal.header.buysell,
                    accessor: 'mvBS',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.orderjournal.header.price,
                    accessor: 'mvPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvQty',
                    Header: this.props.language.orderjournal.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPendingQty',
                    Header: this.props.language.orderjournal.header.pendingQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvExecutedQty',
                    Header: this.props.language.orderjournal.header.executedQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAvgPrice',
                    Header: this.props.language.orderjournal.header.avgprice,
                    accessor: 'mvAvgPriceValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.orderjournal.header.status,
                    accessor: 'mvStatus',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderType',
                    Header: this.props.language.orderjournal.header.ordertype,
                    accessor: 'mvOrderType',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFeeTax',
                    Header: this.props.language.orderjournal.header.feetax,
                    accessor: 'mvOrderType',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBankID',
                    Header: this.props.language.orderjournal.header.bankid,
                    accessor: 'mvBankID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvExpiryDate',
                    Header: this.props.language.orderjournal.header.expirydate,
                    accessor: 'mvDateTime',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvRejectReason',
                    Header: this.props.language.orderjournal.header.rejectreason,
                    accessor: 'mvRejectReason',
                    width: 80,
                    skip: false,
                    show: true,
                },

            ],
            pageIndex: 1,
            key: false
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
        }
    }


    render() {
        var data = this.props.data.mvOrderBeanList

        this.buttonAction = [
            <button style={this.props.theme.buttonClicked} type="button" className="hks-btn"
                onClick={() => this.handleCancelOrderChecked()}>{this.props.language.button.CTTCancel}</button>,
        ]

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main">
                        <Table
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data}
                        />
                    </div>

                    <div className="table-header">
                        <SearchBar
                            id={this.id}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={this.buttonAction}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{ stockList: this.props.stockList }}
                            param={['mvStatus', 'mvOrderType', 'mvBuysell']} />
                    </div>

                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(this.props.data.mvTotalOrders / this.defaultPageSize)}
                            onPageChange={this.onPageChange.bind(this)}
                            onNextPage={this.onNextPage.bind(this)}
                            onPrevPage={this.onPrevPage.bind(this)}
                            onReloadPage={this.onReloadPage.bind(this)}
                        />
                    </div>
                </Body>
            </div>
        )

    }

    componentDidMount() {
        this.props.onSearch(this.param)

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') {
                            if (props.original.mvCancelIcon && props.original.mvCancelIcon != '') {
                                return (
                                    <input type='checkbox' className={this.id + "-row-checkbox"}
                                        onChange={() => { this.onRowSelected(props.original) }} />
                                )
                            }
                        }

                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'can',
                    Header: nextProps.language.orderjournal.header.cancelmodify,
                    maxWidth: 80,
                    Cell: props => {
                        var child = []
                        if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y') {
                            if (props.original.mvCancelIcon && props.original.mvCancelIcon != '') {
                                child.push(
                                    <Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall" type="button"
                                        onClick={() => this.handleCancelOrder(props.original)}>
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </Button>
                                )
                            }
                        }

                        if (props.original.mvShowModifyIcon !== null && props.original.mvShowModifyIcon === 'Y') {
                            if (props.original.mvModifyIcon && props.original.mvModifyIcon != '') {
                                child.push(
                                    <Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall" type="button"
                                        onClick={() => this.handleModifyOrder(props.original)}>
                                        <span className="glyphicon glyphicon-edit"></span>
                                    </Button>
                                )
                            }
                        }

                        return (
                            <span>
                                {
                                    child
                                }
                            </span>)
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'mvStockID',
                    Header: nextProps.language.orderjournal.header.stockid,
                    accessor: 'mvStockID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: nextProps.language.orderjournal.header.buysell,
                    accessor: 'mvBS',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: nextProps.language.orderjournal.header.price,
                    accessor: 'mvPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvQty',
                    Header: nextProps.language.orderjournal.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPendingQty',
                    Header: nextProps.language.orderjournal.header.pendingQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvExecutedQty',
                    Header: nextProps.language.orderjournal.header.executedQty,
                    accessor: 'mvPendingQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAvgPrice',
                    Header: nextProps.language.orderjournal.header.avgprice,
                    accessor: 'mvAvgPriceValue',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: nextProps.language.orderjournal.header.status,
                    accessor: 'mvStatus',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderType',
                    Header: nextProps.language.orderjournal.header.ordertype,
                    accessor: 'mvOrderType',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFeeTax',
                    Header: nextProps.language.orderjournal.header.feetax,
                    accessor: 'mvOrderType',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBankID',
                    Header: nextProps.language.orderjournal.header.bankid,
                    accessor: 'mvBankID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvExpiryDate',
                    Header: nextProps.language.orderjournal.header.expirydate,
                    accessor: 'mvDateTime',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvRejectReason',
                    Header: nextProps.language.orderjournal.header.rejectreason,
                    accessor: 'mvRejectReason',
                    width: 80,
                    skip: false,
                    show: true,
                },

            ]
        })
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

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById('orderjournal-cb-all').checked
            var checkboxes = document.getElementsByClassName('orderjournal-row-checkbox')
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
        console.log('onRowSelected', this.rowSelected)
    }

    showPopup() {
        // get all row selected
        this.setState({
            lgShow: true
        });
        this.title = this.props.language.orderjournal.popup.title.cancel
        this.popupType = 'CANCELORDER'
        console.log('onCancelOrder', this.rowSelected)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });

        //console.log(this.state.columns)
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = pageIndex
        this.param['page'] = this.state.pageIndex
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
        this.props.onSearch(this.param, !this.props.reload)
    }

    onNextPage() {
        this.state.pageIndex = parseInt(this.state.pageIndex) + 1
        this.param['page'] = this.state.pageIndex
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
        this.props.onSearch(this.param, !this.props.reload)
    }

    onPrevPage() {
        this.state.pageIndex = parseInt(this.state.pageIndex) - 1
        this.param['page'] = this.state.pageIndex
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
        this.props.onSearch(this.param, !this.props.reload)
    }

    onReloadPage() {
        this.props.onSearch(this.param, !this.props.reload)
    }

    onSearch(param) {
        this.param['mvStatus'] = param.mvStatus
        this.param['mvOrderType'] = param.mvOrderType
        this.param['mvOrderBS'] = param.mvBuysell
        console.log('orderjournal Page', this.state.pageIndex)
        this.param['page'] = this.state.pageIndex
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']

        this.props.onSearch(this.param)
    }

    updateView() {
        console.log('update View')
        this.rowSelected = []
        this.props.onSearch(this.param)
    }


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
