import { Button } from 'react-bootstrap';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

class FundTransHistory extends Component {
    constructor(props) {
        super(props)
        this.id = 'fundTransHistory'
        this.state = {
            lgShow: false,
            columns: [
                {
                    id: 'transfertype',
                    accessor: 'action',
                    skip: false,
                    show: true,
                },
                {
                    id: 'transferamount',
                    accessor: 'totalLendingAmt',
                    skip: false,
                    show: true,
                },
                {
                    id: 'beneficiaryaccount',
                    accessor: 'receiveClientID',
                    skip: false,
                    show: true,
                },
                {
                    id: 'beneficiaryfullname',
                    accessor: 'ownerName',
                    skip: false,
                    show: true,
                },
                {
                    id: 'bankname',
                    accessor: 'bankName',
                    skip: false,
                    show: true,
                },
                {
                    id: 'bankbranch',
                    accessor: 'bankBranch',
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    accessor: 'status',
                    skip: false,
                    show: true,
                },
                {
                    id: 'approvetime',
                    accessor: 'lastApprovaltime',
                    skip: false,
                    show: true,
                },
                {
                    id: 'date',
                    accessor: 'createTime',
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
        var data = this.props.data.list === undefined ? [] : this.props.data.list
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
                    <div className="table-main no-header" style={{ color: font2 }} >
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            columns={this.state.columns}
                            filterable={this.state.filterable}
                            defaultPageSize={this.defaultPageSize}
                            data={data}
                            language={this.props.language.cashtransfer.header} />
                    </div>

                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.state.pageIndex}
                            totalRecord={this.props.data.mvTotalOrders}
                            onPageChange={this.onPageChange.bind(this)}
                            onNextPage={this.onNextPage.bind(this)}
                            onPrevPage={this.onPrevPage.bind(this)}
                            onReloadPage={this.onReloadPage.bind(this)}
                        />
                    </div>

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

    onNextPage() {
        if (this.state.pageIndex > 0) {
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
        }
    }

    onPrevPage() {
        if (this.state.pageIndex > 1) {
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
        }
    }

    onReloadPage() {
        this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
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
