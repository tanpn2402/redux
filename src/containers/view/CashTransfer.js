import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import '../../css/App.css'
import moment from 'moment'
import Popup from '../Popup'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'

class CashTransfer extends Component {
  constructor(props) {
    super(props)

    this.paramshkscashtranhis = {
      mvLastAction: 'ACCOUNT',
      mvChildLastAction: 'FUNDTRANSFER',
      tradeType: 'FUND',
      start: '0',
      limit: '15',
      key: '211121121112121'
    }

    this.paramsgenfund = {
      mvLastAction: 'OTHERSERVICES',
      mvChildLastAction: 'FUNDTRANSFER'
    }

    this.state = {
      curReceiver: '',
      receivers: [],
      paramsfund: {
        mvBankId: '',
        mvDestClientID: '',
        mvDestBankID: '',
        inputBankName: '',
        inputBankBranch: '',
        mvDestAccountName: 'Test',
        mvAmount: '1000',
        mvTransferType: '',
        mvRemark: 'FUND TRANSFER',
        mvSeriNo: '[5,A][4,f]',
        mvAnswer: '7|4',
        mvSaveAuthenticate: 'true',
        mvPersonCharged: '1',
        mvWithdrawAmt: '1,000,000',
        mvAvaiableAmt: '15,000,000',
        mvTransferFee: '0'
      },
      lgShow: false,
      columns: [
        {
          id: 'transfertype',
          Header: this.props.language.cashtransfer.header.transfertype,
          accessor: 'action',
          skip: false,
          show: true
        }, {
          id: 'transferamount',
          Header: this.props.language.cashtransfer.header.transferamount,
          accessor: 'totalLendingAmt',
          skip: false,
          show: true
        }, {
          id: 'beneficiaryaccount',
          Header: this.props.language.cashtransfer.header.beneficiaryaccount,
          accessor: 'receiveClientID',
          skip: false,
          show: true
        }, {
          id: 'beneficiaryfullname',
          Header: this.props.language.cashtransfer.header.beneficiaryfullname,
          accessor: 'ownerName',
          skip: false,
          show: true
        }, {
          id: 'bankname',
          Header: this.props.language.cashtransfer.header.bankname,
          accessor: 'bankName',
          skip: false,
          show: true
        }, {
          id: 'bankbranch',
          Header: this.props.language.cashtransfer.header.bankbranch,
          accessor: 'bankBranch',
          skip: false,
          show: true
        }, {
          id: 'status',
          Header: this.props.language.cashtransfer.header.status,
          accessor: 'status',
          skip: false,
          show: true
        }, {
          id: 'approvetime',
          Header: this.props.language.cashtransfer.header.approvetime,
          accessor: 'lastApprovaltime',
          skip: false,
          show: true
        }, {
          id: 'date',
          Header: this.props.language.cashtransfer.header.date,
          accessor: 'createTime',
          skip: false,
          show: true
        }, {
          id: 'cancel',
          Header: this.props.language.cashtransfer.header.cancel,
          accessor: 'status',
          Cell: props => {
            if (props.original.status === 'P')
              return (
                <Button name={props.original.tranID} bsClass="hks-btn btn-orderjournal" bsSize="xsmall">
                  <span name={props.original.tranID} className="glyphicon glyphicon-remove"></span>
                </Button>
              )
          },
          sortable: false,
          skip: true,
          show: true
        }
      ],
      formValues: {},
      json: {},
      isShow: false,
      pageIndex: 1
    }
    //this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.onChangeReceiverAcc = this.onChangeReceiverAcc.bind(this);
    this.popupType = 'none';
    this.id = 'cashtransfer'
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      receivers: (nextProps.datagenfund.mvReceiversList == undefined)
        ? []
        : nextProps.datagenfund.mvReceiversList,
      columns: [
        {
          id: 'transfertype',
          Header: nextProps.language.cashtransfer.header.transfertype,
          accessor: 'action',

          skip: false,
          show: true
        }, {
          id: 'transferamount',
          Header: nextProps.language.cashtransfer.header.transferamount,
          accessor: 'totalLendingAmt',

          skip: false,
          show: true
        }, {
          id: 'beneficiaryaccount',
          Header: nextProps.language.cashtransfer.header.beneficiaryaccount,
          accessor: 'receiveClientID',

          skip: false,
          show: true
        }, {
          id: 'beneficiaryfullname',
          Header: nextProps.language.cashtransfer.header.beneficiaryfullname,
          accessor: 'ownerName',

          skip: false,
          show: true
        }, {
          id: 'bankname',
          Header: nextProps.language.cashtransfer.header.bankname,
          accessor: 'bankName',

          skip: false,
          show: true
        }, {
          id: 'bankbranch',
          Header: nextProps.language.cashtransfer.header.bankbranch,
          accessor: 'bankBranch',

          skip: false,
          show: true
        }, {
          id: 'status',
          Header: nextProps.language.cashtransfer.header.status,
          Cell: props => {
            if (props.original.status === 'R')
              return this.props.language.cashtransfer.status.rejected
            else if (props.original.status === 'A')
              return this.props.language.cashtransfer.status.approve
            else if (props.original.status === 'P')
              return this.props.language.cashtransfer.status.pending
            else
              return props.original.status
          },
          skip: false,
          show: true
        }, {
          id: 'approvetime',
          Header: nextProps.language.cashtransfer.header.approvetime,
          accessor: 'lastApprovaltime'
        }, {
          id: 'date',
          Header: nextProps.language.cashtransfer.header.date,
          accessor: 'createTime',

          skip: false,
          show: true
        }, {
          id: 'cancel',
          Header: nextProps.language.cashtransfer.header.cancel,
          accessor: 'status',
          Cell: props => {
            if (props.original.status === 'P')
              return (
                <Button bsClass="hks-btn btn-orderjournal" bsSize="xsmall" onClick={()=>this.openCanceltransfer(props.original.tranID)}>
                  <span className="glyphicon glyphicon-remove"></span>
                </Button>
              )
          },
          sortable: false,
          skip: true,
          show: true
        }
      ]
    });
  }

  //Update paramsfund on user's input change
  handleInputChange(e) {
    // console.log(e.target.name)
    // console.log(this.state.paramsfund)
    //return false if it is radio button
    if (e.target.name == "radioGroup") {
      return false;
    }
    if (e.target.value.trim().length == 0) {
      return false;
    }
    console.log(e.target.name);
    // console.log(this.state.receivers.find(receiver => receiver.receiverAccID === e.target.value))
    // console.log("haha");
    let oldparam = this.state.paramsfund;
    var changeparamAttr
    if (e.target.name == "mvDestClientID") {
      let curReceiver = {
          ...this.state.receivers.find(receiver =>
            receiver.receiverAccID === e.target.value)
      }
      this.setState({curReceiver: curReceiver})
      changeparamAttr = {
        mvDestClientID: e.target.value,
        mvTransferType: curReceiver.receiverAccType
        // receiverName
      }
    } else {
      changeparamAttr = {
        [e.target.name]: e.target.value
      }
    }

    let newparam = {
      ...oldparam,
      ...changeparamAttr
    }
    console.log(newparam)
    this.setState({paramsfund: newparam})
    console.log(this.state.paramsfund)
  }

  // handleChange(date) {}

  render() {
    var data = this.props.data.list === undefined
      ? []
      : this.props.data.list
    var datagenfund = this.props.datagenfund.mvReceiversList === undefined
      ? []
      : this.props.datagenfund.mvReceiversList
    var mreceive = this.props.datagenfund.mvReceiversList === undefined
      ? []
      : this.props.datagenfund.mvReceiversList[0]

    let lgClose = () => this.setState({lgShow: false})

    let buttonAction = [
      <Pagination
              pageIndex={this.state.pageIndex} 
              totalRecord={this.props.data.mvTotalOrders} 
              onPageChange={this.onPageChange.bind(this)}
              onNextPage={this.onNextPage.bind(this)}
              onPrevPage={this.onPrevPage.bind(this)}
              onReloadPage={this.onReloadPage.bind(this)}
          />,
    ]

    return (
      <div style={{height: '100%'}}>
            <div className="component-header" >
                <span className="content-block-head">
                    {this.props.language.menu[this.id]}
                </span>
                <ul className="btn-action">
                    <li className="btn-close">
                        <span className="glyphicon glyphicon-remove" ></span>
                    </li>
                </ul>
            </div>
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
        <div className="component-main cashtransfer">
          <div className="cashtransfer-form">
            <Form onSubmit={this.handleSubmit} id={"form-" + this.id} className={"form-" + this.id} onChange={(e) => this.handleInputChange(e)}>
              <FormGroup>
                <Table responsive>
                  <tbody >
                    <tr>
                      <th>{this.props.language.cashtransfer.header.cashbalance}</th>
                      <td>
                        {this.props.datagenfund.mvBalance}
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.cashwithdrawable}</th>
                      <td>
                        {this.props.datagenfund.mvAvailable}
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.transfertype}</th>
                      <td>
                        <input type='hidden' id="mvStatus" ref={(ref) => this.inputStatus = ref}/> {/* <Radio name="radioGroup" inline onChange={() => {
                          this.inputStatus.value = "External"
                        }} checked="checked" required>
                          <div className="Radiobox">External</div>
                        </Radio>   */}
                        <Radio name="radioGroup" checked={this.state.paramsfund.mvTransferType == "E"
                          ? "checked"
                          : ""} required>
                          <div className="Radiobox">External</div>
                        </Radio>
                        <Radio name="radioGroup" checked={this.state.paramsfund.mvTransferType == "I" || this.state.paramsfund.mvTransferType == ""
                          ? "checked"
                          : ""}>
                          <div className="Radiobox">Internal</div>
                        </Radio>
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.beneficiaryaccountnumber}</th>
                      <td>
                        <select name="mvDestClientID" value={this.state.paramsfund.mvDestClientID}>
                          <option></option>
                          {(this.state.receivers == undefined)
                            ? []
                            : this.state.receivers.map((reciever => <option key={reciever.receiverAccID} value={reciever.receiverAccID}>{reciever.receiverAccID}</option>))};
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.accounttype}</th>
                      <td>
                        {this.props.language.cashtransfer.header.bankordertype}
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.beneficiaryfullname}</th>
                      <td>
                        {/* <input name="beneficiaryfullname" value={mreceive.receiverName} id="beneficiaryfullname" style={{width: "180px"}} required /> */}
                        <input name="beneficiaryfullname" id="beneficiaryfullname" style={{
                          width: "180px"
                        }} required value={this.state.curReceiver==''?'':this.state.curReceiver.receiverName}/>
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.bankname}</th>
                      <td>
                        {/* <input name="bankname" value={mreceive.receiverBankName} id="bankname" style={{width: "180px"}} required /> */}
                        <input name="bankname" id="bankname" style={{
                          width: "180px"
                        }} required value={this.state.curReceiver==''?'':this.state.curReceiver.receiverBankName}/>
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.bankbranch}</th>
                      <td>
                        <input name="bankbranch" id="bankbranch" style={{
                          width: "180px"
                        }} required/>
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.transferamount}</th>
                      <td>
                        <input name="transferamount" id="transferamount" style={{
                          width: "180px"
                        }} required type="number"/>
                      </td>
                    </tr>
                    <tr>
                      <th>{this.props.language.cashtransfer.header.remark}</th>
                      <td>
                        <textarea rows="3" cols="26"></textarea>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="group-btn-action cashtransfer-action">
                  <span>
                    {/* <Button className="btn btn-default" onClick={this.getranSubmit.bind(this)} type="submit" className="submit"> */}
                    <Button className="btn btn-default" type="submit" className="submit">
                      Submit
                    </Button>
                    <Button className="btn btn-default" type="reset" className="cancel">Cancel</Button>
                  </span>
                </div>
              </FormGroup>
              <Popup id='cashtransfer' show={this.state.isShow} onHide={lgClose} json={this.state.json} error={this.props.isError} mvStockBean={this.props.mvStockBean} language={this.props.language} title={this.props.language.enterorder.popup.title}/>
            </Form>
            <div className="title" style={this.props.theme.porfolio.titlestock}>
              <span>{this.props.language.cashtransfer.header.cashtransferplace}</span>
            </div>
          </div>
          <div className="cashtransfer-history">
            <div className="table-main">
              <DataUpperTable id={this.id + "-table"} language={this.props.language.cashtransfer.header} columns={this.state.columns} data={data} maxRows={18} defaultPageSize={20}/>
            </div>
            <div className="table-header">
              <div className="title" style={this.props.theme.porfolio.titlestock}>
                <span>{this.props.language.cashtransfer.header.cashtransfertransaction}</span>
              </div>

              <SearchBar id={this.id} onSearch={[]} buttonAction={buttonAction} stockList={[]} language={this.props.language.searchbar} theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)} hideSearchButton={true} param={['dropdown']}/>
            </div>
            {/* <Popup
                        id="canceltransfer"
                        show={this.state.lgShow}
                        onHide={lgClose}
                        language={this.props.language}
                        popupType={this.popupType}
                        title="CancelTransfer" /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  onChangeStateColumn(e) {
    const id = e.target.id
    this.setState({
      columns: this.state.columns.map(el => el.id === id
        ? Object.assign(el, {
          show: !el.show
        })
        : el)
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

  handleSubmit(e) {
    e.preventDefault()
    // this.setState({ isShow: true })
    // let advPayment = document.getElementById('txtAdvancePayment').value
    // this.props.beforeSubmit(advPayment, this.props.LocalAdvance.mvAdvanceBean, this.props.language)

    //check if transfer amount is over available amount
    // if(this.props.datagenfundtransfer.transferamount > this.props.datagenfundtransfer.mvAvaiableAmt){}
    this.props.beforeSubmit(this.state.paramsfund, this.props.datagenfund, this.props.language)
  }

  // onChange(e) {
  //   e.preventDefault();
  //   let formValues = this.state.formValues;
  //   let name = e.target.name;
  //   let value = e.target.value;
  //
  //   formValues[name] = value;
  //   this.setState({formValues})
  // }

  onPageChange(pageIndex) {
    console.log(this.id + ' onPageChange', pageIndex)
    this.setState({pageIndex: pageIndex});
  }

  componentDidMount() {
    this.props.gethkscashtranhis(this.paramshkscashtranhis);
    this.props.getgenfundtransfer(this.paramsgenfund);
  }



  openCanceltransfer(tranID) {
    // this.setState({lgShow: true});
    // this.title = "CancelTransfer"
    // this.popupType = 'CANCELCASHTRANFER'
    var targetTxn = this.props.data.list.find(x=>x.tranID==tranID);
    console.log(tranID);
    this.props.beforeCancelFundTransfer(targetTxn.tranID, targetTxn.status, this.props.language, this.onReloadPage)

  }
}

const mapStateToProps = (state) => {
  return {data: state.cashtransfer.datahkscashtranhis, datagenfund: state.cashtransfer.datagenfundtransfer}
}

const mapDispatchToProps = (dispatch, props) => ({
  gethkscashtranhis: (paramshkscashtranhis) => {
    dispatch(actions.gethksCachTranHis(paramshkscashtranhis))
  },
  beforeCancelFundTransfer: (tranID, status, language, callback) => {
    dispatch(actions.beforeCancelFundTransfer(tranID, status, language, callback))
  },
  getgenfundtransfer: (paramsgenfund) => {
    dispatch(actions.getGenfundtransfer(paramsgenfund))
  },
  onShowMessageBox: (type, message) => {
    dispatch(actions.showMessageBox(type, message))
  },
  //Nguyen
  beforeSubmit: (paramsTransfer, mvTransferBean, language) => {
    dispatch(actions.beforeSubmitCashTransfer(paramsTransfer, mvTransferBean, language))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CashTransfer);
