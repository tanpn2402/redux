import React, { Component } from 'react'
import HorizontalTable from './../commons/HorizontalTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataUpperTable from '../DataUpperTable'
import Footer from '../DataTableFooter'
import Pagination from '../commons/Pagination'
import SearchBar from '../commons/SearchBar'

class Portfolio extends Component {
	constructor(props) {
     	super(props)

			this.params = {
					mvLastAction:'AccountInfo',
					mvChildLastAction: 'AccountInfo',
					key: '123123123123',
			}

     	this.state= {
	     	columns : [
		    {
		        Header: 'Ord',
		        accessor: 'STT',
		        maxWidth: 50
		    },
		    {
		        Header: this.props.language.portfolio.header.mvStockID,
		        accessor: 'mvStockID',
		        maxWidth: 60
		    },
		    {
		        Header: 'Volume',
		        headerClassName: 'volume',
		        columns: [{
		          	Header: this.props.language.portfolio.header.mvTradableQty,
		          	accessor: 'mvTradableQty',
		        }, {
		          	Header: this.props.language.portfolio.header.mvTSettled,
		          	accessor: 'mvTSettled'
		        }, {
		          	Header: this.props.language.portfolio.header.mvHoldingAmt,
		          	accessor: 'mvHoldingAmt'
		        }, {
		          	Header: this.props.language.portfolio.header.mvQueuingBuy,
		          	accessor: 'mvQueuingBuy'
		        }, {
		          	Header: this.props.language.portfolio.header.mvTT1UnsettleBuy,
		          	accessor: 'mvTT1UnsettleBuy'
		        }, {
		          	Header: this.props.language.portfolio.header.mvTDueBuy,
		          	accessor: 'mvTDueBuy'
		        }, {
		          	Header: this.props.language.portfolio.header.mvTMortgageQty,
		          	accessor: 'mvTMortgageQty'
		        }, {
		          	Header: this.props.language.portfolio.header.mvTManualHold,
		          	accessor: 'mvTManualHold'
		        }, {
		          	Header: this.props.language.portfolio.header.mvTEntitlementQty,
		          	accessor: 'mvTEntitlementQty'
		        }, {
		          	Header: this.props.language.portfolio.header.mvTAwaitingTraceCert,
		          	accessor: 'mvTAwaitingTraceCert'
		        }, {
		          	Header: this.props.language.portfolio.header.mvTAwaitingDepositCert,
		          	accessor: 'mvTAwaitingDepositCert'
		        }, {
		          	Header: this.props.language.portfolio.header.mvTAwaitingWithdrawalCert,
		          	accessor: 'mvTAwaitingWithdrawalCert'
		        }]
		    },
		    {
		        Header: 'Price',
		        headerClassName: 'price',
		        columns: [{
		          	Header: this.props.language.portfolio.header.mvAvgPrice,
		          	accessor: 'mvAvgPrice'
		        }, {
		          	Header: this.props.language.portfolio.header.mvMarketPrice,
		          	accessor: 'mvMarketPrice'
		        }]
		    },
		    {
		        Header: 'Pofolio assessment',
		        headerClassName: 'rate',
		        columns: [{
		          	Header: this.props.language.portfolio.header.mvWAC,
		          	accessor: 'mvWAC'
		        }, {
		          	Header: this.props.language.portfolio.header.mvMarketValue,
		          	accessor: 'mvMarketValue'
		        }, {
		          	Header: this.props.language.portfolio.header.mvPL,
		          	accessor: 'mvPL'
		        }, {
		          	Header: this.props.language.portfolio.header.mvPLPercent,
		          	accessor: 'mvPLPercent'
		        }]
		    },
		    {
		        Header: '(%) Margin',
		        headerClassName: 'deposit',
		        columns: [{
		          	Header: this.props.language.portfolio.header.mvMarginPercentage,
		          	accessor: 'mvMarginPercentage'
		        }, {
		          	Header: this.props.language.portfolio.header.mvMartginValue,
		          	accessor: 'mvMartginValue'
		        }, {
		          Header: this.props.language.portfolio.header.maintenancePercentage,
		          accessor: 'maintenancePercentage'
		        }, {
		          Header: this.props.language.portfolio.header.maintenanceValue,
		          accessor: 'maintenanceValue'
		        }]
		    }],

		    header1: ['Sumary', 'Value (VND)'],
		    header2: ['Cash information', 'Value(VND)'],
		    header3: ['Portfolio assessment', 'Value(VND)'],
		    header4: ['Margin position', 'Values'],

		    title1: [
			    {
	            	Header: this.props.language.portfolio.header.totalAsset,
	            	accessor: 'totalAsset',
	          	}, {
	            	Header: this.props.language.portfolio.header.equity,
	            	accessor: 'equity'
	          	}, {
	            	Header: this.props.language.portfolio.header.stockValue,
	            	accessor: 'stockValue'
	          	}, {
	            	Header: this.props.language.portfolio.header.profitLoss,
	            	accessor: 'profitLoss'
	          	}, {
	            	Header: this.props.language.portfolio.header.PLPercent,
	            	accessor: 'PLPercent'
	          	},
          	],
		    title2: [
			    {
		            Header: this.props.language.portfolio.header.cashBalance,
		            accessor: 'cashBalance'
	          	}, {
		            Header: this.props.language.portfolio.header.mvAvailAdvanceMoney,
		            accessor: 'mvAvailAdvanceMoney'
	          	}, {
		            Header: this.props.language.portfolio.header.mvBuyHoldAmount,
		            accessor: 'mvBuyHoldAmount'
	          	}, {
		            Header: this.props.language.portfolio.header.mvHoldAmount,
		            accessor: 'mvHoldAmount'
	          	}, {
		            Header: this.props.language.portfolio.header.CPendingWithdrawal,
		            accessor: 'CPendingWithdrawal'
	          	}, {
		            Header: this.props.language.portfolio.header.soldT0,
		            accessor: 'soldT0'
	          	}, {
		            Header: this.props.language.portfolio.header.soldT1,
		            accessor: 'soldT1'
	          	}, {
		            Header: this.props.language.portfolio.header.soldT2,
		            accessor: 'soldT2'
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
		}


	    this.id = 'porfolio'

    }

    componentWillReceiveProps(nextProps){
    	this.setState({
    		columns : [
		    {
		        Header: 'Ord',
		        accessor: 'STT',
		        maxWidth: 50
		    },
		    {
		        Header: nextProps.language.portfolio.header.mvStockID,
		        accessor: 'mvStockID',
		        maxWidth: 60
		    },
		    {
		        Header: 'Volume',
		        headerClassName: 'volume',
		        columns: [{
		          	Header: nextProps.language.portfolio.header.mvTradableQty,
		          	accessor: 'mvTradableQty',
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTSettled,
		          	accessor: 'mvTSettled'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvHoldingAmt,
		          	accessor: 'mvHoldingAmt' //not sure
		        }, {
		          	Header: nextProps.language.portfolio.header.mvQueuingBuy,
		          	accessor: 'mvQueuingBuy' //not sure
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTT1UnsettleBuy,
		          	accessor: 'mvTT1UnsettleBuy' // not sure
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTDueBuy,
		          	accessor: 'mvTDueBuy'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTMortgageQty,
		          	accessor: 'mvTMortgageQty'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTManualHold,
		          	accessor: 'mvTManualHold'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTEntitlementQty,
		          	accessor: 'mvTEntitlementQty'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTAwaitingTraceCert,
		          	accessor: 'mvTAwaitingTraceCert'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTAwaitingDepositCert,
		          	accessor: 'mvTAwaitingDepositCert'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvTAwaitingWithdrawalCert,
		          	accessor: 'mvTAwaitingWithdrawalCert'
		        }]
		    },
		    {
		        Header: 'Price',
		        headerClassName: 'price',
		        columns: [{
		          	Header: nextProps.language.portfolio.header.mvAvgPrice,
		          	accessor: 'mvAvgPrice'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvMarketPrice,
		          	accessor: 'mvMarketPrice'
		        }]
		    },
		    {
		        Header: 'Pofolio assessment',
		        headerClassName: 'rate',
		        columns: [{
		          	Header: nextProps.language.portfolio.header.mvWAC,
		          	accessor: 'mvWAC'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvMarketValue,
		          	accessor: 'mvMarketValue'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvPL,
		          	accessor: 'mvPL'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvPLPercent,
		          	accessor: 'mvPLPercent'
		        }]
		    },
		    {
		        Header: '(%) Margin',
		        headerClassName: 'deposit',
		        columns: [{
		          	Header: nextProps.language.portfolio.header.mvMarginPercentage,
		          	accessor: 'mvMarginPercentage'
		        }, {
		          	Header: nextProps.language.portfolio.header.mvMartginValue,
		          	accessor: 'mvMartginValue'
		        }, {
		          Header: nextProps.language.portfolio.header.maintenancePercentage,
		          accessor: 'maintenancePercentage'
		        }, {
		          Header: nextProps.language.portfolio.header.maintenanceValue,
		          accessor: 'maintenanceValue'
		        }]
		    }],

		    header1: [nextProps.language.portfolio.header.sumary, nextProps.language.portfolio.header.valuevnd],
		    header2: [nextProps.language.portfolio.header.cashinfo, nextProps.language.portfolio.header.valuevnd],
		    header3: [nextProps.language.portfolio.header.portfolioassessment, nextProps.language.portfolio.header.valuevnd],
		    header4: [nextProps.language.portfolio.header.marginposition, nextProps.language.portfolio.header.value],

		    title1: [
			    {
	            	Header: nextProps.language.portfolio.header.totalAsset,
	            	accessor: 'totalAsset',
	          	}, {
	            	Header: nextProps.language.portfolio.header.equity,
	            	accessor: 'equity'
	          	}, {
	            	Header: nextProps.language.portfolio.header.stockValue,
	            	accessor: 'stockValue'
	          	}, {
	            	Header: nextProps.language.portfolio.header.profitLoss,
	            	accessor: 'profitLoss'
	          	}, {
	            	Header: nextProps.language.portfolio.header.PLPercent,
	            	accessor: 'PLPercent'
	          	},
          	],
		    title2: [
			    {
		            Header: nextProps.language.portfolio.header.cashBalance,
		            accessor: 'cashBalance'
	          	}, {
		            Header: nextProps.language.portfolio.header.mvAvailAdvanceMoney,
		            accessor: 'mvAvailAdvanceMoney'
	          	}, {
		            Header: nextProps.language.portfolio.header.mvBuyHoldAmount,
		            accessor: 'mvBuyHoldAmount'
	          	}, {
		            Header: nextProps.language.portfolio.header.mvHoldAmount,
		            accessor: 'mvHoldAmount'
	          	}, {
		            Header: nextProps.language.portfolio.header.CPendingWithdrawal,
		            accessor: 'CPendingWithdrawal'
	          	}, {
		            Header: nextProps.language.portfolio.header.soldT0,
		            accessor: 'soldT0'
	          	}, {
		            Header: nextProps.language.portfolio.header.soldT1,
		            accessor: 'soldT1'
	          	}, {
		            Header: nextProps.language.portfolio.header.soldT2,
		            accessor: 'soldT2'
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


    	var data = this.props.data.mvPortfolioBeanList === undefined ? [] : this.props.data.mvPortfolioBeanList
    	//console.log('render in porfolio', this.state.columns )
    	var d = this.props.data.mvPortfolioAccSummaryBean
    	this.buttonAction = [
            <Pagination
                    pageIndex={this.state.pageIndex} 
                    totalRecord={data.length}
                    onPageChange={this.onPageChange.bind(this)}
                    onNextPage={this.onNextPage.bind(this)}
                    onPrevPage={this.onPrevPage.bind(this)}
                />,
        ]
    	if(d !== undefined && d !== [])
	    {
	    	console.log(d.totalAsset)
	    	var data1 = {
	    		'totalAsset': [d.totalAsset,],
	    		'equity': [d.equity,],
	    		'stockValue': [d.stockValue,],
	    		'profitLoss': [d.profitLoss,],
	    		'PLPercent': [d.PLPercent,],
	    	}
	    	var data2 = {
	    		'cashBalance' : [d.cashBalance],
	    		'mvAvailAdvanceMoney': [d.mvAvailAdvanceMoney],
	    		'mvBuyHoldAmount': [d.mvBuyHoldAmount],
	    		'mvHoldAmount': [d.mvHoldAmount],
	    		'CPendingWithdrawal': [d.CPendingWithdrawal],
	    		'soldT0': [d.soldT0],
	    		'soldT1': [d.soldT1],
	    		'soldT2': [d.soldT2],
	    	}
	    	var data3 = {
	    		'equityMar': [d.equityMar],
	    		'totalAssetMaintenance': [d.totalAssetMaintenance],
	    		'stockMaintenance': [d.stockMaintenance],
	    		'cashMaintenance': [d.cashMaintenance],
	    		'mvOutstandingLoan': [d.mvOutstandingLoan],
	    		'debtIncByPurchase': [d.debtIncByPurchase],
	    		'debitAccruedInterest': [d.debitAccruedInterest],
	    		'mvCreditLimit': [d.mvCreditLimit],
	    	}
	    	var data4= {
	    		'lendableValue': [d.lendableValue],
	    		'minMarginReq': [d.minMarginReq],
	    		'curLiqMargin': [d.curLiqMargin],
	    		'marginableBalf': [d.marginableBalf],
	    		'cashDeposit': [d.cashDeposit],
	    		'sellStkInMarPort': [d.sellStkInMarPort],
	    		'sellStkNotInMarPort': [d.sellStkNotInMarPort],
	    	}
	    }
	    else
	    {
	    	var data1 = {
	    		'totalAsset': [],
	    		'equity': [],
	    		'stockValue': [],
	    		'profitLoss': [],
	    		'PLPercent': [],
	    	}
	    	var data2 = {
	    		'cashBalance' : [],
	    		'mvAvailAdvanceMoney': [],
	    		'mvBuyHoldAmount': [],
	    		'mvHoldAmount': [],
	    		'CPendingWithdrawal': [],
	    		'soldT0': [],
	    		'soldT1': [],
	    		'soldT2': [],
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
	     	<div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
	     		<div className="component-main portfolio">
		        	<div className="clearfix statment">
		        		<div className="title" style={this.props.theme.porfolio.titlemoney}>
			          		<span>{this.props.language.portfolio.header.cash}</span>
			        	</div>
			          	<div className="col-sm-3 col-xs-6 statment-table">
			            		<HorizontalTable 
			            			header={this.state.header1} 
			            			title={this.state.title1} 
			            			height={200}
			            			data={data1}/>
			          	</div>
			          	<div className="col-sm-3 col-xs-6 statment-table">
			            		<HorizontalTable 
			            			header={this.state.header2} 
			            			title={this.state.title2} 
			            			height={200}
			            			data={data2}/>
			          	</div>
			          	<div className="col-sm-3 col-xs-6 statment-table">
			            		<HorizontalTable 
			            			header={this.state.header3} 
			            			title={this.state.title3} 
			            			height={200}
			            			data={data3}/>
			          	</div>
			          	<div className="col-sm-3 col-xs-6 statment-table">
			            		<HorizontalTable 
			            			header={this.state.header4} 
			            			title={this.state.title4} 
			            			height={200}
			            			data={data4}/>
			          	</div>
			          	<div className="clearfix"></div>
		          		<div className="title" style={this.props.theme.porfolio.titlestock}>
			          		<span>{this.props.language.portfolio.header.stock}</span>
			        	</div>
			        	<SearchBar
	                        id={this.id}
	                        hideSearchButton={true}
	                        onSearch={[]}
	                        buttonAction={this.buttonAction}
	                        stockList={[]}
	                        language={this.props.language.searchbar}
	                        theme={this.props.theme}
	                        columns={this.state.columns}
	                        onChangeStateColumn={this.onChangeStateColumn.bind(this)}
	                        param={['dropdown']} />
			          	
	        		</div>

		       	 		
	        		<div className="dtable">
	          			<DataUpperTable
		                    id={this.id + "-table"}
                        	language={this.props.language.portfolio.header}
		                    columns={this.state.columns}
		                    data={data}
		                    maxRows={4}
                        	defaultPageSize={15} />
	        		</div>
	        	</div>
	      	</div>
	     )
    }

    componentDidMount() {
    	this.props.getPorfolio(this.params, !this.props.reload);
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        })
    }

    onPageChange(pageIndex){
        console.log(this.id + ' onPageChange', pageIndex)
        this.setState({pageIndex: pageIndex });
    }

    onNextPage(){
        if(this.state.pageIndex > 0){
        	this.setState({pageIndex: parseInt(this.state.pageIndex) + 1 });
        }
    }

    onPrevPage(){
        if(this.state.pageIndex > 1){
        	this.setState({pageIndex: parseInt(this.state.pageIndex) - 1 });
        }
    }

}

const mapStateToProps = (state) => {
  	return {
  		data: state.porfolio.data,
  	}
}

const mapDispatchToProps = (dispatch, props) => ({
	getPorfolio: (params) => {
		dispatch(actions.getPorfolio(params))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
