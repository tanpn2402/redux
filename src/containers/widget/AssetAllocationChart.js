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
        
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <Title language={this.props.language} theme={this.props.theme} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme} ref={ref => this.widgetBody = ref}>
                    <PieChart theme={this.props.theme} />
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