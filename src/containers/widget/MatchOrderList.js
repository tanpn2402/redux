import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import config from '../../core/config'

class MatchOrderList extends Component {
    constructor(props) {
        super(props)
        this.id = 'matchOrderList'
        this.idParent = 'cashadvance'
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
                    accessor: this.accessor[0],
                    id: 'id',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    accessor: this.accessor[1],
                    id: 'matchingdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    accessor: this.accessor[2],
                    id: 'paymentdate',
                    show: true,
                    skip: false,
                    width: 150,
                },
                {
                    accessor: this.accessor[3],
                    id: 'stock',
                    show: true,
                    skip: false,
                    width: 60,
                    background: props.theme.table.colText
                },
                {
                    accessor: this.accessor[4],
                    id: 'volume',
                    show: true,
                    skip: false,
                    width: 150,
                    background: props.theme.number.col
                },
                {
                    id: 'value',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.mvFormatedAmount, ",", this.lang)
                    },
                    show: true,
                    skip: false,
                    width: 150,
                    background: props.theme.number.col
                },
                {
                    id: 'fee',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.tradingFee, ",", this.lang)
                    },
                    show: true,
                    skip: false,
                    width: 150,
                    background: props.theme.number.col
                }
            ],
            filterable: false
        }
    }


    render() {
        let soldOrders = this.props.soldOrders
        let data = soldOrders.mvChildBeanList.slice((this.state.orderMatchListPageIndex - 1) * this.defaultPageSize,
            this.state.orderMatchListPageIndex * this.defaultPageSize)
        
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onOrderMatchListChangeStateColumn.bind(this)}
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

                        pageIndex={this.state.orderMatchListPageIndex}
                        totalPage={Math.ceil(soldOrders.totalCount / this.defaultPageSize)}
                        onPageChange={this.onOrderMatchListPageChange.bind(this)}

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
        this.props.getQuerySoldOrders(this.querySoldOrdersParams)

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({

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
        this.setState({ orderMatchListPageIndex: this.state.orderMatchListPageIndex - 1 });
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
