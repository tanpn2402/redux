import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from '../main/CustomizationGridLayout.js'
import config from '../../core/config'

class Customization extends Component {
    constructor(props) {
        super(props)
        var tabs = config.tabbar.filter(el => el.id === this.props.tabID )
        this.state = {
            layout : tabs.length>0?tabs[0].widget:[]
        }        
    }

    componentWillReceiveProps(nextProps){
        console.log("=========")
        console.log(nextProps)
        console.log(this.state.layout)
        this.loadNewWidgetConfig(nextProps.widgetList[nextProps.widgetList.length-1])
        this.render()
    }   

    render(){

        return(
            <GridLayout 
                language={this.props.language}
                layout={this.state.layout}
                stockList={this.props.stockList} 
                theme={this.props.theme}
                >
            </GridLayout>
        )
    }

    componentDidMount() {
    }

    loadNewWidgetConfig(widgetID){
        let newWidgetConfig = config.layoutdefault[widgetID]
        if (newWidgetConfig != null){
            this.setState = {
                layout: this.state.layout.concat(newWidgetConfig)
            }
        }
    }
}


const mapStateToProps = (state) => {
    return {
        load: state.menuSelected.load,
        widgetList: state.menuSelected.widgetList,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Customization)
