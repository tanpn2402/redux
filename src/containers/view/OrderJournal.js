import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class OrderJournal extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount(){
        this.props.onStockSearch('vi')
    }
  
    render() {
        console.log('render in OrderJournal')
        
        return (

            <div>
                <SearchBar stockList={this.props.stockSearchList} language={this.props.language}/>
                <DataTable />
            </div>
        )
        
    }

}
const mapStateToProps = (state) => {
  return {
    stockSearchList: state.stockSearchAction.stockSearchList,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onStockSearch: (language) => {
    dispatch(actions.stockSearch(language))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderJournal)
