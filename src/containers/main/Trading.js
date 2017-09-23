import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import GridLayout from './GridLayout.js'
import config from '../../core/config'

class Trading extends Component {
	constructor(props) {
        super(props)
    }

    componentWillMount(){
        this.getLayout(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.getLayout(nextProps)
    }	

    getLayout(props){
        this.layout = []
        var tab = config.tabbar.filter(e => e.id === props.tabID)
        if(tab.length > 0){
            var list = tab[0].widget    
            for(var i = 0; i < list.length; i++){
                this.layout.push(config.default_layout[list[i]])
            }
        }
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
