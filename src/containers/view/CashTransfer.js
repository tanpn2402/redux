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
    super(props);
      this.state = {
        columns: [
          {
            id: 'transfertype',
            Header: this.props.language.cashtransfer.header.transfertype,
    		    accessor: 'transType',
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

    componentWillReceiveProps(nextProps){
      this.setState({
        columns: [
          {
            id: 'transfertype',
            Header: nextProps.language.cashtransfer.header.transfertype,
            accessor: 'transType',
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
          }
          ]
      });
    }

    handleInputChange(event) {
    }

    handleChange(date) {
    }

    render() {
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        console.log(this.props.data.list);
        console.log(this.props.data2.mvBalance);
        let lgClose = () => this.setState({ isShow: false })
        return (
            <div id={this.id +'-body'} className="layout-body">
              <div className="col-md-4" style={{marginLeft: "-15px"}}>
                <div className="title" style={this.props.theme.porfolio.titlestock}>
                  <span>{this.props.language.cashtransfer.header.cashtransferplace}</span>
                </div>
                <Form onSubmit={this.handleSubmit} id="form-enterorder">
                  <FormGroup>
                    <Table responsive >
                      <tbody >
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.cashbalance}</th>
                          <td>
                            {this.props.data2.mvBalance}
                          </td>
                        </tr>
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.cashwithdrawable}</th>
                          <td>
                            <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
                          </td>
                        </tr>
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.transfertype}</th>
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
                          <th className="enterorder">{this.props.language.cashtransfer.header.beneficiaryaccountnumber}</th>
                            <td>
                              <input list="beneficiaryaccountnumber" name="bank" id="beneficiaryaccountnumber" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.accounttype}</th>
                            <td>
                              {this.props.language.cashtransfer.header.bankordertype}
                            </td>
                        </tr>
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.beneficiaryfullname}</th>
                            <td>
                              <input name="beneficiaryfullname" id="beneficiaryfullname" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.bankname}</th>
                            <td>
                              <input name="bankname" id="bankname" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.bankbranch}</th>
                            <td>
                              <input name="bankbranch" id="bankbranch" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.transferamount}</th>
                            <td>
                              <input name="transferamount" id="transferamount" style={{width: "180px"}} required />
                            </td>
                        </tr>
                        <tr>
                          <th className="enterorder">{this.props.language.cashtransfer.header.remark}</th>
                            <td>
                              <input style={{height: "100px", width: "180px"}} name="remark" id="remark" required />
                            </td>
                        </tr>
                        <tr>
                          <th>
                            <div className="button">
                            <Button className="btn btn-default" type="submit" className="submit">Submit</Button>
                            </div>
                          </th>
                          <td>
                            <div className="button">
                            <Button className="btn btn-default" type="reset" className="cancel">Cancel</Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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
              <div className="col-md-8" style={{padding:"0px"}}>
                <div className="title" style={this.props.theme.porfolio.titlestock}>
  		         		<span>{this.props.language.cashtransfer.header.cashtransfertransaction}</span>
  		          </div>
                <div>
  	          		<DataTable
                    id={this.id + "-table"}
                    language={this.props.language.cashtransfer.header}
                    columns={this.state.columns}
                    data={data.slice((this.state.pageIndex - 1) * 15 + 1, this.state.pageIndex * 15 + 1)}/>
                  <Footer pageIndex={this.state.pageIndex} totalRecord={data.length} onPageChange={this.onPageChange.bind(this)}/>
  	        		</div>
              </div>
            </div>
        );
    }

    handleSubmit(e) {
    }

    onChange(e) {
    }

    onPageChange(pageIndex){
    }

    componentDidMount() {
      this.props.getdatacashtransfer()
      this.props.getdatacashtable()
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.cashtransfer.datacashtransfer,
        data2: state.cashtransfer.datacashtable,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getdatacashtransfer: () => {
        dispatch(actions.getCashtransfer())
      },
    getdatacashtable: () => {
        dispatch(actions.getCashdatatable())
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(CashTransfer);
