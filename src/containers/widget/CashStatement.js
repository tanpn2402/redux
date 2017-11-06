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

class CashStatement extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.defaultPageSize = 15

        this.params = {
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: 15,
            timePeriod: 'Customize'
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
                    id: 'date',
                    accessor: 'TRANDATE',
                    width: 110,
                    skip: false,
                    show: true,
                },
                {
                    id: 'description',
                    accessor: 'REMARKS',
                    width: 210,
                    skip: false,
                    show: true,
                },
                {
                    id: 'beginningbalance',
                    accessor: 'BALBF',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'creditamount',
                    accessor: 'CREDITAMT',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'debitamount',
                    accessor: 'DEBITAMT',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'endingbalance',
                    accessor: 'BALCF',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
            pageIndex: 1,
            filterable: true
        }

        this.id = 'cashstatement'
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
                <Title language={this.props.language} widgetID={'cashstatement'}
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
                            language={this.props.language.cashstatement.header}
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

                    <div className="table-footer" style={tablefooter}>
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

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        })
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
        data: state.cashstatement.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (params) => {
        dispatch(actions.enquiryCashStatement(params))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportCashTransactionHistory(param))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(CashStatement)
