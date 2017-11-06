import React from 'react'
import ConfigColumnTable from './ConfigColumnTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import moment from 'moment'
import config from '../../core/config'
import { FormControl, Form, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import InputSearch from './InputSearch'
import $ from 'jquery'
import { PowerSelect } from 'react-power-select'
import 'react-power-select/dist/react-power-select.css'

import CalendarPicker from './CalendarPicker';

export default class SearchBar extends React.Component {

    constructor() {
        super()
        this.state = {
            startDate: moment(),
            endDate: moment(),
            mvStockIdValue: {
                stockCode: 'ALL'
            }
        };

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

        this.language = []
        this.theme = []
    }

    onSearch(pageIndex) {
        
        var x = document.getElementById(this.props.id + "form-search")
        var tmp = {}
        for (var i = 0; i < x.length; i++) {
            if (x.elements[i].value == 'on' || x.elements[i].id === '')
                continue
            tmp[x.elements[i].id] = x.elements[i].value
        }

        tmp['mvStartDate'] = this.state.startDate.format("DD/MM/YYYY")
        tmp['mvEndDate'] = this.state.endDate.format("DD/MM/YYYY")
        this.props.onSearch(tmp)
    }

    handleChangeStart(date) {
        
        this.setState({
            startDate: date
        });
    }
    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }

    componentWillMount() {

        let props = this.props

        this.component = {
            'mvStatus': this.genStatusComponent(props),
            'mvBuysell': this.genBSComponent(props),
            'mvTrade': this.genTradeComponent(props),
            'mvMarket': this.genMarketComponent(props),
            'mvOrderType': this.genOrderTypeComponent(props),
            'mvStockId': this.genStockListComponent(props),
            'mvStartDate': this.genStartDateComponent(props),
            'mvEndDate': this.genEndDateComponent(props),
            'mvLending': this.genPerLengthComponent(props),
            'mvActionType': this.genActionTypeComponent(props),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.component = {
            'mvStatus': this.genStatusComponent(nextProps),
            'mvBuysell': this.genBSComponent(nextProps),
            'mvTrade': this.genTradeComponent(nextProps),
            'mvMarket': this.genMarketComponent(nextProps),
            'mvOrderType': this.genOrderTypeComponent(nextProps),
            'mvStockId': this.genStockListComponent(nextProps),
            'mvStartDate': this.genStartDateComponent(nextProps),
            'mvEndDate': this.genEndDateComponent(nextProps),
            'mvLending': this.genPerLengthComponent(nextProps),
            'mvActionType': this.genActionTypeComponent(nextProps),
        }
    }

    genActionTypeComponent(props) {
        let language = props.language
        var data = props.data.actionType
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        if (data === undefined)
            return

        return (
            <FormGroup controlId="mvActionType" >
                <ControlLabel style={{ color: font3 }}>{language.actionType}</ControlLabel>
                {'   '}
                <FormControl componentClass="select" placeholder="select">
                    {
                        data.map(e => {
                            return (
                                <option value={e.value}>{e.text}</option>
                            )
                        })
                    }
                </FormControl>
            </FormGroup>
        )
    }

    genStatusComponent(props) {
        let language = props.language
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        // var data = data.actionType
        // if(data === undefined)
        //     return
        return (
            <FormGroup controlId="mvStatus" >
                <ControlLabel style={{ color: font3 }}>{language.status}</ControlLabel>
                {'   '}
                <FormControl componentClass="select" placeholder="select">
                    {
                        config.orderstatus.map(e => {
                            return (
                                <option value={e}>{language[e]}</option>
                            )
                        })
                    }
                </FormControl>
            </FormGroup>
        )
    }

    genOrderTypeComponent(props) {
        let language = props.language
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        return (
            <FormGroup controlId="mvOrderType" >
                <ControlLabel style={{ color: font3 }}>{language.ordertype}</ControlLabel>
                {'   '}
                <FormControl componentClass="select" placeholder="select">
                    <option value="ALL">{this.props.language.all}</option>
                    <option value="L">{this.props.language.normal}</option>
                    <option value="O">{this.props.language.ato}</option>
                    <option value="C">{this.props.language.atc}</option>
                    <option value="P">{this.props.language.putthrough}</option>
                    <option value="M">{this.props.language.mp}</option>
                    <option value="B">{this.props.language.mok}</option>
                    <option value="Z">{this.props.language.mak}</option>
                    <option value="R">{this.props.language.mtl}</option>
                </FormControl>
            </FormGroup>
        )
    }

    genBSComponent(props) {
        let language = props.language
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        return (
            <FormGroup controlId="mvBuysell" >
                <ControlLabel style={{ color: font3 }}>{language.buysell}</ControlLabel>
                {'   '}
                <FormControl componentClass="select" placeholder="select">
                    <option value="ALL">{language.all}</option>
                    <option value="B">{language.buy}</option>
                    <option value="S">{language.sell}</option>
                </FormControl>
            </FormGroup>
        )
    }

    genPerLengthComponent(props) {
        let language = props.language
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        return (
            <FormGroup controlId="mvLending" >
                <ControlLabel style={{ color: font3 }}>{language.persentlength}</ControlLabel>
                {'   '}
                <FormControl type="text" />
            </FormGroup>
        )
    }

    genMarketComponent(props) {
        let language = props.language
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        return (
            <FormGroup controlId="mvMarket" >
                <ControlLabel style={{ color: font3 }}>{language.market}</ControlLabel>
                {'   '}
                <FormControl componentClass="select" placeholder="select">
                    <option value="ALL">{this.props.language.all}</option>
                    {
                        config.marketid.map(e => {
                            return (
                                <option value={e}>{e}</option>
                            )
                        })
                    }
                </FormControl>
            </FormGroup>
        )
    }

    genTradeComponent(props) {
        let language = props.language
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        return (
            <FormGroup controlId="mvTrade" >
                <ControlLabel style={{ color: font3 }}>{language.transtype}</ControlLabel>
                {'   '}
                <FormControl componentClass="select" placeholder="select">
                    {
                        config.transtype.map(e => {
                            return (
                                <option value={e}>{language[e]}</option>
                            )
                        })
                    }
                </FormControl>
            </FormGroup>
        )
    }
    handleStockChange = ({option}) => {
        if(option === null)
            return
        this.mvStockId.value = option.stockCode
        this.setState({ mvStockIdValue : Object.assign(this.state.mvStockIdValue, { stockCode: option.stockCode }) })
    }
    genStockListComponent(props) {
        let language = props.language
        let stockList = props.data.stockList
        if (stockList === undefined || stockList.length <= 0)
            return

        let stockL = JSON.parse(JSON.stringify(stockList))
        stockL.unshift({
            stockCode: 'ALL',
            stockName: 'ALL'
        })
        return (
            <FormGroup controlId="mvStockId">
                <PowerSelect
                    options={stockL}
                    selected={this.state.mvStockIdValue}
                    onChange={this.handleStockChange.bind(this)}
                    optionLabelPath={'stockCode'}
                    showClear={false}
                />
                <input
                    type='hidden'
                    id='mvStockId'
                    ref={e => this.mvStockId = e}
                    value={this.state.mvStockIdValue.stockCode}
                />
            </FormGroup>
        )
    }

    genStartDateComponent(props) {
        let language = props.language
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        return (
            <FormGroup bsClass="form-group datepicker" >
                <ControlLabel style={{ color: font3 }}>{language.startdate}</ControlLabel>
                {'   '}
                <CalendarPicker onChange={this.handleChangeStart.bind(this)} id={'startDate'}/>
            </FormGroup>
        )
    }

    genEndDateComponent(props) {
        let language = props.language
        let font3 = props.theme.font3 == undefined ? 'black' : props.theme.font3.color
        return (
            <FormGroup bsClass="form-group datepicker" >
                <ControlLabel style={{ color: font3 }}>{language.enddate}</ControlLabel>
                {'   '}
                <CalendarPicker onChange={this.handleChangeEnd.bind(this)}  id={'endDate'}/>
            </FormGroup>
        )
    }

    genInputComponent(props) {
        let language = props.language
        return (
            <FormGroup controlId="mvInput">
                <FormControl type="text" />
            </FormGroup>
        )
    }

    render() {
        let scrollBtnStyle = this.props.theme.scrolling.button
        
        return (
            <Form className='form-inline search-bar' id={this.props.id + "form-search"}>

                <div className="scrolling-tabs-main search-bar" id={this.props.id + "-scroll-bar"}>
                    <button type="button" className="hks-btn btn-tab-prev search-bar" 
                        onClick={e => this.onTabSlideClick(1)}
                        style={scrollBtnStyle}>
                            <span className="glyphicon glyphicon-menu-left" style={{ zIndex: '1' }}></span>
                    </button>
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
                                        this.parameter[e] = true
                                        return (
                                            <span className='tabs-item'>
                                                {this.component[e]}
                                            </span>
                                        )
                                    })
                                }


                                {
                                    this.props.onSearch === undefined ? '' :
                                        (
                                            <span className='tabs-item'>
                                                <button style={this.props.theme.button} className="hks-btn" type="button"
                                                    onClick={this.onSearch.bind(this)}>{this.props.language.search}
                                                </button>
                                            </span>
                                        )

                                }



                            </nav>
                        </div>
                    </div>
                    <button type="button" className="hks-btn btn-tab-next search-bar" 
                        onClick={e => this.onTabSlideClick(2)}
                        style={scrollBtnStyle}>
                            <span className="glyphicon glyphicon-menu-right"></span>
                    </button>
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
        console.log('sd')
        if (i === 1) {
            $("#" + this.props.id + "-search-bar").animate({ scrollLeft: '-=200' }, 500);
        }
        else {
            $("#" + this.props.id + "-search-bar").animate({ scrollLeft: '+=200' }, 500);
        }
    }

}
