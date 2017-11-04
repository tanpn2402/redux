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

class StockStatement extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList

        this.params = {
            mvLastAction: 'ACCOUNT',
            mvChildLastAction: 'TRANSACTIONHISTORY',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: 15,
            timePeriod: 'Customize',
            key: (new Date()).getTime()
        }

        this.exportParams = {
            mvLastAction: 'ACCOUNT',
            mvLastChildAction: 'CASHTRANSACTIONHISTORYREPORT',
            timePeriod: 'Customize',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            tradeType: 'ALL',
        }

        this.state = {
            columns: [
                {
                    id: 'order',
                    accessor: 'refId',
                    width: 60,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transactiondate',
                    accessor: 'tradeDate',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'stockcode',
                    accessor: 'stockCode',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'action',
                    accessor: 'action',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'credit',
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'quantity',
                            accessor: 'buyQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'avgprice',
                            accessor: 'buyPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'amt',
                            accessor: 'buyAmount',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id : 'debit',
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'quantity',
                            accessor: 'sellQty',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'avgprice',
                            accessor: 'sellPrice',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'amt',
                            accessor: 'sellAmount',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'feetax',
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'value',
                            accessor: 'fee',
                            width: 80,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'percentage',
                            accessor: 'feePercent',
                            width: 60,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'description',
                    accessor: 'desc',
                    width: 200,
                    skip: false,
                    show: true,
                },
            ],
            pageIndex: 1,
            filterable: true
        }

        this.id = 'stockstatement'
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            
        })
    }

    render() {

        let data = this.props.data
        let tableheader = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} widgetID={'stockstatement'}
                    theme={this.props.theme} columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
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
                            filterable={this.state.filterable}
                            data={data.list}
                            language={this.props.language.stockstatement.header}
                        />
                    </div>

                    <div className="table-header" style={tableheader}>
                        <SearchBar
                            id={this.id}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{ stockList: this.stockList }}
                            param={['mvStartDate', 'mvEndDate']} />
                    </div>

                    <div className="table-footer" style={tablefooter} style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(data.totalCount / this.defaultPageSize)}
                            onPageChange={this.onPageChange.bind(this)}
                            onNextPage={this.onNextPage.bind(this)}
                            onPrevPage={this.onPrevPage.bind(this)}
                            onReloadPage={this.onReloadPage.bind(this)}
                            onExportExcel={this.onExportExcel.bind(this)}
                        />
                    </div>
                </Body>
            </div>
        )
    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        this.props.onSearch(this.params)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        let newCols = this.state.columns.map(parentCol => {
            if (parentCol.columns !== undefined) {
                let cols = parentCol.columns.map(column => {
                    if (column.id == id) {
                        return Object.assign({}, column, { show: !column.show })
                    } else {
                        return column
                    }
                })
                return Object.assign({}, parentCol, { columns: cols })
            } else {
                if (parentCol.id == id) {
                    return Object.assign({}, parentCol, { show: !parentCol.show })
                } else {
                    return parentCol
                }
            }
        })
        this.setState({
            columns: newCols
        });
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = pageIndex
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onNextPage() {
        this.state.pageIndex = this.state.pageIndex + 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onPrevPage() {
        this.state.pageIndex = this.state.pageIndex - 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onReloadPage() {
        this.param['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']

        this.params['mvStartDate'] = param['mvStartDate']
        this.params['mvEndDate'] = param['mvEndDate']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onExportExcel() {
        this.exportParams['mvStartDate'] = this.params['mvStartDate']
        this.exportParams['mvEndDate'] = this.params['mvEndDate']

        this.props.onExportExcel(this.exportParams)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.stockstatement.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryStockStatement(param, reload))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportTransactionHistory(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(StockStatement)
