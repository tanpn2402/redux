import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../commons/DataTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'

class ConfirmOrder extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            // {
            //     id: 'mvTradeTime',
            //     Header: this.props.language.orderconfirmation.header.tradetime,
            //     accessor: 'mvTradeTime',
            //     width: 100,
            //     skip: false,
            //     show: true,
            // },
            // {
            //     id: 'mvMarketID',
            //     Header: this.props.language.orderconfirmation.header.marketid,
            //     accessor: 'mvMarketID',
            //     width: 50,
            //     skip: false,
            //     show: true,
            // },
            {
                id: 'mvStockID',
                Header: this.props.language.orderconfirmation.header.stockid,
                accessor: 'mvStockID',
                width: 200,
                skip: false,
                show: true,
            },
            // {
            //     id: 'mvBS',
            //     Header: this.props.language.orderconfirmation.header.buysell,
            //     accessor: 'mvBS',
            //     width: 60,
            //     skip: false,
            //     show: true,
            // },
            // {
            //     id: 'mvOrderType',
            //     Header: this.props.language.orderconfirmation.header.ordertype,
            //     accessor: 'mvOrderType',
            //     width: 60,
            //     skip: false,
            //     show: true,
            // },
            {
                id: 'mvQty',
                Header: this.props.language.orderconfirmation.header.quantity,
                accessor: 'mvQty',
                width: 200,
                skip: false,
                show: true,
            },
            {
                id: 'mvPrice',
                Header: this.props.language.orderconfirmation.header.price,
                accessor: 'mvPrice',
                width: 200,
                skip: false,
                show: true,
            },
            // {
            //     id: 'mvStatus',
            //     Header: this.props.language.orderconfirmation.header.status,
            //     accessor: 'mvStatus',
            //     width: 100,
            //     skip: false,
            //     show: true,
            // },
            // {
            //     id: 'mvFilledQty',
            //     Header: this.props.language.orderconfirmation.header.filledquantity,
            //     accessor: 'mvFilledQty',
            //     width: 70,
            //     skip: false,
            //     show: true,
            // },
            // {
            //     id: 'mvFilledPrice',
            //     Header: this.props.language.orderconfirmation.header.filledprice,
            //     accessor: 'mvFilledPrice',
            //     width: 70,
            //     skip: false,
            //     show: true,
            // },
            // {
            //     id: 'mvCancelQty',
            //     Header: this.props.language.orderconfirmation.header.cancelquantity,
            //     accessor: 'mvCancelQty',
            //     width: 100,
            //     skip: false,
            //     show: true,
            // },
        ],

            this.id = 'confirmorder-popup'
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.columns = [
                {
                    id: 'mvTradeTime',
                    Header: nextProps.language.orderconfirmation.header.tradetime,
                    accessor: 'mvTradeTime',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: nextProps.language.orderconfirmation.header.marketid,
                    accessor: 'mvMarketID',
                    width: 50,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStockID',
                    Header: nextProps.language.orderconfirmation.header.stockid,
                    accessor: 'mvStockID',
                    width: 60,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvBS',
                    Header: nextProps.language.orderconfirmation.header.buysell,
                    accessor: 'mvBS',
                    width: 60,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvOrderType',
                    Header: nextProps.language.orderconfirmation.header.ordertype,
                    accessor: 'mvOrderType',
                    width: 60,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvQty',
                    Header: nextProps.language.orderconfirmation.header.quantity,
                    accessor: 'mvQty',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvPrice',
                    Header: nextProps.language.orderconfirmation.header.price,
                    accessor: 'mvPrice',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvStatus',
                    Header: nextProps.language.orderconfirmation.header.status,
                    accessor: 'mvStatus',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledQty',
                    Header: nextProps.language.orderconfirmation.header.filledquantity,
                    accessor: 'mvFilledQty',
                    width: 70,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvFilledPrice',
                    Header: nextProps.language.orderconfirmation.header.filledprice,
                    accessor: 'mvFilledPrice',
                    width: 70,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvCancelQty',
                    Header: nextProps.language.orderconfirmation.header.cancelquantity,
                    accessor: 'mvCancelQty',
                    width: 100,
                    skip: false,
                    show: true,
                },
            ]
        }
    }

    onConfirmSubmit() {
        this.props.onConfirmSubmit({
            data: this.props.data.rowSelected,
            language: this.props.language,
            me: this.props.data.me
        })
        this.props.onHide()
    }

    render() {
        let language = this.props.language
        return (
            <div>
                <Modal.Body>
                    <DataTable
                        theme={this.props.theme}
                        id={this.id + "-table"}
                        language={language}
                        tableData={this.props.data.rowSelected}
                        columns={this.columns}
                        maxRows={5}
                        pageSize={15}
                    />
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language} />

                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{language.button.cancel}</Button>
                    <Button className="submit" onClick={this.onConfirmSubmit.bind(this)}> {language.button.submit}</Button>
                </Modal.Footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, props) => ({
    onConfirmSubmit: (param) => {
        dispatch(actions.onConfirmSubmit(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder)