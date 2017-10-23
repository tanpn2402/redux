import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from '../main/GridLayout.js'
import config from '../../core/config'

class AdBankPayment extends Component {
    constructor(props) {
        super(props)

        this.widget = [
            'advanceBankPlace',
            'advanceBankHistory'
        ]

        this.layout = [
            config.default_layout[this.widget[0]],
            config.default_layout[this.widget[1]]      
        ]
    }

    componentWillReceiveProps(nextProps) {}

    // shouldComponentUpdate (nextProps, nextState){
    //     // return a boolean value
    //     if (this.globalLoad != nextProps.load){
	// 		this.globalLoad = nextProps.load
    //         if (nextProps.loadWidgetID === this.id) {
    //             console.log(nextProps.loadWidgetID == this.id)
    //             return true
    //         }else {
    //             return false
    //         }
    //     }
        
    //     return true
    // }
    
    render() {
        return (
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

export default connect(mapStateToProps, mapDispatchToProps)(AdBankPayment)
