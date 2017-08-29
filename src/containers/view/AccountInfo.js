import React, { Component } from 'react'
import VerticalTable from '../VerticalTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataUpperTable from '../DataUpperTable'
import Footer from '../DataTableFooter'
import {Tabs, Tab} from 'react-bootstrap'
import ScrollingTabs from './../commons/ScrollingTabs'
import HorizontalTable from './../commons/HorizontalTable'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'

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
	          	},{
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
	          	},{
	            	Header: this.props.language.accountinfo.header.buyingpower,
	            	accessor: 'mvBuyingPowerd',
	          	}, {
	            	Header: this.props.language.accountinfo.header.cashblance,
	            	accessor: 'mvAvailableBalance' // not sure
	          	}, {
	            	Header: this.props.language.accountinfo.header.holdexecute,
	            	accessor: 'mvSettledBalance' // not sure
	          	}
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
          	tabIndex: 1,
          	tabList: [
				['TIEN', 'actived', 1], ['CHUNG KHOAN', 'normal', 2], ['NO DEN HAN', 'disabled', 3], ['NO SAP DAO HAN', 'disabled', 4],
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
	          	},{
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
	          	},{
	            	Header: this.props.language.accountinfo.header.buyingpower,
	            	accessor: 'mvBuyingPowerd',
	          	}, {
	            	Header: this.props.language.accountinfo.header.cashblance,
	            	accessor: 'mvAvailableBalance' // not sure
	          	}, {
	            	Header: this.props.language.accountinfo.header.holdexecute,
	            	accessor: 'mvSettledBalance' // not sure
	          	}
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
		var mvStockBalanceInfo = this.props.data.mvStockBalanceInfo === undefined ? [] : this.props.data.mvStockBalanceInfo
		var mvList = this.props.AccountBalance === undefined ? [] : this.props.AccountBalance.mvList[0];
		
		let buttonAction = [
            <Pagination
                    pageIndex={this.state.pageIndex} 
                    totalRecord={10} 
                    onPageChange={this.onPageChange.bind(this)}
                    onNextPage={this.onNextPage.bind(this)}
                    onPrevPage={this.onPrevPage.bind(this)}
                />,
        ]

			if(mvList !== undefined && mvList !== []) {
				var data1 ={
					'mvBuyingPowerd': [mvList.mvBuyingPowerd,],
					'mvAvailableBalance': [mvList.mvAvailableBalance,],
					'mvSettledBalance': [mvList.mvSettledBalance,],
					'profitmvPendingBalanceLoss': [mvList.profitmvPendingBalanceLoss,],
					'mvDueSell': [mvList.mvDueSell,],
				}
				var data3 = {
					'equityMar': [0],
					'totalAssetMaintenance': [0],
					'stockMaintenance': [0],
					'cashMaintenance': [0],
					'mvOutstandingLoan': [0],
					'debtIncByPurchase': [0],
					'debitAccruedInterest': [0],
					'mvCreditLimit': [0],
				}
				var data4= {
					'lendableValue': [0],
					'minMarginReq': [0],
					'curLiqMargin': [0],
					'marginableBalf': [0],
					'cashDeposit': [0],
					'sellStkInMarPort': [0],
					'sellStkNotInMarPort': [0],
				}
				
			}
			else{
				var data1 = {
					'mvBuyingPowerd': [0],
					'mvAvailableBalance': [0],
					'mvSettledBalance': [0],
					'profitmvPendingBalanceLoss': [0],
					'mvDueSell': [0],
				}
			
	    	
		    	var data3 = {
		    		'equityMar': [0],
		    		'totalAssetMaintenance': [0],
		    		'stockMaintenance': [0],
		    		'cashMaintenance': [0],
		    		'mvOutstandingLoan': [0],
		    		'debtIncByPurchase': [0],
		    		'debitAccruedInterest': [0],
		    		'mvCreditLimit': [0],
		    	}
		    	var data4= {
		    		'lendableValue': [0],
		    		'minMarginReq': [0],
		    		'curLiqMargin': [0],
		    		'marginableBalf': [0],
		    		'cashDeposit': [0],
		    		'sellStkInMarPort': [0],
		    		'sellStkNotInMarPort': [0],
				}
		}

	    return(
			<div id={this.id + '-body'} className="layout-body">
				<ScrollingTabs tabList={this.state.tabList} onTabClick={this.onTabClick.bind(this)} id={this.id}/>
				<div style={{padding: '24px 2px 0px 2px',}}>
					{
						this.state.tabIndex === 1 ?
						(
							<HorizontalTable 
								showHeader={false}
								header={this.state.header1} 
								title={this.state.title1} 
								language={this.props.language.header} data={data1}/>	
						) : this.state.tabIndex === 2 ?
						(
							<div>
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
								<DataUpperTable
									id={this.id + "-table"}
									columns={this.state.columns}
									data={mvStockBalanceInfo}
									maxRows={9}
									defaultPgeSize={15}/>
							</div>
						) : this.state.tabIndex === 3 ?
						(
							<div>asdadas</div>
						) : this.state.tabIndex === 4 ?
						(
							<div>asd</div>
						) : (
							<div>asdsds</div>
						)
					}
				</div>
			</div>
	     )
    }

    componentDidMount() {
		this.props.getStockInfo(this.params)
		this.props.getAccountBalance(this.cashbankparams)
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
