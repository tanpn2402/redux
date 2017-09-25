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
        var data = this.props.data.mvPortfolioBeanList === undefined ? [] : this.props.data.mvPortfolioBeanList
        var d = this.props.data.mvPortfolioAccSummaryBean
        d = d == undefined ? [] : d
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
        return (
            <div>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header no-footer">
                        <div className="col-md-4" style={{height: '100%'}}>
                            <PieChart id="sumary-piechart" data={this.data}/>
                        </div>
                        <div className="col-md-8" style={{height: '100%'}}>
                            <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                <table className="table">
                                    <tbody >
                                        {
                                            this.data.map(d => {
                                                return(
                                                    <tr>
                                                        <th>{d.name}</th>
                                                        <td>{d.y}</td>
                                                    </tr>
                                                )
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

    componentDidMount() {

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
