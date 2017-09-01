import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../commons/SearchBar'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'
import Popup from '../Popup'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'
class CashStatement extends Component {
    constructor(props) {
        super(props)

        this.params = {
            mvStartDate: '01/01/2001',
            mvEndDate: '01/01/2017',
            start: 0,
            limit: 15,
            timePeriod: 'Customize'
        }

        this.state = {
            columns: [
                {
                    id: 'Date',
                    Header: this.props.language.cashstatement.header.date,
                    accessor: 'TRANDATE',
                    width: 110,
                    skip: false,
                    show: true,
                },
                {
                    id: 'description',
                    Header: this.props.language.cashstatement.header.description,
                    accessor: 'REMARKS',
                    width: 210,
                    skip: false,
                    show: true,
                },
                {
                    id: 'BALBF',
                    Header: this.props.language.cashstatement.header.beginningbalance,
                    accessor: 'BALBF',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'CREDITAMT',
                    Header: this.props.language.cashstatement.header.creditamount,
                    accessor: 'CREDITAMT',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'DEBITAMT',
                    Header: this.props.language.cashstatement.header.debitamount,
                    accessor: 'DEBITAMT',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'BALCF',
                    Header: this.props.language.cashstatement.header.endingbalance,
                    accessor: 'BALCF',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
            pageIndex: 1,
            lgShow: false
        }

        this.rowSelected = []
        this.popupType = 'none'
        this.id = 'cashstatement'
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    id: 'Date',
                    Header: nextProps.language.cashstatement.header.date,
                    accessor: 'TRANDATE',
                    width: 110,
                    skip: false,
                    show: true,
                },
                {
                    id: 'description',
                    Header: nextProps.language.cashstatement.header.description,
                    accessor: 'REMARKS',
                    width: 210,
                    skip: false,
                    show: true,
                },
                {
                    id: 'BALBF',
                    Header: nextProps.language.cashstatement.header.beginningbalance,
                    accessor: 'BALBF',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'CREDITAMT',
                    Header: nextProps.language.cashstatement.header.creditamount,
                    accessor: 'CREDITAMT',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'DEBITAMT',
                    Header: nextProps.language.cashstatement.header.debitamount,
                    accessor: 'DEBITAMT',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'BALCF',
                    Header: nextProps.language.cashstatement.header.endingbalance,
                    accessor: 'BALCF',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
        })
    }


    render() {
        //console.log(this.props)
        this.buttonAction = [
            <Pagination
                pageIndex={this.state.pageIndex}
                totalRecord={this.props.data.mvTotalOrders}
                onPageChange={this.onPageChange.bind(this)}
                onNextPage={this.onNextPage.bind(this)}
                onPrevPage={this.onPrevPage.bind(this)}
                onReloadPage={this.onReloadPage.bind(this)}
            />,
        ]
        console.log('render in CashStatement', this.props.data)
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        var page = this.props.data.mvPage === undefined ? [] : this.props.data.mvPage
        let lgClose = () => this.setState({ lgShow: false })

        console.log('dasdsaddsaad', this.props.modifyData)
        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={e => e.stopPropagation()}>
                <div className="component-main">
                    <DataUpperTable
                        id="cashstatement-table"

                        columns={this.state.columns}
                        data={data}
                        defaultPageSize={16} />
                </div>
                <div className="component-body">
                    <SearchBar
                        windowid="cashstatement"
                        stockList={this.props.stockList}
                        theme={this.props.theme}
                        buttonAction={this.buttonAction}
                        onSearch={this.onSearch.bind(this)}
                        language={this.props.language.searchbar}
                        columns={this.state.columns}
                        onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                        param={['mvStartDate', 'mvEndDate', 'dropdown']} />

                    <Popup
                        id={this.id}
                        show={this.state.lgShow} onHide={lgClose}
                        rowSelected={this.rowSelected} language={this.props.language}
                        popupType={this.popupType} />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.onSearch(this.params)
    }


    onPageChange(pageIndex) {
        if (pageIndex > 0) {
            this.state.pageIndex = pageIndex
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onNextPage() {
        if (this.state.pageIndex > 0) {
            this.state.pageIndex = parseInt(this.state.pageIndex) + 1
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onPrevPage() {
        if (this.state.pageIndex > 1) {
            this.state.pageIndex = parseInt(this.state.pageIndex) - 1
            this.params['page'] = this.state.pageIndex
            this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
            this.props.onSearch(this.params, !this.props.reload)
        }
    }

    onReloadPage() {
        this.props.onSearch(this.params, !this.props.reload)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });

        //console.log(this.state.columns)
    }
    onSearch(param) {
        this.params['mvStartDate'] = param['mvStartDate']
        this.params['mvEndDate'] = param['mvEndDate']
        this.props.onSearch(this.params, !this.props.reload)
    }


}
const mapStateToProps = (state) => {
    return {
        data: state.cashstatement.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (params) => {
        dispatch(actions.enquiryCashStatement(params))
    },
})



export default connect(mapStateToProps, mapDispatchToProps)(CashStatement)
