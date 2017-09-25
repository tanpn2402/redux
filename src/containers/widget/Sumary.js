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

        this.data = [
                {
                    header: this.props.language.portfolio.header.totalAsset,
                    value: 0 /*'totalAsset'*/
                }, {
                    header: this.props.language.portfolio.header.equity,
                    value: 0 /*'equity'*/
                }, {
                    header: this.props.language.portfolio.header.stockValue,
                    value: 0 /*'stockValue'*/
                }, {
                    header: this.props.language.portfolio.header.profitLoss,
                    value: '066666' /*'profitLoss'*/
                }, {
                    header: this.props.language.portfolio.header.PLPercent,
                    value: 0 /*'PLPercent'*/
                }
        ]
    }


    render() {
        return (
            <div>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header no-footer">
                        <div className="col-md-4" style={{height: '100%'}}>
                            <PieChart id="sumary-piechart" />
                        </div>
                        <div className="col-md-8" style={{height: '100%'}}>
                            <div className="table-responsive"  style={{height: '100%', fontSize: '12px'}}>
                                <table className="table">
                                    <tbody >
                                        {
                                            this.data.map(d => {
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

    }
}

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Sumary)
