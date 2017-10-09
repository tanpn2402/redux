import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

class MatchOrderList extends Component {
    constructor(props) {
        super(props)
        this.id = 'matchOrderList'
        this.defaultPageSize = 15

        this.state = {

            orderMatchListPageIndex: 1,
            columns: [
                {
                    Header: this.props.language.cashadvance.header.id,
                    accessor: 'mvOrderID',
                    id: 'id',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.matchingdate,
                    accessor: 'tradeDate',
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.paymentdate,
                    accessor: 'cashSettleDay',
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.stock,
                    accessor: 'mvStockID',
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.volume,
                    accessor: 'mvQuantity',
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.value,
                    accessor: 'mvAmount',
                    id: 'value',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.fee,
                    accessor: 'tradingFee',
                    id: 'fee',
                    show: true,
                    skip: false,
                    width: 150,
                }
            ],
        }
    }


    render() {
        var soldOrders = this.props.SoldOrders.mvChildBeanList === undefined ? [] : this.props.SoldOrders.mvChildBeanList
        soldOrders = soldOrders === null ? [] : soldOrders
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onOrderMatchListChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header">
                        <Table
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={soldOrders.slice((this.state.orderMatchListPageIndex - 1) * 15, this.state.orderMatchListPageIndex * 15)}
                        />
                    </div>

                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.orderMatchListPageIndex}
                            totalRecord={soldOrders.length}
                            onPageChange={this.onOrderMatchListPageChange.bind(this)}
                            onNextPage={this.onOrderMatchListNextPage.bind(this)}
                            onPrevPage={this.onOrderMatchListPrevPage.bind(this)}
                            onReloadPage={this.onOrderMatchListReloadPage.bind(this)}
                        />
                    </div>

                </Body>
            </div>
        )

    }

    componentDidMount() {
        this.props.getQuerySoldOrders(this.querySoldOrdersParams)

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({
                columns: [
                    {
                        Header: nextProps.language.cashadvance.header.id,
                        accessor: 'mvOrderID',
                        id: 'id',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.matchingdate,
                        accessor: 'tradeDate',
                        id: 'matchingdate',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.paymentdate,
                        accessor: 'cashSettleDay',
                        id: 'paymentdate',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.stock,
                        accessor: 'mvStockID',
                        id: 'stock',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.volume,
                        accessor: 'mvQuantity',
                        id: 'volume',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.value,
                        accessor: 'mvAmount',
                        id: 'value',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.fee,
                        accessor: 'tradingFee',
                        id: 'fee',
                        show: true,
                        skip: false,
                        width: 150,
                    }
                ]
            })
        }
    }

    onOrderMatchListChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onOrderMatchListNextPage() {
        this.state.orderMatchListPageIndex = parseInt(this.state.orderMatchListPageIndex) + 1
        this.querySoldOrdersParams['start'] = (this.state.orderMatchListPageIndex - 1) * this.querySoldOrdersParams['limit']
        this.querySoldOrdersParams['page'] = this.state.orderMatchListPageIndex
        this.querySoldOrdersParams['key'] = (new Date()).getTime()
        this.props.getQuerySoldOrders(this.querySoldOrdersParams)
    }

    onOrderMatchListPrevPage() {
        this.state.orderMatchListPageIndex = parseInt(this.state.orderMatchListPageIndex) - 1
        this.querySoldOrdersParams['start'] = (this.state.orderMatchListPageIndex - 1) * this.querySoldOrdersParams['limit']
        this.querySoldOrdersParams['page'] = this.state.orderMatchListPageIndex
        this.querySoldOrdersParams['key'] = (new Date()).getTime()
        this.props.getQuerySoldOrders(this.querySoldOrdersParams)
    }

    onOrderMatchListReloadPage() {
        this.props.getQuerySoldOrders(this.querySoldOrdersParams)
    }
    onOrderMatchListPageChange(pageIndex) {
        this.state.orderMatchListPageIndex = pageIndex
        this.querySoldOrdersParams['start'] = (this.state.orderMatchListPageIndex - 1) * this.querySoldOrdersParams['limit']
        this.querySoldOrdersParams['page'] = this.state.orderMatchListPageIndex
        this.querySoldOrdersParams['key'] = (new Date()).getTime()
        this.props.getQuerySoldOrders(this.querySoldOrdersParams)
    }
}
const mapStateToProps = (state) => {
    return {
        SoldOrders: state.cashadvance.SoldOrders,

    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getQuerySoldOrders: (params) => {
        dispatch(actions.getQuerySoldOrders(params))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(MatchOrderList)
