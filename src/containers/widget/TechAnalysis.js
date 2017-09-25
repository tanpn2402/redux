import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'

class TechAnalysis extends Component {

    constructor(props){
        super(props)

        this.id = 'techanalysis'
    }

    render() {

        return (
        <div style={{height: '100%'}}>
            <div className="component-header" >
                <span className="content-block-head">
                    {this.props.language.menu[this.id]}
                </span>
                <ul className="btn-action">
                    <li className="btn-close">
                        <span className="glyphicon glyphicon-remove" ></span>
                    </li>
                </ul>
            </div>
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
                <div className="component-main">
                    <p>Comming soon</p>
                </div>
                <div className="component-body">
                    
                </div>
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
