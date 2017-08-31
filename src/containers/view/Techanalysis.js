import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'

class TechAnalysis extends Component {

    constructor(props){
        super(props)

        this.id = 'techanalysis'
    }

    render() {

        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
                <div className="component-main">
                    <p>Comming soon</p>
                </div>
                <div className="component-body">
                    
                </div>
            </div>
        )

    }

    componentDidMount() {
    }

}
const mapStateToProps = (state) => {
   
}

const mapDispatchToProps = (dispatch, props) => ({
    
})



export default connect(mapStateToProps, mapDispatchToProps)(TechAnalysis)
