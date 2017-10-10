import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import SearchBar from '../commons/SearchBar'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import PieChart from '../commons/PieChart'


class Sumary extends Component {
    constructor(props) {
        super(props)
        this.id = "sumary"

        
    }


    render() {
        var d = this.props.data.mvPortfolioAccSummaryBean

        this.data = [
                {
                    name: this.props.language.portfolio.header.totalAsset,
                    y: d.totalAsset
                }, {
                    name: this.props.language.portfolio.header.equity,
                    y: d.equity
                }, {
                    name: this.props.language.portfolio.header.stockValue,
                    y: d.stockValue
                }, {
                    name: this.props.language.portfolio.header.profitLoss,
                    y: d.profitLoss
                }, {
                    name: this.props.language.portfolio.header.PLPercent,
                    y: d.PLPercent
                }
        ]
        var data2 = [
            {
                name: this.props.language.portfolio.header.cashBalance,
                y: d.cashBalance
            }, {
                name: this.props.language.portfolio.header.mvAvailAdvanceMoney,
                y: d.mvAvailAdvanceMoney
            }, {
                name: this.props.language.portfolio.header.mvBuyHoldAmount,
                y: d.mvBuyHoldAmount
            }, {
                name: this.props.language.portfolio.header.mvHoldAmount,
                y: d.mvHoldAmount
            }, {
                name: this.props.language.portfolio.header.CPendingWithdrawal,
                y: d.CPendingWithdrawal
            }, {
                name: this.props.language.portfolio.header.soldT0,
                y: d.soldT0
            }, {
                name: this.props.language.portfolio.header.soldT1,
                y: d.soldT1
            }, {
                name: this.props.language.portfolio.header.soldT2,
                y: d.soldT2
            }
        ]
        var data3 = [
            {
                name: this.props.language.portfolio.header.equityMar,
                y: d.equityMar
            }, {
                name: this.props.language.portfolio.header.totalAssetMaintenance,
                y: d.totalAssetMaintenance
            }, {
                name: this.props.language.portfolio.header.stockMaintenance,
                y: d.stockMaintenance
            }, {
                name: this.props.language.portfolio.header.cashMaintenance,
                y: d.cashMaintenance
            }, {
                name: this.props.language.portfolio.header.mvOutstandingLoan,
                y: d.mvOutstandingLoan
            }, {
                name: this.props.language.portfolio.header.debtIncByPurchase,
                y: d.debtIncByPurchase
            }, {
                name: this.props.language.portfolio.header.debitAccruedInterest,
                y: d.debitAccruedInterest
            }, {
                name: this.props.language.portfolio.header.mvCreditLimit,
                y: d.mvCreditLimit
            }
        ]
        var data4 = [
            {
                name: this.props.language.portfolio.header.lendableValue,
                y: d.lendableValue
            }, {
                name: this.props.language.portfolio.header.minMarginReq,
                y: d.minMarginReq
            }, {
                name: this.props.language.portfolio.header.curLiqMargin,
                y: d.curLiqMargin
            }, {
                name: this.props.language.portfolio.header.marginableBalf,
                y: d.marginableBalf
            }, {
                name: this.props.language.portfolio.header.cashDeposit,
                y: d.cashDeposit
            }, {
                name: this.props.language.portfolio.header.sellStkInMarPort,
                y: d.sellStkInMarPort
            }, {
                name: this.props.language.portfolio.header.sellStkNotInMarPort,
                y: d.sellStkNotInMarPort
            }
        ]
        let rowodd = this.props.theme.rowodd == undefined? undefined:this.props.theme.rowodd.background
        let roweven = this.props.theme.roweven == undefined? undefined:this.props.theme.roweven.background
        let font2 = this.props.theme.font2 == undefined? undefined:this.props.theme.font2.color
        return (
            <div>
                <Title theme={this.props.theme}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header no-footer">
                        <div className="col-sm-3" style={{height: '100%'}}>
                            <div className="col-sm-4" style={{height: '100%'}}>
                                <PieChart id="sumary-piechart" data={this.data}/>
                            </div>
                            <div className="col-sm-8" style={{height: '100%'}}>
                                <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                    <table className="table">
                                        <tbody >
                                            
                                            {
                                                this.data.map((d, i) => {
                                                    if(i%2!=0){
                                                        return (
                                                            <tr style={{backgroundColor: rowodd, color: font2}} >
                                                                <th>{d.name}</th>
                                                                <td>{d.y}</td>
                                                            </tr>
                                                        )
                                                    }else{
                                                        return(
                                                            <tr style={{backgroundColor: roweven, color: font2}} >
                                                                <th>{d.name}</th>
                                                                <td>{d.y}</td>
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
                        
                        <div className="col-sm-3" style={{height: '100%'}}>
                            
                            <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                <table className="table">
                                    <tbody >
                                        {
                                            data2.map((d, i) => {
                                                if(i%2!=0){
                                                    return (
                                                        <tr style={{backgroundColor: rowodd, color: font2}} >
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
                                                        </tr>
                                                    )
                                                }else{
                                                    return(
                                                        <tr style={{backgroundColor: roweven, color: font2}} >
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                            
                        </div>

                        <div className="col-sm-3" style={{height: '100%'}}>
                        
                            <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                <table className="table">
                                    <tbody >
                                        {
                                            data3.map((d, i) => {
                                                if(i%2!=0){
                                                    return (
                                                        <tr style={{backgroundColor: rowodd, color: font2}} >
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
                                                        </tr>
                                                    )
                                                }else{
                                                    return(
                                                        <tr style={{backgroundColor: roweven, color: font2}} >
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                            
                        </div>


                        <div className="col-sm-3" style={{height: '100%'}}>
                            
                            <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                <table className="table">
                                    <tbody >
                                        {
                                            data4.map((d, i) => {
                                                if(i%2!=0){
                                                    return (
                                                        <tr style={{backgroundColor: rowodd, color: font2}} >
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
                                                        </tr>
                                                    )
                                                }else{
                                                    return(
                                                        <tr style={{backgroundColor: roweven, color: font2}} >
                                                            <th>{d.name}</th>
                                                            <td>{d.y}</td>
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
