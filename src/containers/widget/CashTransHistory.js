import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import moment from 'moment'
class CashTransHistory extends Component {
    constructor(props) {
        super(props)

        this.pageIndex = 1
        this.rowSelected = []
        this.id = 'cashtransaction'
        this.defaultPageSize = 15

        this.params = {
            tradeType: 'ALL',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            start: 0,
            limit: this.defaultPageSize,
            page: 1
        }
        this.exportParams = {
            mvLastAction: 'CASHTRANSACTIONHISTORY',
            tradeType: '',
            mvStartDate: '',
            mvEndDate: ''
        }

        this.state = {
            columns: [
                {
                    id: 'transid',
                    accessor: 'tranID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'datetrans',
                    accessor: 'trandate',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transtype',


                    width: 150,
                    Cell: props => {
                        return (
                            <span>{this.props.language.searchbar[props.original.transType]}</span>
                        )
                    },
                    sortable: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'amount',
                    accessor: 'totalLendingAmt',
                    width: 150,
                    skip: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    width: 70,
                    maxWidth: 80,
                    Cell: props => {
                        return (
                            <span>{this.props.language.cashtransaction.status[props.original.status]}</span>
                        )
                    },
                    sortable: true,
                    skip: false,
                    show: true,
                },
                {
                    id: 'notes',
                    accessor: 'remark',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'lastupdate',
                    accessor: 'lastApprovaltime',
                    width: 150,
                    skip: false,
                    show: true,
                }
            ],
            pageIndex: 1,
            filterable: true
        }

    }

    componentWillReceiveProps(nextProps) {
    
    }


    render() {
        var data = this.props.cashTransHistory.list
        let tableheader = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table 
                        theme={this.props.theme}
                        id={this.id}
                        language={this.props.language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        tableData={data}

                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={Math.ceil(this.props.cashTransHistory.totalCount / this.defaultPageSize)}
                        onExportExcel={this.onExportExcel.bind(this)}

                        searchParams={['mvTrade', 'mvStartDate', 'mvEndDate']}
                        searchActions={[]}
                        searchData={[]}
                        onSearch={this.onSearch.bind(this)}
                        
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
    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById('orderjournal-cb-all').checked

            if (current)
                this.rowSelected = this.props.data.List !== undefined ?
                    this.props.data.List.filter(el => el.mvShowCancelIcon !== null && el.mvShowCancelIcon === 'Y') : []
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
        }
        
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });

    }

    onPageChange(pageIndex) {
        if (pageIndex > 0) {
            this.state.pageIndex = pageIndex
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.params['page'] = 1
        this.params['start'] = 0

        this.params['tradeType'] = param.mvTrade.toUpperCase()
        this.params['mvStartDate'] = param.mvStartDate
        this.params['mvEndDate'] = param.mvEndDate
        this.props.onSearch(this.params, !this.props.reload)
    }

    onExportExcel() {
        this.exportParams['tradeType'] = this.params['tradeType']
        this.exportParams['mvStartDate'] = this.params['mvStartDate']
        this.exportParams['mvEndDate'] = this.params['mvEndDate']

        this.props.onExportExcel(this.exportParams)
    }

}
const mapStateToProps = (state) => {
    return {
        cashTransHistory: state.cashtranshistory.cashTransHistory
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryCashTransaction(param, reload))
    },
    onExportExcel: (param) => {
        dispatch(actions.exportGetCashTransactionHistory(param))
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(CashTransHistory)
