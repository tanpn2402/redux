import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import '../../css/App.css'
import moment from 'moment'
import Popup from '../Popup'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import Footer from '../DataTableFooter'

class CashTransfer extends Component {
  constructor(props) {
    super(props)

    this.paramsfund = {
      mvBankIdL: 'MAS',
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
      mvTransferFee: '0',
    }

    this.paramshkscashtranhis = {
      mvLastAction: 'ACCOUNT',
      mvChildLastAction: 'FUNDTRANSFER',
      tradeType: 'FUND',
      start: '0',
      limit: '20',
      key: '211121121112121',
    }

    this.paramsgenfund = {
      mvLastAction: 'OTHERSERVICES',
      mvChildLastAction: 'FUNDTRANSFER',
    }

      this.state = {
        columns: [
          {
            id: 'transfertype',
            Header: this.props.language.cashtransfer.header.transfertype,
    		    accessor: 'action',
    		  },
    		  {
            id: 'transferamount',
            Header: this.props.language.cashtransfer.header.transferamount,
    		    accessor: 'totalLendingAmt',
    		  },
          {
            id: 'beneficiaryaccount',
            Header: this.props.language.cashtransfer.header.beneficiaryaccount,
    		    accessor: 'receiveClientID',
    		  },
    		  {
            id: 'beneficiaryfullname',
            Header: this.props.language.cashtransfer.header.beneficiaryfullname,
    		    accessor: 'ownerName',
    		  },
          {
            id: 'bankname',
            Header: this.props.language.cashtransfer.header.bankname,
    		    accessor: 'bankName',
    		  },
    		  {
            id: 'bankbranch',
            Header: this.props.language.cashtransfer.header.bankbranch,
    		    accessor: 'bankBranch',
    		  },
          {
            id: 'status',
            Header: this.props.language.cashtransfer.header.status,
    		    accessor: 'status',
    		  },
    		  {
            id: 'approvetime',
            Header: this.props.language.cashtransfer.header.approvetime,
    		    accessor: 'lastApprovaltime',
    		  },
          {
            id: 'date',
            Header: this.props.language.cashtransfer.header.date,
    		    accessor: 'createTime',
    		  },
    		  {
            id: 'cancel',
            Header: this.props.language.cashtransfer.header.cancel,
    		  }
          ],
            formValues: {},
            json: {},
            isShow: false,
            pageIndex: 1,
        }
        //this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.id = 'cashtransfer'
    }

    getranSubmit() {
      this.props.gettranSubmit()
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        columns: [
          {
            id: 'transfertype',
            Header: nextProps.language.cashtransfer.header.transfertype,
            accessor: 'action',
          },
          {
            id: 'transferamount',
            Header: nextProps.language.cashtransfer.header.transferamount,
            accessor: 'totalLendingAmt',
          },
          {
            id: 'beneficiaryaccount',
            Header: nextProps.language.cashtransfer.header.beneficiaryaccount,
            accessor: 'receiveClientID',
          },
          {
            id: 'beneficiaryfullname',
            Header: nextProps.language.cashtransfer.header.beneficiaryfullname,
            accessor: 'ownerName',
          },
          {
            id: 'bankname',
            Header: nextProps.language.cashtransfer.header.bankname,
            accessor: 'bankName',
          },
          {
            id: 'bankbranch',
            Header: nextProps.language.cashtransfer.header.bankbranch,
            accessor: 'bankBranch',
          },
          {
            id: 'status',
            Header: nextProps.language.cashtransfer.header.status,
            accessor: 'status',
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
          },
          {
            id: 'cancel',
            Header: nextProps.language.cashtransfer.header.cancel,
          }]
      });
    }

    handleInputChange(event) {
    }

    handleChange(date) {
    }

    render() {
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        let lgClose = () => this.setState({ isShow: false })
        return (
            <div id={this.id +'-body'} className="layout-body">
              <div className="col-sm-4" style={{ paddingRight:"5px", paddingLeft: "0px", }}>
                <div className="title" style={this.props.theme.porfolio.titlestock}>
                  <span>{this.props.language.cashtransfer.header.cashtransferplace}</span>
                </div>
                <Form onSubmit={this.handleSubmit} id={"form-" + this.id} className={"form-" + this.id}>
                  <FormGroup>
                    <Table responsive >
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
                            <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
                          </td>
                        </tr>
                        <tr>
                          <th>{this.props.language.cashtransfer.header.transfertype}</th>
                          <td>
                            <input type='hidden' id="mvStatus" ref={(ref) => this.inputStatus = ref} />
                            <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "External" }} checked="checked" required>
                              <div className="Radiobox">External</div>
                            </Radio>
                            <Radio name="radioGroup" inline onChange={() => { this.inputStatus.value = "Internal" }}>
                              <div className="Radiobox">Internal</div>
                            </Radio>
                          </td>
                        </tr>
                        <tr>
                          <th>{this.props.language.cashtransfer.header.beneficiaryaccountnumber}</th>
                            <td>
                              <input list="beneficiaryaccountnumber" name="bank" id="beneficiaryaccountnumber" style={{width: "180px"}} required />
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
                              <input name="beneficiaryfullname" id="beneficiaryfullname" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th>{this.props.language.cashtransfer.header.bankname}</th>
                            <td>
                              <input name="bankname" id="bankname" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th>{this.props.language.cashtransfer.header.bankbranch}</th>
                            <td>
                              <input name="bankbranch" id="bankbranch" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th>{this.props.language.cashtransfer.header.transferamount}</th>
                            <td>
                              <input name="transferamount" id="transferamount" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th>{this.props.language.cashtransfer.header.remark}</th>
                            <td>
                              <textarea rows="3" cols="26">
                              </textarea>
                            </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="group-btn-action cashtransfer-action">
                        <span>
                            <Button className="btn btn-default" onClick={this.getranSubmit.bind(this)} type="submit" className="submit">
                                Submit
                            </Button>
                            <Button className="btn btn-default" type="reset" className="cancel">Cancel</Button>
                        </span>
                    </div>
                            

                  </FormGroup>
                  <Popup
                    id='cashtransfer'
                    show={this.state.isShow}
                    onHide={lgClose}
                    json={this.state.json}
                    error={this.props.isError}
                    mvStockBean={this.props.mvStockBean}
                    language={this.props.language}
                    title = {this.props.language.enterorder.popup.title}/>
                </Form>
              </div>
              <div className="col-sm-8" style={{paddingRight:"0px", paddingLeft: "5px",}}>
                <div className="title" style={this.props.theme.porfolio.titlestock}>
  		         		<span>{this.props.language.cashtransfer.header.cashtransfertransaction}</span>
  		          </div>
                <div>
  	          		<DataTable
                    id={this.id + "-table"}
                    language={this.props.language.cashtransfer.header}
                    columns={this.state.columns}
                    data={data}/>
                  <Footer
                    pageIndex={this.state.pageIndex}
                    totalRecord={data.length}
                    onPageChange={this.onPageChange.bind(this)}/>
  	        		</div>
              </div>
            </div>
        );
    }

    handleSubmit(e) {
      e.preventDefault();
    }

    onChange(e) {
    }

    onPageChange(pageIndex){
      console.log(this.id + ' onPageChange', pageIndex)
      this.setState({pageIndex: pageIndex });
    }

    componentDidMount() {
      this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload);
      this.props.getgenfundtransfer(this.paramsgenfund, !this.props.reload);
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.cashtransfer.datahkscashtranhis,
        datagenfund: state.cashtransfer.datagenfundtransfer,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    gethkscashtranhis: (paramshkscashtranhis) => {
        dispatch(actions.gethksCachTranHis(paramshkscashtranhis))
      },
    gettranSubmit: (paramsfund) => {
      dispatch(actions.getFundtransfer(paramsfund))
    },
    getgenfundtransfer: (paramsgenfund) => {
      dispatch(actions.getGenfundtransfer(paramsgenfund))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CashTransfer);
