import React from 'react'
import OddLotHistory from "../../widget/OddLotHistory"
import OddLotOrder from "../../widget/OddLotOrder"



export default class OddLotPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="services-page oddlot-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row oddlot-order">
                    <div className="oddlot-order-container">
                        <OddLotOrder {...this.props} />
                    </div>
                    <div className="oddlot-order-note">
                        
                    </div>
                </div>
                <div className="row oddlot-history">
                    <OddLotHistory {...this.props} />
                </div>
            </div>
        )
    }

  
}