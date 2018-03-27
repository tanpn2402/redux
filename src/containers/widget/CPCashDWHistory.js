import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Title from "../commons/WidgetTitle"
import Body from "../commons/WidgetBody"
import Table from "../commons/DataTable"
import * as Utils from "../../utils"
import moment from "moment"
import config from "../../core/config"

class CPCashDWHistory extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.state = {
            columns: [
                {
                    id: "txnID",
                    accessor: "txnID",
                    minWidth: 80,
                    maxWidth: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "tranDate",
                    accessor: "tranDate",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "inputDate",
                    accessor: "inputDate",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "counterPartyAccountID",
                    accessor: "counterPartyAccountID",
                    minWidth: 100,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "counterPartyAccountName",
                    accessor: "counterPartyAccountName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "brokerID",
                    accessor: "brokerID",
                    minWidth: 100,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "brokerName",
                    accessor: "brokerName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "txnTypeID",
                    accessor: "txnTypeID",
                    minWidth: 100,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "txnTypeDesc",
                    accessor: "txnTypeDesc",
                    minWidth: 80,
                    maxWidth: 140,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "bankID",
                    accessor: "bankID",
                    minWidth: 100,
                    maxWidth: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "bankShortName",
                    accessor: "bankShortName",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "accountCode",
                    accessor: "accountCode",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "chequeNumber",
                    accessor: "chequeNumber",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "currencyID",
                    accessor: "currencyID",
                    minWidth: 100,
                    maxWidth: 120,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "remarks",
                    accessor: "remarks",
                    minWidth: 200,
                    maxWidth: 300,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "csettled",
                    accessor: "csettled",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: "otherType",
                    accessor: "otherType",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: "movementID",
                    accessor: "movementID",
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                }
            ],
            pageIndex: 1,
            filterable: false
        }

        this.id = props.id
        console.log(this.id)
        this.defaultPageSize = props.defaultPageSize
    }

  
    render() {
        
        
        var {theme, language, clientPortfolio} = this.props
        var data = clientPortfolio.counterPartyDWList == null ? [] : clientPortfolio.counterPartyDWList
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title filterable={this.state.filterable} id={this.id} language={language} theme={theme}
                    columns={this.state.columns}
                    widgetID= 'orderHistory'
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {language.menu[this.id]}
                </Title>
                <Body theme={theme}>
                    <Table 
                        theme={theme}
                        id={this.id}
                        language={language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.cpdwCol}
                        filterable={this.state.filterable}
                        tableData={data.slice( (this.state.pageIndex -1)*this.defaultPageSize, this.state.pageIndex*this.defaultPageSize)}

                        pageIndex={this.state.pageIndex}
                        onPageChange={this.onPageChange.bind(this)}
                        totalPage={Math.ceil(data.length / this.defaultPageSize)}

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
        let {currentTrdAccount} = this.props
        this.props.clientPortfolioEnquiryFS({
            tradingAccSeq : parseInt(currentTrdAccount.accountSeq),
            subAccountID : currentTrdAccount.subAccountID
        })
    }

    onPageChange(pageIndex) {
        this.setState({ pageIndex: pageIndex });
    }

    onSearch(param) {
        
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }
}
CPCashDWHistory.defaultProps = {
    defaultPageSize: 15
}

const mapStateToProps = (state) => {
    return {
        clientPortfolio: state.portfolio.clientPortfolio,
        currentTrdAccount: state.dologin.currentTrdAccount,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    clientPortfolioEnquiryFS:(param) => { dispatch(actions.clientPortfolioEnquiryFS(param)) }
})


export default connect(mapStateToProps, mapDispatchToProps)(CPCashDWHistory)