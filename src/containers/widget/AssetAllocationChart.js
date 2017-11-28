import React from 'react'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import PopupTable from '../commons/PopupTable'
import PieChart from '../commons/PieChart'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class AssetAllocationChart extends React.Component {
    constructor(props) {
        super(props)
        this.id = 'assetallocationchart'
    }

    render() {
        let language = this.props.language.assetallocation.header
        let data = []
        if (this.props.lite) {
            data = [
                {
                    name: language['buyingpower'],
                    value: 0.00
                },
                {
                    name: language['ledgerbalance'],
                    value: 0.00
                }
            ]
        } else {
            data = [
                {
                    name: language['creditlimit'],
                    value: 84.95
                },
                {
                    name: language['buyingpower'],
                    value: 41.82
                },
                {
                    name: language['withdrawablebalance'],
                    value: 56.03
                },
                {
                    name: language['totalmarketvalue'],
                    value: 31.76
                },
                {
                    name: language['settled'],
                    value: 53.26
                },
                {
                    name: language['ledgerbalance'],
                    value: 92.18,
                }
            ]
        }
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme} ref={ref => this.widgetBody = ref}>
                    <PieChart theme={this.props.theme} colors={[]} data={data}/>
                </Body>
            </div>
        )
    }

    componentDidMount() {


    }


}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, props) => ({
    onMobileTabClick: (id) => {
        dispatch(actions.onMobileTabClick(id));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetAllocationChart)