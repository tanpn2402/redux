import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import moment from 'moment'
import config from '../../core/config'

class EntitlementHistory extends Component {
    constructor(props) {
        super(props)

        this.id = 'entitlementHistory'
        this.state = {
            pageIndex: 1,
            filterable: false,
            columns: [
                {
                    id: 'createTime',
                    Header: this.props.language.entitlement.header.registerdate,
                    accessor: 'createTime',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'tradeStockCode',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'tradeStockCode',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'resultQty',
                    Header: this.props.language.entitlement.header.volume,
                    accessor: 'resultQty',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.entitlement.header.actionprice,
                    accessor: 'price',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'appliedAmt',
                    Header: this.props.language.entitlement.header.amount,
                    accessor: 'appliedAmt',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'comfirmedDate',
                    Header: this.props.language.entitlement.header.paiddate,
                    width: 100,
                    accessor: 'comfirmedDate',
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: this.props.language.entitlement.header.status,
                    Cell: props => { return this.getEntitlementStatus(this.props.language, props.original.status) },
                    width: 200,
                    skip: false,
                    show: true,
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
        var stockList = this.props.stockList
        var entitlementHistory = this.props.entitlementHistory
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
                    <div className="table-main">
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            columns={this.state.columns}
                            filterable={this.state.filterable}
                            defaultPageSize={this.defaultPageSize}
                            data={entitlementHistory.historyList} />
                    </div>
                    <div className="table-header" style={tableheader}>
                        <SearchBar
                            key={this.id + '-search'}
                            id={this.id + '-search'}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{ stockList: stockList }}
                            param={['mvStockId', 'mvStartDate', 'mvEndDate']} />
                    </div>
                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(entitlementHistory.totalCount / this.defaultPageSize)}
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

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        this.props.getHistorylist(this.params)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({
                columns: [
                    {
                        id: 'createTime',
                        Header: nextProps.language.entitlement.header.registerdate,
                        accessor: 'createTime',
                        width: 200,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'tradeStockCode',
                        Header: nextProps.language.entitlement.header.stock,
                        accessor: 'tradeStockCode',
                        width: 100,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'resultQty',
                        Header: nextProps.language.entitlement.header.volume,
                        accessor: 'resultQty',
                        width: 100,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'price',
                        Header: nextProps.language.entitlement.header.actionprice,
                        accessor: 'price',
                        width: 100,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'appliedAmt',
                        Header: nextProps.language.entitlement.header.amount,
                        accessor: 'appliedAmt',
                        width: 100,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'comfirmedDate',
                        Header: nextProps.language.entitlement.header.paiddate,
                        width: 100,
                        accessor: 'comfirmedDate',
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'status',
                        Header: nextProps.language.entitlement.header.status,
                        Cell: props => { return this.getEntitlementStatus(nextProps.language, props.original.status) },
                        width: 200,
                        skip: false,
                        show: true,
                    }
                ]
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

    onNextPage() {
        this.state.pageIndex3 = parseInt(this.state.pageIndex3) + 1
        this.paramshis['page'] = this.state.pageIndex3
        this.paramshis['start'] = (this.state.pageIndex3 - 1) * this.paramshis['limit']
        this.paramshis['key'] = (new Date()).getTime()

        this.props.getHistorylist(this.paramshis)
    }

    onPrevPage() {
        this.state.pageIndex3 = parseInt(this.state.pageIndex3) - 1
        this.paramshis['page'] = this.state.pageIndex3
        this.paramshis['start'] = (this.state.pageIndex3 - 1) * this.paramshis['limit']
        this.paramshis['key'] = (new Date()).getTime()

        this.props.getHistorylist(this.paramshis)
    }

    onReloadPage() {
        this.paramshis['key'] = (new Date()).getTime()

        this.props.getHistorylist(this.paramshis)
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
