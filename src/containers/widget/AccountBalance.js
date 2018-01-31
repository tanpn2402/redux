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
        this.state = {
            columns: [
                {
                    id: "currency",
                    accessor: "currency",
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
                    accessor: "ledgerbalance",
                    width: 200,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
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
                    background: props.theme.number.col
                },
                {
                    id: "withdrawable",
                    accessor: "withdrawable",
                    width: 120,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },
                {
                    id: "settledbalance",
                    accessor: "settledbalance",
                    width: 120,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                }
            ],
            pageIndex: 1,
            filterable: false
        }

        this.id = "accountbalance"
        this.pageIndex = 1
        this.defaultPageSize = 15

        this.params = {
            
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
            
    //     });
    // }


    render() {
        var data = [
            {currency: "CVY", ledgerbalance: "0.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"},
            {currency: "EUR", ledgerbalance: "0.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"},
            {currency: "HKD", ledgerbalance: "20,250,156.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"},
            {currency: "TWD", ledgerbalance: "0.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"},
            {currency: "USD", ledgerbalance: "12,523,150.000", exrate: "1.000", holdamount: "0.000", withdrawable: "0.000", settledbalance: "0.000"}
        ]
        
        return (
            <div style={{ height: "100%", position: "relative" }}>
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

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        //this.props.onSearch(this.params)
    }

    onPageChange(page) {
        this.state.pageIndex = page
        this.params["page"] = this.state.pageIndex
        this.params["start"] = (this.state.pageIndex - 1) * this.params["limit"]
        this.props.onSearch(this.params)
    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.params["page"] = 1
        this.params["start"] = 0

        this.params["mvBS"] = param["mvBuysell"]
        this.params["mvInstrumentID"] = param["mvStockId"]
        this.params["mvStartTime"] = param["mvStartDate"]
        this.params["mvEndTime"] = param["mvEndDate"]
        
        this.props.onSearch(this.params)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onExportExcel() {

        this.exportParams["mvStartTime"] = this.params["mvStartTime"]
        this.exportParams["mvEndTime"] = this.params["mvEndTime"]
        this.exportParams["mvBS"] = this.params["mvBS"]
        this.exportParams["mvInstrumentID"] = this.params["mvInstrumentID"] != "" ? this.params["mvInstrumentID"] : "ALL"

        this.props.onExportExcel(this.exportParams)
    }


}
const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.enquiryOrderHistory(param, reload))
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(AccountBalance)