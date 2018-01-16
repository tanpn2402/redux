import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"

class TradeHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
                
            ]
        }

        this.balance = 0.3654
    }

    render() {
        let currency = "VND"
        let {instrument} = this.props
        if(instrument == undefined) {
            instrument = "---"
        }

        return (
            <div className="trd-header">
                <span className="trd-instrument-code">{instrument}</span>
                <ul>
                    <li>
                        <h4 class="trd-binding">Last Price</h4>
                        <strong className="">12,821.02</strong>
                        <strong className="trd-transMoney">$12,821.02</strong>
                    </li>
                    <li>
                        <h4 className="trd-binding">24h Change</h4>
                        <strong className="trd-binding">-616.17</strong>
                        <strong className="trd-changeRate">-4.59%</strong>
                        
                    </li>
                    <li>
                        <h4 className="trd-binding">24h High</h4>
                        <strong className="ng-binding">14,249.99</strong>
                    </li>
                    <li>
                        <h4 className="trd-binding">24h Low</h4>
                        <strong className="ng-binding">12,501.00</strong>
                    </li>
                    <li>
                        <h4 className="trd-binding">24h Volume</h4>
                        <strong className="trd-binding">264,906,607.20 USDT</strong>
                    </li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        
        setInterval( this.simulate.bind(this) , 1500)
    }

    simulate() {
        // console.log("adssddsdsd")
        let _data = this.state.data
        _data.unshift({
            "value1": Math.random().toFixed(6),
            "value2": Math.random().toFixed(6),
            "value3": Math.random().toFixed(6)
        })

        if(_data.length > 30) {
            _data.pop()
        }

        this.setState({
            data: _data
        })
    }

}
const mapStateToProps = (state) => {
    return {
        instrument: state.trading.instrument
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeHeader)