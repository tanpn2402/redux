import React from 'react'
import AdvancePanel from "../../widget/AdvancePanel"
import AdvanceHistory from "../../widget/AdvanceHistory"
import MatchOrderList from "../../widget/MatchOrderList"



export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="services-page ad-payment-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row ">
                    <div className="panel-container">
                        <AdvancePanel {...this.props} />
                    </div>
                    <div className="table-container">
                        <MatchOrderList {...this.props} />
                    </div>
                </div>
                <div className="row history-panel">
                    <AdvanceHistory {...this.props} />
                </div>
            </div>
        )
    }

  
}



