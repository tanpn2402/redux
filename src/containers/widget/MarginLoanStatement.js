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
                    id: 'rownum',
                    accessor: 'rowNum',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transactiondate',
                    accessor: 'tranDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'description',
                    accessor: 'desc',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    id: 'marginusage',
                    skip: false,
                    show: true,
                    columns: [
                        {
                            id: 'debt',
                            accessor: 'out',
                            width: 100,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                        {
                            id: 'payment',
                            accessor: 'in',
                            width: 100,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                        {
                            id: 'finaldept',
                            accessor: 'balance',
                            width: 100,
                            skip: false,
                            show: true,
                            background: props.theme.number.col
                        },
                    ]
                },
                {
                    id: 'margincall',
                    accessor: 'marginCallF',
                    width: 250,
                    skip: false,
                    show: true,
                },
                {
                    id: 'forcesell',
                    accessor: 'sellAmount',
                    width: 250,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },
            ],
            pageIndex: 1,
            filterable: false
        }

        this.id = 'marginloan'
        this.idParent = 'marginloan'
    }

    // componentWillReceiveProps(nextProps) {
    //     this.state = {
            
    //     }
    // }

    render() {

        let data = this.props.data

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} widgetID={'marginloan'}
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
                        idParent={this.idParent}
                        language={this.props.language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        tableData={data.list}

                        pageIndex={this.state.pageIndex}
                        totalPage={Math.ceil(data.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        onSearch={this.onSearch.bind(this)}
                        searchActions={[]}
                        searchData={{ stockList: this.stockList }}
                        searchParams={['mvStartDate', 'mvEndDate']}
                        searchEnable={data.list.length > 0}                                
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