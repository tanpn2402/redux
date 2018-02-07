import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'

class AdBankHistory extends Component {
    constructor(props) {
        super(props)
        this.id = 'advanceBankHistory'
        this.idParent = 'cashadvancebank'
        this.defaultPageSize = 20

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
                    accessor: 'date',
                    id: 'date',
                    width: 120,
                    show: true,
                    skip: false,
                },
                {
                    accessor: 'advanceamount',
                    id: 'advanceamount',
                    width: 100,
                    show: true,
                    skip: false,
                    background: props.theme.number.col
                },
                {
                    accessor: 'advancefee',
                    id: 'advancefee',
                    width: 120,
                    show: true,
                    skip: false,
                    background: props.theme.number.col
                },
                {
                    accessor: 'processingstatus',
                    id: 'processingstatus',
                    width: 200,
                    show: true,
                    skip: false,
                    background: props.theme.table.colText
                },
                {
                    accessor: 'lastupdate',
                    id: 'lastupdate',
                    width: 150,
                    show: true,
                    skip: false,
                },
                {
                    accessor: 'note',
                    id: 'note',
                    width: 220,
                    show: true,
                    skip: false,
                    background: props.theme.table.colText
                }
            ],
            filterable: false
        }
    }


    render() {
        let cashAdvanceHistory = this.props.cashAdvanceHistory
        let data = cashAdvanceHistory.list

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    widgetID='advanceBankHistory'
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
                        tableData={data}

                        pageIndex={this.state.cashAdvHistoryPageIndex}
                        totalPage={Math.ceil(cashAdvanceHistory.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        searchEnable={false}
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

        }
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
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
