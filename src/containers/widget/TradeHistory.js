import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TTLTable from "../commons/TTLTable"
import moment from "moment"
import Select from "../commons/Select"
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import config from '../../core/config'
import Component from "../commons/Component"
import * as utils from '../../utils'

class TradeLogTable extends React.Component {

    constructor(props) {
        super(props)
        this.id = "tradelog"
        this.state = {
            data : [
                
            ],
        }

        this.balance = {
            "price": 10.6
        }
    }

    fillColor(props, accessor) {
        let theme = this.props.theme.bindingdata
        
        let child = <span style={theme.normal}>{props[accessor]}</span>

        let content = accessor.includes("vol") ? utils.currencyShowFormatter(props[accessor]) : props[accessor]
        
        if(props["price"] > this.balance["price"]) {
            child = <span style={theme.up}>{content}</span>
        }
        else {
            child = <span style={theme.down}>{content}</span>
        }
        return child
    }


    render() {
        // console.log(this.props)
        let currency = "VND"
        let language = this.props.language.trading.header
        let header = [
            
            {
                title: language.time,
                style: {width: "20%", textAlign: "center"},
                bodyStyle: {width: "20%", textAlign: "center"},
                accessor: "time"
            },
            {
                title: language.price.replace("{0}", ""),
                style: {width: "20%", textAlign: "right"},
                bodyStyle: {width: "20%", textAlign: "right"},
                accessor: "price",
                cell: props => {
                    return this.fillColor(props, "price")
                }
            },
            {
                title: language.vol,
                style: {width: "30%", textAlign: "right"},
                bodyStyle: {width: "30%", textAlign: "right"},
                accessor: "vol",
                cell: props => {
                    return this.fillColor(props, "vol")
                }
            },
            {
                title: language.totalvol,
                style: {width: "30%", textAlign: "right"},
                bodyStyle: {width: "30%", textAlign: "right"},
                accessor: "totalvol",
                cell: props => {
                    return this.fillColor(props, "totalvol")
                }
            }
        ]
        let theme = this.props.theme
        return (
            <Component className="trd-log-table" theme={theme} style={{}}>
                <TTLTable data={this.state.data} header={header} theme={theme}
                    getTHeaderProps={(theader)=> {
                        // theader.style.display = "none"

                    }}
                    getTBodyProps={(tbody)=>{
                        // tbody.style.height = "100%"
                    }}
                />
            </Component>
        )
    }

    componentDidMount() {
        this.interval = setInterval( this.simulate.bind(this) , 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    simulate() {
        // console.log("adssddsdsd")
        let _data = this.state.data
        _data.unshift({
            "price": utils.round(10 + parseFloat(Math.random().toFixed(1)), 1),
            "vol": utils.randomInt(1000),
            "totalvol": utils.randomInt(1000) + utils.randomInt(500),
            "time": moment().format("HH:mm:ss")
        })

        if(_data.length > 30) {
            _data.pop()
        }

        this.setState({
            data: _data
        })
    }

}


class TradeHistory extends Component {
    constructor(props) {
        super(props)
        this.id = "tradehistory"
        this.state = {
            filterSelected: {
                text: "BY COMPANY",
                value: "C"
            }
        }

        this.listFilter = [
            {
                text: this.props.language.trading.header.bycompany,
                value: "C"
            },
            {
                text: this.props.language.trading.header.bymarket,
                value: "M"
            }
        ]
    }

    
    handleFilterChange(option) {
        this.setState({ filterSelected: option })
    }

    render() {
        let theme = this.props.theme
        return (
            <Component className="trd-body" theme={theme} style={{position: "relative", width: '100%', height: '100%' }} >
                <Title language={this.props.language} theme={theme} widgetID= 'tradehistory'> 
                    {this.props.language.menu.tradehistory} 
                </Title>
                <Body theme={theme}><TradeLogTable {...this.props} /></Body>/>
            </Component>
        )
    }

    

}

const mapStateToProps = (state) => {
    return {
        tabID: state.menuSelected.tabID,
        instrument: state.trading.instrument
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory)