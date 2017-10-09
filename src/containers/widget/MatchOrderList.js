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

class MatchOrderList extends Component {
    constructor(props) {
        super(props)
        this.id = 'matchOrderList'
        this.defaultPageSize = 15
        this.lang = config.cache.lang

        this.accessor = [
            'mvOrderID',
            'tradeDate',
            'cashSettleDay',
            'mvStockID',
            'mvQuantity',
            'mvAmount',
            'tradingFee',
            'tax',
            'advancedAmt',
            'advanceAmt',
            'advanceFee',
            'mvFormatedAmount'
        ]

        this.state = {

            orderMatchListPageIndex: 1,
            columns: [
                {
                    Header: this.props.language.cashadvance.header.id,
                    accessor: this.accessor[0],
                    id: 'id',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.matchingdate,
                    accessor: this.accessor[1],
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.paymentdate,
                    accessor: this.accessor[2],
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.stock,
                    accessor: this.accessor[3],
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.volume,
                    accessor: this.accessor[4],
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.value,
                    id: 'value',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.mvFormatedAmount, ",", this.lang)
                    },
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    Header: this.props.language.cashadvance.header.fee,
                    id: 'fee',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.tradingFee, ",", this.lang)
                    },
                    show: true,
                    skip: false,
                    width: 150,
                }
            ],
        }
    }


    render() {
        var soldOrders = this.props.soldOrders
        var data = soldOrders.mvChildBeanList
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
                            data={data.slice(
                                (this.state.orderMatchListPageIndex - 1) * this.defaultPageSize, 
                                this.state.orderMatchListPageIndex * this.defaultPageSize)}
                        />
                    </div>

                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.orderMatchListPageIndex}
                            totalRecord={Math.ceil( soldOrders.totalCount / this.defaultPageSize )}
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
                        accessor: this.accessor[0],
                        id: 'id',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.matchingdate,
                        accessor: this.accessor[1],
                        id: 'matchingdate',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.paymentdate,
                        accessor: this.accessor[2],
                        id: 'paymentdate',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.stock,
                        accessor: this.accessor[3],
                        id: 'stock',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.volume,
                        accessor: this.accessor[4],
                        id: 'volume',
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.value,
                        id: 'value',
                        Cell: props => {
                            return Utils.currencyShowFormatter(props.original.mvFormatedAmount, ",", this.lang)
                        },
                        show: true,
                        skip: false,
                        width: 150,
                    },
                    {
                        Header: nextProps.language.cashadvance.header.fee,
                        id: 'fee',
                        Cell: props => {
                            return Utils.currencyShowFormatter(props.original.tradingFee, ",", this.lang)
                        },
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
        this.setState({ orderMatchListPageIndex: this.state.orderMatchListPageIndex + 1 });
    }

    onOrderMatchListPrevPage() {
        this.setState({ orderMatchListPageIndex: this.state.orderMatchListPageIndex - 1  });
    }

    onOrderMatchListReloadPage() {
        
    }
    onOrderMatchListPageChange(pageIndex) {
        this.setState({ orderMatchListPageIndex: pageIndex });
    }
}
const mapStateToProps = (state) => {
    return {
        soldOrders: state.cashadvance.soldOrders,

    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getQuerySoldOrders: (params) => {
        dispatch(actions.getQuerySoldOrders(params))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(MatchOrderList)
