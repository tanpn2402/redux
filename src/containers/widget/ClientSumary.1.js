import React from 'react'
import { connect } from 'react-redux'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import * as actions from '../../actions'
import GridLayout from '../main/GridLayout.js'
import config from '../../core/config'
import Sumary from './Sumary.js'
import {Tabs, Tab } from 'react-bootstrap'

class ClientSumaryInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {subAccID} = this.props
        console.log(subAccID)

        return (
            <div style={{height: '380px'}}>
                    <Sumary {...this.props} />
            </div>
        )
    }
}

class ClientSumary extends React.Component {
    constructor(props) {
        super(props);
        this.id = "clientsumary"

    }

    render() {
        let rowOdd = this.props.theme.table.rowOdd.backgroundColor
        let rowEven = this.props.theme.table.rowEven.backgroundColor
        let font2 = this.props.theme.font.sub1.color


        let headerBG = 'rgb(0, 90, 160)'
        let headerFont = '#FFF'

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

        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme} ref={ref => this.widgetBody = ref}>
                    
                    {/* <div className="table-responsive" style={{ fontSize: '12px' }}>
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
                    
                    <div style={{marginTop: "10px"}}>
                        <Title language={this.props.language} theme={this.props.theme} >
                            Choose Sub Account
                        </Title>
                        <Tabs defaultActiveKey={1} style={{marginTop: "50px"}}>
                            <Tab eventKey={1} title="C77080001-1">
                                
                            </Tab>
                            <Tab eventKey={2} title="C77080001-2">
                                
                            </Tab>
                            <Tab eventKey={3} title="C77080001-3">
                                <ClientSumaryInfo subAccID="C77080001-3" {...this.props}/>
                            </Tab>
                        </Tabs>
                    </div> */}

                    

                    
                </Body>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.trading.portfolioData,
    }
}

const mapDispatchToProps = (dispatch, props) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(ClientSumary)