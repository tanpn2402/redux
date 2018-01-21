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
                            }
                        },
                        {
                            id: 'mvStockName',
                            accessor: 'mvStockName',
                            skip: false,
                            show: true,
                            width: 250,
                            Aggregated: () => {
                                return null
                            }
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
                    Header: 'Volume',
                    headerClassName: 'volume',
                    skip: false,
                    columns: [{
                        id: 'mvTradableQty',
                        parent: 'mvVolume',
                        accessor: 'mvTradableQty',
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
                        style: {textAlign: "right"}
                    }, {
                        id: 'mvTSettled',
                        parent: 'mvVolume',
                        accessor: 'mvTSettled',
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvHoldingAmt',
                        parent: 'mvVolume',
                        accessor: 'mvHoldingAmt', //not sure
                        skip: false,
                        show: true,
                        width: 80,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }, {
                        id: 'mvQueuingBuy',
                        parent: 'mvVolume',
                        accessor: 'mvQueuingBuy', //not sure
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }, {
                        id: 'mvTT1UnsettleBuy',
                        parent: 'mvVolume',
                        accessor: 'mvTT1UnsettleBuy', // not sure
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }, {
                        id: 'mvTDueBuy',
                        parent: 'mvVolume',
                        accessor: 'mvTDueBuy',
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        },
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
                        mobile: false,
                    }, {
                        id: 'mvTManualHold',
                        parent: 'mvVolume',
                        accessor: 'mvTManualHold',
                        skip: false,
                        show: true,
                        width: 60,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTEntitlementQty',
                        parent: 'mvVolume',
                        accessor: 'mvTEntitlementQty',
                        skip: false,
                        show: true,
                        width: 110,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }, {
                        id: 'mvTAwaitingTraceCert',
                        parent: 'mvVolume',
                        accessor: 'mvTAwaitingTraceCert',
                        skip: false,
                        show: true,
                        width: 90,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }, {
                        id: 'mvTAwaitingDepositCert',
                        parent: 'mvVolume',
                        accessor: 'mvTAwaitingDepositCert',
                        skip: false,
                        show: true,
                        width: 90,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }, {
                        id: 'mvTAwaitingWithdrawalCert',
                        parent: 'mvVolume',
                        accessor: 'mvTAwaitingWithdrawalCert',
                        skip: false,
                        show: true,
                        width: 90,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
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
                        accessor: 'mvAvgPrice',
                        skip: false,
                        show: true,
                        width: 80,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvMarketPrice',
                        parent: 'mvPrice',
                        accessor: 'mvMarketPrice',
                        skip: false,
                        show: true,
                        width: 90,
                        Aggregated: () => {
                            return null
                        }
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
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }, {
                        id: 'mvMarketValue',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvMarketValue',
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
                        mobile: false,
                    }, {
                        id: 'mvPL',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvPL',
                        skip: false,
                        show: true,
                        width: 80,
                        Aggregated: () => {
                            return null
                        },
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
                    Header: '(%) Margin',
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
                        mobile: false,
                    }, {
                        id: 'mvMartginValue',
                        parent: 'mvMargin',
                        accessor: 'mvMartginValue',
                        skip: false,
                        show: true,
                        width: 100,
                        Aggregated: () => {
                            return null
                        },
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
                        mobile: false,
                    }, {
                        id: 'maintenanceValue',
                        parent: 'mvMargin',
                        accessor: 'maintenanceValue',
                        skip: false,
                        show: true,
                        width: 120,
                        Aggregated: () => {
                            return null
                        },
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
        console.log(rowInfo, column, instance)
        switch(column.id) {
            case "mvStockID":
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvMarketID: rowInfo.original.mvMarketID,
                    mvStockName: rowInfo.original.mvStockName,
                    mvStockCode: rowInfo.original.mvStockID
                })
                this.props.onDesktopTabClick("trading", "enterorder")
                break;
            case "mvTradableQty":
                this.props.setDefaultOrderParams({
                    mvBS: "BUY",
                    mvMarketID: rowInfo.original.mvMarketID,
                    mvStockName: rowInfo.original.mvStockName,
                    mvStockCode: rowInfo.original.mvStockID
                })
                this.props.onDesktopTabClick("trading", "enterorder")
                break;
        }
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
