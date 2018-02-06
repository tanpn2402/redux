import React from 'react'
import LoanRefundPanel from "../../widget/LoanRefundPanel"
import LoanRefundHistory from "../../widget/LoanRefundHistory"
import LoanRefundStatus from "../../widget/LoanRefundStatus"
import AdvancePanel from "../../widget/AdvancePanel"




export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="services-page loan-refund-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row loan-panel-container">
                    <div className="panel-container loan-panel">
                        <LoanRefundPanel {...this.props} />
                    </div>
                    <div className="table-container status-table">
                        <LoanRefundStatus {...this.props} />
                    </div>
                </div>
                <div className="row history-container">
                    <div className="panel-container ad-payment-panel">
                        <AdvancePanel {...this.props} />
                    </div>
                    <div className="table-container history-table">
                        <LoanRefundHistory {...this.props} />
                    </div>
                </div>
            </div>
        )
    }

  
}



