import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Title from "../commons/WidgetTitle"
import Body from "../commons/WidgetBody"
import Table from "../commons/DataTable"
import * as Utils from "../../utils"
import moment from "moment"
import config from "../../core/config"

class AccountBalance extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.state = {
            columns: [
                {
                    id: "currency",
                    accessor: "currency",
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: "ledgerbalance",
                    accessor: "ledgerbalance",
                    width: 120,
                    skip: false,
                    show: true,
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
                    accessor: "settledbalance",
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
            
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            
        });
    }


    render() {
        var data = []
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme}
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
                        totalPage={0}

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