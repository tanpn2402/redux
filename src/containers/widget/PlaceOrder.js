import React from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, Checkbox } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import * as Utils from '../../utils'
import moment, { min } from 'moment'
import config from '../../core/config'
// import 'react-power-select/dist/react-power-select.css'
import * as api from '../../api/web_service_api'
import * as ACTION from '../../api/action_name'
import CalendarPicker from '../commons/CalendarPicker'
import Select from "../commons/InputSelect"
import Input from "../commons/Input"
import * as Log from "../../logger/TTLLog"
import Component from "../commons/Component"
import {handleNMOrder} from "../../actions/handleNMOrder"
import PlaceOrderFNO from './PlaceOrderFNO';
import AccountSelector from "../commons/selector/AccountSelector"

const { Contants } = require('../../core/constants')

const TRADINGTYPE = {
    NORMAL: "NORMAL",
    DERIVATIVES: "DERIVATIVES"
}

class PlaceOrder extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            //sub account
            mvListSubAcc: props.tradingAccounts,
            mvSubAccSelected: props.currentTrdAccount,
        }

        this.lang = "vi_VN"
        this.id = "enterorder"
    }

    handleSubAccChange(option) {
        let type = TRADINGTYPE.NORMAL
        if(option.type == "DERIVATIVES") {
            type = TRADINGTYPE.DERIVATIVES
        } 
        this.setState({
            mvSubAccSelected: option,
            tradingType: type
        })
    }


    render() {

        let {theme, language, tabID, showTitle} = this.props
        let header = language.enterorder.header
        this.stockList = config.cache.stockList

        let bg = "";
        let tColor= "";

        if(theme.title == "dark") {
            bg = "#474747"
            tColor = "#FFF"
        } else {
            bg = "#FFF"
            tColor = "#000"

        }

        let selectorStyles = {
            background: "#2159a0",
            color: "#FFF"
        } 
        if(theme.title == "virtual") {
            selectorStyles = {
                background: "#ee514c",
                color: "#FFF"
            } 
        }

        let showTi = false
        if(tabID == "customization") {
            showTi = true
            if(showTitle != undefined) {
                showTi = showTitle
            }
        }

        return (
            
            <Component style={{ height: "100%", position: "relative" }} id={this.id} theme={theme}>                 
                {
                    showTi ? 
                        <Title language={language} theme={theme} widgetID= 'placeorder'>
                            {language.menu['placeorder']}
                        </Title>
                        : null
                }
                <Body theme={theme} className={showTi ? 'title': 'no-title'}>

                    {/* PLACE ORDER CONTROL */}
                    <div className="pl-subacc-control">
                        <AccountSelector theme={theme}
                            style={selectorStyles}
                            selected={this.state.mvSubAccSelected}
                            language={language} ref={n => this.tradingAccount = n} 
                            handleChange={opt => this.handleSubAccChange(opt)}/>
                        <span style={theme.font.main} className="sep"></span>
                        <div className="pl-pin">
                            <span style={theme.font.main}>PIN</span>
                            <Input key="refPIN" type="password" ref={ref => this.refPIN =  ref} 
                                defaultValue={""} style={{textAlign: "center"}} tabIndex={-1}/>
                            <Checkbox inline>{header.savepin}</Checkbox>
                        </div>
                    </div>

                    <PlaceOrderFNO {...this.props} />


                </Body>
            </Component>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
        tabID: state.menuSelected.tabID,
        tradingAccounts: state.dologin.tradingAccounts,
        currentTrdAccount: state.dologin.currentTrdAccount,
    }
}

const mapDispatchToProps = (dispatch, props) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)