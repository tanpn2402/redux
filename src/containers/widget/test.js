import React, { Component } from 'react'
import VerticalTable from '../VerticalTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataUpperTable from '../DataUpperTable'
import {Tabs, Tab} from 'react-bootstrap'
import ScrollingTabs from './../commons/ScrollingTabs'
import HorizontalTable from './../commons/HorizontalTable'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'

class AccountInfo extends Component {
	constructor(props) {
     	super(props)

     	this.state= {
		    header1: [],
		    header2: [],
			
			columns : [
                {
                    id: 'mvStockCode',
                    Header: this.props.language.accountinfo.header.stock,
                    accessor: 'mvStockCode',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTotalValue',
                    Header: this.props.language.accountinfo.header.vol,
                    accessor: 'mvTotalValue',
                    width: 80,
                    skip: false,
                    show: true,
				},
				{
					Header: this.props.language.accountinfo.header.tradeinday,
					headerClassName: this.props.language.accountinfo.header.tradeinday,
					columns: [{
						Header: this.props.language.accountinfo.header.bought,
						accessor: 'mvTTodayBuy',  
	                    skip: false,
	                    show: true,
					}, {
						Header: this.props.language.accountinfo.header.sold,
						accessor: 'mvTTodaySell',  
	                    skip: false,
	                    show: true,
					}]
				}
			],

			title1: [
			    {
	            	Header: this.props.language.accountinfo.header.buyingpower,
	            	accessor: 'mvBuyingPowerd',
	          	}, {
	            	Header: this.props.language.accountinfo.header.cashblance,
	            	accessor: 'mvCashMaintenance' // not sure
	          	}, {
	            	Header: this.props.language.accountinfo.header.withdrawable,
	            	accessor: 'mvWithdrawableAmount' 
	          	}, {
	            	Header: this.props.language.accountinfo.header.availableadvance,
	            	accessor: 'mvAdvanceableAmount' // not sure
	          	}, {
	            	Header: this.props.language.accountinfo.header.duesell,
	            	accessor: 'mvDueSell'
	          	},{
	            	Header: this.props.language.accountinfo.header.holdexecute,
	            	accessor: 'mvHoldingAmt'// notsure
	          	},{
	            	Header: this.props.language.accountinfo.header.pendingapproval,
	            	accessor: 'mvPendingWithdraw',
	          	}, {
	            	Header: this.props.language.accountinfo.header.outstandingloan,
	            	accessor: 'mvOutstandingLoan' 
	          	}, {
	            	Header: this.props.language.accountinfo.header.margincall,
	            	accessor: 'mvMarginCall' 
	          	}, {
	            	Header: this.props.language.accountinfo.header.cashdeposit,
	            	accessor: 'mvSupplementCash'
	          	}, {
	            	Header: this.props.language.accountinfo.header.sellstkinmarport,
	            	accessor: 'mvDueSell'  // not sure
	          	}
          	],
		    title2: [
			    {
		            Header: this.props.language.accountinfo.header.overduedebt,
		            accessor: 'overdueDebt'
	          	}, {
		            Header: this.props.language.accountinfo.header.processeddebt,
		            accessor: 'processedDebt'
	          	}, {
		            Header: this.props.language.accountinfo.header.cashreserve,
		            accessor: 'cashReserve'
	          	}, {
		            Header: this.props.language.accountinfo.header.advancerequest,
		            accessor: 'advanceRequest'
	          	}, {
		            Header: this.props.language.accountinfo.header.cashsupplement,
		            accessor: 'cashSupplement'
	          	}, {
		            Header: this.props.language.accountinfo.header.sellstockrequest,
		            accessor: 'sellStockRequest'
	          	}, {
		            Header: this.props.language.accountinfo.header.forceSell,
		            accessor: 'forceSell'
	          	}, {
		            Header: this.props.language.accountinfo.header.forceselldays,
		            accessor: 'forceSellDays'
	          	}
          	],
          	pageIndex: 1,
          	tabIndex: 1,
			tabList: [
				[this.props.language.accountinfo.title.cash,'actived', 1],
				[this.props.language.accountinfo.title.stock, 'normal', 2], 
				[this.props.language.accountinfo.title.overduedebt, 'normal', 3], 
				[this.props.language.accountinfo.title.upcomingduedebt, 'disabled', 4],
			]
		}

		this.id = 'accountinfo';
		this.params = {
			mvEnableGetStockInfo: 'N',
			mvAction: 'SB'
		};

		this.cashbankparams = {
			bankId: '',
			bankAcId: '',
			loadBank: 'true'
		};

		this.overduedebtparams = {};
		this.upcomingbebtparams = {
			_dc:'1504169457091',
			key:'1504169457089'
		};

    }

    componentWillReceiveProps(nextProps){
    	this.setState({
		    header1: [],
		    header2: [],
			columns : [
                {
                    id: 'mvStockCode',
                    Header: nextProps.language.accountinfo.header.stock,
                    accessor: 'mvStockCode',
                    width: 90,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvTotalValue',
                    Header: nextProps.language.accountinfo.header.vol,
                    accessor: 'mvTotalValue',
                    width: 70,
                    skip: false,
                    show: true,
				},
				{
					Header: nextProps.language.accountinfo.header.tradeinday,
					headerClassName: nextProps.language.accountinfo.header.tradeinday,
					columns: [{
						  Header: nextProps.language.accountinfo.header.bought,
						  width: 70,
						  accessor: 'mvTTodayBuy',
					}, {
						  Header: nextProps.language.accountinfo.header.sold,
						  width: 70,
						  accessor: 'mvTTodaySell'
					}]
				}
			],

		    title1: [
			    {
	            	Header: nextProps.language.accountinfo.header.buyingpower,
	            	accessor: 'mvBuyingPowerd',
	          	}, {
	            	Header: nextProps.language.accountinfo.header.cashblance,
	            	accessor: 'mvCashMaintenance' // not sure
	          	}, {
	            	Header: nextProps.language.accountinfo.header.withdrawable,
	            	accessor: 'mvWithdrawableAmount' 
	          	}, {
	            	Header: nextProps.language.accountinfo.header.availableadvance,
	            	accessor: 'mvAdvanceableAmount' // not sure
	          	}, {
	            	Header: nextProps.language.accountinfo.header.tempholdcash,
	            	accessor: 'mvTemporaryHoldCash'
				}, {
	            	Header: nextProps.language.accountinfo.header.holdpending,
	            	accessor: 'mvBuyHoldAmount' 
	          	},{
	            	Header: nextProps.language.accountinfo.header.holdexecute,
	            	accessor: 'mvPendingSettled'// notsure
	          	},{
	            	Header: nextProps.language.accountinfo.header.pendingapproval,
	            	accessor: 'mvPendingWithdraw',
	          	}, {
	            	Header: nextProps.language.accountinfo.header.outstandingloan,
	            	accessor: 'mvOutstandingLoan' 
	          	}, {
	            	Header: nextProps.language.accountinfo.header.margincall,
	            	accessor: 'mvMarginCall' 
	          	}, {
	            	Header: nextProps.language.accountinfo.header.cashdeposit,
	            	accessor: 'mvSupplementCash'
	          	}, {
	            	Header: nextProps.language.accountinfo.header.sellstkinmarport,
	            	accessor: 'mvDueSell'  // not sure
	          	}
          	],
			  title2: [
			    {
		            Header: nextProps.language.accountinfo.header.overduedebt,
		            accessor: 'overdueDebt'
	          	}, {
		            Header: nextProps.language.accountinfo.header.processeddebt,
		            accessor: 'processedDebt'
	          	}, {
		            Header: nextProps.language.accountinfo.header.cashreserve,
		            accessor: 'cashReserve'
	          	}, {
		            Header: nextProps.language.accountinfo.header.advancerequest,
		            accessor: 'advanceRequest'
	          	}, {
		            Header: nextProps.language.accountinfo.header.cashsupplement,
		            accessor: 'cashSupplement'
	          	}, {
		            Header: nextProps.language.accountinfo.header.sellstockrequest,
		            accessor: 'sellStockRequest'
	          	}, {
		            Header: nextProps.language.accountinfo.header.forcesell,
		            accessor: 'forceSell'
	          	}, {
		            Header: nextProps.language.accountinfo.header.forceselldays,
		            accessor: 'forceSellDays'
	          	}
			  ],
			  
			  tabList: [
				[nextProps.language.accountinfo.title.cash,'actived', 1],
				[nextProps.language.accountinfo.title.stock, 'normal', 2], 
				[nextProps.language.accountinfo.title.overduedebt, 'normal', 3], 
				[nextProps.language.accountinfo.title.upcomingduedebt, 'disabled', 4],
			]
		});
		var overdueDebt = nextProps.overdueDebt === undefined ? [] : nextProps.overdueDebt;
		var upcomingdebt = nextProps.upcomingdebt === undefined ?[] : nextProps.upcomingdebt ;

		this.checkOverdueDebt(overdueDebt);
		this.checkUpComingDebt(upcomingdebt);
    }	

    render(){
		// var mvStockBalanceInfo = this.props.data.mvStockBalanceInfo === undefined ? [] : this.props.data.mvStockBalanceInfo
		// var mvList = this.props.AccountBalance === undefined ? [] : this.props.AccountBalance.mvList[0];
		// var overdueDebt = this.props.overdueDebt === undefined ? [] : this.props.overdueDebt;
		// var upcomingdebt = this.props.upcomingdebt === undefined ?[] : this.props.upcomingdebt ;


		// if(mvList !== undefined && mvList !== []) {

		// 	var data1 ={
		// 		'mvBuyingPowerd': [mvList.mvBuyingPowerd,],
		// 		'mvCashMaintenance': [mvList.mvCashMaintenance,],
		// 		'mvWithdrawableAmount':[mvList.mvWithdrawableAmount,],
		// 		'mvAdvanceableAmount': [mvList.mvAdvanceableAmount,],
		// 		'mvTemporaryHoldCash':[mvList.mvTemporaryHoldCash,],
		// 		'mvSettledBalance': [mvList.mvSettledBalance,],
		// 		'mvPendingBalance': [mvList.mvPendingBalance,],
		// 		'mvPendingWithdraw': [mvList.mvPendingWithdraw,],
		// 		'mvOutstandingLoan': [mvList.mvOutstandingLoan,],
		// 		'mvMarginCall': [mvList.mvMarginCall,],
		// 		'mvSupplementCash' : [mvList.mvSupplementCash,],
		// 		'mvDueSell': [mvList.mvDueSell],
		// 	}
		// }
		// else{
		// 	var data1 = {
		// 		'mvBuyingPowerd': [0],
		// 		'mvCashMaintenance': [0],
		// 		'mvWithdrawableAmount':[0],
		// 		'mvAdvanceableAmount': [0],
		// 		'mvTemporaryHoldCash':[0],
		// 		'mvSettledBalance': [0],
		// 		'mvPendingBalance': [0],
		// 		'mvPendingWithdraw': [0],
		// 		'mvOutstandingLoan': [0],
		// 		'mvMarginCall': [0],
		// 		'mvSupplementCash' : [0],
		// 		'mvDueSell': [0]
		// 	}
		// }

		// if(overdueDebt !== undefined && overdueDebt !== []) {
		// 	var data2 = {
		// 		'overdueDebt': [overdueDebt.overdueDebt,],
		// 		'processedDebt': [overdueDebt.processedDebt,],
		// 		'cashReserve': [overdueDebt.cashReserve,],
		// 		'advanceRequest': [overdueDebt.advanceRequest,],
		// 		'cashSupplement': [overdueDebt.cashSupplement,],
		// 		'sellStockRequest': [overdueDebt.sellStockRequest,],
		// 		'forceSell': [overdueDebt.forceSell,],
		// 		'forceSellDays': [overdueDebt.forceSellDays + " days",],
		// 	}
		// } else{
		// 	var data2 = {
		// 		'overdueDebt': [0],
		// 		'processedDebt': [0],
		// 		'cashReserve': [0],
		// 		'advanceRequest': [0],
		// 		'cashSupplement': [0],
		// 		'sellStockRequest': [0],
		// 		'forceSell': [0],
		// 		'forceSellDays': [0],
		// 	}
        // } 	
        
        var data1 = [
            {
                name: this.props.language.portfolio.header.totalAsset,
                y: '1'
            }, {
                name: this.props.language.portfolio.header.equity,
                y: '2'
            }, {
                name: this.props.language.portfolio.header.stockValue,
                y: '3'
            }, {
                name: this.props.language.portfolio.header.profitLoss,
                y: '4'
            }, {
                name: this.props.language.portfolio.header.PLPercent,
                y: '5'
            }
        ]
        var data2 = [
            {
                name: this.props.language.portfolio.header.totalAsset,
                y: '1'
            }, {
                name: this.props.language.portfolio.header.equity,
                y: '2'
            }, {
                name: this.props.language.portfolio.header.stockValue,
                y: '3'
            }, {
                name: this.props.language.portfolio.header.profitLoss,
                y: '4'
            }, {
                name: this.props.language.portfolio.header.PLPercent,
                y: '5'
            }
        ]
        var data3 = [
            {
                name: this.props.language.portfolio.header.totalAsset,
                y: '1'
            }, {
                name: this.props.language.portfolio.header.equity,
                y: '2'
            }, {
                name: this.props.language.portfolio.header.stockValue,
                y: '3'
            }, {
                name: this.props.language.portfolio.header.profitLoss,
                y: '4'
            }, {
                name: this.props.language.portfolio.header.PLPercent,
                y: '5'
            }
        ]
        var data4 = [
            {
                name: this.props.language.portfolio.header.totalAsset,
                y: '1'
            }, {
                name: this.props.language.portfolio.header.equity,
                y: '2'
            }, {
                name: this.props.language.portfolio.header.stockValue,
                y: '3'
            }, {
                name: this.props.language.portfolio.header.profitLoss,
                y: '4'
            }, {
                name: this.props.language.portfolio.header.PLPercent,
                y: '5'
            }
        ]

	    return(
            <div>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                
                <Body>
                    <div className="component-body clearfix">
                        <ScrollingTabs tabList={this.state.tabList} onTabClick={this.onTabClick.bind(this)} id={this.id}/>
                    </div>
                    {
                        this.state.tabIndex === 1 ?
					    (
                            <div className="table-main no-header no-footer">
                                <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                    <table className="table">
                                        <tbody >
                                            {
                                                data1.map(d => {
                                                    return(
                                                        <tr>
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : this.state.tabIndex === 2 ?
					    (
                            <div>
                                <div className="table-main">
                                    <Table
                                        key={this.id}
                                        id={this.id}
                                        columns={this.state.columns}
                                        defaultPageSize={this.defaultPageSize}
                                        data={data2}/>
                                </div>
                                <div className="table-header">
                                    <SearchBar
                                        key={this.id+ '-search'}
                                        id={this.id+ '-search'}
                                        onSearch={this.onSearch.bind(this)}
                                        buttonAction={[]}
                                        language={this.props.language.searchbar}
                                        theme={this.props.theme}
                                        data={{stockList: [] }}
                                        param={['mvStockId']}/>
                                </div>
                                <div className="table-footer">
                                    <Pagination
                                        pageIndex={this.state.pageIndex} 
                                        totalRecord={10} 
                                        onPageChange={this.onPageChange.bind(this)}
                                        onNextPage={this.onNextPage.bind(this)}
                                        onPrevPage={this.onPrevPage.bind(this)}
                                    />
                                </div>
                            </div>

                        ) : this.state.tabIndex === 3 ?
					    (
                            <div className="table-main no-header no-footer">
                                <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                    <table className="table">
                                        <tbody >
                                            {
                                                data3.map(d => {
                                                    return(
                                                        <tr>
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : this.state.tabIndex === 4 ?
					    (
                            <div className="table-main no-header no-footer">
                                <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                    <table className="table">
                                        <tbody >
                                            {
                                                data4.map(d => {
                                                    return(
                                                        <tr>
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : ''
                    }
                </Body>
            </div>
        )
    }

    componentDidMount() {
		this.props.getStockInfo(this.params)
		this.props.getAccountBalance(this.cashbankparams)
		this.props.getOverdueDebt(this.overduedebtparams)
		this.props.getUpComingDebt(this.upcomingbebtparams)
    }

    onTabClick(tab, e){
    	console.log(e, tab)
    	this.setState({
    		tabIndex: tab,
    	});
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage(){
        if(this.state.pageIndex > 0){
        	this.setState({pageIndex: parseInt(this.state.pageIndex) + 1 })
        }
    }

    onPrevPage(){
        if(this.state.pageIndex > 1){
        	this.setState({pageIndex: parseInt(this.state.pageIndex) - 1 })
        }
    }

    onPageChange(pageIndex) {
        if(pageIndex > 0){
        	this.setState({pageIndex: pageIndex })
        }
	}

	checkOverdueDebt(overdueDebt) {
		if(parseFloat(overdueDebt.overdueDebt) === 0 && parseFloat(overdueDebt.processedDebt) === 0) {
			let tabList = this.state.tabList
			tabList[2][1] = "disabled"
			this.setState({
				tabList: tabList
			})
		}
	}
	
	checkUpComingDebt(upcomingdebt) {
		upcomingdebt.map(e => {
			if (parseFloat(e.Value) > 0) {
				let tabList = this.state.tabList
				tabList[3][1] = "normal"
				this.setState({
					tabList: tabList
				})
			}
		})
	}
}

const mapStateToProps = (state) => {
  	return {
		  data: state.accountinfo.data,
		  AccountBalance: state.accountinfo.accountbalance,
		  overdueDebt: state.accountinfo.overdueDebt,
		  upcomingdebt : state.accountinfo.upcomingdebt
  	}
}

const mapDispatchToProps = (dispatch, props) => ({
	getStockInfo: (params) => {
		dispatch(actions.getStockInfo(params))
	},
	getAccountBalance: (cashbankparams) => {
		dispatch(actions.getAccountBalance(cashbankparams))
	},
	getOverdueDebt: (overduedebtparams) => {
		dispatch(actions.getOverdueDebt(overduedebtparams))
	},
	getUpComingDebt: (upcomingbebtparams) => {
		dispatch(actions.getUpComingDebt(upcomingbebtparams))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
