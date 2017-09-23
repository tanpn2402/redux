import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TabLayout from '../main/TabLayout'


class Management extends Component {
	constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps){
    }	

    render(){
        console.log('asdsds')
        return(
                <TabLayout theme={this.props.theme} language={this.props.language}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Management)
