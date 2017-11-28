import React from 'react'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import PopupTable from '../commons/PopupTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class AssetAllocation extends React.Component{
    constructor(props){
        super(props)
        this.id = 'assetallocation'
    }

    toValue(v) {
        return isNaN(v) ? 0 : v
    }

    render(){
        let res = this.props.accountbalanceResponse
        let data = []
        let totalMarketValue = 0
        res.marketValueList.map(e => {
            totalMarketValue += e.totalMarketValue
        })
        
        if(this.props.lite) {
            data = [
                {
                    header: 'buyingpower',
                    value: this.toValue(res.buyingPower)                 
                },
                {
                    header: 'ledgerbalance',
                    value: this.toValue(res.ledgerBalace)
                }
            ]
        } else {
            data = [
                {
                    header: 'creditlimit',
                    value: this.toValue(res.creditLimit)
                },
                {
                    header: 'buyingpower',
                    value: this.toValue(res.buyingPower) 
                },
                {
                    header: 'withdrawablebalance',
                    value: this.toValue(res.withdrawableAmount)
                },
                {
                    header: 'totalmarketvalue',
                    value: totalMarketValue
                },
                {
                    header: 'settled',
                    value: this.toValue(res.settledBalance)
                },
                {
                    header: 'ledgerbalance',
                    Cell: props => {
                        return (
                            <div style={{ display: 'table', width: '100%' }} ref={ref => this.ledBalance = ref} >
                                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>{this.toValue(res.ledgerBalace)}</div>
                            </div>
                        )
                    },
                    style: {
                        backgroundColor: '#d11f1f',
                        color: '#fff'
                    }
                }
            ]
        }
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme} ref={ref => this.widgetBody = ref}>
                    <PopupTable language={this.props.language.assetallocation.header} data={data} 
                        ref={ref => this.popupTable = ref}/>

                    {
                        !this.props.lite ? null :
                        (
                            <div style={{position: "absolute", bottom: "0", width: "100%", height: "40px", textAlign: "center", background: "#bc0000"}}>
                                <button style={{border: "none", height: "100%", width: "100%", background: "transparent", color: "#FFF"}}
                                    onClick={() => this.gotoAssetAllocation()}>
                                    + More
                                </button>
                            </div>
                        )
                    }
                </Body>
            </div>
        )
    }

    componentDidMount() {
        if(!this.props.lite) {
            let t = this.widgetBody.Wrapper.offsetHeight - this.popupTable.Table.offsetHeight
            this.ledBalance.style.height = this.ledBalance.style.height + t - 15 + "px"
        } else {
            this.popupTable.Table.style.height = "auto"
        }

    }

    gotoAssetAllocation() {
        this.props.onMobileTabClick("portfoliotab")
    }
}

const mapStateToProps = (state) => {
    return {
        accountbalanceResponse: state.accountbalance.data
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onMobileTabClick: (id) => {
        dispatch(actions.onMobileTabClick(id));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetAllocation)