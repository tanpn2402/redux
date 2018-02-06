import React from 'react'
import FundTransferPanel from "../../widget/FundTransferPanel"
import FundTransferHistory from "../../widget/FundTransferHistory"



export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="services-page fundtransfer-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="panel-container">
                    <FundTransferPanel {...this.props} />
                </div>
                <div className="table-container">
                    <FundTransferHistory {...this.props} />
                </div>
            </div>
        )
    }

  
}



