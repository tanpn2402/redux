//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap'
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TableData from '../commons/DataTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'
import PopupTable from '../commons/PopupTable';

class CancelOrder extends Component {
    constructor(props) {
        super(props)
        let {language} = this.props
        this.columns = [{
            id: 'mvStockID',
            Header: this.props.language.orderjournal.header.stockid,
            accessor: 'mvStockID',
            width: 100,
        },
        {
            id: 'mvBS',
            Header: this.props.language.orderjournal.header.buysell,
            accessor: 'mvBS',
            width: 80,
            Cell: props => {
                return <span>{language.global.bs[props.original["mvBSValue"]]}</span>
            }
        },
        {
            id: 'mvPrice',
            Header: this.props.language.orderjournal.header.price,
            accessor: 'mvPrice',
            width: 100,
        },
        {
            id: 'mvQty',
            Header: this.props.language.orderjournal.header.quantity,
            accessor: 'mvQty',
            width: 100,
        }
        ],

            this.id = 'cancelorder-popup'
    }
    onCancelSubmit() {
        var authParams = this.auth.getParam()

        this.props.onCancelSubmit(this.props.data, authParams, this.props.language)
        this.props.onHide()
    }


    _renderForOneOrder(props, language) {
        var tmp = props.data.data[0]
        var data = [
            {
                header: "market",
                value: tmp.mvMarketID
            },
            {
                header: "stockid",
                value: tmp.mvStockID
            },
            {
                header: "stockName",
                value: tmp.mvStockName
            },
            {
                header: "buysell",
                value: language.global.bs[tmp.mvBSValue]
            },
            {
                header: "price",
                value: tmp.mvPriceValue
            },
            {
                header: "quantity",
                value: tmp.mvQtyValue
            }
        ]

        return <PopupTable theme={props.theme} language={language.orderjournal.header} data={data} />
    }

    _renderForMultiOrder(props, language) {
        var data = this.props.data.data
        
        return (
            <TableData
                theme={props.theme}
                id={this.id + "-table"}
                language={language}

                columns={this.columns}
                pageSize={15}
                maxRows={5}
                tableData={data}
                searchEnable={false}
                footerEnable={false}
            />
        )
    }
    render() {
        var language = this.props.language
        var buttonStyle = this.props.theme.button
        return (
            <div>
                <Modal.Body>
                    {
                        this.props.data.data.length > 1 ?
                            this._renderForMultiOrder(this.props, language)
                        : this.props.data.data.length == 1 ?
                            this._renderForOneOrder(this.props, language)
                        : null
                    }
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language} />

                <Modal.Footer>
                    <button className="hks-btn btn-cancel" onClick={this.props.onHide} style={buttonStyle.cancel}>
                        {language.button.cancel}</button>
                    <button className="hks-btn btn-submit" onClick={this.onCancelSubmit.bind(this)} style={buttonStyle.confirm}>
                        {language.button.confirmCancel}</button>
                </Modal.Footer>

            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.columns = [{
            id: 'mvStockID',
            Header: nextProps.language.orderjournal.header.stockid,
            accessor: 'mvStockID',
            width: 100,
        },
        {
            id: 'mvBS',
            Header: nextProps.language.orderjournal.header.buysell,
            accessor: 'mvBS',
            width: 80,
        },
        {
            id: 'mvPrice',
            Header: nextProps.language.orderjournal.header.price,
            accessor: 'mvPrice',
            width: 100,
        },
        {
            id: 'mvQty',
            Header: nextProps.language.orderjournal.header.quantity,
            accessor: 'mvQty',
            width: 100,
        }
        ]
    }
}
const mapStateToProps = (state) => {
    return {
        returnCode: state.orderjournal.returnCode,
        message: state.orderjournal.message,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onCancelSubmit: (param, language, authParams) => {
        dispatch(actions.onCancelSubmit(param, language, authParams))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder)
