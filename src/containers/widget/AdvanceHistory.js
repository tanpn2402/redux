import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import config from '../../core/config'

class AdvanceHistory extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceHistory'
        this.lang = config.cache.lang
        this.defaultPageSize = 15
        this.cashAdHisPageIndex = 1

        this.accessor = [
            'creationTime',
            'receiveClientID',
            'totalLendingAmt',
            'interestAccured',
            'personPayFee',
            'status',
            'lastApprovaltime',
            'transType',
            'remark',
            'createTime',
            'trandate',
            'inputChanel',
            'chanelType'
        ]

        this.state = {
            columns: [
                {
                    Header: this.props.language.cashadvance.header.date,
                    accessor: this.accessor[0],
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.advanceamount,
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.totalLendingAmt, ",", this.lang)
                    },
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,

                },
                {
                    Header: this.props.language.cashadvance.header.advancefee,
                    id: 'advancefee',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.interestAccured, ",", this.lang)
                    },
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.processingstatus,
                    id: 'processingstatus',
                    Cell: props => {
                        return this.getStatus(props.original.status)
                    },
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.lastupdate,
                    accessor: this.accessor[6],
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.note,
                    accessor: 'remark',
                    id: 'note',
                    Cell: props => {
                        return this.getNotes(props.original.note)
                    },
                    show: true,
                    skip: false,
                    width: 300,
                }
            ]
        }

        this.getCashAdvanceHistoryParams = {
            key: (new Date()).getTime(),
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCEPAYMENT',
            start: '0',
            limit: this.defaultPageSize,
            page: '1'
        }
    }

    getStatus(v) {
        var language = this.props.language.cashadvance.status
        if (v) {
            return language['STATUS_' + v.toUpperCase()]
        }
        else {
            return language['STATUS_P']
        }
    }

    getNotes(v) {
        var language = this.props.language.cashadvance.remark
        if (v) {
            return ''
        } else {
            return language.remark
        }
    }


    render() {
        var cashAdvanceHistory = this.props.cashAdvanceHistory
        var data = cashAdvanceHistory.list
        let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onCashAdTransChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main no-header" style={{ color: font2 }} >
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data}
                        />
                    </div>

                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.cashAdHisPageIndex}
                            totalRecord={Math.ceil(cashAdvanceHistory.totalCount / this.defaultPageSize)}
                            onPageChange={this.onCashAdTransPageChange.bind(this)}
                            onNextPage={this.onCashAdTransNextPage.bind(this)}
                            onPrevPage={this.onCashAdTransPrevPage.bind(this)}
                            onReloadPage={this.onCashAdTransReloadPage.bind(this)}
                        />
                    </div>

                </Body>
            </div>
        )

    }

    componentDidMount() {
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({
                columns: [
                    {
                        Header: nextProps.language.cashadvance.header.date,
                        accessor: this.accessor[0],
                        id: 'date',
                        show: true,
                        skip: false,
                        width: 120,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.advanceamount,
                        Cell: props => {
                            return Utils.currencyShowFormatter(props.original.totalLendingAmt, ",", this.lang)
                        },
                        id: 'advanceamount',
                        show: true,
                        skip: false,
                        width: 120,

                    },
                    {
                        Header: nextProps.language.cashadvance.header.advancefee,
                        id: 'advancefee',
                        Cell: props => {
                            return Utils.currencyShowFormatter(props.original.interestAccured, ",", this.lang)
                        },
                        show: true,
                        skip: false,
                        width: 120,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.processingstatus,
                        id: 'processingstatus',
                        Cell: props => {
                            return this.getStatus(props.original.status)
                        },
                        show: true,
                        skip: false,
                        width: 120,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.lastupdate,
                        accessor: this.accessor[6],
                        id: 'lastupdate',
                        show: true,
                        skip: false,
                        width: 120,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.note,
                        accessor: 'remark',
                        id: 'note',
                        Cell: props => {
                            return this.getNotes(props.original.note)
                        },
                        show: true,
                        skip: false,
                        width: 300,
                    }
                ]
            })
        }
    }

    onCashAdTransChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onCashAdTransNextPage() {
        this.cashAdHisPageIndex = parseInt(this.cashAdHisPageIndex) + 1
        this.getCashAdvanceHistoryParams['start'] = (this.cashAdHisPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.getCashAdvanceHistoryParams['page'] = this.cashAdHisPageIndex
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onCashAdTransPrevPage() {
        this.cashAdHisPageIndex = parseInt(this.cashAdHisPageIndex) - 1
        this.getCashAdvanceHistoryParams['start'] = (this.cashAdHisPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.getCashAdvanceHistoryParams['page'] = this.cashAdHisPageIndex
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onCashAdTransReloadPage() {
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }
    onCashAdTransPageChange(pageIndex) {
        this.cashAdHisPageIndex = pageIndex
        this.getCashAdvanceHistoryParams['start'] = (this.cashAdHisPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.getCashAdvanceHistoryParams['page'] = this.cashAdHisPageIndex
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

}
const mapStateToProps = (state) => {
    return {
        cashAdvanceHistory: state.cashadvance.cashAdvanceHistory,

    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getCashAdvance: (params) => {
        dispatch(actions.getCashAdvance(params))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceHistory)
