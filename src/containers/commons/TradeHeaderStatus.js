import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import Select from "../commons/Select"
import config from "../../core/config"
import * as utils from '../../utils'


class TradeHeaderStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data : [
            ]
        }

        this.balance = {
            mvMatchPrice: 86.6,
            mvMatchVol: 569.2,
            mvMatchUpDown: 1.2,
            mvMatchVolTotal: 469.6
        }
    }

    componentWillReceiveProps(nextProps) {
        
    }

    _render(props, accessor) {
        let theme = this.props.theme.bindingdata
        let style = theme.normal

        let tmp = props[accessor]
        
        if(tmp == undefined) {
            return <span style={style}>---</span>
        }

        if(props[accessor] < this.balance[accessor]) {
            style = theme.down
            if(accessor == "mvMatchUpDown") tmp = "-" + tmp
        } else if (props[accessor] > this.balance[accessor] ) {
            style = theme.up
            if(accessor == "mvMatchUpDown") tmp = "+" + tmp
        }
        let child = <span style={style}>{tmp}</span>
        return child
    }

    _renderChange() {
        if(this.props.instrument == "") 
            return 
        
        let theme = this.props.theme.bindingdata
        let style = theme.normal

        let percent = Math.random().toFixed(2)
        let change = utils.round(1 + parseFloat(Math.random().toFixed(2)), 2)
        if(percent > 0.3) {
            style = theme.up
            percent = <span style={{color: style.color}} className="trd-binding up">{"" + percent + "%"}</span>
            change = <span style={{color: style.color}} className="trd-binding up">{"+" + change + ""}</span>

            return <span>{change}
                {<span style={{color: style.color, marginLeft: 3, marginRight: 3}} className="glyphicon glyphicon-triangle-top"></span>}
                {percent}</span>
        }
        else {
            style = theme.down
            percent = <span style={{color: style.color}} className="trd-binding down">{"" + percent + "%"}</span>
            change = <span style={{color: style.color}} className="trd-binding down">{"-" + change + ""}</span>
            return <span>{change}
                {<span style={{color: style.color, marginLeft: 3, marginRight: 3}} className="glyphicon glyphicon-triangle-bottom"></span>}
                {percent}</span>
        }
    }

    render() {
        let header = this.props.language.stockmarketinform.header
      
        let data = []
        let _tmp = this.props.listInstrumentData.filter(e => e.mvStockCode == this.props.instrument)
        if(_tmp.length > 0) {
            data = _tmp[0]
            this.state.data = data
        }
        let theme = this.props.theme
        return (
                <ul>
                    <li style={{width: "160px"}}>
                        <h4 style={theme.font.sub1} class="trd-binding">{header.Price}</h4>
                        
                        {/* <strong className="trd-transMoney">{}</strong> */}
                        <div className="trd-binding price">
                            <strong style={{marginRight: "10px"}}>{this._render(data, "mvMatchPrice")}</strong>
                            {this._renderChange()}                            
                        </div>
                    </li>
                    <li>
                        <h4 style={theme.font.sub1} className="trd-binding">{header.Volume}</h4>
                        <strong className="trd-binding">{this._render(data, "mvMatchVol")}</strong>
                        <strong className="trd-changeRate">{this._render(data, "mvMatchUpDown")}</strong>
                        
                    </li>
                    <li>
                        <h4 style={theme.font.sub1} className="trd-binding">{header.TotalVol}</h4>
                        <strong className="ng-binding">{this._render(data, "mvMatchVolTotal")}</strong>
                    </li>
                    <li className="trd-changePercent">
                        <div>
                        </div>
                    </li>
                   
                </ul>
        )
    }

    componentDidMount() {
        
    }
}
const mapStateToProps = (state) => {
    return {
        instrument: state.trading.instrument,
        listInstrumentData: state.trading.listInstrumentData
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeHeaderStatus)