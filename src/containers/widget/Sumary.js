import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import SearchBar from '../commons/SearchBar'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import PieChart from '../commons/PieChart'
import AssetAllocationChart from './AssetAllocationChart'

class Sumary extends Component {
    constructor(props) {
        super(props)
        this.id = "accountsumary"


    }


    render() {
        console.log('SUMARY . . . .. . . .')
        var d = this.props.data.mvPortfolioAccSummaryBean
        this.data = [
            {
                name: this.props.language.portfolio.header.totalAsset,
                value: d.totalAsset
            }, {
                name: this.props.language.portfolio.header.equity,
                value: d.equity
            }, {
                name: this.props.language.portfolio.header.stockValue,
                value: d.stockValue
            }, {
                name: this.props.language.portfolio.header.profitLoss,
                value: d.profitLoss
            }, {
                name: this.props.language.portfolio.header.PLPercent,
                value: d.PLPercent
            }
        ]
        var data2 = [
            {
                name: this.props.language.portfolio.header.cashBalance,
                value: d.cashBalance
            }, {
                name: this.props.language.portfolio.header.mvAvailAdvanceMoney,
                value: d.mvAvailAdvanceMoney
            }, {
                name: this.props.language.portfolio.header.mvBuyHoldAmount,
                value: d.mvBuyHoldAmount
            }, {
                name: this.props.language.portfolio.header.mvHoldAmount,
                value: d.mvHoldAmount
            }, {
                name: this.props.language.portfolio.header.CPendingWithdrawal,
                value: d.CPendingWithdrawal
            }, {
                name: this.props.language.portfolio.header.soldT0,
                value: d.soldT0
            }, {
                name: this.props.language.portfolio.header.soldT1,
                value: d.soldT1
            }, {
                name: this.props.language.portfolio.header.soldT2,
                value: d.soldT2
            }
        ]
        var data3 = [
            {
                name: this.props.language.portfolio.header.equityMar,
                value: d.equityMar
            }, {
                name: this.props.language.portfolio.header.totalAssetMaintenance,
                value: d.totalAssetMaintenance
            }, {
                name: this.props.language.portfolio.header.stockMaintenance,
                value: d.stockMaintenance
            }, {
                name: this.props.language.portfolio.header.cashMaintenance,
                value: d.cashMaintenance
            }, {
                name: this.props.language.portfolio.header.mvOutstandingLoan,
                value: d.mvOutstandingLoan
            }, {
                name: this.props.language.portfolio.header.debtIncByPurchase,
                value: d.debtIncByPurchase
            }, {
                name: this.props.language.portfolio.header.debitAccruedInterest,
                value: d.debitAccruedInterest
            }, {
                name: this.props.language.portfolio.header.mvCreditLimit,
                value: d.mvCreditLimit
            }
        ]
        var data4 = [
            {
                name: this.props.language.portfolio.header.lendableValue,
                value: d.lendableValue
            }, {
                name: this.props.language.portfolio.header.minMarginReq,
                value: d.minMarginReq
            }, {
                name: this.props.language.portfolio.header.curLiqMargin,
                value: d.curLiqMargin
            }, {
                name: this.props.language.portfolio.header.marginableBalf,
                value: d.marginableBalf
            }, {
                name: this.props.language.portfolio.header.cashDeposit,
                value: d.cashDeposit
            }, {
                name: this.props.language.portfolio.header.sellStkInMarPort,
                value: d.sellStkInMarPort
            }, {
                name: this.props.language.portfolio.header.sellStkNotInMarPort,
                value: d.sellStkNotInMarPort
            }
        ]
        let rowOdd = this.props.theme.table.rowOdd.backgroundColor
        let rowEven = this.props.theme.table.rowEven.backgroundColor
        let font2 = this.props.theme.font.sub1.color


        let headerBG = 'rgb(0, 90, 160)'
        let headerFont = '#FFF'

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
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main no-header no-footer">
                            <div className="col-sm-2" style={{height: '100%',
                                marginTop: '-35px', paddingTop: '35px'}}>
                                <PieChart theme={this.props.theme} colors={[]} data={data}/>
                            </div>
                            <div className="col-sm-3" style={{height: '100%',
                                marginTop: '-35px', paddingTop: '35px'}}> 
                                <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                    <table className="table">   
                                        <tbody>
                                            <tr style={{ backgroundColor: headerBG, color: headerFont }} >
                                                <th>{this.props.language.portfolio.header.sumary}</th>
                                                <td>{this.props.language.portfolio.header.value}</td>
                                            </tr>
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

                        <div className="col-sm-2" style={{ height: '100%',
                            marginTop: '-35px', paddingTop: '35px' }}>

                            <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                <table className="table">
                                    <tbody >
                                        <tr style={{ backgroundColor: headerBG, color: headerFont }} >
                                            <th>{this.props.language.portfolio.header.cashinfo}</th>
                                            <td>{this.props.language.portfolio.header.value}</td>
                                        </tr>
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
                            marginTop: '-35px', paddingTop: '35px'}}>

                            <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                <table className="table">
                                    <tbody >
                                        <tr style={{ backgroundColor: headerBG, color: headerFont }} >
                                            <th>{this.props.language.portfolio.header.portfolioassessment}</th>
                                            <td>{this.props.language.portfolio.header.value}</td>
                                        </tr>
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


                        <div className="col-sm-2" style={{ height: '100%',
                            marginTop: '-35px', paddingTop: '35px' }}>

                            <div className="table-responsive" style={{ height: '100%', fontSize: '12px' }}>
                                <table className="table">
                                    <tbody >
                                        <tr style={{ backgroundColor: headerBG, color: headerFont }} >
                                            <th>{this.props.language.portfolio.header.marginposition}</th>
                                            <td>{this.props.language.portfolio.header.value}</td>
                                        </tr>
                                        
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
                </Body>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.porfolio.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Sumary)
