import React from 'react'
import { connect } from 'react-redux'
import Body from '../commons/WidgetBody'
import * as actions from '../../actions'
import GridLayout from '../main/GridLayout.js'
import config from '../../core/config'
import Component from "../commons/Component"

class ClientSumary extends React.Component {
    constructor(props) {
        super(props);
        this.id = "clientsumary"

    }

    render() {

        let header = this.props.language.portfolio.header
        let clientData = this.props.clientData
        let theme = this.props.theme
        return (
            <Component className="client-sum" theme={theme} style={{ height: "100%", position: "relative" }}>
                <ul className="client-sum-control">
                    <li>
                        <div className="cl-info"  >
                            <span style={theme.font.main} className="cl-account">
                                <label>{clientData.mvPersonnalProfileBean.mvAccountNumber}</label>
                            </span>
                            <span style={theme.font.main} className="cl-name">{clientData.mvPersonnalProfileBean.mvName}</span>
                        </div>
                    </li>
                    <li>
                        <div className="cl-total-asset">
                            <h4 style={theme.font.sub1} class="trd-binding">{header.totalAsset}</h4>
                            <strong className="">{this._render("totalAsset")}</strong>
                        </div>
                    </li>
                    <li>
                        <div className="cl-equity">
                            <h4 style={theme.font.sub1} class="trd-binding">{header.equity}</h4>
                            <strong className="">{this._render("equity")}</strong>
                        </div>
                    </li>
                    <li>
                        <div className="cl-stock-value">
                            <h4 style={theme.font.sub1} class="trd-binding">{header.stockValue}</h4>
                            <strong className="">{this._render("stockValue")}</strong>
                        </div>
                    </li>
                    <li>
                        <div className="cl-profit-loss">
                            <h4 style={theme.font.sub1} class="trd-binding">{header.profitLoss}</h4>
                            <strong className="">{this._render("profitLoss")}</strong>
                            <span style={{whiteSpace: "pre"}}>{"   "}</span>
                            <strong className="">{this._render("PLPercent")}</strong>
                        </div>
                    </li>
                </ul>
                
                
            </Component>
        )
    }

    _render(accessor) {
        let props = this.props.data.mvPortfolioAccSummaryBean

        let theme = this.props.theme.bindingdata
        let style = theme.normal

        let tmp = props[accessor]
        
        if(tmp == undefined) {
            return <span style={style}>---</span>
        } else {
            if(accessor == "PLPercent") {
                tmp += "%"
            }
            return <span style={style}>{tmp}</span>
        }

        // if(props[accessor] < this.balance[accessor]) {
        //     style = theme.down
        //     if(accessor == "mvMatchUpDown") tmp = "-" + tmp
        // } else if (props[accessor] > this.balance[accessor] ) {
        //     style = theme.up
        //     if(accessor == "mvMatchUpDown") tmp = "+" + tmp
        // }
        // let child = <span style={style}>{tmp}</span>
        // return child
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.trading.portfolioData,
        clientData: state.profile.clientDetails
    }
}

const mapDispatchToProps = (dispatch, props) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(ClientSumary)