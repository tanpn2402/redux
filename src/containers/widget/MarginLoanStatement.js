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

class MarginLoanStatement extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.defaultPageSize = 15

        this.params = {
            mvLastAction: 'ACCOUNT',
            mvChildLastAction: 'MARGINLOAN',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: this.defaultPageSize,
            timePeriod: 'Customize'
        }
        this.exportParams = {
            // mvLastAction: 'ACCOUNT',
            // mvChildLastAction: 'ORDERHISTORYENQUIRY',
            // mvStartTime: moment(new Date()).format("DD/MM/YYYY"),
            // mvEndTime: moment(new Date()).format("DD/MM/YYYY"),
            // mvBS: '',
            // mvInstrumentID: '',
            // mvStatus: 'ALL',
            // mvSorting: 'InputTime desc',
        }
        this.state = {
            columns: [
                {
                    id: 'mvRowNum',
                    Header: this.props.language.marginloan.header.rownum,
                    accessor: 'rowNum',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransactionDate',
                    Header: this.props.language.marginloan.header.transactiondate,
                    accessor: 'tranDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvDescription',
                    Header: this.props.language.marginloan.header.description,
                    accessor: 'desc',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    Header: this.props.language.marginloan.header.marginusage,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvDebt',
                            Header: this.props.language.marginloan.header.debt,
                            accessor: 'out',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvPayment',
                            Header: this.props.language.marginloan.header.payment,
                            accessor: 'in',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvFinalDebt',
                            Header: this.props.language.marginloan.header.finaldept,
                            accessor: 'balance',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'mvMarginCall',
                    Header: this.props.language.marginloan.header.margincall,
                    accessor: 'marginCallF',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvForceSell',
                    Header: this.props.language.marginloan.header.forcesell,
                    accessor: 'sellAmount',
                    width: 250,
                    skip: false,
                    show: true,
                },
            ],
            pageIndex: 1,
            filterable: true
        }

        this.id = 'marginloan'
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            columns: [
                {
                    id: 'mvRowNum',
                    Header: nextProps.language.marginloan.header.rownum,
                    accessor: 'rowNum',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransactionDate',
                    Header: nextProps.language.marginloan.header.transactiondate,
                    accessor: 'tranDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvDescription',
                    Header: nextProps.language.marginloan.header.description,
                    accessor: 'desc',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    Header: nextProps.language.marginloan.header.marginusage,
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'mvDebt',
                            Header: nextProps.language.marginloan.header.debt,
                            accessor: 'out',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvPayment',
                            Header: nextProps.language.marginloan.header.payment,
                            accessor: 'in',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvFinalDebt',
                            Header: nextProps.language.marginloan.header.finaldept,
                            accessor: 'balance',
                            width: 100,
                            skip: false,
                            show: true,
                        },
                    ]
                },
                {
                    id: 'mvMarginCall',
                    Header: nextProps.language.marginloan.header.margincall,
                    accessor: 'marginCallF',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvForceSell',
                    Header: nextProps.language.marginloan.header.forcesell,
                    accessor: 'sellAmount',
                    width: 250,
                    skip: false,
                    show: true,
                },
            ]
        }
    }

    render() {

        let data = this.props.data
        let tableheader = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} widgetID={'marginloan'}
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
                        <Pagination
                            theme={this.props.theme}
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
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
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

        //this.props.onExportExcel(this.exportParams)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.marginloan.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryMarginLoan(param, reload))
    },
    // onExportExcel: (param) => {
    //     dispatch(actions.exportOrderHistory(param))
    // },
})

export default connect(mapStateToProps, mapDispatchToProps)(MarginLoanStatement)