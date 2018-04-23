import React from 'react'
import DepositWithdrawPanel from "../../widget/DepositWithdrawPanel"
import DepositWithdrawHistory from "../../widget/DepositWithdrawHistory"
import DepositWithdrawStatus from "../../widget/DepositWithdrawStatus"



export default class DepositWithDrawPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="services-page depositwithdraw-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                

                {/* <div className="row "> */}
                    <div className="panel-container">
                        <DepositWithdrawPanel {...this.props} />
                    </div>
                    <div className="table-status-container">
                        <DepositWithdrawHistory {...this.props} />
                    </div>
                {/* </div> */}
            </div>
        )
    }

  
}


