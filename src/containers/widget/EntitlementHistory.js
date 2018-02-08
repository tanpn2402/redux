import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import moment from 'moment'
import config from '../../core/config'

class EntitlementHistory extends Component {
    constructor(props) {
        super(props)

        this.id = 'entitlementHistory'
        this.idParent = 'entitlement'
        this.state = {
            pageIndex: 1,
            filterable: false,
            columns: [
                {
                    id: 'registerdate',
                    accessor: 'createTime',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'stock',
                    accessor: 'tradeStockCode',
                    width: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'volume',
                    accessor: 'resultQty',
                    width: 100,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },
                {
                    id: 'actionprice',
                    accessor: 'price',
                    width: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: 'amount',
                    accessor: 'appliedAmt',
                    width: 100,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },
                {
                    id: 'paiddate',
                    width: 100,
                    accessor: 'comfirmedDate',
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Cell: props => { return this.getEntitlementStatus(this.props.language, props.original.status) },
                    width: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                }]
        }
        this.defaultPageSize = 15
        this.paramshis = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ENTITLEMENT',
            mvStockId: '',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            key: (new Date()).getTime(),
            start: '0',
            limit: '15',
        }
    }

    getEntitlementStatus(language, status) {
        let stt = language.entitlement.status['STATUS_' + status.toUpperCase()]
        return stt === undefined ? status.toUpperCase() : stt
    }


    render() {
        let stockList = this.props.stockList == undefined ? config.cache.stockList : this.props.stockList.lenght
        let entitlementHistory = this.props.entitlementHistory

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    widgetID= 'entitlementHistory'
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

                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        pageSize={this.defaultPageSize}
                        tableData={entitlementHistory.historyList}

                        pageIndex={this.state.pageIndex}
                        totalPage={Math.ceil(entitlementHistory.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        onSearch={this.onSearch.bind(this)}
                        searchActions={[]}
                        searchData={{stockList: stockList}}
                        searchParams={['mvStockId', 'mvStartDate', 'mvEndDate']}
                        searchEnable={true}
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
        this.props.getHistorylist(this.paramshis)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({

            })
        }
    }

    onSearch(param) {
        this.state.pageIndex1 = 1

        this.paramshis['start'] = 0
        this.paramshis['page'] = 1
        this.paramshis['mvStockId'] = param['mvStockId']
        this.paramshis['mvStartDate'] = param['mvStartDate']
        this.paramshis['mvEndDate'] = param['mvEndDate']
        this.paramshis['key'] = new Date().getTime()

        this.props.getHistorylist(this.paramshis)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onPageChange(pageIndex) {
        this.state.pageIndex3 = parseInt(pageIndex)
        this.paramshis['page'] = this.state.pageIndex3
        this.paramshis['start'] = (this.state.pageIndex3 - 1) * this.paramshis['limit']
        this.paramshis['key'] = (new Date()).getTime()

        this.props.getHistorylist(this.paramshis)
    }

}
const mapStateToProps = (state) => {
    return {
        entitlementHistory: state.entitlement.entitlementHistory,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getHistorylist: (params) => {
        dispatch(actions.getEntitlementHistorylist(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitlementHistory)
