import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

class AdvanceHistory extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceHistory'
        this.defaultPageSize = 15

        this.state = {
            cashAdTransPageIndex: 1,
            columns: [
                {
                    Header: this.props.language.cashadvance.header.date,
                    accessor: 'creationTime',
                    id: 'date',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.advanceamount,
                    accessor: 'totalLendingAmt',
                    id: 'advanceamount',
                    show: true,
                    skip: false,
                    width: 120,

                },
                {
                    Header: this.props.language.cashadvance.header.advancefee,
                    accessor: 'interestAccured',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.processingstatus,
                    accessor: 'status',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.lastupdate,
                    accessor: 'lastApprovaltime',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                    width: 120,
                },
                {
                    Header: this.props.language.cashadvance.header.note,
                    accessor: 'remark',
                    id: 'note',
                    show: true,
                    skip: false,
                    width: 120,
                }
            ],
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


    render() {
        var cashAdvanceHistory = this.props.CashAdvanceHistory.list === undefined ? [] : this.props.CashAdvanceHistory.list
        cashAdvanceHistory = cashAdvanceHistory === null ? [] : cashAdvanceHistory
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onCashAdTransChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header">
                        <Table
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={cashAdvanceHistory.slice((this.state.cashAdTransPageIndex - 1)*6, this.state.cashAdTransPageIndex*6)}
                        />
                    </div>

                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.cashAdTransPageIndex} 
                            totalRecord={Math.ceil(cashAdvanceHistory.length / this.defaultPageSize)} 
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

    onCashAdTransChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onCashAdTransNextPage(){
        this.state.cashAdTransPageIndex = parseInt(this.state.cashAdTransPageIndex) + 1
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdTransPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdTransPageIndex
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onCashAdTransPrevPage(){
        this.state.cashAdTransPageIndex = parseInt(this.state.cashAdTransPageIndex) - 1
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdTransPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdTransPageIndex
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onCashAdTransReloadPage(){
    this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
    this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }
    onCashAdTransPageChange(pageIndex) {
        this.state.cashAdTransPageIndex = pageIndex
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdTransPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdTransPageIndex
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

}
const mapStateToProps = (state) => {
    return {
        CashAdvanceHistory: state.cashadvance.CashAdvanceHistory,

    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getCashAdvance: (params) => {
        dispatch(actions.getCashAdvance(params))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceHistory)
