//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
export default class CancelOrder extends Component{
    constructor(props){
        super(props)
        this.data = [
        {
            stockid:  'ABC',
            title: 'ABC bank',
            ordertype: 'B',
            status: 'CAN',
            date: '01/01/2010',
            quantity: 200,
            price: 300,
            canQty: 120,
        }]
        this.columns = [
            {
                id: 'cb',
                Header: props => <input type='checkbox' />,
                maxWidth: 50,
                Cell: props => <input type='checkbox' />,
                sortable: false
            },
            {
                id: 'code',
                Header: 'Code',
                accessor: 'stockid',
            },
            {
                id: 'name',
                Header: 'Name',
                accessor: 'title',
            },
            {
                id: 'ordertype',
                Header: 'Order Type',
                accessor: 'ordertype',
            },
            {
                id: 'status',
                Header: 'Status',
                accessor: 'status',
            },
            {
                id: 'price',
                Header: 'Price',
                accessor: 'price',
            },
            {
                id: 'quantity',
                Header: 'Quantity',
                accessor: 'quantity',
            },
            {
                id: 'canQty',
                Header: 'Can Quantity',
                accessor: 'canQty',
            },
            {
                id: 'date',
                Header: 'Datetime',
                accessor: 'date',
            },

        ]
    }
    render(){
        return(
            <div>
                <Modal.Body>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Default</td>
                            <td>Defaultson</td>
                            <td>def@somemail.com</td>
                        </tr>      
                        <tr className="success">
                            <td>Success</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                        </tr>
                        <tr className="danger">
                            <td>Danger</td>
                            <td>Moe</td>
                            <td>mary@example.com</td>
                        </tr>
                        
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button> Submit</Button>
                </Modal.Footer>
            </div>
        )
    }
}