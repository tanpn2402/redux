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
import config from '../../core/config'
import moment from 'moment'

class OrderConfirmation extends Component {
    constructor(props) {
        super(props)
        this.id = 'orderconfirmation'
        this.stockList = config.cache.stockList
        this.defaultPageSize = 15

        this.state = {
            columns: [
                {
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'mvTradeTime',
                    Header: this.props.language.orderconfirmation.header.tradetime,
                    accessor: 'mvTradeTime',
                    Cell: props => Utils.formatDate(props.original.mvTradeTime, 'ddmmyyyy'),
                    width: 140,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: this.props.language.orderconfirmation.header.marketid,
                    accessor: 'mvMarketID',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockID',
                    Header: this.props.language.orderconfirmation.header.stockid,
                    accessor: 'mvStockID',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: this.props.language.orderconfirmation.header.buysell,
                    accessor: 'mvBS',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderType',
                    Header: this.props.language.orderconfirmation.header.ordertype,
                    accessor: 'mvOrderType',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvQty',
                    Header: this.props.language.orderconfirmation.header.quantity,
                    accessor: 'mvQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.orderconfirmation.header.price,
                    accessor: 'mvPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.orderconfirmation.header.status,
                    accessor: 'mvStatus',
                    Cell: props => this.getStatus(props.original.mvStatus, this.props.language.orderconfirmation.status),
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledQty',
                    Header: this.props.language.orderconfirmation.header.filledquantity,
                    accessor: 'mvFilledQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledPrice',
                    Header: this.props.language.orderconfirmation.header.filledprice,
                    accessor: 'mvFilledPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvCancelQty',
                    Header: this.props.language.orderconfirmation.header.cancelquantity,
                    accessor: 'mvCancelQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
            pageIndex: 1,
        }

        this.rowSelected = []

        this.param = {
            mvLastAction: "ACCOUNT",
            mvChildLastAction: "SIGNORDERENQUIRY",
            key: (new Date()).getTime(),
            start: 0,
            limit: this.defaultPageSize,
            mvBS: 'ALL',
            page: 1,
            mvOrderType: 'ALL',
            mvMarketID: 'ALL',
            mvInstrumentID: 'ALL',
            mvStatus: 'ALL',
            mvSorting: 'InputTime desc',
            mvStartTime: moment(new Date()).format("DD/MM/YYYY"),
            mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
        }
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
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'mvTradeTime',
                    Header: nextProps.language.orderconfirmation.header.tradetime,
                    accessor: 'mvTradeTime',
                    Cell: props => Utils.formatDate(props.original.mvTradeTime, 'ddmmyyyy'),
                    width: 140,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: nextProps.language.orderconfirmation.header.marketid,
                    accessor: 'mvMarketID',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockID',
                    Header: nextProps.language.orderconfirmation.header.stockid,
                    accessor: 'mvStockID',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: nextProps.language.orderconfirmation.header.buysell,
                    accessor: 'mvBS',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderType',
                    Header: nextProps.language.orderconfirmation.header.ordertype,
                    accessor: 'mvOrderType',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvQty',
                    Header: nextProps.language.orderconfirmation.header.quantity,
                    accessor: 'mvQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: nextProps.language.orderconfirmation.header.price,
                    accessor: 'mvPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: nextProps.language.orderconfirmation.header.status,
                    accessor: 'mvStatus',
                    Cell: props => this.getStatus(props.original.mvStatus, nextProps.language.orderconfirmation.status),
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledQty',
                    Header: nextProps.language.orderconfirmation.header.filledquantity,
                    accessor: 'mvFilledQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledPrice',
                    Header: nextProps.language.orderconfirmation.header.filledprice,
                    accessor: 'mvFilledPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvCancelQty',
                    Header: nextProps.language.orderconfirmation.header.cancelquantity,
                    accessor: 'mvCancelQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ]
        })
    }

    getStatus(v, lang) {
        if (v) {
            return lang['STATUS_' + v.toUpperCase()]
        } else {
            return v.toUpperCase()
        }
    }

    render() {

        var data = this.props.data

        let buttonAction = [
            <button style={this.props.theme.button} type="button" className="hks-btn"
                onClick={() => this.execute()}>{this.props.language.button.execute}</button>,
        ]
        let tableheader = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter


        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title widgetID={'orderconfirmation'} theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main">
                        <Table
                            theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data.mvOrderBeanList}
                        />
                    </div>

                    <div className="table-header" style={tableheader} >
                        <SearchBar
                            id={this.id}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={buttonAction}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{ stockList: this.stockList }}
                            param={['mvMarket', 'mvStockId', 'mvOrderType', 'mvBuysell', 'mvStartDate', 'mvEndDate']} />
                    </div>

                    <div className="table-footer" style={tablefooter} >
                        <Pagination
                            theme={this.props.theme}
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(this.props.data.mvTotalOrders / this.defaultPageSize)}
                            onPageChange={this.onPageChange.bind(this)}
                            onNextPage={this.onNextPage.bind(this)}
                            onPrevPage={this.onPrevPage.bind(this)}
                            onReloadPage={this.onReloadPage.bind(this)}
                            onExportExcel={this.onExportExcel.bind(this)}
                        // onFirstPage={this.onFirstPage.bind(this)}
                        // onLastPage={this.onLastPage.bind(this)}
                        />
                    </div>
                </Body>
            </div>
        )
    }

    componentDidMount() {
        this.props.onSearch(this.param)
    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById(this.id + '-cb-all').checked
            var checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.data.mvOrderBeanList !== undefined ? this.props.data.mvOrderBeanList : []
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

            if (document.getElementsByClassName(this.id + '-row-checkbox').length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all").checked = true
            else
                document.getElementById(this.id + "-cb-all").checked = false
        }
        console.log('onRowSelected', this.rowSelected)
    }

    execute() {
        if (this.rowSelected.length > 0) {
            this.props.onShowConfirm({
                title: this.props.language.orderconfirmation.popup.title,
                id: "orderconfirmation",
                authcard: false,
                language: this.props.language,
                data: { rowSelected: this.rowSelected, me: this }
            })
        }
        else {
            this.props.onShowMessageBox(this.props.language.messagebox.title.error,
                this.props.language.messagebox.message.selectStock)
        }
    }

    refreshComponent() {
        this.props.onSearch(this.param)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = pageIndex
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
        this.param['key'] = (new Date()).getTime()
        this.param['page'] = this.state.pageIndex
        this.props.onSearch(this.param)
    }

    onFirstPage() {

    }

    onLastPage() {

    }

    onNextPage() {
        this.state.pageIndex = parseInt(this.state.pageIndex) + 1
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
        this.param['key'] = (new Date()).getTime()
        this.param['page'] = this.state.pageIndex
        this.props.onSearch(this.param)
    }

    onPrevPage() {
        this.state.pageIndex = parseInt(this.state.pageIndex) - 1
        this.param['start'] = (this.state.pageIndex - 1) * this.param['limit']
        this.param['key'] = (new Date()).getTime()
        this.param['page'] = this.state.pageIndex
        this.props.onSearch(this.param)
    }

    onReloadPage() {
        this.param['key'] = (new Date()).getTime()
        this.props.onSearch(this.param)
    }
    onSearch(param) {
        if (param.mvStockId === "")
            param.mvStockId = "ALL"
        this.param['mvOrderType'] = param.mvOrderType;
        this.param['mvMarketID'] = param.mvMarket;
        this.param['mvStartTime'] = param.mvStartDate;
        this.param['mvEndTime'] = param.mvEndDate;
        this.param['mvBS'] = param.mvBuysell;
        this.param['mvInstrumentID'] = param.mvStockId;
        //this.param['mvStatus'] = 'ALL';
        this.param['mvSorting'] = "InputTime desc";
        this.param['key'] = (new Date()).getTime()

        this.state.pageIndex = 1
        this.param['page'] = this.state.pageIndex;
        this.param['start'] = (this.state.pageIndex - 1) * 15;

        this.props.onSearch(this.param)
    }

    onExportExcel() {
        this.props.onExportExcel(this.exportParams)
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.orderconfirmation.data,
        //reload: state.orderconfirmation.reload,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param) => {
        dispatch(actions.getOrderCofirm(param))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportOrderConfirm(param))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    onShowConfirm: (params) => {
        dispatch(actions.showPopup(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)