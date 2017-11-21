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
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transferamount',
                    accessor: 'totalLendingAmt',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'beneficiaryaccount',
                    accessor: 'receiveClientID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'beneficiaryfullname',
                    accessor: 'ownerName',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bankname',
                    accessor: 'bankName',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bankbranch',
                    accessor: 'bankBranch',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    accessor: 'status',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'approvetime',
                    accessor: 'lastApprovaltime',
                    width: 80,
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
                        if (props.original.status === 'P')
                            return (
                                <Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall"
                                    onClick={this.openCanceltransfer.bind(this)}>
                                    <span className="glyphicon glyphicon-remove"></span>
                                </Button>
                            )
                    },
                    width: 80,
                    sortable: false,
                    skip: true,
                    show: true,
                }
            ],
            isShow: false,
            pageIndex: 1,
            filterable: true
        }

        this.paramshkscashtranhis = {
            mvLastAction: 'ACCOUNT',
            mvChildLastAction: 'FUNDTRANSFER',
            tradeType: 'FUND',
            start: '0',
            limit: '15',
            key: '211121121112121',
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({

        });
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
                        totalPage={this.props.data.mvTotalOrders}
                        onPageChange={this.onPageChange.bind(this)}

                        searchEnable={this.props.data.list == undefined ? false:this.props.data.list.length > 0}
                        searchMobileParams={[]}
                        searchDefaultValues={{}}
                    />
                </Body>
                {/* <Popup
                        id="canceltransfer"
                        show={this.state.lgShow}
                        onHide={lgClose}
                        language={this.props.language}
                        popupType={this.popupType}
                        title="CancelTransfer" /> */}
            </div>
        )

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
        });
    }

    onPageChange(pageIndex) {
        this.setState({ pageIndex: pageIndex });
    }

    // Opencanceltransfer(tranID) {
    //     this.setState({
    //                   lgShow: true
    //           });
    //           this.title = "CancelTransfer"
    //           this.popupType = 'CANCELCASHTRANFER'
    //   }

    openCanceltransfer(tranID) {
        // this.setState({lgShow: true});
        // this.title = "CancelTransfer"
        // this.popupType = 'CANCELCASHTRANFER'
        var targetTxn = this.props.data.list.find(x => x.tranID == tranID);

        this.props.beforeCancelFundTransfer(targetTxn.tranID, targetTxn.status, this.props.language, this.onReloadPage)

    }
}
const mapStateToProps = (state) => {
    return {
        data: state.cashtransfer.datahkscashtranhis,

    }
}

const mapDispatchToProps = (dispatch, props) => ({
    gethkscashtranhis: (paramshkscashtranhis, language) => {
        dispatch(actions.gethksCachTranHis(paramshkscashtranhis, language))
    },
    beforeCancelFundTransfer: (tranID, status, language, callback) => {
        dispatch(actions.beforeCancelFundTransfer(tranID, status, language, callback))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FundTransHistory)
