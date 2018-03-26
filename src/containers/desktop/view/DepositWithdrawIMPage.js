import React from 'react'
import DepositWithdrawPanel from "../../widget/DepositWithdrawPanelIM"
import DepositWithdrawHistory from "../../widget/DepositWithdrawHistoryIM"
import DepositWithdrawStatus from "../../widget/DepositWithdrawStatus"



export default class DepositWithDrawIMPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="services-page depositwithdrawim-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                
                <div className="panel-container">
                    <DepositWithdrawPanel {...this.props} />
                </div>
                <div className="table-status-container">
                    <DepositWithdrawHistory {...this.props} />
                </div>
               
            </div>
        )
    }

  
}



