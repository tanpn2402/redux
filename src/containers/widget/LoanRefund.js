import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Popup from '../Popup'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'
import ConfigColumnTable from '../commons/ConfigColumnTable'

class LoanTrans extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div></div>
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
