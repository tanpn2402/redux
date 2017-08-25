import React, { Component } from 'react'
import VerticalTable from '../VerticalTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import Footer from '../DataTableFooter'
import {Tabs, Tab} from 'react-bootstrap'

class AccountInfo extends Component {
	constructor(props) {
     	super(props)

     	this.state= {
		    header1: ['Sumary', 'Value (VND)'],
		    header3: ['Portfolio assessment', 'Value(VND)'],
			header4: ['Margin position', 'Values'],
			
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
					}, {
						  Header: this.props.language.accountinfo.header.sold,
						  accessor: 'mvTTodaySell'
					}]
				}
			],

		    title1: [
			    {
	            	Header: this.props.language.accountinfo.header.buyingpower,
	            	accessor: 'mvBuyingPowerd',
	          	}, {
	            	Header: this.props.language.accountinfo.header.cashblance,
	            	accessor: 'mvAvailableBalance' // not sure
	          	}, {
	            	Header: this.props.language.accountinfo.header.holdexecute,
	            	accessor: 'mvSettledBalance' // not sure
	          	}, {
	            	Header: this.props.language.accountinfo.header.holdpending,
	            	accessor: 'mvPendingBalance' // not sure
	          	}, {
	            	Header: this.props.language.accountinfo.header.duesell,
	            	accessor: 'mvDueSell'
	          	},
          	],
		    title3: [
			    {
		            Header: this.props.language.portfolio.header.equityMar,
		            accessor: 'equityMar'
	          	}, {
		            Header: this.props.language.portfolio.header.totalAssetMaintenance,
		            accessor: 'totalAssetMaintenance'
	          	}, {
		            Header: this.props.language.portfolio.header.stockMaintenance,
		            accessor: 'stockMaintenance'
	          	}, {
		            Header: this.props.language.portfolio.header.cashMaintenance,
		            accessor: 'cashMaintenance'
	          	}, {
		            Header: this.props.language.portfolio.header.mvOutstandingLoan,
		            accessor: 'mvOutstandingLoan'
	          	}, {
		            Header: this.props.language.portfolio.header.debtIncByPurchase,
		            accessor: 'debtIncByPurchase'
	          	}, {
		            Header: this.props.language.portfolio.header.debitAccruedInterest,
		            accessor: 'debitAccruedInterest'
	          	}, {
		            Header: this.props.language.portfolio.header.mvCreditLimit,
		            accessor: 'mvCreditLimit'
	          	}
          	],
		    title4: [
			    {
		            Header: this.props.language.portfolio.header.lendableValue,
		            accessor: 'lendableValue'
          		}, {
		            Header: this.props.language.portfolio.header.minMarginReq,
		            accessor: 'minMarginReq'
          		}, {
		            Header: this.props.language.portfolio.header.curLiqMargin,
		            accessor: 'curLiqMargin'
          		}, {
		            Header: this.props.language.portfolio.header.marginableBalf,
		            accessor: 'marginableBalf'
          		}, {
		            Header: this.props.language.portfolio.header.cashDeposit,
		            accessor: 'cashDeposit'
          		}, {
          		  	Header: this.props.language.portfolio.header.sellStkInMarPort,
		            accessor: 'sellStkInMarPort'
          		}, {
		            Header: this.props.language.portfolio.header.sellStkNotInMarPort,
		            accessor: 'sellStkNotInMarPort'
          		}
          	],
          	pageIndex: 1,
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

    }

    componentWillReceiveProps(nextProps){
    	this.setState({
		    header1: [nextProps.language.accountinfo.header.sumary, nextProps.language.portfolio.header.valuevnd],
		    header3: [nextProps.language.portfolio.header.portfolioassessment, nextProps.language.portfolio.header.valuevnd],
			header4: [nextProps.language.portfolio.header.marginposition, nextProps.language.portfolio.header.value],
			
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
	            	accessor: 'mvAvailableBalance'
	          	}, {
	            	Header: nextProps.language.accountinfo.header.holdexecute,
	            	accessor: 'mvSettledBalance'
	          	}, {
	            	Header: nextProps.language.accountinfo.header.holdpending,
	            	accessor: 'mvPendingBalance'
	          	}, {
	            	Header: nextProps.language.accountinfo.header.duesell,
	            	accessor: 'mvDueSell'
	          	},
          	],
		    title3: [
			    {
		            Header: nextProps.language.portfolio.header.equityMar,
		            accessor: 'equityMar'
	          	}, {
		            Header: nextProps.language.portfolio.header.totalAssetMaintenance,
		            accessor: 'totalAssetMaintenance'
	          	}, {
		            Header: nextProps.language.portfolio.header.stockMaintenance,
		            accessor: 'stockMaintenance'
	          	}, {
		            Header: nextProps.language.portfolio.header.cashMaintenance,
		            accessor: 'cashMaintenance'
	          	}, {
		            Header: nextProps.language.portfolio.header.mvOutstandingLoan,
		            accessor: 'mvOutstandingLoan'
	          	}, {
		            Header: nextProps.language.portfolio.header.debtIncByPurchase,
		            accessor: 'debtIncByPurchase'
	          	}, {
		            Header: nextProps.language.portfolio.header.debitAccruedInterest,
		            accessor: 'debitAccruedInterest'
	          	}, {
		            Header: nextProps.language.portfolio.header.mvCreditLimit,
		            accessor: 'mvCreditLimit'
	          	}
          	],
		    title4: [
			    {
		            Header: nextProps.language.portfolio.header.lendableValue,
		            accessor: 'lendableValue'
          		}, {
		            Header: nextProps.language.portfolio.header.minMarginReq,
		            accessor: 'minMarginReq'
          		}, {
		            Header: nextProps.language.portfolio.header.curLiqMargin,
		            accessor: 'curLiqMargin'
          		}, {
		            Header: nextProps.language.portfolio.header.marginableBalf,
		            accessor: 'marginableBalf'
          		}, {
		            Header: nextProps.language.portfolio.header.cashDeposit,
		            accessor: 'cashDeposit'
          		}, {
          		  	Header: nextProps.language.portfolio.header.sellStkInMarPort,
		            accessor: 'sellStkInMarPort'
          		}, {
		            Header: nextProps.language.portfolio.header.sellStkNotInMarPort,
		            accessor: 'sellStkNotInMarPort'
          		}
          	],
    	});
    }	

    render(){
		console.log("ACCOUNTINFO");
		var mvStockBalanceInfo = this.props.data.mvStockBalanceInfo === undefined ? [] : this.props.data.mvStockBalanceInfo
		var mvList = this.props.AccountBalance === undefined ? [] : this.props.AccountBalance.mvList[0];
		console.log('mvList', mvList);
			if(mvList !== undefined && mvList !== []) {
				var data1 ={
					'mvBuyingPowerd': [mvList.mvBuyingPowerd,],
					'mvAvailableBalance': [mvList.mvAvailableBalance,],
					'mvSettledBalance': [mvList.mvSettledBalance,],
					'profitmvPendingBalanceLoss': [mvList.profitmvPendingBalanceLoss,],
					'mvDueSell': [mvList.mvDueSell,],
				}
				var data3 = {
					'equityMar': [],
					'totalAssetMaintenance': [],
					'stockMaintenance': [],
					'cashMaintenance': [],
					'mvOutstandingLoan': [],
					'debtIncByPurchase': [],
					'debitAccruedInterest': [],
					'mvCreditLimit': [],
				}
				var data4= {
					'lendableValue': [],
					'minMarginReq': [],
					'curLiqMargin': [],
					'marginableBalf': [],
					'cashDeposit': [],
					'sellStkInMarPort': [],
					'sellStkNotInMarPort': [],
				}
				
			}
			else{
				var data1 = {
					'mvBuyingPowerd': [],
					'mvAvailableBalance': [],
					'mvSettledBalance': [],
					'profitmvPendingBalanceLoss': [],
					'mvDueSell': [],
				}
			
	    	
		    	var data3 = {
		    		'equityMar': [],
		    		'totalAssetMaintenance': [],
		    		'stockMaintenance': [],
		    		'cashMaintenance': [],
		    		'mvOutstandingLoan': [],
		    		'debtIncByPurchase': [],
		    		'debitAccruedInterest': [],
		    		'mvCreditLimit': [],
		    	}
		    	var data4= {
		    		'lendableValue': [],
		    		'minMarginReq': [],
		    		'curLiqMargin': [],
		    		'marginableBalf': [],
		    		'cashDeposit': [],
		    		'sellStkInMarPort': [],
		    		'sellStkNotInMarPort': [],
				}
		}
		
	     return(
			<div id={this.id + '-body'} className="layout-body">
			<Tabs defaultActiveKey={1} animation={false} id={this.id}>
				<Tab eventKey={1} title={this.props.language.accountinfo.header.cash}>
					<div>
						<VerticalTable 
							showHeader={false}
							header={this.state.header1} 
							title={this.state.title1} 
							language={this.props.language.header} data={data1}/>
					</div>
				</Tab>
				<Tab eventKey={2} title={this.props.language.accountinfo.header.stock}>
					<DataTable
						id={this.id + "-table"}
						columns={this.state.columns}
						data={mvStockBalanceInfo}/>
				</Tab>
				<Tab eventKey={3} title={this.props.language.accountinfo.header.overduedebt} disabled></Tab>
				<Tab eventKey={4} title={this.props.language.accountinfo.header.upcomingdebt} disabled></Tab>
			</Tabs>
			</div>
	     )
    }

    componentDidMount() {
		this.props.getStockInfo(this.params)
		this.props.getAccountBalance(this.cashbankparams)
    }

}

const mapStateToProps = (state) => {
  	return {
		  data: state.accountinfo.data,
		  AccountBalance: state.accountinfo.accountbalance,
  	}
}

const mapDispatchToProps = (dispatch, props) => ({
	getStockInfo: (params) => {
		dispatch(actions.getStockInfo(params))
	},
	getAccountBalance: (cashbankparams) => {
		dispatch(actions.getAccountBalance(cashbankparams))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
