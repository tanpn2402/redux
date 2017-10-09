import React, { Component } from 'react'
import VerticalTable from '../VerticalTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataUpperTable from '../DataUpperTable'
import SearchBar from '../commons/SearchBar'
import HorizontalTable from './../commons/HorizontalTable'
import Config from '../../core/config.js'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import ScrollingTabs from './../commons/ScrollingTabs'
import Table from '../commons/DataTable'

class StockMarketInfo extends Component {
	constructor(props) {
     	super(props)

     	this.state = {

			panel3: {
				data: [
					{"BestBid":{
						price: "-",
						volume: "-",
					}, "BestAsk":{
						price: "-",
						volume: "-",
					}},
					{"BestBid":{
						price: "-",
						volume: "-",
					}, "BestAsk":{
						price: "-",
						volume: "-",
					}},
					{"BestBid":{
						price: "-",
						volume: "-"
					}, "BestAsk":{
						price: "-",
						volume: "-"
					}},
				],
				bidVol: 0,
				askVol: 0,
			},
			panel2: [{
				Header: 'Volume',
				headerClassName: 'volume',
				columns: [
					{
						id: 'stockTime',
						Header: this.props.language.stockmarketinform.header.Time,
						maxWidth: 50,
						width: 50,
						accessor: 'Time',
						skip: false,
						show: true,
						sortable: false,
						skip: true
					},
					{
						id: 'stockPrice',
						Header: this.props.language.stockmarketinform.header.Price,
						maxWidth: 50,
						accessor: 'Price',
						width: 50,
						skip: false,
						show: true,
						sortable: false,
						skip: true
					},
					{
						id: 'stockVolume',
						Header: this.props.language.stockmarketinform.header.Volume,
						maxWidth: 50,
						accessor: 'Volume',
						width: 50,
						skip: false,
						show: true,
						sortable: false,
						skip: true
					},
					{
						id: 'stockTotal',
						Header: this.props.language.stockmarketinform.header.Total,
						maxWidth: 50,
						accessor: 'Total',
						width: 50,
						skip: false,
						show: true,
						sortable: false,
						skip: true
					}
				]
			}],

		    panel1: [
			    {
	            	header: this.props.language.stockmarketinform.header.Current,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.ChangeRate,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Ref,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.FloorCell,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.LowHigh,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Open,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Avg,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Volume,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Total,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.ForBuySell,
	            	value: '-',
	          	},
              	{
	            	header: this.props.language.stockmarketinform.header.Room,
	            	value: '-',
	          	},
          	],
          	pageIndex: 1,
		}
	    this.id = 'stockmarketinfo'
	}
	
	componentWillReceiveProps(nextProps){
		var askVol = 0, bidVol = 0
		for(var i=0; i<3; i++){
			bidVol += nextProps.stockWatchInfo.mvStockInfoBean["mvBidPrice"+i]==null?0:nextProps.stockWatchInfo.mvStockInfoBean["mvBidPrice"+i]
			askVol += nextProps.stockWatchInfo.mvStockInfoBean["mvOfferPrice"+i]==null?0:nextProps.stockWatchInfo.mvStockInfoBean["mvOfferPrice"+i]
		}

		var askVolPer = 0;
        if ((askVol + bidVol) != 0) {
            askVolPer = (askVol / (askVol + bidVol)) * 100;
        }
        else {
            askVolPer = 50;
		}
        var askQtyPer = Math.round(askVolPer);
        var bidVolPer = 100 - askQtyPer;
        this.rerenderBidAskPer(bidVolPer,askQtyPer)

		this.setState ({
			panel1: [
				{
	            	header: this.props.language.stockmarketinform.header.Current,
	            	value: nextProps.stockWatchInfo.mvStockInfoBean.mvNomial,
	          	}, {
	            	header: this.props.language.stockmarketinform.header.ChangeRate,
	            	value: 0.0,
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Ref,
	            	value: nextProps.stockWatchInfo.mvStockInfoBean.mvReferencePrice,
	          	}, {
	            	header: this.props.language.stockmarketinform.header.FloorCell,
	            	value: nextProps.stockWatchInfo.mvStockInfoBean.mvFloor + "/" + nextProps.stockWatchInfo.mvStockInfoBean.mvCeiling,
	          	}, {
	            	header: this.props.language.stockmarketinform.header.LowHigh,
	            	value: (nextProps.stockWatchInfo.mvStockInfoBean.mvLow||'') + "/" + (nextProps.stockWatchInfo.mvStockInfoBean.mvHigh||''),
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Open,
	            	value: nextProps.stockWatchInfo.mvStockInfoBean.mvDayOpen,
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Avg,
	            	value: "-",
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Volume,
	            	value: "-",
	          	}, {
	            	header: this.props.language.stockmarketinform.header.Total,
	            	value: '-',
	          	}, {
	            	header: this.props.language.stockmarketinform.header.ForBuySell,
	            	value: '/',
	          	},
              	{
	            	header: this.props.language.stockmarketinform.header.Room,
	            	value: nextProps.stockWatchInfo.mvStockInfoBean.mvCurrentRoom,
	          	},
			],
			panel3: {
				data: [
					{"BestBid":{
						price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidPrice1),
						volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidVol1),
					}, "BestAsk":{
						price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferPrice1),
						volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferVol1),
					}},
					{"BestBid":{
						price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidPrice2),
						volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidVol2),
					}, "BestAsk":{
						price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferPrice2),
						volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferVol2),
					}},
					{"BestBid":{
						price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidPrice3),
						volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidVol3),
					}, "BestAsk":{
						price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferPrice3),
						volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferVol3),
					}},
				],
				bidVol: 0,
				askVol: 0,
			}
		})
	}

	rerenderBidAskPer(bidPer, askPer) {
		this.perBuy.style.width = bidPer + "%"
		this.perSell.style.width = askPer + "%"
		this.perBuy.innerHTML = bidPer + "%"
		this.perSell.innerHTML = askPer + "%"
	}

	getData(value) {
		if (value==null) return "-"
		return value
	}

	render(){
 	    return(
			<div id={this.id}>
			<Title>
				{this.props.language.menu[this.id]}
			</Title>
			
			<Body>
				<div className="table-main" style={{"padding-bottom":0}}>
					<div className="table-responsive col-xs-6"  style={{height: '100%', fontSize: '12px'}}>
						<table className="table">
							<tbody >
								{
									this.state.panel1.map(d => {
										return(
											<tr>
												<th>{d.header}</th>
												<td>{d.value}</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>

					<div className=" col-xs-6 stock-info">

						<div className="marketdatainfo-mini-table">
							<table>
								<tr>
									<th colSpan={2}>{this.props.language.stockmarketinform.header.BestBid}</th>
									<th colSpan={2}>{this.props.language.stockmarketinform.header.BestAsk}</th>
								</tr>
								{this.state.panel3.data.map(row => 
									(<tr>
										<td>{row.BestBid.price}</td>
										<td>{row.BestBid.volume}</td>
										<td>{row.BestAsk.price}</td>
										<td>{row.BestAsk.volume}</td>
									</tr>))}
							</table>
							<div className="bid-ask-footer">
								<div ref={e=>this.perBuy = e}>-</div>
								<div ref={e=>this.perSell = e}>-</div>
							</div>
						</div>
						
						
						<div className="marketdatainfo-mini-table" id="match-order-table">
							<Table
								key={this.id}
								id={this.id}
								defaultPageSize={15}
								columns={this.state.panel2}
								data={[]}
							/>
						</div>

					</div>
				</div>
				
				<div className="table-header">
					<SearchBar
						ref = {e=>this.mvStockId = e}
						id={this.id}
						onSearch={this.onSearch.bind(this)}
						buttonAction={[]} 
						language={this.props.language.searchbar} 
						theme={this.props.theme}
						data={{stockList: this.props.stockList}}
						param={['mvStockId']}/>
				</div>							
			</Body>
		</div>
		// <div className="marketdatainfo-widget">
        //     <div className="component-header" >
        //         <span className="content-block-head">
        //             {this.props.language.menu[this.id]}
        //         </span>
        //         <ul className="btn-action">
                    
        //         </ul>
        //     </div>
		// 	<div className="component-body">
		// 		<div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
		// 			<div className="component-main stockmarketinfo">
						
		// 				<div className=" col-sm-4 stock-stat" >
		// 					<HorizontalTable 
		// 						showHeader={false}
		// 						header={[]} 
		// 						title={this.state.title} 
		// 						language={this.props.language.header}
		// 						data={this.data}/>
		// 				</div>
						
		// 		</div>
				
 		// 	</div>
		// </div>
 	    )
    }

    onSearch(param){
		var curStock = Config.cache.stockList.filter(stock=>stock.stockCode==param.mvStockId)
		if (curStock.length>0) {
			this.props.getStockWatchInfo(curStock[0])
		}
    }
}

const mapStateToProps = (state) => {
    return {stockWatchInfo: state.stock.stockWatchInfo}
}

const mapDispatchToProps = (dispatch, props) => ({
	getStockWatchInfo: (param) => {dispatch(actions.getStockWatchInfo(param))}
})
export default connect(mapStateToProps, mapDispatchToProps)(StockMarketInfo)
