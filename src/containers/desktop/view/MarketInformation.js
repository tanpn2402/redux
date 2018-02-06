import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import GridLayout from '../../main/GridLayout.js'
import config from '../../../core/config'

class MarketInformation extends React.Component {
    constructor(props) {
        super(props)

        var tabs = config.tabbar.filter(el => el.id === this.props.tabID )
        if(tabs.length > 0){
            this.layout = tabs[0].widget
    
        }
        else{
            this.layout = []

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
                margin={[4, 4]}
                identifyLayout={{lg: 8, md: 8, sm: 8, xs: 2, xxs: 2}}
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketInformation)
