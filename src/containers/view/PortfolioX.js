import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from '../main/GridLayout.js'
import config from '../../core/config'


class Portfolio extends Component {
    constructor(props) {
        super(props)

        var tabs = config.tabbar.filter(el => el.id === this.props.tabID )
        if(tabs.length > 0){
            this.tabbar = tabs[0].widget
    
            this.state = {
                activeTab: this.tabbar[0]
            }
        }
        else{
            this.tabbar = []
    
            this.state = {
                activeTab: ''
            }
        }
        
    }

    componentWillReceiveProps(nextProps){
    }   

    render(){
        var activeTab = this.state.activeTab
        var layout = [config.default_layout[activeTab]]
        return(
            <GridLayout 
                language={this.props.language}
                layout={layout}
                stockList={this.props.stockList} 
                theme={this.props.theme}
                >
            </GridLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
