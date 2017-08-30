import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import '../../css/App.css'
import moment from 'moment'
import Popup from '../Popup'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import SearchBar from '../commons/SearchBar'
import Footer from '../DataTableFooter'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'

class Entitlement extends Component {
    constructor(props) {
        super(props)

        this.paramsdynamic = {
            FirstTime: '',
            key: '1503634889395',
            mvTimelyUpdate: 'N',
            dynCashBalance: true,
        }

        this.paramsright = {
            mvActionType: '',
            mvStockId: '',
            mvStartDate: '24/08/2017',
            mvEndDate: '24/08/2017',
            key: '1234',
            start: '0',
            limit: '15',
        }

        this.paramsaddition = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ENTITLEMENT',
            key: '4567',
            start: '0',
            limit: '15',
        }

        this.paramshis = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ENTITLEMENT',
            mvStockId: '',
            mvStartDate: '24/08/2017',
            mvEndDate: '24/08/2017',
            key: '565656556',
            start: '0',
            limit: '15',
        }

        this.state = {
            columns: [
                {
                    id: '1',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'stockId',
                    width: 80,
                    skip: false,
                    show: true,
              },
                {
                    id: '2',
                    Header: this.props.language.entitlement.header.actiontype,
                    accessor: 'typeDescription',
                    width: 80,
                    skip: false,
                    show: true,
              },
                {
                    id: '3',
                    Header: this.props.language.entitlement.header.recorddate,
                    accessor: 'bookCloseDate',
                    width: 80,
                    skip: false,
                    show: true,
              },
                {
                    id: '4',
                    Header: this.props.language.entitlement.header.owningvolume,
                    accessor: 'totalBonusRight',
                    width: 80,
                    skip: false,
                    show: true,
              },
                {
                    id: '5',
                    Header: this.props.language.entitlement.header.ratecash,
                    accessor: 'cashRate',
                    width: 50,
                    skip: false,
                    show: true,
              },
                {
                    id: '6',
                    Header: this.props.language.entitlement.header.rate,
                    accessor: 'stockRate',
                    width: 80,
                    skip: false,
                    show: true,
              },
                {
                    id: '7',
                    Header: this.props.language.entitlement.header.pervalue,
                    accessor: 'price',
                    width: 80,
                    skip: false,
                    show: true,
              },
                {
                    id: '8',
                    Header: this.props.language.entitlement.header.recievecash,
                    accessor: 'totalScript',
                    width: 80,
                    skip: false,
                    show: true,
              },
                {
                    id: '9',
                    Header: this.props.language.entitlement.header.receivedstock,
                    accessor: 'totalIssue',
                    width: 80,
                    skip: false,
                    show: true,
              },
                {
                    id: '10',
                    Header: this.props.language.entitlement.header.status,
                    accessor: 'status',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '11',
                    Header: this.props.language.entitlement.header.payabledate,
                    accessor: 'payableDate',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '12',
                    Header: this.props.language.entitlement.header.paiddate,
                    accessor: 'paidDate',
                    width: 80,
                    skip: false,
                    show: true,
            }],
            columns2: [
                {
                    id: '13',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'stockId',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '14',
                    Header: this.props.language.entitlement.header.recorddate,
                    accessor: 'bookCloseDate',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '15',
                    Header: this.props.language.entitlement.header.owningvolume,
                    accessor: 'totalBonusRight',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '16',
                    Header: this.props.language.entitlement.header.rightrate,
                    accessor: 'rightRate',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '17',
                    Header: this.props.language.entitlement.header.actionrate,
                    accessor: 'actionRate',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '18',
                    Header: this.props.language.entitlement.header.availableqty,
                    accessor: 'maxQtyCanBuy',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '19',
                    Header: this.props.language.entitlement.header.actionprice,
                    accessor: 'price',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '20',
                    Header: this.props.language.entitlement.header.startdate,
                    accessor: 'startDate',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '21',
                    Header: this.props.language.entitlement.header.transferdeadline,
                    accessor: 'bookCloseDate',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '22',
                    Header: this.props.language.entitlement.header.registerdeadline,
                    accessor: 'transenddate',
                    width: 80,
                    skip: false,
                    show: true,
            }],

            columns3: [
                {
                    id: '23',
                    Header: this.props.language.entitlement.header.registerdate,
                    accessor: 'createTime',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '24',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'stockId',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '25',
                    Header: this.props.language.entitlement.header.volume,
                    accessor: 'resultQty',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '26',
                    Header: this.props.language.entitlement.header.actionprice,
                    accessor: 'price',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '27',
                    Header: this.props.language.entitlement.header.amount,
                    accessor: 'appliedAmt',
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '28',
                    Header: this.props.language.entitlement.header.paiddate,
                    width: 80,
                    skip: false,
                    show: true,
            },
                {
                    id: '29',
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

    handleInputChange(event) {}

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    getEntitlementSubmit() {
        this.props.getEntitlementSubmit()
    }

    render() {
            var datarightlist = this.props.datarightlist.rightList === undefined ? [] : this.props.datarightlist.rightList
            var dataadditionalsharelist = this.props.dataadditionalsharelist.additionList === undefined ? [] : this.props.dataadditionalsharelist.additionList
            var datahistorylist = this.props.datahistorylist.historyList === undefined ? [] : this.props.datahistorylist.historyList
            var dynamicdata = this.props.dynamicdata.mvList

            let lgClose = () => this.setState({ isShow: false })

            let buttonAction1 = [
                <Pagination
                        pageIndex={this.state.pageIndex1} 
                        totalRecord={10} 
                        onPageChange={this.onPageChange1.bind(this)}
                        onNextPage={this.onNextPage1.bind(this)}
                        onPrevPage={this.onPrevPage1.bind(this)}
                        onReloadPage={this.onReloadPage1.bind(this)}
                    />,
            ]
            let buttonAction2 = [
                <Pagination
                        pageIndex={this.state.pageIndex2} 
                        totalRecord={10} 
                        onPageChange={this.onPageChange2.bind(this)}
                        onNextPage={this.onNextPage2.bind(this)}
                        onPrevPage={this.onPrevPage2.bind(this)}
                        onReloadPage={this.onReloadPage2.bind(this)}
                    />,
            ]
            let buttonAction3 = [
                <Pagination
                        pageIndex={this.state.pageIndex3} 
                        totalRecord={10} 
                        onPageChange={this.onPageChange3.bind(this)}
                        onNextPage={this.onNextPage3.bind(this)}
                        onPrevPage={this.onPrevPage3.bind(this)}
                        onReloadPage={this.onReloadPage3.bind(this)}
                    />,
            ]

            return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
            <div className="component-main entitlement">

            <div className="entitlement-form">
                <div className="title" style={this.props.theme.porfolio.titlestock}>
                    <span>{this.props.language.entitlement.header.entitlementplace}</span>
                </div>
                <Form onSubmit={this.handleSubmit} id={"form-" + this.id} className={"form-" + this.id}>
                    <FormGroup>
                        <Table responsive >
                            <tbody >
                                <tr>
                                    <th className="enterorder">{this.props.language.entitlement.header.bankaccount}</th>
                                    <td>
                                        <input id="mvBank" list="Bank" name="bank" id="mvBank" required />
                                        <datalist id="Bank">
                                            <option value="MAS"/>
                                            <option value="HCM.01 - 123123"/>
                                        </datalist>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.entitlement.header.cashbalance}</th>
                                    <td>
                                        {this.props.dynamicdata.mvManualReserve}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.entitlement.header.cashavailable}</th>
                                    <td>
                                        {this.props.dynamicdata.mvWithdrawableAmount}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.entitlement.header.buyingpower}</th>
                                    <td>
                                    {this.props.dynamicdata.mvBuyingPowerd}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="enterorder">{this.props.language.entitlement.header.stockcode}</th>
                                    <td>
                                        <input list="Stock" name="stock" id="mvStock" required />
                                        <datalist id="Stock">
                                        {
                                            this.props.stockList.map(e => {
                                                return (<option value={e.stockCode}>{e.stockName}</option>)
                                            })
                                        }
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
                                        <input name="cashwithdrawable" id="cashwithdrawable" required />
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
                                            <Button className="btn btn-default" onClick={this.getEntitlementSubmit.bind(this)} type="submit" className="submit">Submit</Button>
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

            <div className="entitlement-table">

                <div key={this.id + "-xtable1"} id={this.id + "-xtable1"}>
                    <div className="table-main">
                        <DataUpperTable
                          key={this.id + "-table1"}
                          id={this.id + "-table1"}
                          language={this.props.language.entitlement.header}
                          columns={this.state.columns}
                          defaultPageSize={15}
                          data={datarightlist}/>
                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.entitlement.header.corporateactionlist}</span>
                        </div>
                        <SearchBar
                          key={this.id+ '-search1'}
                          id={this.id+ '-search1'}
                          onSearch={this.onSearch1.bind(this)}
                          buttonAction={buttonAction1}
                          stockList={this.props.stockList}
                          language={this.props.language.searchbar}
                          theme={this.props.theme}
                          columns={this.state.columns}
                          onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                          param={['mvActionType', 'mvStockId', 'mvStartDate', 'mvEndDate', 'dropdown']}/>
                    </div>

                    
                  
                </div>

                <div key={this.id + "-xtable3"} id={this.id + "-xtable3"}>
                    <div className="table-main">
                        <DataUpperTable
                          key={this.id + "-table3"}
                          id={this.id + "-table3"}
                          language={this.props.language.entitlement.header}
                          columns={this.state.columns3}
                          defaultPageSize={15}
                          data={datahistorylist}/>
                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                            <span>{this.props.language.entitlement.header.additionalissuesharesbuyinghistory}</span>
                        </div>
                      
                        <SearchBar
                          key={this.id + '-search3'}
                          id={this.id + '-search3'}
                          onSearch={this.onSearch2.bind(this)}
                          buttonAction={buttonAction3}
                          stockList={this.props.stockList}
                          language={this.props.language.searchbar}
                          theme={this.props.theme}
                          columns={this.state.columns3}
                          onChangeStateColumn={this.onChangeStateColumn2.bind(this)}
                          param={['mvStockId', 'mvStartDate', 'mvEndDate', 'dropdown']}/>
                    </div>
                 
                 
                </div>

                <div key={this.id + "-xtable2"}  id={this.id + "-xtable2"}>
                    <div className="table-main">
                      <DataUpperTable
                        key={this.id + "-table2"}
                        id={this.id + "-table2"}
                        language={this.props.language.entitlement.header}
                        columns={this.state.columns2}
                        defaultPageSize={15}
                        data={dataadditionalsharelist}/>
                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.porfolio.titlestock}>
                          <span>{this.props.language.entitlement.header.additionalissuesharesinformation}</span>
                        </div>
                        <SearchBar
                          key={this.id + '-search2'}
                          id={this.id + '-search2'}
                          hideSearchButton={true}
                          onSearch={[]}
                          buttonAction={buttonAction2}
                          stockList={this.props.stockList}
                          language={this.props.language.searchbar}
                          theme={this.props.theme}
                          columns={this.state.columns3}
                          onChangeStateColumn={this.onChangeStateColumn2.bind(this)}
                          param={['dropdown']}/>
                    </div>
                    
                </div>
            </div>
          </div>
          </div>
        );
    }

    onSearch1(param){
      this.paramsright['mvActionType']='ALL'
      this.paramsright['start'] = ( this.pageIndex - 1 )*15
      this.paramsright['limit'] = '15'
      this.paramsright['mvStockId'] = param['mvStockId']
      this.paramsright['mvStartDate'] = param['mvStartDate']
      this.paramsright['mvEndDate'] = param['mvEndDate']
      this.paramsright['key']= new Date().getTime()
      this.paramsright['_dc']='12232323232'
      this.paramsright['page']='1'
      this.props.onSearch1(this.paramsright, !this.props.reload)
    }

    onSearch2(param){
      this.paramshis['start'] = ( this.pageIndex - 1 )*15
      this.paramshis['limit'] = '15'
      this.paramshis['mvStockId'] = param['mvStockId']
      this.paramshis['mvStartDate'] = param['mvStartDate']
      this.paramshis['mvEndDate'] = param['mvEndDate']
      this.paramsright['key']= new Date().getTime()
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

/// 1//
    onChangeStateColumn1(e) {
        const id = e.target.id
        // this.setState({
        //     columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        // });
    }

    onNextPage1(){
        if(this.state.pageIndex > 0){
            // this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onPrevPage1(){
        if(this.state.pageIndex > 1){
            // this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onReloadPage1(){
        // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
    }

    onPageChange1(pageIndex) {
        if(pageIndex > 0){
            // this.state.pageIndex = pageIndex
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }
///2///
    onChangeStateColumn2(e) {
        const id = e.target.id
        // this.setState({
        //     columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        // });
    }

    onNextPage2(){
        if(this.state.pageIndex > 0){
            // this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onPrevPage2(){
        if(this.state.pageIndex > 1){
            // this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onReloadPage2(){
        this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
    }

    onPageChange2(pageIndex) {
        if(pageIndex > 0){
            // this.state.pageIndex = pageIndex
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

///3///
    onChangeStateColumn3(e) {
        const id = e.target.id
        // this.setState({
        //     columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        // });
    }

    onNextPage3(){
        if(this.state.pageIndex > 0){
            // this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onPrevPage3(){
        if(this.state.pageIndex > 1){
            // this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }

    onReloadPage3(){
        // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
    }

    onPageChange3(pageIndex) {
        if(pageIndex > 0){
            // this.state.pageIndex = pageIndex
            // this.paramshkscashtranhis['start'] = (this.state.pageIndex - 1) * this.paramshkscashtranhis['limit']
            // this.props.gethkscashtranhis(this.paramshkscashtranhis, !this.props.reload)
        }
    }
/////
    handleSubmit(e) {
      e.preventDefault();
    }

    onChange(e) {
    }

    onPageChange(pageIndex){
      console.log(this.id + ' onPageChange', pageIndex)
      this.setState({pageIndex: pageIndex });
    }

    onPageChange2(pageIndex){
      console.log(this.id + ' onPageChange2', pageIndex)
      this.setState({pageIndex: pageIndex });
    }

    componentDidMount() {
      this.props.getEntitlementadditional(this.paramsaddition, !this.props.reload);
      this.props.getdynamicdata(this.paramsdynamic);
    }
}

const mapStateToProps = (state) => {
    return {
        datarightlist: state.entitlement.datarightlist,
        dataadditionalsharelist: state.entitlement.dataadditionalsharelist,
        datahistorylist: state.entitlement.datahistorylist,
        dynamicdata: state.entitlement.dynamicdata,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch1: (paramsright) => {
      dispatch(actions.getRightlist(paramsright))
      },
    onSearch2: (paramshis) => {
      dispatch(actions.getHistorylist(paramshis))
      },
    getEntitlementadditional: (paramsaddition) => {
      dispatch(actions.getAdditionalshareinfo(paramsaddition))
    },
    getdynamicdata: (paramsdynamic) => {
      dispatch(actions.getDynamicdata(paramsdynamic))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(Entitlement);
