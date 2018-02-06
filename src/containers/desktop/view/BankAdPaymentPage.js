import React from 'react'
import AdvanceBankPlace from "../../widget/AdvanceBankPlace"
import AdvanceBankHistory from "../../widget/AdvanceBankHistory"


export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="services-page bank-ad-payment-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row match-container">
                    <AdvanceBankPlace {...this.props} />
                </div>
                <div className="row history-container">
                    <AdvanceBankHistory {...this.props} />
                </div>
            </div>
        )
    }

  
}