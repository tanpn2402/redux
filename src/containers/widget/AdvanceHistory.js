import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import config from '../../core/config'

class AdvanceHistory extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceHistory'
        this.idParent = 'cashadvance'
        this.lang = config.cache.lang
        this.defaultPageSize = 20
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
                    accessor: this.accessor[0],
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.totalLendingAmt, ",", this.lang)
                    },
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,
                    background: props.theme.number.col

                },
                {
                    id: 'advancefee',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.interestAccured, ",", this.lang)
                    },
                    show: true,
                    skip: false,
                    width: 120,
                    background: props.theme.number.col
                },
                {
                    id: 'processingstatus',
                    Cell: props => {
                        return this.getStatus(props.original.status)
                    },
                    show: true,
                    skip: false,
                    width: 120,
                    background: props.theme.table.colText
                },
                {
                    accessor: this.accessor[6],
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    accessor: 'remark',
                    id: 'note',
                    Cell: props => {
                        return this.getNotes(props.original.note)
                    },
                    show: true,
                    skip: false,
                    width: 300,
                    background: props.theme.table.colText
                }
            ],
            filterable: false
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
        let cashAdvanceHistory = this.props.cashAdvanceHistory
        let data = cashAdvanceHistory.list

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    widgetID='advanceHistory'
                    onChangeStateColumn={this.onCashAdTransChangeStateColumn.bind(this)}
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
                        tableData={data}

                        pageIndex={this.cashAdHisPageIndex}
                        totalPage={Math.ceil(cashAdvanceHistory.totalCount / this.defaultPageSize)}
                        onPageChange={this.onCashAdTransPageChange.bind(this)}

                        searchEnable={data.length > 0}
                        searchMobileParams={[]}
                        searchDefaultValues={{}}
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
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({

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
