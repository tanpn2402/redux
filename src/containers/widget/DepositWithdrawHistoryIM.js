import { Button } from 'react-bootstrap';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import moment from "moment"

class DepositWithdrawHistory extends Component {
    constructor(props) {
        super(props)
        this.id = 'depositwithdrawhistory'
        this.idParent = 'deposit'
        this.state = {
            lgShow: false,
            columns: [
                {
                    id: 'no',
                    accessor: 'no',
                    width: 50,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'requesttime',
                    accessor: 'requesttime',
                    width: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'beneficiaryname',
                    accessor: 'beneficiaryname',
                    minWidth: 150,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'beneficiaryaccount',
                    accessor: 'beneficiaryaccount',
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'transferamount',
                    accessor: 'transferamount',
                    minWidth: 100,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colNumber
                },
                {
                    id: 'transfertype',
                    accessor: 'transfertype',
                    minWidth: 200,
                    maxWidth: 300,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'transferfee',
                    accessor: 'transferfee',
                    minWidth: 70,
                    maxWidth: 200,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'status',
                    accessor: 'status',
                    minWidth: 200,
                    maxWidth: 300,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'detail',
                    accessor: 'detail',
                    width: 100,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                }
            ],
            isShow: false,
            pageIndex: 1,
            filterable: false
        }
        this.defaultPageSize = 25
        
        
        
    }


    render() {
        let data = []
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.idParent} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    widgetID={this.id}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table
                        theme={this.props.theme}
                        key={this.id}
                        id={this.id}
                        idParent={this.idParent}
                        language={this.props.language}

                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        pageSize={this.defaultPageSize}
                        tableData={data}

                        pageIndex={this.state.pageIndex}
                        totalPage={1}
                        onPageChange={this.onPageChange.bind(this)}

                        searchParams={['mvStartDate']}
                        onSearch={this.onSearch.bind(this)}
                        searchEnable={true}
                        searchMobileParams={[]}
                        searchDefaultValues={{}}
                    />
                </Body>
            </div>
        )
    }

    onSearch(params) {

    }

    onPageChange(page) {
        
    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        let {currentTrdAccount, language} = this.props
        if(currentTrdAccount.investorType == "DERIVATIVES") {
            this.props.cpCashDWenquiryFS({
                tradingAccSeq : parseInt(currentTrdAccount.tradingAccSeq),
                subAccountID : currentTrdAccount.subAccountID,
                clientID: currentTrdAccount.subAccountID,
                tranDate: moment().format("DD/MM/YYYY")
            })
        }
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        })
    }
    openCanceltransfer(tranID) {
                                        
    }
    
}
const mapStateToProps = (state) => {
    return {
        currentTrdAccount: state.dologin.currentTrdAccount,
        // cashTransferList: state.dervatives.cashTransferList
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    cpCashDWenquiryFS: (params) => {dispatch(actions.cpCashDWenquiryFS(params))}
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositWithdrawHistory)
