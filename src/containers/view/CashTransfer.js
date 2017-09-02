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
            limit: '15',
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
                    Cell: props => { if((props.value == 'Đang chờ')||(props.value == 'Pending'))
                                        return (
                                            <button onSubmit={this.handleSubmit}>Cancel</button>
                                        )
                                   },
                    sortable: false,
                    skip: true,
            show: true,
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
        this.popupType='none';
        this.id = 'cashtransfer'
    }

    getranSubmit() {
        this.props.gettranSubmit()
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
                    accessor: 'status',

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
                    Cell: props => {  if((props.value == 'Đang chờ')||(props.value == 'Pending'))
                                        return (
                                            <button onSubmit={this.handleSubmit}>Cancel</button>
                                        )
                                   },
                    sortable: false,
                    skip: true,
            show: true,
          }]
        });
    }

    handleInputChange(event) {}

    handleChange(date) {}

    render() {
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        var datagenfund = this.props.datagenfund.mvReceiversList === undefined ? []: this.props.datagenfund.mvReceiversList
        var mreceive = this.props.datagenfund.mvReceiversList === undefined ? []: this.props.datagenfund.mvReceiversList[0]

        data.map(e => {
          if(e.status === 'R')
              e.status = this.props.language.cashtransfer.status.rejected;
          if(e.status === 'A')
              e.status = this.props.language.cashtransfer.status.approve;
          if(e.status === 'P')
              e.status = this.props.language.cashtransfer.status.pending;
      })

        let lgClose = () => this.setState({ isShow: false })

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
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
            <div className="component-main cashtransfer">
                <div className="cashtransfer-form">
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
                                            {this.props.datagenfund.mvAvailable}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.transfertype}</th>
                                        <td>
                                            <input type='hidden' id="mvStatus" ref={(ref) => this.inputStatus = ref} />
                                            <Radio name="radioGroup" inline onChange={() =>
                                                { this.inputStatus.value = "External" }} checked="checked" required>
                                                <div className="Radiobox">External</div>
                                            </Radio>
                                            <Radio name="radioGroup" inline disabled onChange={() =>
                                                { this.inputStatus.value = "Internal" }}>
                                                <div className="Radiobox">Internal</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.beneficiaryaccountnumber}</th>
                                        <td>
                                          <select>
                                            <option>{mreceive.receiverAccID}</option>
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
                                            <input name="beneficiaryfullname" value={mreceive.receiverName} id="beneficiaryfullname" style={{width: "180px"}} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{this.props.language.cashtransfer.header.bankname}</th>
                                        <td>
                                            <input name="bankname" value={mreceive.receiverBankName} id="bankname" style={{width: "180px"}} required />
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
                    <div className="title" style={this.props.theme.porfolio.titlestock}>
                        <span>{this.props.language.cashtransfer.header.cashtransferplace}</span>
                    </div>
                </div>
                <div className="cashtransfer-history">
                    <div className="table-main">
                        <DataUpperTable
                            id={this.id + "-table"}
                            language={this.props.language.cashtransfer.header}
                            columns={this.state.columns}
                            data={data.slice((this.state.pageIndex-1)*6, this.state.pageIndex*6)}
                            maxRows={18}
                            defaultPageSize={20}/>
                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.cashtransfer.header.cashtransfertransaction}</span>
                        </div>
                   
                        <SearchBar
                            id={this.id}
                            onSearch={[]}
                            buttonAction={buttonAction}
                            stockList={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            columns={this.state.columns}
                            onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                            hideSearchButton={true}
                            param={['dropdown']} />
                    </div>

                </div>
            </div>
            </div>
        );
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

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isShow: true })
    }

    onChange(e) {
      e.preventDefault();
      let formValues = this.state.formValues;
      let name = e.target.name;
      let value = e.target.value;

      formValues[name] = value;
      this.setState({ formValues })
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
