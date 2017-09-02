import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import DataUpperTable from '../DataUpperTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Popup from '../Popup'

class OddLotTrading extends Component {
    constructor(props) {
        super(props)

        this.params = {
            mvLastAction: '',
            mvChildLastAction: '',
            key: '',
            start: '0',
            limit: '15',
        }

        this.state = {
            isShow: false,
            oddLotOrderPageIndex: 1,
            oddLotTransPageIndex: 1,
            enquirycolumns: [
                {
                    // Create a select-all checkbox
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                              onChange={() => { this.onRowSelected(props.original)}} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'stockID',
                    Header: this.props.language.oddlottrading.header.stockid,
                    accessor: 'stockCode',
                    width: 120,
                    skip: false,
                    show: true,
            },
                {
                    id: 'TradingQty',
                    Header: this.props.language.oddlottrading.header.tradingquantity,
                    accessor: 'settledBal',
                    width: 120,
                    skip: false,
                    show: true,
            },
                {
                    id: 'OddLotQty',
                    Header: this.props.language.oddlottrading.header.oddlotquantity,
                    accessor: 'oddLotQty',
                    width: 120,
                    skip: false,
                    show: true,
            },
                {
                    id: 'Curprice',
                    Header: this.props.language.oddlottrading.header.currentprice,
                    accessor: 'nominalPrice',
                    width: 120,
                    skip: false,
                    show: true,
            },
                {
                    id: 'ExePrice',
                    Header: this.props.language.oddlottrading.header.exeprice,
                    accessor: 'collectionPrice',
                    width: 120,
                    skip: false,
                    show: true,
            },
            ],
            historycolumns: [
                {
                    id: 'createTime',
                    Header: this.props.language.oddlottrading.header.transdate,
                    accessor: 'createTime',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'valueDate',
                    Header: this.props.language.oddlottrading.header.approvedate,
                    accessor: 'valueDate',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'instrumentId',
                    Header: this.props.language.oddlottrading.header.StockIDH,
                    accessor: 'instrumentId',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'appliedQty',
                    Header: this.props.language.oddlottrading.header.oddlotquantityH,
                    accessor: 'appliedQty',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'price',
                    Header: this.props.language.oddlottrading.header.exepriceH,
                    accessor: 'price',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'fee',
                    Header: this.props.language.oddlottrading.header.tax,
                    accessor: 'fee',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'aaa',
                    Header: this.props.language.oddlottrading.header.fee,
                    accessor: '',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'settleAmt',
                    Header: this.props.language.oddlottrading.header.value,
                    accessor: 'settleAmt',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'status',
                    Header: this.props.language.oddlottrading.header.status,
                    accessor: 'status',
                    width: 120,
                    skip: false,
                    show: true,
              },
            ],


            historyList: [],
            oddLotList: [],
        }

        this.rowSelected = []
        this.popupType = 'none'
        this.id = 'oddlottrading'
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            enquirycolumns: [
                {
                    // Create a select-all checkbox
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')}/>,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                              onChange={() => { this.onRowSelected(props.original)}} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    id: 'stockID',
                    Header: this.props.language.oddlottrading.header.stockid,
                    accessor: 'stockCode',
                    width: 120,
                    skip: false,
                    show: true,
                },
                    {
                        id: 'TradingQty',
                        Header: this.props.language.oddlottrading.header.tradingquantity,
                        accessor: 'settledBal',
                        width: 120,
                        skip: false,
                        show: true,
                },
                    {
                        id: 'OddLotQty',
                        Header: this.props.language.oddlottrading.header.oddlotquantity,
                        accessor: 'oddLotQty',
                        width: 120,
                        skip: false,
                        show: true,
                },
                    {
                        id: 'Curprice',
                        Header: this.props.language.oddlottrading.header.currentprice,
                        accessor: 'nominalPrice',
                        width: 120,
                        skip: false,
                        show: true,
                },
                    {
                        id: 'ExePrice',
                        Header: this.props.language.oddlottrading.header.exeprice,
                        accessor: 'collectionPrice',
                        width: 120,
                        skip: false,
                        show: true,
                },
            ],

            historycolumns: [
                {
                    id: 'TransDate',
                    Header: this.props.language.oddlottrading.header.transdate,
                    accessor: 'createTime',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'valueDate',
                    Header: this.props.language.oddlottrading.header.approvedate,
                    accessor: 'valueDate',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'StockIDH',
                    Header: this.props.language.oddlottrading.header.StockIDH,
                    accessor: 'instrumentId',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'oddlotquantityH',
                    Header: this.props.language.oddlottrading.header.oddlotquantityH,
                    accessor: 'appliedQty',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'exepriceH',
                    Header: this.props.language.oddlottrading.header.exepriceH,
                    accessor: 'price',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'tax',
                    Header: this.props.language.oddlottrading.header.tax,
                    accessor: 'fee',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'fee',
                    Header: this.props.language.oddlottrading.header.fee,
                    //accessor: 'fee',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'value',
                    Header: this.props.language.oddlottrading.header.value,
                    accessor: 'settleAmt',
                    width: 120,
                    skip: false,
                    show: true,
              },
                {
                    id: 'status',
                    Header: this.props.language.oddlottrading.header.status,
                    accessor: 'status',
                    width: 120,
                    skip: false,
                    show: true,
              },
            ],

            oddLotList: nextProps.oddlotenquiry.oddLotList === null ? [] : nextProps.oddlotenquiry.oddLotList,
            historyList: nextProps.oddlothistory.historyList === null ? [] : nextProps.oddlothistory.historyList


        })
    }


    render() {
        console.log('render in OddLotTrading', this.state.oddLotList, this.state.historyList)
        let oddlotenquiry = this.state.oddLotList
        let oddlothistory = this.state.historyList

        oddlothistory.map(e => {
        if(e.status === 'H')
            e.status = this.props.language.oddlottrading.status.waiting;
        if(e.status === 'D')
            e.status = this.props.language.oddlottrading.status.approve;
        if(e.price == '0E-9')
          e.price = '0';
          e.price = String(parseFloat(e.price).toFixed(3));
    })
      
        let lgClose = () => this.setState({ isShow: false });

        let buttonActionOddLotOrder = [
            <Pagination
                pageIndex={this.state.oddLotOrderPageIndex}
                totalRecord={oddlotenquiry.length}
                onPageChange={this.onOddLotOrderPageChange.bind(this)}
                onNextPage={this.onOddLotOrderNextPage.bind(this)}
                onPrevPage={this.onOddLotOrderPrevPage.bind(this)}
                onReloadPage={this.onOddLotOrderReloadPage.bind(this)}
            />,
            <Button style={this.props.theme.buttonClicked} bsStyle="primary" type="button"
                onClick={this.registerOddLotOrder.bind(this)}>
                {this.props.language.oddlottrading.header.register}
            </Button>
        ]

        let buttonActionOddLotTrans = [
            <Pagination
                pageIndex={this.state.oddLotTransPageIndex}
                totalRecord={oddlothistory.totalCount}
                onPageChange={this.onOddLotTransPageChange.bind(this)}
                onNextPage={this.onOddLotTransNextPage.bind(this)}
                onPrevPage={this.onOddLotTransPrevPage.bind(this)}
                onReloadPage={this.onOddLotTransReloadPage.bind(this)}
            />
        ]
        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
            <div className="component-main oddlottrading">
                <div className="oddlotorder">
                    <div className="oddlotorder-table">
                        <div className="table-main">
                            <DataUpperTable
                                columns={this.state.enquirycolumns}
                                data={oddlotenquiry.slice( (this.state.oddLotOrderPageIndex - 1)*6, this.state.oddLotOrderPageIndex*6 )}
                                maxRows={6}
                                defaultPageSize={15}/>
                        </div>
                        <div className="table-header">
                            <div className="title" style={this.props.theme.oddlottrading.titleoddlotorder}>
                                <span>{this.props.language.oddlottrading.header.oddlotorder}</span>
                            </div>
                            <SearchBar
                                id={this.id}
                                onSearch={[]}
                                buttonAction={buttonActionOddLotOrder}
                                stockList={[]}
                                language={this.props.language.searchbar}
                                theme={this.props.theme}
                                columns={this.state.enquirycolumns}
                                onChangeStateColumn={this.onChangeOddLotOrderStateColumn.bind(this)}
                                hideSearchButton={true}
                                param={['dropdown']} />
                        </div>


                    </div>
                    <div className="oddlotorder-note">
                        <div className="title" style={this.props.theme.oddlottrading.titleoddlotorder}>
                            <span>{this.props.language.oddlottrading.header.notes}</span>
                        </div>
                        <div style={{ padding: "5px", fontSize: "12px", }}>
                            <span>{this.props.language.oddlottrading.header.notesinfo}</span>
                        </div>
                    </div>
                </div>
                <div className="oddlothistory">
                    <div className="table-main">
                        <DataUpperTable
                            columns={this.state.historycolumns}
                            data={oddlothistory.slice( (this.state.oddLotTransPageIndex - 1)*9, this.state.oddLotTransPageIndex*9 )}
                            maxRows={9}
                            defaultPageSize={15}/>
                    </div>
                    <div className="table-header">
                        <div className="title" style={this.props.theme.oddlottrading.titleoddlottransactionhistory}>
                            <span>{this.props.language.oddlottrading.header.oddlotransactionhistory}</span>
                        </div>
                        <SearchBar
                                id={this.id}
                                onSearch={[]}
                                buttonAction={buttonActionOddLotTrans}
                                stockList={[]}
                                language={this.props.language.searchbar}
                                theme={this.props.theme}
                                columns={this.state.historycolumns}
                                onChangeStateColumn={this.onChangeOddLotTransStateColumn.bind(this)}
                                hideSearchButton={true}
                                param={['dropdown']} />
                    </div>


                </div>
                <Popup
                    id='oddlottrading'
                    show={this.state.isShow}
                    onHide={lgClose}
                    rowSelected={this.rowSelected}
                    language={this.props.language}
                    title = {this.props.language.oddlottrading.popup.title}/>
            </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.onshowenquiry('', !this.props.reload);
        this.props.onshowhistory('', !this.props.reload);
    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById(this.id + '-cb-all')
                .checked
            var checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.oddlotenquiry.oddLotList !== undefined ? this.props.oddlotenquiry.oddLotList : []
            else
                this.rowSelected = []
        } else {
            var index = this.rowSelected.indexOf(param)
            if (index === -1) {
                this.rowSelected.push(param)
            } else {
                this.rowSelected.splice(index, 1)
            }

            if (document.getElementsByClassName(this.id + '-row-checkbox')
                .length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all")
                .checked = true
            else
                document.getElementById(this.id + "-cb-all")
                .checked = false
        }
    }

    registerOddLotOrder(e) {
      e.preventDefault();
      if(this.rowSelected.length>0)
      this.setState({ isShow: true })
      else {
        console.log('day se hien thi message box')
        //alert(this.props.language.oddlottrading.popup.alert);
      }
    }

    onOddLotTransPageChange(pageIndex) {
        console.log('cashstatement onPageChange', pageIndex)
        this.setState({
             oddLotTransPageIndex: pageIndex
         });
    }

    onOddLotTransNextPage(){
        if(this.state.oddLotTransPageIndex > 0){
            this.setState({oddLotTransPageIndex: parseInt(this.state.oddLotTransPageIndex) + 1 });

        }
    }

    onOddLotTransPrevPage(){
        if(this.state.oddLotTransPageIndex > 1){
            this.setState({oddLotTransPageIndex: parseInt(this.state.oddLotTransPageIndex) - 1 });

        }
    }

    onOddLotTransReloadPage(){

    }

    onOddLotOrderNextPage(){
        if(this.state.oddLotOrderPageIndex >= 0){
            this.setState({oddLotOrderPageIndex: parseInt(this.state.oddLotOrderPageIndex) + 1 });

        }
    }

    onOddLotOrderPrevPage(){
        if(this.state.oddLotOrderPageIndex > 1){
            this.setState({oddLotOrderPageIndex: parseInt(this.state.oddLotOrderPageIndex) - 1 });

        }
    }

    onOddLotOrderReloadPage(){

    }

    onOddLotOrderPageChange(pageIndex) {
        this.setState({
            oddLotOrderPageIndex: pageIndex
        });
    }



    onChangeOddLotOrderStateColumn(e) {
        const id = e.target.id
        this.setState({
            enquirycolumns: this.state.enquirycolumns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onChangeOddLotTransStateColumn(e) {
        const id = e.target.id
        this.setState({
            historycolumns: this.state.historycolumns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

}
const mapStateToProps = (state) => {
    return {
        oddlotenquiry: state.oddlottrading.oddlotenquiry,
        oddlothistory: state.oddlottrading.oddlothistory,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onshowenquiry: () => {
        dispatch(actions.getOddlotEnquiry({ mvLastAction: '', mvChildLastAction: '' }))
    },
    onshowhistory: () => {
        dispatch(actions.getOddlotHistory({ mvLastAction: '', mvChildLastAction: '', key: '', start: '0', limit: '15' }))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(OddLotTrading)
