import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.id = "portfolio"
        this.defaultPageSize = 15

        this.params = {
            mvLastAction: 'AccountInfo',
            mvChildLastAction: 'AccountInfo',
            key: (new Date()).getTime(),
        }

        this.state = {
            pageIndex: 1,
            columns: [
                {
                    columns: [
                        // {
                        //     Header: 'Ord',
                        //     accessor: 'STT',
                        //     maxWidth: 50
                        // },
                        {
                            Header: this.props.language.portfolio.header.mvStockID,
                            accessor: 'mvStockID',
                            maxWidth: 60,
                            Aggregated: () => {
                                return null
                            }
                        }
                    ]
                },
                {
                    Header: ' ',
                    columns: [
                        {
                            Header: this.props.language.portfolio.header.mvMaketID,
                            accessor: 'mvMarketID',
                            maxWidth: 60,
                            Pivot: (cellInfo) => {
                                return <span> {cellInfo.row._pivotVal} </span>
                            }
                        }
                    ]
                },
                {
                    Header: 'Volume',
                    headerClassName: 'volume',
                    columns: [{
                        Header: this.props.language.portfolio.header.mvTradableQty,
                        accessor: 'mvTradableQty',
                    }, {
                        Header: this.props.language.portfolio.header.mvTSettled,
                        accessor: 'mvTSettled'
                    }, {
                        Header: this.props.language.portfolio.header.mvHoldingAmt,
                        accessor: 'mvHoldingAmt'
                    }, {
                        Header: this.props.language.portfolio.header.mvQueuingBuy,
                        accessor: 'mvQueuingBuy'
                    }, {
                        Header: this.props.language.portfolio.header.mvTT1UnsettleBuy,
                        accessor: 'mvTT1UnsettleBuy'
                    }, {
                        Header: this.props.language.portfolio.header.mvTDueBuy,
                        accessor: 'mvTDueBuy'
                    }, {
                        Header: this.props.language.portfolio.header.mvTMortgageQty,
                        accessor: 'mvTMortgageQty'
                    }, {
                        Header: this.props.language.portfolio.header.mvTManualHold,
                        accessor: 'mvTManualHold'
                    }, {
                        Header: this.props.language.portfolio.header.mvTEntitlementQty,
                        accessor: 'mvTEntitlementQty'
                    }, {
                        Header: this.props.language.portfolio.header.mvTAwaitingTraceCert,
                        accessor: 'mvTAwaitingTraceCert'
                    }, {
                        Header: this.props.language.portfolio.header.mvTAwaitingDepositCert,
                        accessor: 'mvTAwaitingDepositCert'
                    }, {
                        Header: this.props.language.portfolio.header.mvTAwaitingWithdrawalCert,
                        accessor: 'mvTAwaitingWithdrawalCert'
                    }]
                },
                {
                    Header: 'Price',
                    headerClassName: 'price',
                    columns: [{
                        Header: this.props.language.portfolio.header.mvAvgPrice,
                        accessor: 'mvAvgPrice'
                    }, {
                        Header: this.props.language.portfolio.header.mvMarketPrice,
                        accessor: 'mvMarketPrice'
                    }]
                },
                {
                    Header: 'Pofolio assessment',
                    headerClassName: 'rate',
                    columns: [{
                        Header: this.props.language.portfolio.header.mvWAC,
                        accessor: 'mvWAC'
                    }, {
                        Header: this.props.language.portfolio.header.mvMarketValue,
                        accessor: 'mvMarketValue'
                    }, {
                        Header: this.props.language.portfolio.header.mvPL,
                        accessor: 'mvPL'
                    }, {
                        Header: this.props.language.portfolio.header.mvPLPercent,
                        accessor: 'mvPLPercent'
                    }]
                },
                {
                    Header: '(%) Margin',
                    headerClassName: 'deposit',
                    columns: [{
                        Header: this.props.language.portfolio.header.mvMarginPercentage,
                        accessor: 'mvMarginPercentage'
                    }, {
                        Header: this.props.language.portfolio.header.mvMartginValue,
                        accessor: 'mvMartginValue'
                    }, {
                        Header: this.props.language.portfolio.header.maintenancePercentage,
                        accessor: 'maintenancePercentage'
                    }, {
                        Header: this.props.language.portfolio.header.maintenanceValue,
                        accessor: 'maintenanceValue'
                    }]
                }]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    columns: [
                        // {
                        //     Header: 'Ord',
                        //     accessor: 'STT',
                        //     maxWidth: 50
                        // },
                        {
                            Header: nextProps.language.portfolio.header.mvStockID,
                            accessor: 'mvStockID',
                            maxWidth: 60,
                            Aggregated: () => {
                                return null;
                            }
                        }
                    ]
                },
                {
                    Header: ' ',
                    columns: [
                        {
                            Header: nextProps.language.portfolio.header.mvMaketID,
                            accessor: 'mvMarketID',
                            maxWidth: 60,
                            Pivot: (cellInfo) => {
                                return <span> {cellInfo.row._pivotVal} </span>
                            }
                        }
                    ]
                },
                {
                    Header: 'Volume',
                    headerClassName: 'volume',
                    columns: [{
                        Header: nextProps.language.portfolio.header.mvTradableQty,
                        accessor: 'mvTradableQty',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTSettled,
                        accessor: 'mvTSettled',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvHoldingAmt,
                        accessor: 'mvHoldingAmt', //not sure
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvQueuingBuy,
                        accessor: 'mvQueuingBuy', //not sure
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTT1UnsettleBuy,
                        accessor: 'mvTT1UnsettleBuy', // not sure
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTDueBuy,
                        accessor: 'mvTDueBuy',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTMortgageQty,
                        accessor: 'mvTMortgageQty',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTManualHold,
                        accessor: 'mvTManualHold',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTEntitlementQty,
                        accessor: 'mvTEntitlementQty',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTAwaitingTraceCert,
                        accessor: 'mvTAwaitingTraceCert',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTAwaitingDepositCert,
                        accessor: 'mvTAwaitingDepositCert',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvTAwaitingWithdrawalCert,
                        accessor: 'mvTAwaitingWithdrawalCert',
                        Aggregated: () => {
                            return null
                        }
                    }]
                },
                {
                    Header: 'Price',
                    headerClassName: 'price',
                    columns: [{
                        Header: nextProps.language.portfolio.header.mvAvgPrice,
                        accessor: 'mvAvgPrice',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvMarketPrice,
                        accessor: 'mvMarketPrice',
                        Aggregated: () => {
                            return null
                        }
                    }]
                },
                {
                    Header: 'Pofolio assessment',
                    headerClassName: 'rate',
                    columns: [{
                        Header: nextProps.language.portfolio.header.mvWAC,
                        accessor: 'mvWAC',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvMarketValue,
                        accessor: 'mvMarketValue',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvPL,
                        accessor: 'mvPL',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvPLPercent,
                        accessor: 'mvPLPercent',
                        Aggregated: () => {
                            return null
                        }
                    }]
                },
                {
                    Header: '(%) Margin',
                    headerClassName: 'deposit',
                    columns: [{
                        Header: nextProps.language.portfolio.header.mvMarginPercentage,
                        accessor: 'mvMarginPercentage',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.mvMartginValue,
                        accessor: 'mvMartginValue',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.maintenancePercentage,
                        accessor: 'maintenancePercentage',
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        Header: nextProps.language.portfolio.header.maintenanceValue,
                        accessor: 'maintenanceValue',
                        Aggregated: () => {
                            return null
                        }
                    }]
                }]
        })
    }

    render() {
        var data = this.props.data.mvPortfolioBeanList
        let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main no-header" style={{ color: font2 }}>
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data.slice((this.state.pageIndex - 1) * this.defaultPageSize, this.state.pageIndex * this.defaultPageSize)}
                            pivot={['mvMarketID']}
                        />
                    </div>

                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(data.length / this.defaultPageSize)}
                            onPageChange={this.onPageChange.bind(this)}
                            onNextPage={this.onNextPage.bind(this)}
                            onPrevPage={this.onPrevPage.bind(this)}
                        />
                    </div>

                </Body>
            </div>
        )

    }


    componentDidMount() {
        this.props.getPorfolio(this.params, !this.props.reload);
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        })
    }

    onPageChange(pageIndex) {
        this.setState({ pageIndex: pageIndex });
    }

    onNextPage() {
        this.setState({ pageIndex: parseInt(this.state.pageIndex) + 1 });

    }

    onPrevPage() {
        this.setState({ pageIndex: parseInt(this.state.pageIndex) - 1 });
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.porfolio.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getPorfolio: (params) => {
        dispatch(actions.getPorfolio(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)