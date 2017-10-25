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
                    id: '',
                    Header: '',
                    columns: [
                        // {
                        //     Header: 'Ord',
                        //     accessor: 'STT',
                        //     maxWidth: 50
                        // },
                        {
                            id: 'mvStockID',
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
                    id: '',
                    Header: '',
                    columns: [
                        {
                            id: 'mvMarketID',
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
                    id: 'mvVolume',
                    Header: 'Volume',
                    headerClassName: 'volume',
                    columns: [{
                        id: 'mvTradableQty',
                        Header: this.props.language.portfolio.header.mvTradableQty,
                        accessor: 'mvTradableQty',
                    },
                    {
                        id: 'mvTSettled',
                        Header: this.props.language.portfolio.header.mvTSettled,
                        accessor: 'mvTSettled'
                    },
                    {
                        id: 'mvHoldingAmt',
                        Header: this.props.language.portfolio.header.mvHoldingAmt,
                        accessor: 'mvHoldingAmt'
                    },
                    {
                        id: 'mvQueuingBuy',
                        Header: this.props.language.portfolio.header.mvQueuingBuy,
                        accessor: 'mvQueuingBuy'
                    },
                    {
                        id: 'mvTT1UnsettleBuy',
                        Header: this.props.language.portfolio.header.mvTT1UnsettleBuy,
                        accessor: 'mvTT1UnsettleBuy'
                    },
                    {
                        id: 'mvTDueBuy',
                        Header: this.props.language.portfolio.header.mvTDueBuy,
                        accessor: 'mvTDueBuy'
                    },
                    {
                        id: 'mvTMortgageQty',
                        Header: this.props.language.portfolio.header.mvTMortgageQty,
                        accessor: 'mvTMortgageQty'
                    },
                    {
                        id: 'mvTManualHold',
                        Header: this.props.language.portfolio.header.mvTManualHold,
                        accessor: 'mvTManualHold'
                    },
                    {
                        id: 'mvTEntitlementQty',
                        Header: this.props.language.portfolio.header.mvTEntitlementQty,
                        accessor: 'mvTEntitlementQty'
                    },
                    {
                        id: 'mvTAwaitingTraceCert',
                        Header: this.props.language.portfolio.header.mvTAwaitingTraceCert,
                        accessor: 'mvTAwaitingTraceCert'
                    },
                    {
                        id: 'mvTAwaitingDepositCert',
                        Header: this.props.language.portfolio.header.mvTAwaitingDepositCert,
                        accessor: 'mvTAwaitingDepositCert'
                    },
                    {
                        id: 'mvTAwaitingWithdrawalCert',
                        Header: this.props.language.portfolio.header.mvTAwaitingWithdrawalCert,
                        accessor: 'mvTAwaitingWithdrawalCert'
                    }]
                },
                {
                    id: 'mvPrice',
                    Header: 'Price',
                    headerClassName: 'price',
                    columns: [{
                        id: 'mvAvgPrice',
                        Header: this.props.language.portfolio.header.mvAvgPrice,
                        accessor: 'mvAvgPrice'
                    },
                    {
                        id: 'mvMarketPrice',
                        Header: this.props.language.portfolio.header.mvMarketPrice,
                        accessor: 'mvMarketPrice'
                    }]
                },
                {
                    id: 'mvPortfolioAssessment',
                    Header: 'Portfolio assessment',
                    headerClassName: 'rate',
                    columns: [{
                        id: 'mvWAC',
                        Header: this.props.language.portfolio.header.mvWAC,
                        accessor: 'mvWAC'
                    },
                    {
                        id: 'mvMarketValue',
                        Header: this.props.language.portfolio.header.mvMarketValue,
                        accessor: 'mvMarketValue'
                    },
                    {
                        id: 'mvPL',
                        Header: this.props.language.portfolio.header.mvPL,
                        accessor: 'mvPL'
                    },
                    {
                        id: 'mvPLPercent',
                        Header: this.props.language.portfolio.header.mvPLPercent,
                        accessor: 'mvPLPercent'
                    }]
                },
                {
                    id: 'mvMargin',
                    Header: '(%) Margin',
                    headerClassName: 'deposit',
                    columns: [{
                        id: 'mvMarginPercentage',
                        Header: this.props.language.portfolio.header.mvMarginPercentage,
                        accessor: 'mvMarginPercentage'
                    },
                    {
                        id: 'mvMartginValue',
                        Header: this.props.language.portfolio.header.mvMartginValue,
                        accessor: 'mvMartginValue'
                    },
                    {
                        id: 'maintenancePercentage',
                        Header: this.props.language.portfolio.header.maintenancePercentage,
                        accessor: 'maintenancePercentage'
                    },
                    {
                        id: 'maintenanceValue',
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
                    id: '',
                    Header: '',
                    skip: false,
                    columns: [
                        // {
                        //     Header: 'Ord',
                        //     accessor: 'STT',
                        //     maxWidth: 50
                        // },
                        {
                            id: 'mvStockID',
                            Header: nextProps.language.portfolio.header.mvStockID,
                            accessor: 'mvStockID',
                            skip: false,
                            show: true,
                            maxWidth: 60,
                            Aggregated: () => {
                                return null;
                            }
                        }
                    ]
                },
                {
                    id: '',
                    Header: ' ',
                    skip: false,
                    columns: [
                        {
                            id: 'mvMarketID',
                            Header: nextProps.language.portfolio.header.mvMaketID,
                            accessor: 'mvMarketID',
                            skip: false,
                            show: true,
                            maxWidth: 60,
                            Pivot: (cellInfo) => {
                                return <span> {cellInfo.row._pivotVal} </span>
                            }
                        }
                    ]
                },
                {
                    id: 'mvVolume',
                    Header: 'Volume',
                    headerClassName: 'volume',
                    skip: false,
                    columns: [{
                        id: 'mvTradableQty',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTradableQty,
                        accessor: 'mvTradableQty',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTSettled',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTSettled,
                        accessor: 'mvTSettled',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvHoldingAmt',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvHoldingAmt,
                        accessor: 'mvHoldingAmt', //not sure
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvQueuingBuy',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvQueuingBuy,
                        accessor: 'mvQueuingBuy', //not sure
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTT1UnsettleBuy',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTT1UnsettleBuy,
                        accessor: 'mvTT1UnsettleBuy', // not sure
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTDueBuy',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTDueBuy,
                        accessor: 'mvTDueBuy',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTMortgageQty',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTMortgageQty,
                        accessor: 'mvTMortgageQty',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTManualHold',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTManualHold,
                        accessor: 'mvTManualHold',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTEntitlementQty',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTEntitlementQty,
                        accessor: 'mvTEntitlementQty',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTAwaitingTraceCert',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTAwaitingTraceCert,
                        accessor: 'mvTAwaitingTraceCert',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTAwaitingDepositCert',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTAwaitingDepositCert,
                        accessor: 'mvTAwaitingDepositCert',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTAwaitingWithdrawalCert',
                        parent: 'mvVolume',
                        Header: nextProps.language.portfolio.header.mvTAwaitingWithdrawalCert,
                        accessor: 'mvTAwaitingWithdrawalCert',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }]
                },
                {
                    id: 'mvPrice',
                    Header: 'Price',
                    headerClassName: 'price',
                    skip: false,
                    columns: [{
                        id: 'mvAvgPrice',
                        parent: 'mvPrice',
                        Header: nextProps.language.portfolio.header.mvAvgPrice,
                        accessor: 'mvAvgPrice',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvMarketPrice',
                        parent: 'mvPrice',
                        Header: nextProps.language.portfolio.header.mvMarketPrice,
                        accessor: 'mvMarketPrice',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }]
                },
                {
                    id: 'PortfolioAssessment',
                    Header: 'Portfolio assessment',
                    headerClassName: 'rate',
                    skip: false,
                    columns: [{
                        id: 'mvWAC',
                        parent: 'PortfolioAssessment',
                        Header: nextProps.language.portfolio.header.mvWAC,
                        accessor: 'mvWAC',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvMarketValue',
                        parent: 'PortfolioAssessment',
                        Header: nextProps.language.portfolio.header.mvMarketValue,
                        accessor: 'mvMarketValue',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvPL',
                        parent: 'PortfolioAssessment',
                        Header: nextProps.language.portfolio.header.mvPL,
                        accessor: 'mvPL',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvPLPercent',
                        parent: 'PortfolioAssessment',
                        Header: nextProps.language.portfolio.header.mvPLPercent,
                        accessor: 'mvPLPercent',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }]
                },
                {
                    id: 'mvMargin',
                    Header: '(%) Margin',
                    headerClassName: 'deposit',
                    skip: false,
                    columns: [{
                        id: 'mvMarginPercentage',
                        parent: 'mvMargin',
                        Header: nextProps.language.portfolio.header.mvMarginPercentage,
                        accessor: 'mvMarginPercentage',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvMartginValue',
                        parent: 'mvMargin',
                        Header: nextProps.language.portfolio.header.mvMartginValue,
                        accessor: 'mvMartginValue',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'maintenancePercentage',
                        parent: 'mvMargin',
                        Header: nextProps.language.portfolio.header.maintenancePercentage,
                        accessor: 'maintenancePercentage',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'maintenanceValue',
                        parent: 'mvMargin',
                        Header: nextProps.language.portfolio.header.maintenanceValue,
                        accessor: 'maintenanceValue',
                        skip: false,
                        show: true,
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
                <Title language={this.props.language} theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
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
        let newCols = this.state.columns.map(parentCol => {
            if (parentCol.columns !== undefined) {
                let cols = parentCol.columns.map(column => {
                    if (column.id == id) {
                        return Object.assign({}, column, { show: !column.show })
                    } else {
                        return column
                    }
                })
                return Object.assign({}, parentCol, { columns: cols })
            } else {
                if (parentCol.id == id) {
                    return Object.assign({}, parentCol, { show: !parentCol.show })
                } else {
                    return parentCol
                }
            }
        })
        this.setState({
            columns: newCols
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