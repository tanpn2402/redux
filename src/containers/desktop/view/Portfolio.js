import React from 'react'
import ClientSumary from "../../widget/ClientSumary"
import Portfolio from "../../widget/Portfolio"
import Sumary from "../../widget/Sumary"



export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let background = this.props.theme.page.background
        
        return (
            <div className="portfolio-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row portfolio-header-container">
                    <ClientSumary {...this.props} />
                </div>
                <div className="row sumary-container">
                    <Sumary {...this.props} />
                </div>
                <div className="row portfolio-container">
                    <Portfolio {...this.props} />
                </div>
            </div>
        )
    }

  
}



