import React, { Component } from 'react'
import VerticalTable from '../VerticalTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../DataTable'
import SearchBar from '../SearchBar'

class StockMarketInfo extends Component {
	constructor(props) {
     	super(props)

     	this.state= {
			columns1: [
				{
			        Header: this.props.language.stockmarketinform.header.BestBid,
			        headerClassName: 'a1',
			        columns: [{
			          	accessor: 'mvMarginPercentage',
			          	width: 70,
			        }, {
			          	accessor: 'mvMartginValue',
			          	width: 70,
			        }]
			    }, {
			        Header: this.props.language.stockmarketinform.header.BestAsk,
			        headerClassName: 'a2',
			        columns: [{
			          	accessor: 'mvMarginPercentage',
			          	width: 70,
			        }, {
			          	accessor: 'mvMartginValue',
			          	width: 70,
			        }]
			    }
		    ],

	        columns2: [
			    {
			        Header: this.props.language.stockmarketinform.header.MatchingOrderInfo,
			        headerClassName: 'info',
			        columns: [{
			          	Header: this.props.language.stockmarketinform.header.Time,
			          	accessor: 'a3',
			          	width: 80,
			        }, {
			          	Header: this.props.language.stockmarketinform.header.Price,
			          	accessor: 'a4',
			          	width: 70,
			        }, {
			          	Header: this.props.language.stockmarketinform.header.Volume,
			          	accessor: 'a5',
			          	width: 70,
			        }, {
			          	Header: this.props.language.stockmarketinform.header.Total,
			          	accessor: 'a6',
			          	width: 70,
			        }]
			    }
		   	],

		    header: ['Tổng quan', 'Giá trị'],

		    title: [
			    {
	            	Header: this.props.language.stockmarketinform.header.Current,
	            	accessor: 'a7',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.ChangeRate,
	            	accessor: 'a8',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.Ref,
	            	accessor: 'a9',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.FloorCell,
	            	accessor: 'a10',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.LowHigh,
	            	accessor: 'a11',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.Open,
	            	accessor: 'a12',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.Avg,
	            	accessor: 'a13',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.Volume,
	            	accessor: 'a14',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.Total,
	            	accessor: 'a15',
	          	}, {
	            	Header: this.props.language.stockmarketinform.header.ForBuySell,
	            	accessor: 'a16',
	          	},
              	{
	            	Header: this.props.language.stockmarketinform.header.Room,
	            	accessor: 'a17',
	          	},
          	],
          	pageIndex: 1,
		}
	    this.id = 'stockmarketinfo'
	    this.data = {
	    	'a7': ['1'],
	    	'a8': ['1'],
	    	'a9': ['1'],
	    	'a10' : ['1'],
	    	'a11' : ['1'],
	    	'a12' : ['1'],
	    	'a13' : ['1'],
	    	'a14' : ['1'],
	    	'a15' : ['1'],
	    	'a16' : ['1'],
	    	'a17' : ['1'],
	    }
    }

	render(){
 	     return(
 	     	<div id={this.id +'-body'} className="layout-body">
 				<SearchBar
                    id={this.id}
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={[]} 
                    stockList={this.props.stockList} 
                    language={this.props.language.searchbar} 
                    theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={[]}
                    param={['mvStockId']}/>

 			
 					<div className="col-xs-5 stock-stat">
 						<VerticalTable header={this.state.header} title={this.state.title} data={this.data}/>
 					</div>
 					<div className="col-xs-7 stock-info">
 					
	 					<DataTable id={this.id + "-table1"} columns={this.state.columns1} defaultPageSize={3}/>
	 					<DataTable id={this.id + "-table2"} columns={this.state.columns2} defaultPageSize={3}/>
 					</div>
 			
 	      	</div>
 	    )
    }

    onSearch(param){

    }
}

export default connect()(StockMarketInfo)
