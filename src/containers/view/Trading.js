import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from '../main/GridLayout.js'
import config from '../../core/config'


class Trading extends Component {
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
        this.layout = []
        for (var i = this.tabbar.length - 1; i >= 0; i--) {
            this.layout.push(config.default_layout[this.tabbar[i]])
        }
        
    }

    componentWillReceiveProps(nextProps){
    }   

    render(){

        return(
            <GridLayout 
                language={this.props.language}
                layout={this.layout}
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

export default connect(mapStateToProps, mapDispatchToProps)(Trading)
