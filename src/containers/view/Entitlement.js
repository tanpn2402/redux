import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import '../../css/App.css'
import moment from 'moment'
import Popup from '../Popup'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import SearchBar from '../SearchBar'
import Footer from '../DataTableFooter'

class Entitlement extends Component {
  constructor(props) {
    super(props)

    this.paramsright = {
        mvActionType: '',
        mvStockId: '',
        mvStartDate: '',
        mvEndDate: '',
        key: '',
        start: '',
        limit: '',
        page: '',
        _dc: ''
      },
    this.paramsaddition = {
        mvLastAction: '',
        mvChildLastAction: '',
        key: '',
        start: '',
        limit: '',
      },
      this.paramshis= {
        mvLastAction: '',
        mvChildLastAction: '',
        mvStockId: '',
        mvStartDate: '',
        mvEndDate: '',
        key: '',
        start: '',
        limit: '',
      }

      this.state = {
        columns: [
              {
                  id: 'stockId',
                  Header: this.props.language.entitlement.header.stock,
                  accessor: 'stockId',
                  width: 80,
                  skip: false,
                  show: true,
              },
              {
                  id: 'typeDescription',
                  Header: this.props.language.entitlement.header.actiontype,
                  accessor: 'typeDescription',
                  width: 80,
                  skip: false,
                  show: true,
              },
              {
                id: 'bookCloseDate',
                Header: this.props.language.entitlement.header.recorddate,
                accessor: 'bookCloseDate',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'totalBonusRight',
                Header: this.props.language.entitlement.header.owningvolume,
                accessor: 'totalBonusRight',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'cashRate',
                Header: this.props.language.entitlement.header.ratecash,
                accessor: 'cashRate',
                width: 50,
                skip: false,
                show: true,
              },
              {
                id: 'stockRate',
                Header: this.props.language.entitlement.header.rate,
                accessor: 'stockRate',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'price',
                Header: this.props.language.entitlement.header.pervalue,
                accessor: 'price',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'totalScript',
                Header: this.props.language.entitlement.header.recievecash,
                accessor: 'totalScript',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'totalIssue',
                Header: this.props.language.entitlement.header.receivedstock,
                accessor: 'totalIssue',
                width: 80,
                skip: false,
                show: true,
              },
              {
                id: 'status',
                Header: this.props.language.entitlement.header.status,
                accessor: 'status',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'payableDate',
                Header: this.props.language.entitlement.header.payabledate,
                accessor: 'payableDate',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'paidDate',
                Header: this.props.language.entitlement.header.paiddate,
                accessor: 'paidDate',
                width: 80,
                skip: false,
                show: true,
            }],
            columns2: [
            {
                id: 'stock',
                Header: this.props.language.entitlement.header.stock,
                accessor: 'stockId',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'recorddate',
                Header: this.props.language.entitlement.header.recorddate,
                accessor: 'bookCloseDate',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'owningvolume',
                Header: this.props.language.entitlement.header.owningvolume,
                accessor: 'totalBonusRight',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'rightrate',
                Header: this.props.language.entitlement.header.rightrate,
                accessor: 'rightRate',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'actionrate',
                Header: this.props.language.entitlement.header.actionrate,
                accessor: 'actionRate',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'availableqty',
                Header: this.props.language.entitlement.header.availableqty,
                accessor: 'maxQtyCanBuy',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'actionprice',
                Header: this.props.language.entitlement.header.actionprice,
                accessor: 'price',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'startdate',
                Header: this.props.language.entitlement.header.startdate,
                accessor: 'startDate',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'transferdeadline',
                Header: this.props.language.entitlement.header.transferdeadline,
                accessor: 'bookCloseDate',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'registerdeadline',
                Header: this.props.language.entitlement.header.registerdeadline,
                accessor: 'transenddate',
                width: 80,
                skip: false,
                show: true,
            }],

            columns3: [
            {
                id: 'createTime',
                Header: this.props.language.entitlement.header.registerdate,
                accessor: 'createTime',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'tradeStockCode',
                Header: this.props.language.entitlement.header.stock,
                accessor: 'tradeStockCode',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'resultQty',
                Header: this.props.language.entitlement.header.volume,
                accessor: 'resultQty',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'price',
                Header: this.props.language.entitlement.header.actionprice,
                accessor: 'price',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'appliedAmt',
                Header: this.props.language.entitlement.header.amount,
                accessor: 'appliedAmt',
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'paiddate',
                Header: this.props.language.entitlement.header.paiddate,
                width: 80,
                skip: false,
                show: true,
            },
            {
                id: 'status',
                Header: this.props.language.entitlement.header.status,
                accessor: 'status',
                width: 80,
                skip: false,
                show: true,
            }],
            formValues: {},
            json: {},
            isShow: false,
            pageIndex: 1,
        }

        this.id = 'entitlement'
        this.pageIndex = 1

        //this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        var datarightlist = this.props.datarightlist.rightList === undefined ? [] : this.props.datarightlist.rightList
        var dataadditionalsharelist = this.props.dataadditionalsharelist.additionList === undefined ? [] : this.props.dataadditionalsharelist.additionList
        var datahistorylist = this.props.datahistorylist.historyList === undefined ? [] : this.props.datahistorylist.historyList
        let lgClose = () => this.setState({ isShow: false })
        return (
          <div id={this.id +'-body'} className="layout-body">
            <div className="col-md-4">
              <div className="title" style={this.props.theme.porfolio.titlestock}>
                <span>{this.props.language.entitlement.header.entitlementplace}</span>
              </div>
              <Form onSubmit={this.handleSubmit} id="form-enterorder">
                <FormGroup>
                  <Table responsive >
                    <tbody >
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.bankaccount}</th>
                        <td>
                          <input id="mvBank" list="Bank" name="bank" id="mvBank" required />
                            <datalist id="Bank">
                              <option value="ACB-125137309"/>
                              <option value="MAS"/>
                            </datalist>
                          </td>
                      </tr>
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.cashbalance}</th>
                        <td>
                          <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
                        </td>
                      </tr>
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.cashavailable}</th>
                        <td>
                          <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
                        </td>
                      </tr>
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.buyingpower}</th>
                        <td>
                          <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
                        </td>
                      </tr>
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.stockcode}</th>
                        <td>
                            <input id="mvBank" list="Bank" name="bank" id="mvBank" required />
                            <datalist id="Bank">
                                <option value="ACB-125137309" />
                            </datalist>
                        </td>
                      </tr>
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.availableqty}</th>
                        <td>
                          <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
                        </td>
                      </tr>
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.registerqty}</th>
                        <td>
                          <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
                        </td>
                      </tr>
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.actionprice}</th>
                        <td>
                          <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
                        </td>
                      </tr>
                      <tr>
                        <th className="enterorder">{this.props.language.entitlement.header.amountVND}</th>
                        <td>
                          <input type="hidden" name="cashwithdrawable" id="cashwithdrawable" required />
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
                  id='entitlement'
                  show={this.state.isShow}
                  onHide={lgClose}
                  json={this.state.json}
                  error={this.props.isError}
                  mvStockBean={this.props.mvStockBean}
                  language={this.props.language}
                  title = {this.props.language.enterorder.popup.title}/>
              </Form>
            </div>
            <div className="col-md-8">
              <div>
                <div className="title" style={this.props.theme.porfolio.titlestock}>
                  <span>{this.props.language.entitlement.header.corporateactionlist}</span>
                </div>
                  <SearchBar
                    id={this.id}
                    onSearch={this.onSearch1.bind(this)}
                    buttonAction={[]}
                    stockList={this.props.stockList}
                    language={this.props.language.searchbar}
                    theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    param={['mvActionType', 'mvStockId', 'mvStartDate', 'mvEndDate']}/>
  	          	  <DataTable
                    id={this.id + "-table"}
                    language={this.props.language.entitlement.header}
                    columns={this.state.columns}
                    defaultPageSize={7}
                    data={datarightlist.slice((this.state.pageIndex - 1) * 8 + 1, this.state.pageIndex * 8 + 1)}/>
                  <Footer
                    pageIndex={this.state.pageIndex}
                    totalRecord={datarightlist.length}
                    onPageChange={this.onPageChange.bind(this)}/>
              </div>
              <div>
                <div className="title" style={this.props.theme.porfolio.titlestock}>
                  <span>{this.props.language.entitlement.header.additionalissuesharesinformation}</span>
                </div>
                  <DataTable
                    id={this.id + "-table"}
                    language={this.props.language.entitlement.header}
                    columns={this.state.columns2}
                    defaultPageSize={5}
                    data={dataadditionalsharelist}/>
              </div>
              <div>
                <div className="title" style={this.props.theme.porfolio.titlestock}>
                  <span>{this.props.language.entitlement.header.additionalissuesharesbuyinghistory}</span>
                </div>
                  <SearchBar
                    id={this.id}
                    onSearch={this.onSearch2.bind(this)}
                    buttonAction={[]}
                    stockList={this.props.stockList}
                    language={this.props.language.searchbar}
                    theme={this.props.theme}
                    columns={this.state.columns3}
                    onChangeStateColumn={this.onChangeStateColumn2.bind(this)}
                    param={['mvStockId', 'mvStartDate', 'mvEndDate']}/>
                  <DataTable
                    id={this.id + "-table"}
                    language={this.props.language.entitlement.header}
                    columns={this.state.columns3}
                    defaultPageSize={7}
                    data={datahistorylist.slice((this.state.pageIndex - 1) * 8 + 1, this.state.pageIndex * 8 + 1)}/>
                  <Footer
                    pageIndex={this.state.pageIndex}
                    totalRecord={datahistorylist.length}
                    onPageChange={this.onPageChange.bind(this)}/>
              </div>
            </div>
          </div>
        );
    }
    onSearch1(param){
      this.paramsright['mvActionType']= 'ALL'
      this.paramsright['start'] = ( this.pageIndex - 1 )*15
      this.paramsright['limit'] = 15
      this.paramsright['mvStockId'] = param['mvStockId']
      this.paramsright['mvStartDate'] = param['mvStartDate']
      this.paramsright['mvEndDate'] = param['mvEndDate']
      this.paramsright['key']= new Date().getTime()
      this.paramsright['page']= 1
      
      this.props.onSearch1(this.paramsright, !this.props.reload)
    }

    onSearch2(param){
      this.paramshis['mvLastAction']='OTHERSERVICES'
      this.paramshis['mvChildLastAction']='ENTITLEMENT'
      this.paramshis['start'] = ( this.pageIndex - 1 )*15
      this.paramshis['limit'] = 15
      this.paramshis['mvStockId'] = param['mvStockId']
      this.paramshis['mvStartDate'] = param['mvStartDate']
      this.paramshis['mvEndDate'] = param['mvEndDate']
      this.paramsright['key']= new Date().getTime()
      this.paramsright['page']= 1

      this.props.onSearch2(this.paramshis, !this.props.reload)
    }

    onChangeStateColumn(e){
      const id = e.target.id
      this.setState({
          columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
      });
    }

    onChangeStateColumn2(e){
      const id = e.target.id
      this.setState({
          columns: this.state.columns3.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
      });
    }

    handleSubmit(e) {
    }

    onChange(e) {
    }

    onPageChange(pageIndex){
      console.log(this.id + ' onPageChange', pageIndex)
      this.setState({pageIndex: pageIndex });
    }

    componentDidMount() {
      this.props.getEntitlementadditional('', !this.props.reload);
      this.props.onSearch1(this.params);
    }
}

const mapStateToProps = (state) => {
    return {
        datarightlist: state.entitlement.datarightlist,
        dataadditionalsharelist: state.entitlement.dataadditionalsharelist,
        datahistorylist: state.entitlement.datahistorylist,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch1: (paramsright) => {
      dispatch(actions.getRightlist(paramsright))
      },
    onSearch2: (paramshis) => {
      dispatch(actions.getHistorylist(paramshis))
      },
    getEntitlementadditional: () => {
      dispatch(actions.getAdditionalshareinfo({mvLastAction: '', mvChildLastAction: '', key: '', start:'', limit:''}))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(Entitlement);
