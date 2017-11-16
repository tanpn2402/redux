import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Tabs, Tab } from 'react-bootstrap'
import ScrollingTabs from './../commons/ScrollingTabs'
import SearchBar from '../commons/SearchBar'
import Pagination from '../commons/Pagination'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import config from '../../core/config'
import {TabControl, TabItem} from "../commons/TabControl"


class AccountInfo extends Component {
	constructor(props) {
		super(props)
		this.defaultPageSize = 20
		this.state = {
			activeKey: 1,
			columns: [
				{
					id: 'mvStockCode',
					Header: this.props.language.accountinfo.header.stock,
					accessor: 'mvStockCode',
					width: 90,
					skip: false,
					show: true,
				},
				{
					id: 'mvTotalValue',
					Header: this.props.language.accountinfo.header.vol,
					accessor: 'mvTotalValue',
					width: 70,
					skip: false,
					show: true,
				},
				{
					Header: this.props.language.accountinfo.header.tradeinday,
					headerClassName: this.props.language.accountinfo.header.tradeinday,
					columns: [{
						Header: this.props.language.accountinfo.header.bought,
						width: 150,
						accessor: 'mvTTodayBuy',
					}, {
						Header: this.props.language.accountinfo.header.sold,
						width: 150,
						accessor: 'mvTTodaySell'
					}]
				}
			],

			pageIndex: 1,
			tabIndex: 0,

			tabList: [
				{
					title: this.props.language.accountinfo.title.cash,
					cls: 'actived',
					id: 0
				},
				{
					title: this.props.language.accountinfo.title.stock,
					cls: 'normal',
					id: 1
				},
				{
					title: this.props.language.accountinfo.title.overduedebt,
					cls: 'disabled',
					id: 2
				},
				{
					title: this.props.language.accountinfo.title.upcomingduedebt,
					cls: 'disabled',
					id: 3
				}
			],

			cashBank : [
				{
					header: this.props.language.cash.header.buyingPower + " (ACB-123)",
					value: 0
				}, {
					header: this.props.language.cash.header.cashBanlance,
					value: 0
				}, {
					header: this.props.language.cash.header.dueBuy,
					value: 0
				}, {
					header: this.props.language.cash.header.buyingOrderAmt,
					value: 0
				}, {
					header: this.props.language.cash.header.dueSell,
					value: 0
				}
			],

			cash : [
				{
					header: this.props.language.cash.header.buyingPower,
					value: 0,
				}, {
					header: this.props.language.cash.header.cashBanlance,
					value: 0
				}, {
					header: this.props.language.cash.header.withDrawable,
					value: 0
				}, {
					header: this.props.language.cash.header.cashAdvanceable,
					value: 0
				}, {
					header: this.props.language.cash.header.temporaryHoldCash,
					value: 0
				}, {
					header: this.props.language.cash.header.dueBuy,
					value: 0
				}, {
					header: this.props.language.cash.header.buyingOrderAmt,
					value: 0
				}, {
					header: this.props.language.cash.header.widthdrawPendingForApproval,
					value: 0
				}, {
					header: this.props.language.cash.header.outStandingLoan,
					value: 0
				}, {
					header: this.props.language.cash.header.marginCallByOption,
					value: 0
				}, {
					header: this.props.language.cash.header.cashDeposit,
					value: 0
				}, {
					header: this.props.language.cash.header.sellStockInMarPort,
					value: 0
				}, {
					header: this.props.language.cash.header.sellStockNotInMarPort,
					value: 0
				}
			],

			overdueDebt : [
				{
					header: this.props.language.overdueDebt.header.overdueDebt,
					value: 0
				}, {
					header: this.props.language.overdueDebt.header.processedDebt,
					value: 0
				}, {
					header: this.props.language.overdueDebt.header.cashReserve,
					value: 0
				}, {
					header: this.props.language.overdueDebt.header.advanceRequest,
					value: 0
				}, {
					header: this.props.language.overdueDebt.header.cashSupplement,
					value: 0
				}, {
					header: this.props.language.overdueDebt.header.sellStockRequest,
					value: 0
				}, {
					header: this.props.language.overdueDebt.header.forceSell,
					value: 0
				}, {
					header: this.props.language.overdueDebt.header.forceSellDays,
					value: 0
				}
			],

			upcomingDebt : [
				
			]
		}

		this.id = 'accountinfo'

		this.stockParams = {
			key: (new Date()).getTime(),
			mvEnableGetStockInfo: 'N',
			mvAction: 'SB'
		}

		this.cashparams = {
			key: (new Date()).getTime()
		}

		this.cashbankparams = {
			bankId: '',
			bankAcId: '',
			loadBank: 'true',
			key: (new Date()).getTime()
		}

		this.overduedebtparams = {
			key: (new Date()).getTime()
		}

		this.upcomingbebtparams = {
			key: (new Date()).getTime()
		}

		this.hasBank = false
		this.disableOverDueDebtTab = false
		this.disableupcomingDueDebtTab = false

		this.lang = config.cache.lang

		this.stock = []
	}

	updateCash(response, language) {
		if (!response.mvList || response.mvList.length <= 0) return;
		var data = response.mvList[0];
		if (data.length != 0) {
			var settledSubPendBuyPendWDHoldAmount = Utils.numUnFormat(data.mvCSettled, ",") -
				Utils.numUnFormat(data.mvPendingBuy, ",") -
				Utils.numUnFormat(data.mvPendingWithdraw) -
				Utils.numUnFormat(data.mvHoldingAmt);

			var withdrawable = Utils.numUnFormat(data.mvWithdrawableAmount, ",");

			var availableAdvance = Utils.numUnFormat(data.mvAdvanceableAmount, ",");

			var cashBalance = settledSubPendBuyPendWDHoldAmount > 0 ? settledSubPendBuyPendWDHoldAmount : 0;
			var buyingPowerd = data.mvBuyingPowerd;
			var mvTemporaryHoldCash = data.mvTemporaryHoldCash;

			var outStandingLoan = 0;
			var cashDeposit = 0;
			var sellStockInMar = 0;
			var sellStockNotInMar = 0;
			var marginCall = 0;
			if (data.mvAccountType === "M") {
				var minAvaiWithdraw = availableAdvance > withdrawable ? withdrawable : availableAdvance
				availableAdvance = minAvaiWithdraw > 0 ? minAvaiWithdraw : 0

				//cashBalance = (withdrawable - availableAdvance>0?withdrawable - availableAdvance:0)
				cashBalance = (withdrawable - availableAdvance) > 0 ? withdrawable - availableAdvance : 0

				outStandingLoan = Utils.numUnFormat(data.mvOutstandingLoan, ",");
				cashDeposit = Utils.numUnFormat(data.mvSupplementCash, ",");
				marginCall = Utils.numUnFormat(data.mvMarginCall, ",");
				sellStockInMar = marginCall * 1.01;
				if (cashDeposit === 0)
					sellStockInMar = 0

				sellStockNotInMar = cashDeposit * 1.01
			} else {
				availableAdvance = settledSubPendBuyPendWDHoldAmount < 0 ?
					availableAdvance + settledSubPendBuyPendWDHoldAmount : availableAdvance;
			}

			if (availableAdvance < 0) {
				availableAdvance = 0
			}

			this.setState({
				cash : [
					{
						header: language.cash.header.buyingPower,
						value: Utils.currencyShowFormatter(buyingPowerd, ",", this.lang)
					}, {
						header: language.cash.header.cashBanlance,
						value: Utils.currencyShowFormatter(cashBalance, ",", this.lang)
					}, {
						header: language.cash.header.withDrawable,
						value: Utils.currencyShowFormatter(withdrawable, ",", this.lang)
					}, {
						header: language.cash.header.cashAdvanceable,
						value: Utils.currencyShowFormatter(availableAdvance, ",", this.lang)
					}, {
						header: language.cash.header.temporaryHoldCash,
						value: Utils.currencyShowFormatter(mvTemporaryHoldCash, ",", this.lang)
					}, {
						header: language.cash.header.dueBuy,
						value: Utils.currencyShowFormatter(data.mvPendingSettled, ",", this.lang)
					}, {
						header: language.cash.header.buyingOrderAmt,
						value: Utils.currencyShowFormatter(data.mvBuyHoldAmount, ",", this.lang)
					}, {
						header: language.cash.header.widthdrawPendingForApproval,
						value: Utils.currencyShowFormatter(data.mvPendingWithdraw, ",", this.lang)
					}, {
						header: language.cash.header.outStandingLoan,
						value: Utils.currencyShowFormatter(outStandingLoan, ",", this.lang)
					}, {
						header: language.cash.header.marginCallByOption,
						value: Utils.currencyShowFormatter(0, ",", this.lang)
					}, {
						header: language.cash.header.cashDeposit,
						value: Utils.currencyShowFormatter(cashDeposit, ",", this.lang)
					}, {
						header: language.cash.header.sellStockInMarPort,
						value: Utils.currencyShowFormatter(sellStockInMar, ",", this.lang)
					}, {
						header: language.cash.header.sellStockNotInMarPort,
						value: Utils.currencyShowFormatter(sellStockNotInMar, ",", this.lang)
					}
				]
			})
		}
	}

	updateOverdueDebt(response, language) {
		if (!response.overdueDebt) {
			return;
		}
		var data = response.overdueDebt
		if (data.length !== 0) {
			if (parseFloat(data.overdueDebt) === 0 && parseFloat(data.processedDebt) === 0) {
				this.disableOverDueDebtTab = true
			} else {
				this.disableOverDueDebtTab = false
				this.state.tabList[2].cls = 'normal'

				var forceSellDays = data.forceSellDays + " " + language.overdueDebt.days
				this.setState({
					overdueDebt : [
						{
							header: language.overdueDebt.header.overdueDebt,
							value: Utils.currencyShowFormatter(data.overdueDebt, ",", this.lang)
						}, {
							header: language.overdueDebt.header.processedDebt,
							value: Utils.currencyShowFormatter(data.processedDebt, ",", this.lang)
						}, {
							header: language.overdueDebt.header.cashReserve,
							value: Utils.currencyShowFormatter(data.cashReserve, ",", this.lang)
						}, {
							header: language.overdueDebt.header.advanceRequest,
							value: Utils.currencyShowFormatter(data.advanceRequest, ",", this.lang)
						}, {
							header: language.overdueDebt.header.cashSupplement,
							value: Utils.currencyShowFormatter(data.cashSupplement, ",", this.lang)
						}, {
							header: language.overdueDebt.header.sellStockRequest,
							value: Utils.currencyShowFormatter(data.sellStockRequest, ",", this.lang)
						}, {
							header: language.overdueDebt.header.forceSell,
							value: Utils.currencyShowFormatter(data.forceSell, ",", this.lang)
						}, {
							header: language.overdueDebt.header.forceSellDays,
							value: forceSellDays
						}
					]
				})
			}
		}
	}

	updateCashBank(response, language) {

		if (!response.mvList || response.mvList.length <= 0 || response.mvList[0] == null) {
			this.hasBank = false
			return
		}

		this.hasBank = true
		this.state.tabList[0].title = language.accountinfo.title.cashBank

		var data = response.mvList[0]
		if (data.length != 0) {
			var cashBalance = data.mvBuyingPowerd
			var buyingPowerd = data.mvBuyingPowerd

			this.setState({
				cashBank : [
					{
						header: language.cash.header.buyingPower + " (" + data.mvBankId + "-" + data.mvBankAcId + ")",
						value: Utils.currencyShowFormatter(buyingPowerd, ",", this.lang)
					}, {
						header: language.cash.header.cashBanlance,
						value: Utils.currencyShowFormatter(cashBalance, ",", this.lang)
					}, {
						header: language.cash.header.dueBuy,
						value: Utils.currencyShowFormatter(data.mvPendingSettled, ",", this.lang)
					}, {
						header: language.cash.header.buyingOrderAmt,
						value: Utils.currencyShowFormatter(data.mvBuyHoldAmount, ",", this.lang)
					}, {
						header: language.cash.header.dueSell,
						value: Utils.currencyShowFormatter(data.mvDueSell, ",", this.lang)
					}
				]
			})
		}

	}

	updateUpcomingDueDebt(response, language) {
		var haveDebt = false
		this.disableupcomingDueDebtTab = true
		if (response.upcomingDebt && response.upcomingDebt.length > 0) {
			var pUpcomingDebt = response.upcomingDebt
			for (var i = 0; i < pUpcomingDebt.length; i++) {
				if (parseFloat(pUpcomingDebt[i].Value) > 0) {
					haveDebt = true
					break
				}
			}
			if (haveDebt) {
				this.disableupcomingDueDebtTab = false
				this.state.tabList[3].cls = 'normal'
			}
		}

	}

	updateTabList(language) {
		this.setState({
			tabList: [
				{
					title: language.accountinfo.title.cash,
					cls: 'actived',
					id: 0
				},
				{
					title: language.accountinfo.title.stock,
					cls: 'normal',
					id: 1
				},
				{
					title: language.accountinfo.title.overduedebt,
					cls: 'disabled',
					id: 2
				},
				{
					title: language.accountinfo.title.upcomingduedebt,
					cls: 'disabled',
					id: 3
				}
			]
		})
	}

	updateStockTable(language) {
		this.setState({
			columns: [
				{
					id: 'mvStockCode',
					Header: language.accountinfo.header.stock,
					accessor: 'mvStockCode',
					width: 90,
					skip: false,
					show: true,
				},
				{
					id: 'mvTotalValue',
					Header: language.accountinfo.header.vol,
					accessor: 'mvTotalValue',
					width: 70,
					skip: false,
					show: true,
				},
				{
					Header: language.accountinfo.header.tradeinday,
					headerClassName: language.accountinfo.header.tradeinday,
					columns: [{
						Header: language.accountinfo.header.bought,
						width: 150,
						accessor: 'mvTTodayBuy',
					}, {
						Header: language.accountinfo.header.sold,
						width: 150,
						accessor: 'mvTTodaySell'
					}]
				}
			]
		})
	}



	componentWillReceiveProps(nextProps) {
		this.updateCash(nextProps.accountBalance, nextProps.language)
		this.updateCashBank(nextProps.accountBalanceBank, nextProps.language)
		this.updateOverdueDebt(nextProps.overdueDebt, nextProps.language)
		this.updateUpcomingDueDebt(nextProps.upcomingDebt, nextProps.language)
		this.updateTabList(nextProps.language)
		this.updateStockTable(nextProps.language)
	}

	onTabChange(key) {
        this.setState({activeKey: key})
    }


	render() {
		let font2 = this.props.theme.font.sub1.color
		let tableFooter = this.props.theme.table.tableFooter
		let rowOdd = this.props.theme.table.rowOdd.backgroundColor
		let rowEven = this.props.theme.table.rowEven.backgroundColor

		let language = this.props.language

		return (
			<div id={this.id}>
				<Title language={this.props.language} theme={this.props.theme}>
					{this.props.language.menu[this.id]}
				</Title>

				<Body theme={this.props.theme}>
					<TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)}>
                        <TabItem eventKey={1} title={language.accountinfo.title.cash} >
                            
							{
								this.hasBank ?
								(
									
									<div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
										<table className="table">
											<tbody >
												{
													this.state.cashBank.map((d, i) => {
														if (i % 2 != 0) {
															return (
																<tr style={{ backgroundColor: rowOdd, color: font2 }} >
																	<th>{d.header}</th>
																	<td>{d.value}</td>
																</tr>
															)
														} else {
															return (
																<tr style={{ backgroundColor: rowEven, color: font2 }} >
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

								) :
								(
									
									<div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
										<table className="table">
											<tbody >
												{
													this.state.cash.map((d, i) => {
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
										
								)
							}
                            
                        </TabItem>
                        <TabItem eventKey={2} title={language.accountinfo.title.stock}>
							<Table 
								theme={this.props.theme}
								id={this.id}
								language={this.props.language}

								pageSize={this.defaultPageSize}
								columns={this.state.columns}
								tableData={this.props.stock.mvStockBalanceInfo.slice(
											(this.state.pageIndex - 1) * this.defaultPageSize,
											this.state.pageIndex * this.defaultPageSize)}

								pageIndex={this.state.pageIndex}
								onPageChange={this.onPageChange.bind(this)}
								totalPage={Math.ceil(this.props.stock.mvStockBalanceInfo.length / this.defaultPageSize)}
								onExportExcel={() => {}}

								searchParams={[]}
								searchActions={[]}
								searchData={{}}
								onSearch={() => {}}
								searchEnable={false}

							/>
                            
							{/* <div>
								<div className="table-main" style={{ paddingTop: '51px' }}>
									<Table
										theme={this.props.theme}
										key={this.id}
										id={this.id}
										columns={this.state.columns}
										defaultPageSize={this.defaultPageSize}
										data={this.props.stock.mvStockBalanceInfo.slice(
											(this.state.pageIndex - 1) * this.defaultPageSize,
											this.state.pageIndex * this.defaultPageSize)}
									/>
								</div>

								<div className="table-footer" style={tableFooter}>
									<Pagination theme={this.props.theme}
										pageIndex={this.state.pageIndex}
										totalRecord={Math.ceil(this.props.stock.mvStockBalanceInfo.length / this.defaultPageSize)}
										onPageChange={this.onPageChange.bind(this)}
										onNextPage={this.onNextPage.bind(this)}
										onPrevPage={this.onPrevPage.bind(this)}
									/>
								</div>
							</div> */}
                            
                        </TabItem>
                        <TabItem eventKey={3} title={language.accountinfo.title.overduedebt} disabled>
                            
							
							<div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
								<table className="table">
									<tbody >
										{
											this.state.overdueDebt.map((d, i) => {
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
							
                            
                        </TabItem>
                        <TabItem eventKey={4} title={language.accountinfo.title.upcomingduedebt} disabled>
                            
				
							<div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
								<table className="table">
									<tbody >
										{
											this.state.upcomingDebt.map((d, i) => {
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
							
                            
                        </TabItem>
                    </TabControl>
				</Body>
			</div>
		)
	}

	componentDidMount() {
		// this.props.getStockInfo(this.params)
		this.props.getAccountBalanceBank(this.cashbankparams)
		this.props.getAccountBalance(this.cashparams)
		this.props.getOverdueDebt(this.overduedebtparams)
		this.props.getUpComingDebt(this.upcomingbebtparams)
	}

	onTabClick(tab, e) {
		if (tab === 1) {
			this.props.getStockInfo(this.stockParams)
		}

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

	onNextPage() {
		if (this.state.pageIndex > 0) {
			this.setState({ pageIndex: parseInt(this.state.pageIndex) + 1 })
		}
	}

	onPrevPage() {
		if (this.state.pageIndex > 1) {
			this.setState({ pageIndex: parseInt(this.state.pageIndex) - 1 })
		}
	}

	onPageChange(pageIndex) {
		if (pageIndex > 0) {
			this.setState({ pageIndex: pageIndex })
		}
	}


	onSearch(e) {

	}
}

const mapStateToProps = (state) => {
	return {
		accountBalanceBank: state.accountinfo.accountBalanceBank,
		accountBalance: state.accountinfo.accountBalance,
		overdueDebt: state.accountinfo.overdueDebt,
		upcomingDebt: state.accountinfo.upcomingDebt,
		stock: state.accountinfo.stock
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	getStockInfo: (params) => {
		dispatch(actions.getStockInfo(params))
	},
	getAccountBalance: (cashbankparams) => {
		dispatch(actions.getAccountBalance(cashbankparams))
	},
	getAccountBalanceBank: (cashbankparams) => {
		dispatch(actions.getAccountBalanceBank(cashbankparams))
	},
	getOverdueDebt: (overduedebtparams) => {
		dispatch(actions.getOverdueDebt(overduedebtparams))
	},
	getUpComingDebt: (upcomingbebtparams) => {
		dispatch(actions.getUpComingDebt(upcomingbebtparams))
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
