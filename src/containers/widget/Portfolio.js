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
                    skip: false,
                    columns: [
                        {
                            id: 'mvStockID',
                            accessor: 'mvStockID',
                            skip: false,
                            show: true,
                            maxWidth: 60,
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
                        accessor: 'mvTradableQty',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTSettled',
                        parent: 'mvVolume',
                        accessor: 'mvTSettled',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvHoldingAmt',
                        parent: 'mvVolume',
                        accessor: 'mvHoldingAmt', //not sure
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvQueuingBuy',
                        parent: 'mvVolume',
                        accessor: 'mvQueuingBuy', //not sure
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTT1UnsettleBuy',
                        parent: 'mvVolume',
                        accessor: 'mvTT1UnsettleBuy', // not sure
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTDueBuy',
                        parent: 'mvVolume',
                        accessor: 'mvTDueBuy',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTMortgageQty',
                        parent: 'mvVolume',
                        accessor: 'mvTMortgageQty',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTManualHold',
                        parent: 'mvVolume',
                        accessor: 'mvTManualHold',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTEntitlementQty',
                        parent: 'mvVolume',
                        accessor: 'mvTEntitlementQty',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTAwaitingTraceCert',
                        parent: 'mvVolume',
                        accessor: 'mvTAwaitingTraceCert',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTAwaitingDepositCert',
                        parent: 'mvVolume',
                        accessor: 'mvTAwaitingDepositCert',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvTAwaitingWithdrawalCert',
                        parent: 'mvVolume',
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
                        accessor: 'mvAvgPrice',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvMarketPrice',
                        parent: 'mvPrice',
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
                    headerClassName: 'rate',
                    skip: false,
                    columns: [{
                        id: 'mvWAC',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvWAC',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvMarketValue',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvMarketValue',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvPL',
                        parent: 'PortfolioAssessment',
                        accessor: 'mvPL',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvPLPercent',
                        parent: 'PortfolioAssessment',
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
                        accessor: 'mvMarginPercentage',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'mvMartginValue',
                        parent: 'mvMargin',
                        accessor: 'mvMartginValue',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'maintenancePercentage',
                        parent: 'mvMargin',
                        accessor: 'maintenancePercentage',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }, {
                        id: 'maintenanceValue',
                        parent: 'mvMargin',
                        accessor: 'maintenanceValue',
                        skip: false,
                        show: true,
                        Aggregated: () => {
                            return null
                        }
                    }]
                }],
            filterable: true
        }
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            
        })
    }

    render() {
        console.log("PORT RE-RENDER ",this.state.columns, this.props.language)
        var data = this.props.data.mvPortfolioBeanList
        let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
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
                    <div className="table-main no-header" style={{ color: font2 }}>
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            filterable={this.state.filterable}
                            data={data.slice((this.state.pageIndex - 1) * this.defaultPageSize, this.state.pageIndex * this.defaultPageSize)}
                            pivot={['mvMarketID']}
                            language={this.props.language.portfolio.header}
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
        data: state.porfolio.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getPorfolio: (params) => {
        dispatch(actions.getPorfolio(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)