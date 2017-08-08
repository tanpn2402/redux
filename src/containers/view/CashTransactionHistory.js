import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
class CashTransactionHistory extends Component {
    constructor(props) {
        super(props)
    }

  
    render() {
        return (

            <div>
                <SearchBar />
                <DataTable />
            </div>
        )
        
    }

}

export default CashTransactionHistory;