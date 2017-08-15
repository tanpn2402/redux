import React, { Component } from 'react'
import VerticalTable from '../VerticalTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import Footer from '../DataTableFooter'

class Portfolio extends Component {
	constructor(props) {
     	super(props)
     	this.state= {
	     	columns : [
		    {
		        Header: 'STT',
		        accessor: 'STT',
		        maxWidth: 50
		    },
		    {
		        Header: 'Mã CK',
		        accessor: 'mvStockID',
		        maxWidth: 60
		    },
		    {
		        Header: 'Khối lượng',
		        headerClassName: 'volume',
		        columns: [{
		          	Header: 'Tổng khối lượng',
		          	accessor: 'mvTradableQty',
		        }, {
		          	Header: 'Số dư GD',
		          	accessor: 'mvTSettled'
		        }, {
		          	Header: 'Số dư khoanh giữ',
		          	accessor: 'mvHoldingAmt' // not sure
		        }, {
		          	Header: 'Mua T0',
		          	accessor: 'mvQueuingBuy' //not sure
		        }, {
		          	Header: 'Mua T1',
		          	accessor: 'mvTT1UnsettleBuy' // not sure
		        }, {
		          	Header: 'Mua T2',
		          	accessor: 'mvTDueBuy'
		        }, {
		          	Header: 'Cầm cố',
		          	accessor: 'mvTMortgageQty'
		        }, {
		          	Header: 'Phong tỏa (BT+DK)',
		          	accessor: 'conditionalHold' //not sure
		        }, {
		          	Header: 'Chờ THQ',
		          	accessor: 'mvTEntitlementQty'
		        }, {
		          	Header: 'Chờ giao dịch',
		          	accessor: 'mvTAwaitingTraceCert'
		        }, {
		          	Header: 'Chờ lưu kí',
		          	accessor: 'mvTAwaitingDepositCert'
		        }, {
		          	Header: 'Chờ rút',
		          	accessor: 'mvTAwaitingWithdrawalCert'
		        }]
		    },
		    {
		        Header: 'Giá',
		        headerClassName: 'price',
		        columns: [{
		          	Header: 'Giá TB',
		          	accessor: 'mvAvgPrice'
		        }, {
		          	Header: 'Giá hiện tại',
		          	accessor: 'mvMarketPrice'
		        }]
		    },
		    {
		        Header: 'Đánh giá danh mục',
		        headerClassName: 'rate',
		        columns: [{
		          	Header: 'Giá trị mua',
		          	accessor: 'mvWAC'
		        }, {
		          	Header: 'Giá trị thị trường',
		          	accessor: 'mvMarketValue'
		        }, {
		          	Header: 'Lãi/Lỗ',
		          	accessor: 'mvPL'
		        }, {
		          	Header: '% Lãi/Lỗ',
		          	accessor: 'mvPLPercent'
		        }]
		    },
		    {
		        Header: '(%) Ký quỹ',
		        headerClassName: 'deposit',
		        columns: [{
		          	Header: '% Cho vay',
		          	accessor: 'mvMarginPercentage'
		        }, {
		          	Header: 'Giá trị vay',
		          	accessor: 'mvMartginValue'
		        }, {
		          Header: '% Đảm báo',
		          accessor: 'maintenancePercentage'
		        }, {
		          Header: 'Giá trị đảm bảo',
		          accessor: 'maintenanceValue'
		        }]
		    }],

		    header1: ['Tổng quan', 'Giá trị (VND)'],
		    header2: ['Thông tin tài khoản tiền', 'Giá trị (VND)'],
		    header3: ['Đánh giá tài sản', 'Giá trị (VND)'],
		    header4: ['Trạng thái kí quỹ', 'Giá trị'],

		    title1: [
			    {
	            	Header: 'Tổng tài sản',
	            	accessor: 'totalAsset',
	          	}, {
	            	Header: 'Tài sản thực có',
	            	accessor: 'equity'
	          	}, {
	            	Header: 'Tổng giá trị chứng khoán',
	            	accessor: 'stockValue'
	          	}, {
	            	Header: 'Lãi/Lỗ',
	            	accessor: 'profitLoss'
	          	}, {
	            	Header: '% Lãi/lỗ (trên tài sản thực có)',
	            	accessor: 'PLPercent'
	          	},
	          	/*{
	            	Header: 's ',
	            	accessor: ' '
	          	}, {
	            	Header: ' d',
	            	accessor: ' '
	          	}, {
	            	Header: ' f',
	            	accessor: ' '
	          	}*/
          	],
		    title2: [
			    {
		            Header: 'Số dư tiền mặt',
		            accessor: 'cashBalance'
	          	}, {
		            Header: 'Số dư ứng trước',
		            accessor: 'mvAvailAdvanceMoney'
	          	}, {
		            Header: 'Tiền mua CK đã khớp',
		            accessor: 'aaa1' //not
	          	}, {
		            Header: 'Tiền mua CK chờ khớp',
		            accessor: 'aaa2' // chưa tìm dc
	          	}, {
		            Header: 'Tiền(rút, chuyển khoản) chờ duyệt',
		            accessor: 'CPendingWithdrawal'
	          	}, {
		            Header: 'Tiền bán T+0',
		            accessor: 'aaa3' //chưa dc
	          	}, {
		            Header: 'Tiền bán T+1',
		            accessor: 'CDueSell'
	          	}, {
		            Header: 'Tiền bán T+2',
		            accessor: 'aaa4' //chưa dc
	          	}
          	],
		    title3: [
			    {
		            Header: 'Tổng tài sản đảm bảo',
		            accessor: 'equityMar'
	          	}, {
		            Header: 'Vốn thực có',
		            accessor: 'totalAssetMaintenance'
	          	}, {
		            Header: 'Giá trị chứng khoán đảm bảo',
		            accessor: 'stockMaintenance'
	          	}, {
		            Header: 'Giá trị tiền mặt đảm bảo',
		            accessor: 'cashMaintenance'
	          	}, {
		            Header: 'Dư nợ kí quỹ',
		            accessor: 'aaa5' //chưa dc
	          	}, {
		            Header: 'Tăng nợ do lệnh mua',
		            accessor: 'aaa6' //chưa dc
	          	}, {
		            Header: 'Lãi vay cộng dồn',
		            accessor: 'aaa7' //chưa dc
	          	}, {
		            Header: 'Hạn mức tín dụng',
		            accessor: 'aaa8' //chưa dc
	          	}
          	],
		    title4: [
			    {
		            Header: 'Khả năng vay kí quỹ',
		            accessor: 'aaa9' //not
          		}, {
		            Header: 'Tỉ lệ kí quỹ tối thiểu bắt buộc',
		            accessor: 'aaa10' //not
          		}, {
		            Header: 'Tỉ lệ kí quỹ hiện tại',
		            accessor: 'curLiqMargin'
          		}, {
		            Header: 'Gọi bổ sung ký quỹ (tùy chọn)',
		            accessor: 'aaa11' // chưa tìm dc
          		}, {
		            Header: 'Nộp tiền mặt',
		            accessor: 'aaa12' //chưa dc
          		}, {
          		  	Header: 'Bán CK trong danh mục ký quỹ',
		            accessor: 'aaa13' //chưa dc
          		}, {
		            Header: 'Bán CK ngoài danh mục ký quỹ',
		            accessor: 'aaa14' //chưa dc
          		}
          	],
          	pageIndex: 1,
		}
		

	    this.id = 'porfolio'

     }

    render(){
    	
    	
    	var data = this.props.data.mvPortfolioBeanList === undefined ? [] : this.props.data.mvPortfolioBeanList
    	console.log('render in porfolio', data.slice( (this.state.pageIndex - 1) * 15 + 1, this.state.pageIndex * 15 + 1) )
    	var d = this.props.data.mvPortfolioAccSummaryBean

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
	    		'aaa1': ['',],
	    		'aaa2': ['',],
	    		'CPendingWithdrawal': [d.CPendingWithdrawal],
	    		'aaa3': ['',],
	    		'CDueSell': [d.CDueSell],
	    		'aaa4': ['',],
	    	}
	    	var data3 = {
	    		'equityMar': [d.equityMar],
	    		'totalAssetMaintenance': [d.totalAssetMaintenance],
	    		'stockMaintenance': [d.stockMaintenance],
	    		'cashMaintenance': [d.cashMaintenance],
	    		'aaa5': ['',],
	    		'aaa6': ['',],
	    		'aaa7': ['',],
	    		'aaa8': ['',],
	    	}
	    	var data4= {
	    		'aaa9': ['',],
	    		'aaa10': ['',],
	    		'curLiqMargin': [d.curLiqMargin],
	    		'aaa11': ['',],
	    		'aaa12': ['',],
	    		'aaa13': ['',],
	    		'aaa14': ['',],
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
	    		'aaa1': [],
	    		'aaa2': [],
	    		'CPendingWithdrawal': [],
	    		'aaa3': [],
	    		'CDueSell': [],
	    		'aaa4': [],
	    	}
	    	var data3 = {
	    		'equityMar': [],
	    		'totalAssetMaintenance': [],
	    		'stockMaintenance': [],
	    		'cashMaintenance': [],
	    		'aaa5': [],
	    		'aaa6': [],
	    		'aaa7': [],
	    		'aaa8': [],
	    	}
	    	var data4= {
	    		'aaa9': [],
	    		'aaa10': [],
	    		'curLiqMargin': [],
	    		'aaa11': [],
	    		'aaa12': [],
	    		'aaa13': [],
	    		'aaa14': [],
	    	}
	    }
	     return(
	     	<div id={this.id + '-body'} className="layout-body">
		        	<div className="title" style={this.props.theme.porfolio.titlemoney}>
		          		<span>TIỀN</span>
		        	</div>

		        	<div>
			          	<div className="col-md-3">
			            		<VerticalTable header={this.state.header1} title={this.state.title1} data={data1}/>
			          	</div>
			          	<div className="col-md-3">
			            		<VerticalTable header={this.state.header2} title={this.state.title2} data={data2}/>
			          	</div>
			          	<div className="col-md-3">
			            		<VerticalTable header={this.state.header3} title={this.state.title3} data={data3}/>
			          	</div>
			          	<div className="col-md-3">
			            		<VerticalTable header={this.state.header4} title={this.state.title4} data={data4}/>
			          	</div>
	        		</div>
	        		<div className="clearfix"></div>
	       	 		<div className="title" style={this.props.theme.porfolio.titlestock}>
		          		<span>CHỨNG KHOÁN</span>
		        	</div>
	        		<div>
	          			<DataTable
		                    id={this.id + "-table"} 
		                    columns={this.state.columns} 
		                    data={data.slice( (this.state.pageIndex - 1) * 15 + 1, this.state.pageIndex * 15 + 1)}/>
	                   	<Footer 
	                   		pageIndex={this.state.pageIndex} 
	                   		totalRecord={data.length} 
	                   		onPageChange={this.onPageChange.bind(this)}/>
	        		</div>
	      	</div>
	     )
    }

    componentDidMount() {
    	this.props.getPorfolio()
    }

    onPageChange(pageIndex){
        console.log(this.id + ' onPageChange', pageIndex)
        this.setState({pageIndex: pageIndex });
    }

}

const mapStateToProps = (state) => {
  	return {
  		data: state.porfolio.data,
  	}
}

const mapDispatchToProps = (dispatch, props) => ({
	getPorfolio: () => {
		dispatch(actions.getPorfolio())
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
