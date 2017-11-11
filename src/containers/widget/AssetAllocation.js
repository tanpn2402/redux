import React from 'react'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import PopupTable from '../commons/PopupTable'
import {connect} from 'react-redux'


export default class AssetAllocation extends React.Component{
    constructor(props){
        super(props)
        this.id = 'assetallocation'
    }

    render(){
        let data = [
            {
                header: 'creditlimit',
                value: 0.00
            },
            {
                header: 'buyingpower',
                value: 0.00
            },
            {
                header: 'withdrawablebalance',
                value: 0.00
            },
            {
                header: 'totalmarketvalue',
                value: 0.00
            },
            {
                header: 'settled',
                value: 0.00
            },
            {
                header: 'ledgerbalance',
                cell: props => {
                    return (
                        <div style={{display: "table", width: "100%"}} ref={ref => this.ledBalance = ref}>
                            <div style={{display: "table-cell", verticalAlign: "middle", width: "100%"}}>0.0</div>
                        </div>
                    )
                },
                style: {
                    backgroundColor: '#d11f1f', 
                    color: '#fff'
                }
            }
        ]
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme} ref={ref => this.widgetBody = ref}>
                    <PopupTable language={this.props.language.assetallocation.header} data={data} 
                        ref={ref => this.popupTable = ref}/>
                </Body>
            </div>
        )
    }

    componentDidMount() {
        let t = this.widgetBody.Wrapper.offsetHeight - this.popupTable.Table.offsetHeight
        this.ledBalance.style.height = this.ledBalance.style.height + t + "px"

    }
}