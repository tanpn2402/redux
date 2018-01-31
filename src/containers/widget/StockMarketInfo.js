import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import SearchBar from '../commons/SearchBar'
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
					{
						"BestBid": {
							price: "-",
							volume: "-",
						}, "BestAsk": {
							price: "-",
							volume: "-",
						}
					},
					{
						"BestBid": {
							price: "-",
							volume: "-",
						}, "BestAsk": {
							price: "-",
							volume: "-",
						}
					},
					{
						"BestBid": {
							price: "-",
							volume: "-"
						}, "BestAsk": {
							price: "-",
							volume: "-"
						}
					},
				],
				bidVol: 0,
				askVol: 0,
			},
			panel2: [{
				Header: this.props.language.stockmarketinform.header.Volume,
				headerClassName: 'volume',
				columns: [
					{
						id: 'Time',
						maxWidth: 50,
						width: 50,
						accessor: 'Time',
						skip: false,
						show: true,
						sortable: false,
						skip: true
					},
					{
						id: 'Price',
						maxWidth: 50,
						accessor: 'Price',
						width: 50,
						skip: false,
						show: true,
						sortable: false,
						skip: true,
						background: props.theme.number.col
					},
					{
						id: 'Volume',
						maxWidth: 50,
						accessor: 'Volume',
						width: 50,
						skip: false,
						show: true,
						sortable: false,
						skip: true,
                        background: props.theme.number.col
					},
					{
						id: 'Total',
						maxWidth: 50,
						accessor: 'Total',
						width: 50,
						skip: false,
						show: true,
						sortable: false,
						skip: true,
                        background: props.theme.number.col
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

	componentWillReceiveProps(nextProps) {
		var askVol = 0, bidVol = 0
		for (var i = 0; i < 3; i++) {
			bidVol += nextProps.stockWatchInfo.mvStockInfoBean["mvBidPrice" + i] == null ? 0 : nextProps.stockWatchInfo.mvStockInfoBean["mvBidPrice" + i]
			askVol += nextProps.stockWatchInfo.mvStockInfoBean["mvOfferPrice" + i] == null ? 0 : nextProps.stockWatchInfo.mvStockInfoBean["mvOfferPrice" + i]
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
		this.rerenderBidAskPer(bidVolPer, askQtyPer)

		this.setState({
			panel1: [
				{
					header: nextProps.language.stockmarketinform.header.Current,
					value: nextProps.stockWatchInfo.mvStockInfoBean.mvNomial,
				}, {
					header: nextProps.language.stockmarketinform.header.ChangeRate,
					value: 0.0,
				}, {
					header: nextProps.language.stockmarketinform.header.Ref,
					value: nextProps.stockWatchInfo.mvStockInfoBean.mvReferencePrice,
				}, {
					header: nextProps.language.stockmarketinform.header.FloorCell,
					value: nextProps.stockWatchInfo.mvStockInfoBean.mvFloor + "/" + nextProps.stockWatchInfo.mvStockInfoBean.mvCeiling,
				}, {
					header: nextProps.language.stockmarketinform.header.LowHigh,
					value: nextProps.stockWatchInfo.mvStockInfoBean.mvLow + "/" + nextProps.stockWatchInfo.mvStockInfoBean.mvHigh,
				}, {
					header: nextProps.language.stockmarketinform.header.Open,
					value: nextProps.stockWatchInfo.mvStockInfoBean.mvDayOpen,
				}, {
					header: nextProps.language.stockmarketinform.header.Avg,
					value: "-",
				}, {
					header: nextProps.language.stockmarketinform.header.Volume,
					value: "-",
				}, {
					header: nextProps.language.stockmarketinform.header.Total,
					value: '-',
				}, {
					header: nextProps.language.stockmarketinform.header.ForBuySell,
					value: '/',
				},
				{
					header: nextProps.language.stockmarketinform.header.Room,
					value: nextProps.stockWatchInfo.mvStockInfoBean.mvCurrentRoom,
				},
			],
			panel3: {
				data: [
					{
						"BestBid": {
							price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidPrice1),
							volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidVol1),
						}, "BestAsk": {
							price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferPrice1),
							volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferVol1),
						}
					},
					{
						"BestBid": {
							price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidPrice2),
							volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidVol2),
						}, "BestAsk": {
							price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferPrice2),
							volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferVol2),
						}
					},
					{
						"BestBid": {
							price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidPrice3),
							volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvBidVol3),
						}, "BestAsk": {
							price: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferPrice3),
							volume: this.getData(nextProps.stockWatchInfo.mvStockInfoBean.mvOfferVol3),
						}
					},
				],
				bidVol: 0,
				askVol: 0,
			},
		})

		console.log("RECEIVE PROPS", this.props, nextProps)
		
	}

	rerenderBidAskPer(bidPer, askPer) {
		this.perBuy.style.width = bidPer + "%"
		this.perSell.style.width = askPer + "%"
		this.perBuy.innerHTML = bidPer + "%"
		this.perSell.innerHTML = askPer + "%"
	}

	getData(value) {
		if (value == null) return "-"
		return value
	}

	componentDidUpdate() {
		
	}

	componentDidMount() {
		
	}

	shouldComponentUpdate(nextProps) {
		// console.log("shouldComponentUpdate", nextProps.stockInfo, this.props.stockInfo)
		// if(this.props.stockInfo != undefined && nextProps.stockInfo != undefined) {
		// 	return this.props.stockInfo.stockCode != nextProps.stockInfo.stockCode
		// }
		return true
		
	}

	handleStockChange(option) {
		console.log("handleStockChange", option)
		this.props.setDefaultOrderParams({
			mvStockCode: option.stockCode,
			mvStockName: option.stockName,
			mvMarketID: option.mvMarketID,
			mvBS: "BUY",
            mvVol: 0,
            mvFeeRate: "",
            mvLending: "",
            mvBuyPower: "",
            mvGrossAmt: 0,
            mvMaxQty: 0,
            mvExpireChecked: false,
            mvBankACID: null,
            mvBankID: null,
            mvSettlementAccSelected: null
		})

		this.onSearch({"mvStockId": option.stockCode})
	}
	

	render() {
		let tableHeader = this.props.theme.table.tableHeader
		let tableFooter = this.props.theme.table.tableFooter
		let rowOdd = this.props.theme.table.rowOdd.backgroundColor
		let rowEven = this.props.theme.table.rowEven.backgroundColor
		let font2 = this.props.theme.font.sub1.color

		let themee = this.props.theme.title
		
				let bg = "";
				let tColor= "";
		
				if(themee == "dark") {
					bg = "#474747"
					tColor = "#FFF"
				} else {
					bg = "#FFF"
					tColor = "#000"
		
				}

		console.log("ENDER", this.props)

		let lang = this.props.language.stockmarketinform
		return (
			<div id={this.id}>
				<Title language={this.props.language} theme={this.props.theme} widgetID={'stockmarketinform'}>
					{this.props.language.menu[this.id]}
				</Title>

				<Body theme={this.props.theme}>
					<div className="table-header" style={{tableHeader, "zIndex": 2, paddingTop: 1}}>
						<SearchBar
							ref={e => this.mvStockId = e}
							id={this.id}
							buttonAction={[]}
							language={this.props.language.searchbar}
							theme={this.props.theme}
							data={{ stockList: this.props.stockList }}
							param={['mvStockId']}
							defaultParams={{"mvStockId": this.props.stockInfo}}
							allStockEnabled={false}
							handleStockChange={this.handleStockChange.bind(this)} />
					</div>
					<div className="table-main" style={{ paddingBottom: 0, position: "relative" }}>
						<div className="table-responsive col-xs-6" style={{ height: '100%', fontSize: '12px' }}>
							<table className="table">
								<tbody >
									{
										this.state.panel1.map((d, i) => {
											if (i % 2 != 0) {
												return (
													<tr style={{ backgroundColor: rowOdd, color: font2 }}>
														<th>{d.header}</th>
														<td>{d.value}</td>
													</tr>
												)
											} else {
												return (
													<tr style={{ backgroundColor: rowEven, color: font2 }}>
														<th>{d.header}</th>
														<td>{d.value}</td>
													</tr>
												)
											}
										})
									}
								</tbody>
							</table>
						</div>

						<div className=" col-xs-6 stock-info">

							<div className="marketdatainfo-mini-table">
								<table className="TTSTable">
									<tr>
										<th colSpan={2}>{this.props.language.stockmarketinform.header.BestBid}</th>
										<th colSpan={2}>{this.props.language.stockmarketinform.header.BestAsk}</th>
									</tr>
									{
										this.state.panel3.data.map((row, i) => {
											return (
												<tr style={{ backgroundColor: i%2 != 0 ? rowOdd: rowEven, color: font2 }}>
													<td>{row.BestBid.price}</td>
													<td>{row.BestBid.volume}</td>
													<td>{row.BestAsk.price}</td>
													<td>{row.BestAsk.volume}</td>
												</tr>
											)
										})
									}
								</table>
								<div className="bid-ask-footer">
									<div ref={e => this.perBuy = e}>-</div>
									<div ref={e => this.perSell = e}>-</div>
								</div>
							</div>


							<div id="match-order-table">
								<div style={{textAlign: "center", backgroundColor: "#286cae", color: "#FFF", borderBottom: "1px solid #cccccc25", fontSize: 12, padding: 3}}>{
									lang.header.MatchingOrderInfo}
								</div>
								<table className="TTSTable">
									<tr>
										<th>{lang.header.Time}</th>
										<th>{lang.header.Volume}</th>
										<th>{lang.header.Price}</th>
										<th>{lang.header.Total}</th>
									</tr>
									{
										this.state.panel3.data.map((row, i) => {

											return (
												<tr style={{ backgroundColor: i%2 != 0 ? rowOdd: rowEven, color: font2 }}>
													<td>{row.BestBid.price}</td>
													<td>{row.BestBid.volume}</td>
													<td>{row.BestAsk.price}</td>
													<td>{row.BestAsk.volume}</td>
												</tr>
											)
										})
									}
								</table>
							</div>

						</div>
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

	onSearch(param) {
		var curStock = Config.cache.stockList.filter(stock => stock.stockCode == param.mvStockId)
		if (curStock.length > 0) {
			console.log("ON SEARCH")
			this.props.getStockWatchInfo(curStock[0])
		}
	}
}

const mapStateToProps = (state) => {
	return { 
		stockWatchInfo: state.stock.stockWatchInfo,
		stockInfo: state.stock.stockInfo
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	getStockWatchInfo: (param) => { dispatch(actions.getStockWatchInfo(param)) },
    setDefaultOrderParams: (params) => {
        dispatch(actions.setDefaultOrderParams(params))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(StockMarketInfo)
