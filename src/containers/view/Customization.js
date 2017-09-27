import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from '../main/CustomizationGridLayout.js'
import config from '../../core/config'

class Customization extends Component {
    constructor(props) {
        super(props)
        this.customConfig = config.tabbar[config.tabbar.findIndex(tab=>tab.id=="customization")]
        this.state = {
            layout : this.customConfig.widget.length>0?this.customConfig.widget:[]
        }

        this.reloadWidget = this.reloadLayout.bind(this)
    }


    

      
    componentWillReceiveProps(nextProps){
        console.log("STATE CHANGE========================="+nextProps.load+"|"+this.props.load)
        if (nextProps.load != this.props.load){
            this.reloadLayout()
        }
    }

    

    

    reloadLayout(){
        console.log("LAYOUT WILL BE RELOAD")
        var widgets = config.tabbar[config.tabbar.findIndex(tab=>tab.id=="customization")].widget

        this.setState({
            layout : widgets.length>0?[...widgets]:[]
        })

        console.log("========= LAYOUT RELOADED: ")
        console.log(this.state.layout)
        console.log("========= LAYOUT RELOADED: ")
    }


    render(){
        return(
            <GridLayout
                language={this.props.language}
                layout={this.state.layout}
                stockList={this.props.stockList} 
                theme={this.props.theme}>
            </GridLayout>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        load: state.menuSelected.load,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Customization)
