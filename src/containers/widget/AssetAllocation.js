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
                value: 0.00,
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
                <Body theme={this.props.theme}>
                    <PopupTable language={this.props.language.assetallocation.header} data={data}/>
                </Body>
            </div>
        )
    }
}