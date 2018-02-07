import { Button } from 'react-bootstrap';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'

class FundTransHistory extends Component {
    constructor(props) {
        super(props)
        this.id = 'fundTransHistory'
        this.idParent = 'cashtransfer'
        this.state = {
            lgShow: false,
            columns: [
                {
                    id: 'transfertype',
                    accessor: 'action',
                    width: 150,
                    skip: false,
                    Cell: props => {
                        if (props.aggregated) {
            
                        } else {
                            var value=props.original.action.trim()
                            let text = this.props.language.cashtransfer.transtype[value]
                            return (
                                Utils.statusRenderer(text,value)
                            )
                        }
                    },
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'transferamount',
                    accessor: 'totalLendingAmt',
                    Cell: props =>  Utils.formatCurrency(props.value),
                    width: 150,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },
                {
                    id: 'beneficiaryaccount',
                    accessor: 'receiveClientID',
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'beneficiaryfullname',
                    accessor: 'ownerName',
                    width: 150,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'bankname',
                    accessor: 'bankName',
                    width: 130,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'bankbranch',
                    accessor: 'bankBranch',
                    width: 120,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'status',
                    accessor: 'status',
                    width: 80,
                    Cell: props => {
                        if (props.aggregated) {
            
                        } else {
                            var value=props.original.status.trim()
                            let text = this.props.language.cashtransfer.status[value]
                            return (
                                Utils.statusRenderer(text,value)
                            )
                        }
                    },
                    background: props.theme.table.colText,
                    skip: false,
                    show: true,
                },
                {
                    id: 'approvetime',
                    accessor: 'lastApprovaltime',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'date',
                    accessor: 'createTime',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'cancel',
                    accessor: 'status',
                    Cell: props => {
                        if (props.aggregated){
                            
                        }else{
                             var value=props.original.tranID
                             var valueStatus=props.original.status.trim()
                             if(valueStatus === 'P'){
                            return (
                                <Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall" style={{color:'red'}}
                                    onClick={() => this.openCanceltransfer(props.original.tranID)}>    <span className="glyphicon glyphicon-remove"></span>
                                </Button>
                            )}}
                    },
                    width: 80,
                    sortable: false,
                    skip: true,
                    show: true,
                }
            ],
            isShow: false,
            pageIndex: 1,
            filterable: false
        }
        this.defaultPageSize = 25
        this.pageIndex = 1
        this.paramshkscashtranhis = {
            mvLastAction: 'ACCOUNT',
            mvChildLastAction: 'FUNDTRANSFER',
            tradeType: 'FUND',
            start: '0',
            limit: this.defaultPageSize,
            key: new Date(),
        }
    }


    render() {
        let data = this.props.data.list === undefined ? [] : this.props.data.list
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
                        key={this.id}
                        id={this.id}
                        idParent={this.idParent}
                        language={this.props.language}

                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        pageSize={this.defaultPageSize}
                        tableData={data}

                        pageIndex={this.state.pageIndex}
                        totalPage={Math.ceil(this.props.data.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        searchEnable={false}
                        searchMobileParams={[]}
                        searchDefaultValues={{}}
                    />
                </Body>
            </div>
        )
    }

    onPageChange(page) {
        this.state.pageIndex = page
        this.paramshkscashtranhis["page"] = this.state.pageIndex
        this.paramshkscashtranhis["start"] = (this.state.pageIndex - 1) * this.paramshkscashtranhis["limit"]
        this.props.gethkscashtranhis(this.paramshkscashtranhis)
    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        this.props.gethkscashtranhis(this.paramshkscashtranhis, this.props.language)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        })
    }
    openCanceltransfer(tranID) {
        let pageIndex = this.state.pageIndex
        var targetTxn = this.props.data.list.find(x => x.tranID == tranID);
        this.props.beforeCancelFundTransfer(targetTxn.tranID, targetTxn.status, this.props.language, this.props.theme, 
            () => setTimeout(this.onPageChange(pageIndex), 1000) )                                   
    }
    
}
const mapStateToProps = (state) => {
    return {
        data: state.cashtransfer.datahkscashtranhis,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    gethkscashtranhis: (paramshkscashtranhis) => {
        dispatch(actions.gethksCachTranHis(paramshkscashtranhis))
    },
    beforeCancelFundTransfer: (tranID, status, language, theme, callback) => {
        dispatch(actions.beforeCancelFundTransfer(tranID, status, language, theme, callback))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FundTransHistory)
