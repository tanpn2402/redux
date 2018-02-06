import React from 'react'
import EntitlementPanel from "../../widget/EntitlementPanel"
import EntitlementHistory from "../../widget/EntitlementHistory"
import AdditionSharesInfo from "../../widget/AdditionSharesInfo"
import ActionRightList from "../../widget/ActionRightList"




export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="services-page entitlement-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="panel-container">
                    <EntitlementPanel {...this.props} />
                </div>
                <div className="table-container">
                    <div className="action-right-list-container">
                        <ActionRightList {...this.props} />
                    </div>
                    <div className="add-share-info-container">
                        <AdditionSharesInfo {...this.props} />
                    </div>
                    <div className="history-container">
                        <EntitlementHistory {...this.props} />
                    </div>
                </div>
            </div>
        )
    }

  
}



