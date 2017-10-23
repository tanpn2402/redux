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
        this.globalLoad = false;
        
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

    shouldComponentUpdate (nextProps, nextState){
        // return a boolean value
        if (this.globalLoad != nextProps.load){
			this.globalLoad = nextProps.load
            if (nextProps.loadWidgetID === this.id) {
                console.log(nextProps.loadWidgetID == this.id)
                return true
            }else {
                return false
            }
        }
        
        return true
    }

    render() {
        console.log("Render ", this.id)
        var soldOrders = this.props.soldOrders
        var data = soldOrders.mvChildBeanList
        let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title widgetID={this.id} theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onOrderMatchListChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main no-header" style={{ color: font2 }} >
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data.slice(
                                (this.state.orderMatchListPageIndex - 1) * this.defaultPageSize,
                                this.state.orderMatchListPageIndex * this.defaultPageSize)}
                        />
                    </div>

                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.state.orderMatchListPageIndex}
                            totalRecord={Math.ceil(soldOrders.totalCount / this.defaultPageSize)}
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
        load: state.menuSelected.load,
        loadWidgetID: state.menuSelected.loadWidgetID,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getQuerySoldOrders: (params) => {
        dispatch(actions.getQuerySoldOrders(params))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(MatchOrderList)
