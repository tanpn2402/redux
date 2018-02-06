import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import { Button } from 'react-bootstrap'
import config from '../../core/config'
import moment from 'moment'

class StockStatement extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.defaultPageSize = props.defaultPageSize
        this.params = {
            mvLastAction: 'ACCOUNT',
            mvChildLastAction: 'TRANSACTIONHISTORY',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: this.defaultPageSize,
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
                    background: props.theme.table.colText
                },
                {
                    id: 'action',
                    accessor: 'action',
                    width: 120,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'credit',
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'quantity',
                            accessor: 'buyQty',
                            Cell: props =>  Utils.formatQty(props.value),
                            width: 80,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                        {
                            id: 'avgprice',
                            accessor: 'buyPrice',
                            Cell: props =>  Utils.formatCurrency(props.value),
                            width: 80,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                        {
                            id: 'amt',
                            accessor: 'buyAmount',
                            width: 100,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
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
                            Cell: props =>  Utils.formatQty(props.value),
                            width: 80,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                        {
                            id: 'avgprice',
                            accessor: 'sellPrice',
                            Cell: props =>  Utils.formatCurrency(props.value),
                            width: 80,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                        {
                            id: 'amt',
                            accessor: 'sellAmount',
                            Cell: props =>  Utils.formatCurrency(props.value),
                            width: 100,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
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
                            Cell: props =>  Utils.formatCurrency(props.value),
                            width: 80,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                        {
                            id: 'percentage',
                            accessor: 'feePercent',
                            width: 60,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                    ]
                },
                {
                    id: 'description',
                    accessor: 'desc',
                    width: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
            ],
            pageIndex: 1,
            filterable: false
        }

        this.id = 'stockstatement'
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            
        })
    }

    render() {

        let data = this.props.data

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} widgetID={'stockstatement'}
                    theme={this.props.theme} columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table
                        theme={this.props.theme}
                        key={this.id}
                        id={this.id}
                        language={this.props.language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        tableData={data.list}

                        pageIndex={this.state.pageIndex}
                        totalPage={Math.ceil(data.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}
                        onExportExcel={this.onExportExcel.bind(this)}

                        onSearch={this.onSearch.bind(this)}
                        searchActions={[]}
                        searchData={{ stockList: this.stockList }}
                        searchParams={['mvStartDate', 'mvEndDate']}
                        searchEnable={true}
                    />
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
StockStatement.defaultProps = {
    defaultPageSize: 19
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
