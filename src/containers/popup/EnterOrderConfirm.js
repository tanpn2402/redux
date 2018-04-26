//render modal body + footer
import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import CheckAuthenticationModal from './CheckAuthenticationModal'
import {getTheme} from "../../utils"
import PopupTable from '../commons/PopupTable';

class EnterOrderConfirm extends Component{
    constructor(props) {
        super(props)
        
        this.id = 'enterorderconfirm'
    }


    render(){
        var tmp = this.props.data
        var language = this.props.language
        var buttonStyle = this.props.theme.button
        var tableStyle = this.props.theme.popup.table
        var tradingAccount = tmp.tradingAccount
        tradingAccount = tradingAccount == undefined ? {} : tradingAccount
        var data = [
            {
                Header: p => {
                    return (
                        <span>
                            <span style={{marginRight: "5px"}}>{language.enterorder.header.subaccount}:</span>
                            <span>{tradingAccount.subAccountID}</span>
                        </span>
                    )
                },
                Cell: p => {
                    return (
                        <span>
                            <span style={{marginRight: "5px"}}>{language.enterorder.header.accname}:</span>
                            <span>{tradingAccount.subAccountName}</span>
                        </span>
                    )
                }
            },
            {
                header: "market",
                value: tmp.mvMarketID
            },
            {
                header: "stock",
                value: tmp.mvStockCode
            },
            {
                header: "stockName",
                value: tmp.mvStockName
            },
            {
                header: "ordertype",
                value: tmp.mvOrderType
            },
            {
                header: "price",
                Cell: props => {
                    return <span style={{fontWeight: "bold", fontSize: 15}}>{tmp.mvPrice}</span>
                }
            },
            {
                header: "volume",
                Cell: props => {
                    return <span style={{fontWeight: "bold", fontSize: 15}}>{tmp.mvVolume}</span>
                }
            }
        ]
        return(
            <div>
                <Modal.Body>
                    <PopupTable theme={this.props.theme} language={this.props.language.enterorder.header} data={data} />
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>
                
                <Modal.Footer>
                    <button className="hks-btn btn-cancel" onClick={this.props.onHide} style={buttonStyle.cancel}>
                        {language.button.cancel}
                    </button>
                    <button className="hks-btn btn-submit" onClick={this.submit.bind(this)} 
                        style={ data.mvBS == "B" ? buttonStyle.buy : buttonStyle.sell }>
                        {language.button.submit}
                    </button>
                </Modal.Footer>
            </div>
        )
    }

    submit(e){
        
        var data = this.props.data
        var authParams = this.auth.getParam()
    
        this.props.onEnterOrder(data, authParams, this.props.language)
        this.props.onHide()
    }
}


const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    onEnterOrder: (a,b,c) => {dispatch(actions.enterOrder(a,b,c))}
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrderConfirm)
