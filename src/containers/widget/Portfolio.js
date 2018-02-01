import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

const images = Utils.importAll(require.context('../../assets/images/flags', false, /\.(png|jpe?g|svg)$/))

const { Contants } = require("../../core/constants")
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
                    skip: false,
                    columns: [
                        {
                            id: 'mvStockID',
                            accessor: 'mvStockID',
                            skip: false,
                            show: true,
                            width: 70,
                            Aggregated: () => {
                                return null
                            },
                            background: props.theme.table.colText
                        },
                        {
                            id: 'mvStockName',
                            accessor: 'mvStockName',
                            skip: false,
                            show: true,
                            width: 250,
                            Aggregated: () => {
                                return null
                            },
                            background: props.theme.table.colText,
                            mobile: false
                        }
                    ]
                },
                {
                    id: ' ',
                    Header: ' ',
                    skip: false,
                    columns: [
                        {
                            id: 'mvMarketID',
                            accessor: 'mvMarketID',
                            skip: false,
                            show: true,
                            width: 60,
                            Pivot: (cellInfo) => {
                                return <span> {cellInfo.row._pivotVal} </span>
                            },
                            mobile: false,
                        }
                    ]
                },
                {
                    id: 'mvVolume',
                    headerClassName: 'volume',
                    skip: false,
                    columns: [{
                        id: 'mvTradableQty',
                        parent: 'mvVolume',
                        accessor: 'mvTradableQty',
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        style: {textAlign: "right"}
                    }, {
                        id: 'mvTSettled',
                        parent: 'mvVolume',
                        accessor: 'mvTSettled',
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 65,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber
                    }, {
                        id: 'mvHoldingAmt',
                        parent: 'mvVolume',
                        accessor: 'mvHoldingAmt', //not sure
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 105,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvQueuingBuy',
                        parent: 'mvVolume',
                        accessor: 'mvQueuingBuy', //not sure
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvTT1UnsettleBuy',
                        parent: 'mvVolume',
                        accessor: 'mvTT1UnsettleBuy', // not sure
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvTDueBuy',
                        parent: 'mvVolume',
                        accessor: 'mvTDueBuy',
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvTMortgageQty',
                        parent: 'mvVolume',
                        accessor: 'mvTMortgageQty',
                        skip: false,
                        show: true,
                        width: 70,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvTManualHold',
                        parent: 'mvVolume',
                        accessor: 'mvTManualHold',
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                    }, {
                        id: 'mvTEntitlementQty',
                        parent: 'mvVolume',
                        accessor: 'mvTEntitlementQty',
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 110,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvTAwaitingTraceCert',
                        parent: 'mvVolume',
                        accessor: 'mvTAwaitingTraceCert',
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 90,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvTAwaitingDepositCert',
                        parent: 'mvVolume',
                        accessor: 'mvTAwaitingDepositCert',
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 90,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvTAwaitingWithdrawalCert',
                        parent: 'mvVolume',
                        accessor: 'mvTAwaitingWithdrawalCert',
                        Cell: props =>  Utils.formatQty(props.value),
                        skip: false,
                        show: true,
                        width: 90,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }]
                },
                {
                    id: 'mvPrice',
                    headerClassName: 'price',
                    skip: false,
                    columns: [{
                        id: 'mvAvgPrice',
                        parent: 'mvPrice',
                        accessor: 'mvAvgPrice',
                        Cell: props =>  Utils.formatCurrency(props.value),
                        skip: false,
                        show: true,
                        width: 80,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber
                    }, {
                        id: 'mvMarketPrice',
                        parent: 'mvPrice',
                        accessor: 'mvMarketPrice',
                        Cell: props =>  Utils.formatCurrency(props.value),
                        skip: false,
                        show: true,
                        width: 90,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber
                    }]
                },
                {
                    id: 'PortfolioAssessment',
                    headerClassName: 'rate',
                    skip: false,
                    columns: [{
                        id: 'mvWAC',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvWAC',
                        Cell: props =>  Utils.formatCurrency(props.value),
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvMarketValue',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvMarketValue',
                        Cell: props =>  Utils.formatCurrency(props.value),
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvPL',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvPL',
                        Cell: props =>  Utils.formatCurrency(props.value),
                        skip: false,
                        show: true,
                        width: 80,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvPLPercent',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvPLPercent',
                        skip: false,
                        show: true,
                        width: 70,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }]
                },
                {
                    id: 'mvMargin',
                    headerClassName: 'deposit',
                    skip: false,
                    columns: [{
                        id: 'mvMarginPercentage',
                        parent: 'mvMargin',
                        accessor: 'mvMarginPercentage',
                        skip: false,
                        show: true,
                        width: 80,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'mvMartginValue',
                        parent: 'mvMargin',
                        accessor: 'mvMartginValue',
                        Cell: props =>  Utils.formatCurrency(props.value),
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'maintenancePercentage',
                        parent: 'mvMargin',
                        accessor: 'maintenancePercentage',
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }, {
                        id: 'maintenanceValue',
                        parent: 'mvMargin',
                        accessor: 'maintenanceValue',
                        Cell: props =>  Utils.formatCurrency(props.value),
                        skip: false,
                        show: true,
                        width: 120,
                        Aggregated: () => {
                            return null
                        },
                        background: props.theme.table.colNumber,
                        mobile: false,
                    }]
                },

                {
                    id: 'mobileaction',
                    mobile: false,
                    skip: true,
                    show: false,
                    Cell: props => {
                        return (
                            <div>
                                <button className="hks-btn btn-buy" onClick={e => this.onBuyClick(props)}>
                                    {this.props.language.button.buy}
                                </button>
                                <button className="hks-btn btn-sell" onClick={e => this.onSellClick(props)}>
                                    {this.props.language.button.sell}
                                </button>
                            </div>
                        )
                    }
                }
            ],



            filterable: false
        }
    }

    onBuyClick(props) {
        // go to EnterOrder function with params:
        // - mvBS: B
        // - mvStockCode = props.mvStockID
        // - mvStockName = props.mvStockName
        // - mvMarketID = props.mvMarketID
        console.log(props)
        this.props.setDefaultOrderParams({
            mvBS: "BUY",
            mvStockCode: props.mvStockID,
            mvStockName: props.mvStockName,
            mvMarketID: props.mvMarketID
        })
        this.props.onMobileTabClick("trading")
    }

    onSellClick(props) {
        this.props.setDefaultOrderParams({
            mvBS: "SELL",
            mvStockCode: props.mvStockID,
            mvStockName: props.mvStockName,
            mvMarketID: props.mvMarketID
        })
        this.props.onMobileTabClick("trading")
    }

    render() {
        var data = this.props.data.mvPortfolioBeanList
        let tableFooter = this.props.theme.table.tableFooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table
                        theme={this.props.theme}
                        id={this.id}
                        language={this.props.language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        tableData={data}
                        pivot={['mvMarketID']}
                        getPivotRowProps={(propName) => {
                            return(
                                <div className='lv-pivot-group' >
                                    <img src={propName == 'HA' ? images['flag_viet.jpg']
                                        :propName=='HO'?images['flag_viet.jpg']
                                        :images['flag_viet.jpg']} style={{position: 'relative',
                                        top: '-1px', marginRight: '15px'}} />
                                    <strong>{propName}</strong>
                                </div>
                            )
                        }}

                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={Math.ceil(data.length / this.defaultPageSize)}

                        searchParams={[]}
                        searchMobileParams={[]}
                        searchActions={[]}
                        searchData={{}}
                        searchDefaultValues={[]}
                        onSearch={() => {}}
                        searchEnable={false}
                        onCellClick={this.onCellClick.bind(this)}
                    />

                </Body>
            </div>
        )

    }

    onCellClick(state, rowInfo, column, instance) {
        if(rowInfo == undefined) return
        switch(column.id) {
            case "mvStockID":
                this.props.setDefaultOrderParams({
                    mvBS: "SELL",
                    mvMarketID: rowInfo.original.mvMarketID,
                    mvStockName: rowInfo.original.mvStockName,
                    mvStockCode: rowInfo.original.mvStockID,
                    mvQty: rowInfo.original["mvTSettled"],
                    mvPrice: rowInfo.original["mvMarketPrice"]
                })
                // this.props.onDesktopTabClick("trading", "placeorder")
                break;
            case "mvTradableQty":
                this.props.setDefaultOrderParams({
                    mvBS: "SELL",
                    mvMarketID: rowInfo.original.mvMarketID,
                    mvStockName: rowInfo.original.mvStockName,
                    mvStockCode: rowInfo.original.mvStockID,
                    mvQty: rowInfo.original["mvTSettled"],
                    mvPrice: rowInfo.original["mvMarketPrice"]
                })
                // this.props.onDesktopTabClick("trading", "placeorder")
                break;
            default: 
                this.props.setDefaultOrderParams({
                    mvBS: "SELL",
                    mvMarketID: rowInfo.original.mvMarketID,
                    mvStockName: rowInfo.original.mvStockName,
                    mvStockCode: rowInfo.original.mvStockID,
                    mvQty: rowInfo.original["mvTSettled"],
                    mvPrice: rowInfo.original["mvMarketPrice"]
                })
                break;
        }

        this.props.showPlaceOrder({
            theme: this.props.theme,
            language: this.props.language,
            data: {},
            title: this.props.language.menu.placeorder,
            id: 'quickorder',
        })
    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
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
        data: state.trading.portfolioData,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getPorfolio: (params) => {
        dispatch(actions.getPorfolio(params))
    },
    setDefaultOrderParams: (params) => {
        dispatch(actions.setDefaultOrderParams(params))
    },
    onMobileTabClick: (id) => {
        dispatch(actions.onMobileTabClick(id));
    },
    onDesktopTabClick: (tabID, subTabID) => {
        dispatch(actions.onTabClick(tabID, subTabID));
    },
    showPlaceOrder: (param) => {
        dispatch(actions.showPopup(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
