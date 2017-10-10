import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

class AdBankHistory extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceBankHistory'
        this.defaultPageSize = 15

        this.getCashAdvanceHistoryParams = {
            key: (new Date()).getTime(),
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ADVANCEPAYMENT',
            queryBank: true,
            start: '0',
            limit: this.defaultPageSize,
            page: '1'
        }

        this.state = {
            columns: [
                {
                    Header: this.props.language.cashadvancebank.header.date,
                    accessor: 'date',
                    id: 'date',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.advanceamount,
                    accessor: 'advanceamount',
                    id: 'advanceamount',
                    show: true,
                    skip: false,

                },
                {
                    Header: this.props.language.cashadvancebank.header.advancefee,
                    accessor: 'advancefee',
                    id: 'advancefee',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.processingstatus,
                    accessor: 'processingstatus',
                    id: 'processingstatus',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.lastupdate,
                    accessor: 'lastupdate',
                    id: 'lastupdate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.note,
                    accessor: 'note',
                    id: 'note',
                    show: true,
                    skip: false,
                }
            ],
        }
    }


    render() {
        var cashAdvanceHistory = this.props.cashAdvanceHistory
        let font2 = this.props.theme.font2 == undefined? 'black':this.props.theme.font2.color  
        let tablefooter = this.props.theme.table == undefined? undefined:this.props.theme.table.tablefooter        
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header" style={{color: font2}} >
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={cashAdvanceHistory.list}
                        />
                    </div>

                    <div className="table-footer" style={tablefooter}>
                        <Pagination
                            pageIndex={this.state.cashAdvHistoryPageIndex}
                            totalRecord={Math.ceil(cashAdvanceHistory.totalCount / this.defaultPageSize)}
                            onPageChange={this.onPageChange.bind(this)}
                            onNextPage={this.onNextPage.bind(this)}
                            onPrevPage={this.onPrevPage.bind(this)}
                            onReloadPage={this.onReloadPage.bind(this)}
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
                        Header: nextProps.language.cashadvancebank.header.date,
                        accessor: 'date',
                        id: 'date',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.advanceamount,
                        accessor: 'advanceamount',
                        id: 'advanceamount',
                        show: true,
                        skip: false,

                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.advancefee,
                        accessor: 'advancefee',
                        id: 'advancefee',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.processingstatus,
                        accessor: 'processingstatus',
                        id: 'processingstatus',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.lastupdate,
                        accessor: 'lastupdate',
                        id: 'lastupdate',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.note,
                        accessor: 'note',
                        id: 'note',
                        show: true,
                        skip: false,
                    }
                ]
            })
        }
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage() {
        this.state.cashAdvHistoryPageIndex = parseInt(this.state.cashAdvHistoryPageIndex) + 1
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdvHistoryPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdvHistoryPageIndex
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()

        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onPrevPage() {
        this.state.cashAdvHistoryPageIndex = parseInt(this.state.cashAdvHistoryPageIndex) + 1
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdvHistoryPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdvHistoryPageIndex
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()

        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onReloadPage() {
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()
        this.props.getCashAdvance(this.getCashAdvanceHistoryParams)
    }

    onPageChange(pageIndex) {
        this.state.cashAdvHistoryPageIndex = parseInt(pageIndex)
        this.getCashAdvanceHistoryParams['start'] = (this.state.cashAdvHistoryPageIndex - 1) * this.getCashAdvanceHistoryParams['limit']
        this.getCashAdvanceHistoryParams['page'] = this.state.cashAdvHistoryPageIndex
        this.getCashAdvanceHistoryParams['key'] = (new Date()).getTime()

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
        // getCashAdvance function in action/cashadvance.js
        dispatch(actions.getCashAdvance(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AdBankHistory)
