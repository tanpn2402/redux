import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import GridLayout from '../../main/GridLayout.js'
import config from '../../../core/config'
import Component from "../../commons/Component"
import PlaceOrder from "../../widget/PlaceOrder"
import WatchListSmall from "../../widget/WatchListSmall"
import PortfolioSmall from "../../widget/PortfolioSmall"
import OrderJournal from "../../widget/OrderJournal"
import BidAsk from "../../widget/BidAsk"




class Trading extends React.Component {
    constructor(props) {
        super(props)

        
    }

    render() {
        let background = this.props.theme.page.background
        
        return (
            <div className="trading-page" style={{height: "100%", backgroundColor: background.backgroundColor}}>
                <div className="row row-1">
                    <div className="bidask-container">
                        <BidAsk {...this.props} />
                    </div>
                    <div className="wl-sm-container">
                        <WatchListSmall {...this.props} />
                    </div>
                </div>
                <div className="row row-2">
                    <div className="placeorder-container">
                        <PlaceOrder {...this.props} />
                    </div>
                    <div className="portfolio-sm-container">
                        <PortfolioSmall {...this.props} />
                    </div>
                </div>
                <div className="row row-3 trd-orderjournal-container">
                    <OrderJournal {...this.props} />
                </div>
            </div>
        )
    }

    componentDidMount() {
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Trading)
