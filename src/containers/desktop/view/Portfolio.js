import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import ClientSumary from "../../widget/ClientSumary"
import Portfolio from "../../widget/Portfolio"
import Sumary from "../../widget/Sumary"

import PortfolioFS from "../../widget/PortfolioFS"
import SumaryFS from "../../widget/SumaryFS"

class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            subAccount: props.currentTrdAccount
        }
    }


    onSubAccountChange(value) {
        // console.log(value)
        this.setState({
            subAccount: value
        })
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="portfolio-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row portfolio-header-container">
                    <ClientSumary {...this.props} />
                </div>
                <div className="row sumary-container">
                    <Sumary {...this.props} onSubAccountChange={v => this.onSubAccountChange(v)}/>
                </div>
                <div className="row portfolio-container">
                    {
                        this.state.subAccount.investorType == "DERIVATIVES" ? 
                        <PortfolioFS {...this.props} tradingAccount={this.state.subAccount} /> :
                        <Portfolio {...this.props} />
                    }
                </div>
            </div>
        )
    }

  
}
const mapStateToProps = (state) => {
    return {
        tradingAccounts: state.dologin.tradingAccounts,
        currentTrdAccount: state.dologin.currentTrdAccount
    }
}

const mapDispatchToProps = (dispatch, props) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPage)


