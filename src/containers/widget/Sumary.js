import React from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import SearchBar from '../commons/SearchBar'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import PieChart from '../commons/PieChart'
import AssetAllocationChart from './AssetAllocationChart'
import Component from "../commons/Component"
import Select from "../commons/InputSelect"
import * as utils from "../../utils"
import AccountSelector from "../commons/selector/AccountSelector"

class Sumary extends React.Component {
    constructor(props) {
        super(props)
        this.id = "accountsumary"
        
        this.state = {
            //sub account
            mvListSubAcc: props.tradingAccounts,
            mvSubAccSelected: props.tradingAccounts[0],
        }

    }

    handleSubAccChange(option) {

        if(this.props.onSubAccountChange != undefined) {
            this.props.onSubAccountChange(option)
        }

        if(option.investorType == "DERIVATIVES" ) {
            this.props.cashBalanceEnquiry({
                tradingAccSeq : parseInt(option.accountSeq),
                subAccountID : option.subAccountID
            })
        }
    }

    componentWillMount() {
        let {tradingAccount} = this.props
        if(tradingAccount.investorType == "DERIVATIVES") {
            this.props.cashBalanceEnquiry({
                tradingAccSeq : parseInt(tradingAccount.accountSeq),
                subAccountID : tradingAccount.subAccountID
            })
        }
            
    }

    render() {
        // console.log(this.props.accountBalanceInfoFS)
        let {language, theme, data} = this.props
        let widgetHeader = theme.widget.widgetHeader
        let selectorStyles = {
            background: "#2159a0",
            color: "#FFF"
        } 
        if(this.props.theme.title == "virtual") {
            selectorStyles = {
                background: "#FFF",
                color: "#ee514c"
            } 
        }

        


        return (
            <Component style={{ height: "100%", position: "relative" }}>
                <div className="sum-control" style={widgetHeader} >
                    <div className="col-xs-2 com-title">
                        <label>{language.menu[this.id]}</label>
                    </div>
                    <div className="col-xs-10 sum-subaccount">
                        <AccountSelector theme={theme} language={language} 
                            showDetail={false}
                            style={selectorStyles}
                            handleChange={opt => this.handleSubAccChange(opt)}
                            ref={n => this.tradingAccount = n} />
                    </div>
                    
                </div>
                {this._renderAdapter()}

            </Component>
        )
    }

    _renderAdapter() {
        let {tradingAccount} = this.props
        if(tradingAccount.investorType == "DERIVATIVES") {
            return this._renderAccountSumaryFS()
        } else {
            return this._renderAccountSumary()
        }
    }


    getFSData(id) {
        let data = this.props.accountBalanceInfoFS
        if(data == undefined || data.length < 1) {
            return {}
        }

        data = data[0][id]
        
        return data == undefined ? {} : data
    }

    _renderAccountSumaryFS() {
        let {language, theme, data} = this.props
        let header = language.portfolio.header

        var accSumaryData = this.getFSData("accountSummary")
        console.log(accSumaryData)
        var accSumaryDataArr = [
            {
                name: header.accountbalance,
                value: utils.currencyShowFormatter(accSumaryData.accountBalance)
            }, {
                name: header.commission + "/" + header.fee,
                value: {
                    internal: utils.currencyShowFormatter(accSumaryData.commission),
                    exchange: utils.currencyShowFormatter(accSumaryData.fee)
                }
            }, {
                name: header.interest,
                value: utils.currencyShowFormatter(accSumaryData.interest)
            }, {
                name: header.extloan,
                value: utils.currencyShowFormatter(accSumaryData.extLoan)
            }, {
                name: header.deliveryamt,
                value: utils.currencyShowFormatter(accSumaryData.deliveryAmount)
            }, {
                name: header.floatingpl + "/" + header.tradingpl,
                value: {
                    internal: utils.currencyShowFormatter(accSumaryData.floatingPL),
                    exchange: utils.currencyShowFormatter(accSumaryData.tradingPL)
                }
            }, {
                name: header.totalpl,
                value: utils.currencyShowFormatter(accSumaryData.totalPL)
            }, {
                name: header.reserv + "/" + header.marginable,
                value: {
                    internal: utils.currencyShowFormatter(accSumaryData.depositable),
                    exchange: utils.currencyShowFormatter(accSumaryData.marginable)
                }
            },{
                name: header.rccall,
                value: utils.currencyShowFormatter(accSumaryData.rccall)
            },  {
                name: header.cash + "/" + header.noncash,
                value: {
                    internal: utils.currencyShowFormatter(accSumaryData.cashDrawable),
                    exchange: utils.currencyShowFormatter(accSumaryData.nonCashDrawableRCCall)
                }
            }
        ]

        var exchangeAssets = this.getFSData("exchangeAssets")
        var internalAssets = this.getFSData("internalAssets")
        var assetDataArr = [
            {
                name: header.cash,
                value: {
                    internal: utils.currencyShowFormatter(internalAssets.cash),
                    exchange: utils.currencyShowFormatter(exchangeAssets.cash)
                }
            }, {
                name: header.validnoncash,
                value: {
                    internal: utils.currencyShowFormatter(internalAssets.validNonCash),
                    exchange: utils.currencyShowFormatter(exchangeAssets.validNonCash)
                }
            }, {
                name: header.totalvalue,
                value: {
                    internal: utils.currencyShowFormatter(internalAssets.totalValue),
                    exchange: utils.currencyShowFormatter(exchangeAssets.totalValue)
                }
            }, {
                name: header.maxvalidnoncash,
                value: {
                    internal: utils.currencyShowFormatter(internalAssets.maxValidNonCash),
                    exchange: utils.currencyShowFormatter(exchangeAssets.maxValidNonCash)
                }
            }, {
                name: header.cashwithdraw,
                value: {
                    internal: utils.currencyShowFormatter(internalAssets.cashWithdrawable),
                    exchange: utils.currencyShowFormatter(exchangeAssets.cashWithdrawable)
                }
            }, {
                name: header.ee,
                value: {
                    internal: utils.currencyShowFormatter(internalAssets.ee),
                    exchange: utils.currencyShowFormatter(exchangeAssets.ee)
                }
            }
        ]

        var exchangeMargin = this.getFSData("exchangeMargin")
        var internalMargin = this.getFSData("internalMargin")
        var marginDataArr = [
            {
                name: header.initialmargin,
                value: utils.currencyShowFormatter(internalMargin.initialMargin)
            }, {
                name: header.spreadmargin,
                value: {
                    internal: utils.currencyShowFormatter(internalMargin.spreadMargin),
                    exchange: utils.currencyShowFormatter(exchangeMargin.spreadMargin)
                }
            }, {
                name: header.deliverymargin,
                value: utils.currencyShowFormatter(internalMargin.deliveryMargin)
            }, {
                name: header.marginreq,
                value: {
                    internal: utils.currencyShowFormatter(internalMargin.marginRequirement),
                    exchange: utils.currencyShowFormatter(exchangeMargin.marginRequirement)
                }
            }, {
                name: header.accountratio,
                value: {
                    internal: utils.currencyShowFormatter(internalMargin.accountRatio),
                    exchange: utils.currencyShowFormatter(exchangeMargin.accountRatio)
                }
            }, {
                name: header.warning,
                value: {
                    internal: <span>
                        <span>{utils.currencyShowFormatter(internalMargin.accountRatio)}</span>
                        <span>{utils.currencyShowFormatter(internalMargin.accountRatio)}</span>
                        <span>{utils.currencyShowFormatter(internalMargin.accountRatio)}</span>
                        </span>,
                    exchange: <span>
                    <span>{utils.currencyShowFormatter(internalMargin.accountRatio)}</span>
                    <span>{utils.currencyShowFormatter(internalMargin.accountRatio)}</span>
                    <span>{utils.currencyShowFormatter(internalMargin.accountRatio)}</span>
                        </span>
                }
            }, {
                name: header.margincall,
                value: {
                    internal: utils.currencyShowFormatter(internalMargin.marginCall),
                    exchange: utils.currencyShowFormatter(exchangeMargin.marginCall)
                }
            }
        ]

        let rowOdd = theme.table.rowOdd.backgroundColor
        let rowEven = theme.table.rowEven.backgroundColor
        let font2 = theme.font.sub1.color
        let tableHeader = theme.table.tableHeader
        let widgetHeader = theme.widget.widgetHeader

        let chartData = [
            {
                name: language.assetallocation.header['creditlimit'],
                value: 84.95
            },
            {
                name: language.assetallocation.header['buyingpower'],
                value: 41.82
            },
            {
                name: language.assetallocation.header['withdrawablebalance'],
                value: 56.03
            },
            {
                name: language.assetallocation.header['totalmarketvalue'],
                value: 31.76
            },
            {
                name: language.assetallocation.header['settled'],
                value: 53.26
            },
            {
                name: language.assetallocation.header['ledgerbalance'],
                value: 92.18,
            }
        ]
        let pieSize = {
          width: 270,
          height: 270,
        }
        
        return (
                <Body theme={this.props.theme}>
                    <div className="table-main no-header no-footer">
                        <div className="accsum-piechart" style={{height: '100%', marginTop: '-35px', paddingTop: '14px'}}>
                            <PieChart theme={theme} colors={[]} data={chartData} pieSize={pieSize}/>
                        </div>
                        <div className="acc-sum-info" >
                            <div className="col-sm-4" style={{height: '100%',
                                marginTop: '-35px', paddingTop: '40px'}}> 
                                <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                    <table className="table">   
                                        <thead style={tableHeader}>
                                            <tr>
                                                <th>{header.sumary}</th>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {
                                                accSumaryDataArr.map((d, i) => {
                                                    let style = {}
                                                    if (i % 2 != 0) {
                                                        style = { backgroundColor: rowEven, color: font2 }
                                                    } else {
                                                        style = { backgroundColor: rowOdd, color: font2 }
                                                    }

                                                    let child = <td>{d.value}</td>
                                                    if(d.value.internal != undefined) {
                                                        child = (
                                                            <td>
                                                                <div className="accsum-internal"><span>{d.value.internal}</span></div>
                                                                <div className="accsum-exchange"><span>{d.value.exchange}</span></div>
                                                            </td>
                                                        )
                                                    }
                                                    
                                                    return (
                                                        <tr style={style} >
                                                            <th>{d.name}</th>
                                                            {child}
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-sm-4" style={{ height: '100%',
                                marginTop: '-35px', paddingTop: '40px' }}>

                                <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                    <div style={tableHeader}>{header.cashinfo}</div>
                                    <table className="table">
                                        <thead style={tableHeader}>
                                            <tr>
                                                <th></th>
                                                <td>
                                                    <div className="accsum-internal"><span>{header.internal}</span></div>
                                                    <div className="accsum-exchange"><span>{header.exchange}</span></div>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                assetDataArr.map((d, i) => {
                                                    let style = {}
                                                    if (i % 2 != 0) {
                                                        style = { backgroundColor: rowEven, color: font2 }
                                                    } else {
                                                        style = { backgroundColor: rowOdd, color: font2 }
                                                    }

                                                    let child = <td>{d.value}</td>
                                                    if(d.value.internal != undefined) {
                                                        child = (
                                                            <td>
                                                                <div className="accsum-internal"><span>{d.value.internal}</span></div>
                                                                <div className="accsum-exchange"><span>{d.value.exchange}</span></div>
                                                            </td>
                                                        )
                                                    }
                                                    
                                                    return (
                                                        <tr style={style} >
                                                            <th>{d.name}</th>
                                                            {child}
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="col-sm-4" style={{ height: '100%',
                                marginTop: '-35px', paddingTop: '40px'}}>

                                <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                    <div style={tableHeader}>{header.portfolioassessment}</div>
                                    <table className="table">
                                        <thead style={tableHeader}>
                                            <tr>
                                                <th></th>
                                                <td>
                                                    <div className="accsum-internal"><span>{header.internal}</span></div>
                                                    <div className="accsum-exchange"><span>{header.exchange}</span></div>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                marginDataArr.map((d, i) => {
                                                    let style = {}
                                                    if (i % 2 != 0) {
                                                        style = { backgroundColor: rowEven, color: font2 }
                                                    } else {
                                                        style = { backgroundColor: rowOdd, color: font2 }
                                                    }

                                                    let child = <td>{d.value}</td>
                                                    if(d.value.internal != undefined) {
                                                        child = (
                                                            <td>
                                                                <div className="accsum-internal"><span>{d.value.internal}</span></div>
                                                                <div className="accsum-exchange"><span>{d.value.exchange}</span></div>
                                                            </td>
                                                        )
                                                    }
                                                    
                                                    return (
                                                        <tr style={style} >
                                                            <th>{d.name}</th>
                                                            {child}
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>


                            
                        </div>
                       
                    </div>
                </Body>
        )

    }


    _renderAccountSumary() {
        // console.log('SUMARY . . . .. . . .')
        var d = this.props.data.mvPortfolioAccSummaryBean
        if(d == null) {
            d = {}
        }
        this.data = [
            {
                name: this.props.language.portfolio.header.totalAsset,
                value: utils.currencyShowFormatter(d.totalAsset)
            }, {
                name: this.props.language.portfolio.header.equity,
                value: utils.currencyShowFormatter(d.equity)
            }, {
                name: this.props.language.portfolio.header.stockValue,
                value: utils.currencyShowFormatter(d.stockValue)
            }, {
                name: this.props.language.portfolio.header.profitLoss,
                value: utils.currencyShowFormatter(d.profitLoss)
            }, {
                name: this.props.language.portfolio.header.PLPercent,
                value: d.PLPercent + "%"
            }
        ]
        var data2 = [
            {
                name: this.props.language.portfolio.header.cashBalance,
                value: utils.currencyShowFormatter(d.cashBalance)
            }, {
                name: this.props.language.portfolio.header.mvAvailAdvanceMoney,
                value: utils.currencyShowFormatter(d.mvAvailAdvanceMoney)
            }, {
                name: this.props.language.portfolio.header.mvBuyHoldAmount,
                value: utils.currencyShowFormatter(d.mvBuyHoldAmount)
            }, {
                name: this.props.language.portfolio.header.mvHoldAmount,
                value: utils.currencyShowFormatter(d.mvHoldAmount)
            }, {
                name: this.props.language.portfolio.header.CPendingWithdrawal,
                value: utils.currencyShowFormatter(d.CPendingWithdrawal)
            }, {
                name: this.props.language.portfolio.header.soldT0,
                value: utils.currencyShowFormatter(d.soldT0)
            }, {
                name: this.props.language.portfolio.header.soldT1,
                value: utils.currencyShowFormatter(d.soldT1)
            }, {
                name: this.props.language.portfolio.header.soldT2,
                value: utils.currencyShowFormatter(d.soldT2)
            }
        ]
        var data3 = [
            {
                name: this.props.language.portfolio.header.equityMar,
                value: utils.currencyShowFormatter(d.equityMar)
            }, {
                name: this.props.language.portfolio.header.totalAssetMaintenance,
                value: utils.currencyShowFormatter(d.totalAssetMaintenance)
            }, {
                name: this.props.language.portfolio.header.stockMaintenance,
                value: utils.currencyShowFormatter(d.stockMaintenance)
            }, {
                name: this.props.language.portfolio.header.cashMaintenance,
                value: utils.currencyShowFormatter(d.cashMaintenance)
            }, {
                name: this.props.language.portfolio.header.mvOutstandingLoan,
                value: utils.currencyShowFormatter(d.mvOutstandingLoan)
            }, {
                name: this.props.language.portfolio.header.debtIncByPurchase,
                value: utils.currencyShowFormatter(d.debtIncByPurchase)
            }, {
                name: this.props.language.portfolio.header.debitAccruedInterest,
                value: utils.currencyShowFormatter(d.debitAccruedInterest)
            }, {
                name: this.props.language.portfolio.header.mvCreditLimit,
                value: utils.currencyShowFormatter(d.mvCreditLimit)
            }
        ]
        var data4 = [
            {
                name: this.props.language.portfolio.header.lendableValue,
                value: utils.currencyShowFormatter(d.lendableValue)
            }, {
                name: this.props.language.portfolio.header.minMarginReq,
                value: utils.currencyShowFormatter(d.minMarginReq)
            }, {
                name: this.props.language.portfolio.header.curLiqMargin,
                value: utils.currencyShowFormatter(d.curLiqMargin)
            }, {
                name: this.props.language.portfolio.header.marginableBalf,
                value: utils.currencyShowFormatter(d.marginableBalf)
            }, {
                name: this.props.language.portfolio.header.cashDeposit,
                value: utils.currencyShowFormatter(d.cashDeposit)
            }, {
                name: this.props.language.portfolio.header.sellStkInMarPort,
                value: utils.currencyShowFormatter(d.sellStkInMarPort)
            }, {
                name: this.props.language.portfolio.header.sellStkNotInMarPort,
                value: utils.currencyShowFormatter(d.sellStkNotInMarPort)
            }
        ]
        let theme = this.props.theme
        let rowOdd = theme.table.rowOdd.backgroundColor
        let rowEven = theme.table.rowEven.backgroundColor
        let font2 = theme.font.sub1.color
        let tableHeader = theme.table.tableHeader
        let widgetHeader = theme.widget.widgetHeader

        let language = this.props.language.assetallocation.header
        let data = [
            {
                name: language['creditlimit'],
                value: 84.95
            },
            {
                name: language['buyingpower'],
                value: 41.82
            },
            {
                name: language['withdrawablebalance'],
                value: 56.03
            },
            {
                name: language['totalmarketvalue'],
                value: 31.76
            },
            {
                name: language['settled'],
                value: 53.26
            },
            {
                name: language['ledgerbalance'],
                value: 92.18,
            }
        ]
        let pieSize={
          width:270,
          height:270,
        }
        
        return (
                <Body theme={this.props.theme}>
                    <div className="table-main no-header no-footer">
                        <div className="col-xs-2" style={{height: '100%' ,
                            marginTop: '-35px', paddingTop: '14px'}}>
                            <PieChart theme={this.props.theme} colors={[]} data={data} pieSize={pieSize}/>
                        </div>
                        <div className="col-xs-10 acc-sum-info" >
                            <div className="col-sm-3" style={{height: '100%',
                                marginTop: '-35px', paddingTop: '40px'}}> 
                                <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                    <table className="table">   
                                        <thead>
                                            <tr style={tableHeader} >
                                                <th>{this.props.language.portfolio.header.sumary}</th>
                                                <td>{this.props.language.portfolio.header.value}</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {
                                                this.data.map((d, i) => {
                                                    if (i % 2 != 0) {
                                                        return (
                                                            <tr style={{ backgroundColor: rowOdd, color: font2 }} >
                                                                <th>{d.name}</th>
                                                                <td>{d.value}</td>
                                                            </tr>
                                                        )
                                                    } else {
                                                        return (
                                                            <tr style={{ backgroundColor: rowEven, color: font2 }} >
                                                                <th>{d.name}</th>
                                                                <td>{d.value}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-sm-3" style={{ height: '100%',
                                marginTop: '-35px', paddingTop: '40px' }}>

                                <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                    <table className="table">
                                        <thead>
                                            <tr style={tableHeader} >
                                                <th>{this.props.language.portfolio.header.cashinfo}</th>
                                                <td>{this.props.language.portfolio.header.value}</td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                data2.map((d, i) => {
                                                    if (i % 2 != 0) {
                                                        return (
                                                            <tr style={{ backgroundColor: rowOdd, color: font2 }} >
                                                                <th>{d.name}</th>
                                                                <td>{d.value}</td>
                                                            </tr>
                                                        )
                                                    } else {
                                                        return (
                                                            <tr style={{ backgroundColor: rowEven, color: font2 }} >
                                                                <th>{d.name}</th>
                                                                <td>{d.value}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="col-sm-3" style={{ height: '100%',
                                marginTop: '-35px', paddingTop: '40px'}}>

                                <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                    <table className="table">
                                        <thead>
                                            <tr style={tableHeader} >
                                                <th>{this.props.language.portfolio.header.portfolioassessment}</th>
                                                <td>{this.props.language.portfolio.header.value}</td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                data3.map((d, i) => {
                                                    if (i % 2 != 0) {
                                                        return (
                                                            <tr style={{ backgroundColor: rowOdd, color: font2 }} >
                                                                <th>{d.name}</th>
                                                                <td>{d.value}</td>
                                                            </tr>
                                                        )
                                                    } else {
                                                        return (
                                                            <tr style={{ backgroundColor: rowEven, color: font2 }} >
                                                                <th>{d.name}</th>
                                                                <td>{d.value}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>


                            <div className="col-sm-3" style={{ height: '100%',
                                marginTop: '-35px', paddingTop: '40px' }}>

                                <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                    <table className="table">
                                        <thead>
                                            <tr style={tableHeader} >
                                                <th>{this.props.language.portfolio.header.marginposition}</th>
                                                <td>{this.props.language.portfolio.header.value}</td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                data4.map((d, i) => {
                                                    if (i % 2 != 0) {
                                                        return (
                                                            <tr style={{ backgroundColor: rowOdd, color: font2 }} >
                                                                <th>{d.name}</th>
                                                                <td>{d.value}</td>
                                                            </tr>
                                                        )
                                                    } else {
                                                        return (
                                                            <tr style={{ backgroundColor: rowEven, color: font2 }} >
                                                                <th>{d.name}</th>
                                                                <td>{d.value}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                       
                    </div>
                </Body>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.trading.portfolioData,

        accountBalanceInfoFS: state.portfolio.accountBalanceInfoFS
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    cashBalanceEnquiry: (params) => {dispatch( actions.cashBalanceEnquiry(params) )}
})


export default connect(mapStateToProps, mapDispatchToProps)(Sumary)
