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
        this.id = 'cashTransHistory'
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
            mvLastAction:'CASHTRANSACTIONHISTORY',
            tradeType:'',
            mvStartDate:'',
            mvEndDate:''
        }

        this.state = {
            columns: [
                {
                    id: 'mvTransId',
                    Header: this.props.language.cashtransaction.header.transid,
                    accessor: 'tranID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvDateTrans',
                    Header: this.props.language.cashtransaction.header.datetrans,
                    accessor: 'trandate',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransType',
                    Header: this.props.language.cashtransaction.header.transtype,


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
                    id: 'mvAmount',
                    Header: this.props.language.cashtransaction.header.amount,
                    accessor: 'totalLendingAmt',
                    width: 150,
                    skip: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: this.props.language.cashtransaction.header.status,
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
                    id: 'mvNotes',
                    Header: this.props.language.cashtransaction.header.notes,
                    accessor: 'remark',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvLastUpdate',
                    Header: this.props.language.cashtransaction.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    width: 150,
                    skip: false,
                    show: true,
                }
            ],
            pageIndex: 1,
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    id: 'mvTransId',
                    Header: nextProps.language.cashtransaction.header.transid,
                    accessor: 'tranID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvDateTrans',
                    Header: nextProps.language.cashtransaction.header.datetrans,
                    accessor: 'trandate',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTransType',
                    Header: nextProps.language.cashtransaction.header.transtype,


                    width: 150,
                    Cell: props => {
                        return (
                            <span>{nextProps.language.searchbar[props.original.transType]}</span>
                        )
                    },
                    sortable: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvAmount',
                    Header: nextProps.language.cashtransaction.header.amount,
                    accessor: 'totalLendingAmt',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: nextProps.language.cashtransaction.header.status,
                    width: 70,
                    maxWidth: 80,
                    Cell: props => {
                        return (
                            <span>{nextProps.language.cashtransaction.status[props.original.status]}</span>
                        )
                    },
                    sortable: false,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvNotes',
                    Header: nextProps.language.cashtransaction.header.notes,
                    accessor: 'remark',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvLastUpdate',
                    Header: nextProps.language.cashtransaction.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    width: 150,
                    skip: false,
                    show: true,
                }
            ]
        });

    }


    render() {
        var data = this.props.cashTransHistory.list
        let tableheader = this.props.theme.table == undefined? undefined:this.props.theme.table.tableheader
        let tablefooter = this.props.theme.table == undefined? undefined:this.props.theme.table.tablefooter
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main">
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data}
                        />
                    </div>

                    <div className="table-header" style={tableheader}>
                        <SearchBar
                            id={this.id}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{}}
                            param={['mvTrade', 'mvStartDate', 'mvEndDate']} />
                    </div>

                    <div className="table-footer" style={tablefooter}>
                        <Pagination
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(this.props.cashTransHistory.totalCount/this.defaultPageSize)}
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
        console.log('onRowSelected', this.rowSelected)
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

    onNextPage() {
        if (this.state.pageIndex > 0) {
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onPrevPage() {
        if (this.state.pageIndex > 1) {
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onReloadPage() {
        this.props.onSearch(this.param, !this.props.reload)
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
