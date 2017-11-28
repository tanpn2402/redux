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
const images = Utils.importAll(require.context('../../assets/images/flags', false, /\.(png|jpe?g|svg)$/))

const { Contants } = require("../../core/constants")

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.id = "portfolio"
        this.lang = config.cache.lang
        this.defaultPageSize = 15

        this.pa = {
            MarketID: config.marketid[0],
            ClientID: config.cache.clientID,
            SesssionID: config.cache.sessionID,

            TradingAccSeq: "", // not Mandatory
            CurrencyID: "", // notsee in API Spec but in UI has it 
            Language: this.lang
        }

        this.state = {
            pageIndex: 1,
        
            columns: [
                {
                    id: 'MarketID',
                    accessor: 'MarketID',
                    skip: false,
                    show: true,
                    width: 60,
                    Pivot: (cellInfo) => {
                        return <span> {cellInfo.row._pivotVal} </span>
                    },
                    mobile: false,
                    reorderable: false,
                },
                {
                    id: 'InstrumentID',
                    accessor: 'InstrumentID',
                    skip: false,
                    show: true,
                    width: 70,
                    Aggregated: () => {
                        return null
                    },
                },
                {
                    id: "InstrumentName",
                    accessor: "InstrumentShortName",
                    skip: false,
                    show: true,
                    width: 150,
                    Aggregated: () => {
                        return null
                    },
                    Cell: props => {return this.renderInstrumentName(props)}
                },
                {
                    id: "LedgerBalance",
                    accessor: "LedgerQty",
                    skip: false,
                    show: true,
                    width: 150,
                    Aggregated: () => {
                        return null
                    },
                },
                {
                    id: "Currency",
                    accessor: "Currency",
                    skip: false,
                    show: true,
                    width: 60,
                    Aggregated: () => {
                        return null
                    },
                },
                {
                    id: "UsableBalance",
                    accessor: "UsableBalance",
                    skip: false,
                    show: true,
                    width: 100,
                    Aggregated: () => {
                        return null
                    },
                },
                {
                    id: "RefPrice",
                    accessor: "ClosingPrice",
                    skip: false,
                    show: true,
                    width: 100,
                    Aggregated: () => {
                        return null
                    },
                },
                {
                    id: "RefMarketValue",
                    accessor: "MarketValue",
                    skip: false,
                    show: true,
                    width: 100,
                    Aggregated: () => {
                        return null
                    },
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

            filterable: true
        }
    }

    renderInstrumentName(props) {
        if(props == undefined || props.original == undefined)
            return;
        if(this.lang === "zh_TW") {
            return props.original.InstrumentChineseShortName
        } else {
            return props.original.InstrumentShortName
        }
    }

    onBuyClick(props) {
        // go to EnterOrder function with params:
        // - mvBS: B
        // - mvStockCode = props.mvStockID
        // - mvStockName = props.mvStockName
        // - mvMarketID = props.mvMarketID
        // console.log(props)
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
        var data = this.props.data.Instruments
        let tableFooter = this.props.theme.table.tableFooter
        let param = this.pa
        console.log(param)
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
                        pivot={['MarketID']}
                        getPivotRowProps={(propName) => {
                            return(
                                <div className='lv-pivot-group' >
                                    <img src={propName == 'HA' ? images['flag_viet.jpg']
                                        :propName=='HO'?images['flag_us.jpg']
                                        :images['flag_hk.jpg']} style={{position: 'relative',
                                        top: '-1px', marginRight: '15px'}} />
                                    <strong>{propName}</strong>
                                </div>
                            )
                        }}

                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={Math.ceil(data.length / this.defaultPageSize)}

                        searchParams={[Contants.searchElement.MARKET, /*Contants.searchElement.CURRENCY*/]}
                        searchMobileParams={[Contants.searchElement.MARKET, /*Contants.searchElement.CURRENCY*/]}
                        searchDefaultValues={{ mvMarket: param.MarketID, mvCurrency: this.pa.CurrencyID }}
                        searchActions={[]}
                        searchData={{}}
                        onSearch={this.onSearch.bind(this)}

                    />

                </Body>
            </div>
        )

    }

    onSearch(param) {
        this.pa.MarketID = param.mvMarket
        this.props.portfolioEnquiryByInstrument(this.pa);
    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        this.props.portfolioEnquiryByInstrument(this.pa);
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

}

const mapStateToProps = (state) => {
    return {
        data: state.porfolio.response,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    
    setDefaultOrderParams: (params) => {
        dispatch(actions.setDefaultOrderParams(params))
    },
    onMobileTabClick: (id) => {
        dispatch(actions.onMobileTabClick(id));
    },

    portfolioEnquiryByInstrument: (params) => {
        dispatch(actions.portfolioEnquiryByInstrument(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)