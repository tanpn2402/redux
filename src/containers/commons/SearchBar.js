import React from 'react'
import ConfigColumnTable from './ConfigColumnTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'
import config from '../../core/config'
import { FormControl, Form, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import $ from 'jquery'
import { PowerSelect } from 'react-power-select'
import 'react-power-select/dist/react-power-select.css'
import Select from '../commons/Select'
import InputSelect from '../commons/InputSelect'
import CalendarPicker from './CalendarPicker';
const {Contants} = require('../../core/constants')
export default class SearchBar extends React.Component {

    constructor(props) {
        super(props)

        this.BSList = [
            "ALL",
            "B",
            "S"
        ]
        this.OrderTypeList = [
            "ALL",
            "L",
            "O",
            "C",
            "P",
            "M",
            "B",
            "Z",
            "R"
        ]
        this.OrderStatusList = config.orderstatus
        this.MarketList = ["ALL", ...config.marketid]
        this.TransTypeList = ["ALL",  ...config.transtype]

        let stockList = this.props.data.stockList
        this.StockList = [...stockList === undefined ? [] : stockList]
        if(this.props.allStockEnabled == false) 
            this.StockList = [...stockList === undefined ? [] : stockList]
        else
            this.StockList = [{stockCode: "ALL", stockName: "ALL"}, ...stockList === undefined ? [] : stockList]
        
        this.ActionType = this.props.data.actionType

        this.parameter = {
            'mvStatus': false,
            'mvBuysell': false,
            'mvMarket': false,
            'mvTrade': false,
            'mvOrderType': false,
            'mvStockId': false,
            'mvStartDate': false,
            'mvEndDate': false,
            'mvLending': false,
            'mvActionType': false
        }
        this.state = {
            default: {
                'mvStatus': "",
                'mvBuysell': "",
                'mvMarket': "",
                'mvTrade': "",
                'mvOrderType': "",
                'mvStockId': undefined,
                'mvStartDate': "",
                'mvEndDate': "",
                'mvLending': "",
                'mvActionType': ""
            }
        }

        this.state.default = Object.assign(this.state.default, this.props.defaultParams)

        this.components = {
            'mvStatus': (id, props)     => <Selector ref={r => this.ref.mvStatus = r} {...props} id={id} data={this.OrderStatusList} prefix=""/> ,
            'mvBuysell': (id, props)    => <Selector ref={r => this.ref.mvBuysell = r} {...props} id={id} data={this.BSList} prefix="BS_"/>,
            'mvMarket': (id, props)     => <Selector ref={r => this.ref.mvMarket = r} {...props} id={id} data={this.MarketList} prefix="MARKET_"/> ,
            'mvTrade': (id, props)      => <Selector ref={r => this.ref.mvTrade = r} {...props} id={id} data={this.TransTypeList} prefix=""/> ,
            'mvOrderType': (id, props)  => <Selector ref={r => this.ref.mvOrderType = r} {...props} id={id} data={this.OrderTypeList} prefix="ORDERTYPE_"/> ,
            'mvStockId': (id, props, state)    => <SelectorStock ref={r => this.ref.mvStockId = r} {...props} id={id} 
                data={this.StockList} prefix="" default={state.default["mvStockId"]}/> ,
            'mvStartDate': (id, props)  => <SearchDate ref={r => this.ref.mvStartDate = r} {...props} id={id} prefix="" /> ,
            'mvEndDate': (id, props)    => <SearchDate ref={r => this.ref.mvEndDate = r} {...props} id={id} prefix="" /> ,
            'mvLending': (id, props)    => <LendingControl ref={r => this.ref.mvLending = r} {...props} id={id} /> ,
            'mvActionType': (id, props) => <Selector ref={r => this.ref.mvActionType = r} {...props} id={id} data={this.ActionType} prefix=""/> 
        }

        this.ref = {}

        // console.log(this.props)
    }

    onSearch() {
        let result = {}
        this.props.param.map(e => {
            result[e] = this.ref[e].getValue()
        })
        // console.log(result)
        this.props.onSearch(result)
    }

    componentWillMount() {

       
    }

    componentWillReceiveProps(nextProps) {
        this.state.default = Object.assign(this.state.default, nextProps.defaultParams)
        
    }

    render() {
        let scrollBtnStyle = this.props.theme.scrolling.button
        // console.log("SEARCH BAR")
        return (
            <Form className='form-inline search-bar' id={this.props.id + "form-search"}>

                <div className="scrolling-tabs-main search-bar" id={this.props.id + "-scroll-bar"}>
                    {/*<button type="button" className="hks-btn btn-tab-prev search-bar"
                        onClick={e => this.onTabSlideClick(1)}
                        style={scrollBtnStyle}>
                        <span className="glyphicon glyphicon-menu-left" style={{ zIndex: '1' }}></span>
                    </button>*/}
                    <div className="scroll search-bar" id={this.props.id + "-scroll"}>
                        <div className="scrolling-tabs" id={this.props.id + "-search-bar"}>
                            <nav className='vertical-align-middle'>
                                {
                                    this.props.buttonAction.map(e => {
                                        return (
                                            <span className='tabs-item'>
                                                {e}
                                            </span>
                                        )
                                    })
                                }

                                {
                                    this.props.param.map(e => {
                                        return this.components[e](e, this.props, this.state)
                                    })
                                }

                                

                                {
                                    this.props.onSearch === undefined ? '' :
                                        (
                                            <span className='tabs-item'>
                                                <button style={this.props.theme.searchbar.default.button} className="hks-btn" type="button"
                                                    onClick={this.onSearch.bind(this)}>{this.props.language.search}
                                                </button>
                                            </span>
                                        )

                                }



                            </nav>
                        </div>
                    </div>
                    {/*<button type="button" className="hks-btn btn-tab-next search-bar"
                        onClick={e => this.onTabSlideClick(2)}
                        style={scrollBtnStyle}>
                        <span className="glyphicon glyphicon-menu-right"></span>
                    </button>*/}
                </div>

            </Form>

        );
    }

    componentDidMount() {
        if (this.props.param.indexOf('dropdown') < 0) {
            document.getElementById(this.props.id + '-scroll-bar').style.paddingRight = 0
            document.getElementById(this.props.id + '-scroll').style.paddingRight = 20 + 'px'

        }
    }

    onTabSlideClick(i) {
        if (i === 1) {
            $("#" + this.props.id + "-search-bar").animate({ scrollLeft: '-=200' }, 500);
        }
        else {
            $("#" + this.props.id + "-search-bar").animate({ scrollLeft: '+=200' }, 500);
        }
    }

}

class Selector extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            value: ""
        }
    }

    componentWillMount() {
        this.data = []
        let language = this.props.language
        let prefix = this.props.prefix
        this.props.data.map( e => {
            this.data.push({
                label: language[prefix + e],
                value: e
            })
        })

        if(this.data.length > 0)
            this.state.value = this.data[0]
    }
    componentWillUpdate() {
        this.data = []
        let language = this.props.language
        let prefix = this.props.prefix
        this.props.data.map( e => {
            this.data.push({
                label: language[prefix + e],
                value: e
            })
        })
    }
    render() {
        let id = this.props.id + "-" + new Date().getTime()
        let language = this.props.language
        
        let font3 = this.props.theme.font.sub2.color
        return (
            <FormGroup controlId={id}>
                <ControlLabel style={{ color: font3 }}>{language[this.props.id]}</ControlLabel>
                    {'   '}
                <Select
                    options={this.data}
                    selected={this.state.value}
                    handleChange={this.onChange.bind(this)}
                    optionLabelPath={"label"}
                    showClear={false}
                />
            </FormGroup>
        )

    }

    getValue() {
        return this.state.value.value
    }

    onChange(option) {
        this.setState({value: option})
    }
}

class SelectorStock extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            value: {}
        }

        
    }

    componentWillMount() {
        if(this.props.data.length > 0)
        {
            if(this.props.default != undefined) {
                this.state.value = this.props.default
            }
            // else {
            //     this.state.value = this.props.data[0]
            // }
        }
    }
    componentWillUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        console.log("AAAAAA",nextProps )
        if(nextProps.data.length > 0)
        {
            if(nextProps.default != undefined) {
                this.state.value = nextProps.default
            } else if( Object.keys(this.state.value).length == 0 ) {
                this.state.value = nextProps.data[0]
            }
        }
    }
    render() {
        // console.log("AAAAAA",this.state.value )
        let id = this.props.id + "-" + new Date().getTime()
        let data = this.props.data
        let language = this.props.language
        let font3 = this.props.theme.font.sub2.color
        return (
            <FormGroup key={id}>
                <ControlLabel style={{ color: font3 }}>{language[this.props.id]}</ControlLabel>
                    {'   '}
                <InputSelect
                    className="stock-selector"
                    options={data}
                    selected={this.state.value}
                    handleChange={this.onChange.bind(this)}
                    optionLabelPath={"stockCode"}
                    showClear={false}
                    searchEnabled={true}
                    stockSelector={true}
                />
            </FormGroup>
        )

    }

    getValue() {
        return this.state.value.stockCode
    }

    onChange(option) {
        this.setState({value: option})
        if(this.props.handleStockChange != undefined) {
            this.props.handleStockChange(option)
        }
    }
}

class SearchDate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            date: this.props.default != undefined ? moment(this.props.default, Contants.dateFormat) : moment()
        }
    }
    render() {
        let id = this.props.id + "-" + new Date().getTime()
     
        let language = this.props.language
        let font3 = this.props.theme.font.sub2.color
        return (
            <FormGroup bsClass="form-group datepicker" key={id} >
                <ControlLabel style={{ color: font3 }}>{language[this.props.id]}</ControlLabel>
                {'   '}
                <CalendarPicker selected={this.state.date} onChange={this.handleDateChange.bind(this)} 
                id={id} onBlur={this.handleCalendarBlur.bind(this)}/>
            </FormGroup>
        )
    }

    getValue() {
        return this.state.date.format(Contants.dateFormat)
    }

    handleCalendarBlur() {

    }

    handleDateChange(_date) {
        this.setState({
            date: _date
        });
    }
}

class LendingControl extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ""
        }
    }

    render() {
        let id = this.props.id + "-" + new Date().getTime()
        let language = this.props.language
        let font3 = this.props.theme.font.sub2.color
        return (
            <FormGroup bsClass="form-group lending" key={id} >
                <input ref={r => this.input = r} defaultValue={this.state.value}/>
                {'   '}
                <ControlLabel style={{ color: font3 }}>{language["persentlength"]}</ControlLabel>
            </FormGroup>
        )
    }

    getValue() {
        this.state.value = this.input.value
        return this.input.value
    }

}