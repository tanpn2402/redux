import  {Button} from 'react-bootstrap';
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
                      Header: this.props.language.cashtransfer.header.transfertype,
                      accessor: 'action',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'transferamount',
                      Header: this.props.language.cashtransfer.header.transferamount,
                      accessor: 'totalLendingAmt',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'beneficiaryaccount',
                      Header: this.props.language.cashtransfer.header.beneficiaryaccount,
                      accessor: 'receiveClientID',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'beneficiaryfullname',
                      Header: this.props.language.cashtransfer.header.beneficiaryfullname,
                      accessor: 'ownerName',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'bankname',
                      Header: this.props.language.cashtransfer.header.bankname,
                      accessor: 'bankName',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'bankbranch',
                      Header: this.props.language.cashtransfer.header.bankbranch,
                      accessor: 'bankBranch',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'status',
                      Header: this.props.language.cashtransfer.header.status,
                      accessor: 'status',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'approvetime',
                      Header: this.props.language.cashtransfer.header.approvetime,
                      accessor: 'lastApprovaltime',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'date',
                      Header: this.props.language.cashtransfer.header.date,
                      accessor: 'createTime',
                      skip: false,
                      show: true,
                },
                  {
                      id: 'cancel',
                      Header: this.props.language.cashtransfer.header.cancel,
                      accessor: 'status',
                      Cell: props => {
                                          if(props.original.status === 'P')
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
            columns: [
                {
                    id: 'transfertype',
                    Header: nextProps.language.cashtransfer.header.transfertype,
                    accessor: 'action',

                    skip: false,
                    show: true,
          },
                {
                    id: 'transferamount',
                    Header: nextProps.language.cashtransfer.header.transferamount,
                    accessor: 'totalLendingAmt',

                    skip: false,
                    show: true,
          },
                {
                    id: 'beneficiaryaccount',
                    Header: nextProps.language.cashtransfer.header.beneficiaryaccount,
                    accessor: 'receiveClientID',

                    skip: false,
                    show: true,
          },
                {
                    id: 'beneficiaryfullname',
                    Header: nextProps.language.cashtransfer.header.beneficiaryfullname,
                    accessor: 'ownerName',

                    skip: false,
                    show: true,
          },
                {
                    id: 'bankname',
                    Header: nextProps.language.cashtransfer.header.bankname,
                    accessor: 'bankName',

                    skip: false,
                    show: true,
          },
                {
                    id: 'bankbranch',
                    Header: nextProps.language.cashtransfer.header.bankbranch,
                    accessor: 'bankBranch',

                    skip: false,
                    show: true,
          },
                {
                    id: 'status',
                    Header: nextProps.language.cashtransfer.header.status,
                    Cell: props => {
                        if(props.original.status === 'R')
                            return this.props.language.cashtransfer.status.rejected
                        else if(props.original.status === 'A')
                            return this.props.language.cashtransfer.status.approve
                        else if(props.original.status === 'P')
                            return this.props.language.cashtransfer.status.pending
                        else
                            return props.original.status
                    },
                    skip: false,
                    show: true,
          },
                {
                    id: 'approvetime',
                    Header: nextProps.language.cashtransfer.header.approvetime,
                    accessor: 'lastApprovaltime',
          },
                {
                    id: 'date',
                    Header: nextProps.language.cashtransfer.header.date,
                    accessor: 'createTime',

                    skip: false,
                    show: true,
          },
                {
                    id: 'cancel',
                    Header: nextProps.language.cashtransfer.header.cancel,
                    accessor: 'status',
                    Cell: props => {  
                                        if(props.original.status === 'P')
                                        return (
                                            <Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall"
                                            onClick={()=>this.openCanceltransfer(props.original.tranID)}>
                                                <span className="glyphicon glyphicon-remove"></span>
                                            </Button>
                                        )
                                   },
                    sortable: false,
                    skip: true,
                    show: true,
          }]
        });
    }


    render() {
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header">
                        <Table
                            key={this.id}
                            id={this.id}
                            columns={this.state.columns}
                            defaultPageSize={this.defaultPageSize}
                            data={data}/>
                    </div>
                    
                    <div className="table-footer">
                        <Pagination
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

    componentDidMount() {
        this.props.gethkscashtranhis(this.paramshkscashtranhis, this.props.language)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage(){
        if(this.state.pageIndex > 0){
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
        }
    }

    onPrevPage(){
        if(this.state.pageIndex > 1){
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
        }
    }

    onReloadPage(){
        this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
    }

    onPageChange(pageIndex){
        this.setState({pageIndex: pageIndex });
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
      var targetTxn = this.props.data.list.find(x=>x.tranID==tranID);
      
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
