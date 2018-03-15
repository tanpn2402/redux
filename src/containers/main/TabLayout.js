import React, { Component } from 'react'
import { Button, Modal, } from 'react-bootstrap'
import GridLayout from './GridLayout.js'
import config from '../../core/config'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import $ from 'jquery'

import AdPaymentPage from "../desktop/view/AdPaymentPage"
import BankAdPaymentPage from "../desktop/view/BankAdPaymentPage"
import EntitlementPage from "../desktop/view/EntitlementPage"
import FundTransferPage from "../desktop/view/FundTransferPage"
import LoanRefundPage from "../desktop/view/LoanRefundPage"
import OddLotPage from "../desktop/view/OddLotPage"
import DepositWithdrawIMPage from "../desktop/view/DepositWithdrawIMPage"

import CashTransHistory from "../widget/CashTransHistory"
import OrderHistory from "../widget/OrderHistory"
import StockStatement from "../widget/StockStatement"

class CashTransHistoryContainer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            defaultPageSize: 0
        }
    }

    render() {
        let background = this.props.theme.page.background
        return (
            <div ref={r => this.main = r} className="trans-history-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                {
                    this.state.defaultPageSize != 0 ? (
                        <CashTransHistory {...this.props} defaultPageSize={this.state.defaultPageSize}/>
                    ) : null
                }
            </div>
        )
    }

    componentDidMount() {
        if(this.main) {
            this.setState({
                defaultPageSize: Math.floor((this.main.offsetHeight - 110) / 26)
            })
        }
    }
}

class StockStatementContainer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            defaultPageSize: 0
        }
    }

    render() {
        let background = this.props.theme.page.background
        return (
            <div ref={r => this.main = r} className="trans-history-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                {
                    this.state.defaultPageSize != 0 ? (
                        <StockStatement {...this.props} defaultPageSize={this.state.defaultPageSize}/>
                    ) : null
                }
            </div>
        )
    }

    componentDidMount() {
        if(this.main) {
            this.setState({
                defaultPageSize: Math.floor((this.main.offsetHeight - 110) / 26)
            })
        }
    }
}
class OrderHistoryContainer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            defaultPageSize: 0
        }
    }

    render() {
        let background = this.props.theme.page.background
        return (
            <div ref={r => this.main = r} className="trans-history-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                {
                    this.state.defaultPageSize != 0 ? (
                        <OrderHistory {...this.props} defaultPageSize={this.state.defaultPageSize}/>
                    ) : null
                }
            </div>
        )
    }

    componentDidMount() {
        if(this.main) {
            this.setState({
                defaultPageSize: Math.floor((this.main.offsetHeight - 110) / 26)
            })
        }
    }
}



class ServicePageContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {tabID, subTabID, theme} = this.props

        let child = null
        switch(subTabID) {
            case "fundTransfer": 
                child = <FundTransferPage {...this.props}/>
                break;
            case "advancePaymentBank": 
                child = <BankAdPaymentPage {...this.props}/>
                break;
            case "advancePayment": 
                child = <AdPaymentPage {...this.props}/>
                break;
            case "entitlement": 
                child = <EntitlementPage {...this.props}/>
                break;
            case "oddLot": 
                child = <OddLotPage {...this.props}/>
                break;
            case "loanrefund": 
                child = <LoanRefundPage {...this.props}/>
                break;
            case "depositwithdraw": 
                child = <DepositWithdrawIMPage {...this.props}/>
                break;


            case "cashTransHistory": 
                child = <CashTransHistoryContainer {...this.props} />
                break;
            case "orderHistory": 
                child = <OrderHistoryContainer {...this.props} />
                break;
            case "stockstatement": 
                child = <StockStatementContainer {...this.props} />
                break;

            default: 
                child = <FundTransferPage {...this.props}/>
                break;
        }
        
        return child
        
    }
}

class TabLayout extends Component {
    constructor(props){
        super(props)
        
        var tabs = config.tabbar.filter(el => el.id === this.props.tabID )
        if(tabs.length > 0){
            this.tabbar = tabs[0].widget
            
            if(this.props.subTab !== undefined){
                // change tab using search function
                this.state = {
                    activeTab: this.props.subTab
                }
            } else{
                // change tab manual
                this.state = {
                    activeTab: this.tabbar[0].i
                }
            }
                
        }
        else{
            this.tabbar = []
    
            this.state = {
                activeTab: ''
            }
        }
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.subTab !== undefined){
            this.setState({
                activeTab: nextProps.subTab
            });
        }
    }



    render() {
        let language = this.props.language
        let activeTab = this.state.activeTab
        let layout = [this.tabbar.filter(e => e.i === activeTab)[0]]

        let background = this.props.theme.page.background
        let scrollStyle = this.props.theme.scrolling

        let tabStyles = this.props.theme.tabcontrol
        // console.log(tabStyles)

        return (
            <div style={{height: "100%"}}>
                <div className="scrolling-tabs-main tab-layout" style={scrollStyle.background}>
                    {/* <div className="scrolling-tabs-left">
                        <button className="hks-btn btn-tab-prev" onClick={e => this.onTabSlideClick(1)} style={scrollStyle.button}>
                            <span className="glyphicon glyphicon-menu-left"></span>
                        </button>
                    </div> */}
                    <div className="scroll">
                        <div className="scrolling-tabs" id="scrolling-tablayout">
                            <nav className='vertical-align-middle'>
                                {
                                    this.tabbar.map(tab => {
                                        
                                        return ( 
                                            <div key={tab.id} className={'tabs-item ' + (tab.i === activeTab ? 'actived' : 'normal')}
                                                onClick={e=> this.onTabClick(tab.i)}
                                                style={tab.i === activeTab ? tabStyles.active : tabStyles.normal}>
                                            
                                                    {language.menu[tab.i]}
                                                    
                                            </div>
                                        )
                                    })
                                }
                                
                            </nav>
                        </div>
                    </div>
                    {/* <div className="scrolling-tabs-right">
                        <button className="hks-btn btn-tab-next" onClick={e => this.onTabSlideClick(2)} style={scrollStyle.button}>
                            <span className="glyphicon glyphicon-menu-right"></span>
                        </button>
                    </div> */}
                </div>
                <div className="tab-content" id={this.props.tabID}>
                    <ServicePageContainer {...this.props} id={this.state.subTabID}/>
                </div>
            </div>   
        )
    }

    onTabClick(subTabID){
        this.props.onTabClick(this.props.tabID, subTabID)
        this.setState({
            activeTab: subTabID
        })
    }

    onTabSlideClick(i){
        if(i === 1){
            $("#scrolling-tablayout").animate( { scrollLeft: '-=200' }, 500);
        }
        else{
            $("#scrolling-tablayout").animate( { scrollLeft: '+=200' }, 500);
        }
        
    }

}
const mapStateToProps = (state) => {
    return {
        subTabID: state.menuSelected.subTabID,
    }
}
const mapDispatchToProps = (dispatch, props) => ({
    onTabClick: (tabID, subTabID) => {
        dispatch(actions.onTabClick(tabID, subTabID));
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(TabLayout)
