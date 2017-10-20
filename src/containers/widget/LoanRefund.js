import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from '../main/GridLayout.js'
import config from '../../core/config'

class LoanTrans extends Component {
    constructor(props) {
        super(props)

        this.widget = [
            'loanRefundHistory',
            'loanRefundPanel',
            'loanRefundStatus',
            'advancePanel'
        ]

        this.layout = [
            config.default_layout[this.widget[0]],
            config.default_layout[this.widget[1]],
            config.default_layout[this.widget[2]],
            config.default_layout[this.widget[3]],          
        ]
    }


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

export default connect(mapStateToProps, mapDispatchToProps)(LoanTrans)
