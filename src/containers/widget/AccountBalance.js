import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Title from "../commons/WidgetTitle"
import Body from "../commons/WidgetBody"
import Table from "../commons/DataTable"
import * as Utils from "../../utils"
import moment from "moment"
import config from "../../core/config"

const images = Utils.importAll(require.context('../../assets/images/flags', false, /\.(png|jpe?g|svg)$/))

class AccountBalance extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList

        /*
        accessor for accountBalanceLoopList: 
            currencyID
            dueBalance
            hostAvailable
            ledgerBalance
            toDaySettlement
            buyingPower
            buyingPowerWRG
        */
        this.state = {
            columns: [
                {
                    id: "currency",
                    accessor: "currencyID",
                    width: 150,
                    skip: false,
                    show: true,
                    cell: d => {
                        let currency = d.currency
                        switch (currency) {
                            case 'CVY':
                                return (
                                    <img src={images['flag_china.jpg']} style={{ position: 'relative', top: '-1px', marginLeft: '15px' }} />
                                )
                            case 'EUR':
                                return (
                                    <img src={images['flag_Australia.png']} style={{ position: 'relative', top: '-1px', marginLeft: '15px' }} />
                                )
                            case 'HKD':
                                return (
                                    <img src={images['flag_hk.jpg']} style={{ position: 'relative', top: '-1px', marginLeft: '15px' }} />
                                )
                            case 'TWD':
                                return (
                                    <img src={images['flag_Malaysia.png']} style={{ position: 'relative', top: '-1px', marginLeft: '15px' }} />
                                )
                            case 'USD':
                                return (
                                    <img src={images['flag_us.jpg']} style={{ position: 'relative', top: '-1px', marginLeft: '15px' }} />
                                )
                        }
                    }
                },
                {
                    id: "ledgerbalance",
                    accessor: "ledgerBalance",
                    width: 200,
                    skip: false,
                    show: true,
                    style: {textAlign: "right"}
                },
                {
                    id: "exrate",
                    accessor: "exrate",
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: "holdamount",
                    accessor: "holdamount",
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: "withdrawable",
                    accessor: "withdrawable",
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: "settledbalance",
                    accessor: "toDaySettlement",
                    width: 120,
                    skip: false,
                    show: true,
                }
            ],
            pageIndex: 1,
            filterable: true
        }

        this.id = "accountbalance"
        this.pageIndex = 1
        this.defaultPageSize = 15

        this.params = {
            channelID: "",
            clientID: "",
            tradingAccSeq: "",
            currencyID: "",
            language: ""
        }
    }

    render() {
        let data = this.props.data.accountBalanceLoopList
        // var data = [
        //     {currency: "CVY", ledgerbalance: "0.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"},
        //     {currency: "EUR", ledgerbalance: "0.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"},
        //     {currency: "HKD", ledgerbalance: "20,250,156.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"},
        //     {currency: "TWD", ledgerbalance: "0.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"},
        //     {currency: "USD", ledgerbalance: "12,523,150.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"}
        // ]
        
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table 
                        theme={this.props.theme}
                        id={this.id}
                        language={this.props.language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={false}
                        tableData={data}

                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={1}

                        searchParams={[]}
                        searchMobileParams={[]}
                        searchActions={[]}
                        searchData={{}}
                        onSearch={this.onSearch.bind(this)}
                        searchEnable={false}

                    />

                </Body>
            </div>
        )

    }

    componentDidMount() {
        this.props.onSearch(this.params)
    }

    onPageChange(page) {
        // this.state.pageIndex = page
        // this.params["page"] = this.state.pageIndex
        // this.params["start"] = (this.state.pageIndex - 1) * this.params["limit"]
        // this.props.onSearch(this.params)
    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.params["page"] = 1
        this.params["start"] = 0

        this.params.clientID = config.cache.clientID
        this.params.language = config.cache.lang
        this.params.channelID = config.cache.channelID
        
        this.props.onSearch(this.params)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.accountbalance.data
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param) => {
        dispatch(actions.accountBalanceEnquiry(param))
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(AccountBalance)