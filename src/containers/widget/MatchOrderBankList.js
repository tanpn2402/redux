import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
/*
Khi tick vào 1 record thì dựa vài giá trị ở bên AdvanceBankPanel để tính phí
Khi bên AdvanceBankPanel chọn combobox ngân hàng thì bên này query láy data hiển thị

*/

class MatchOrderBankList extends Component {
    constructor(props) {
        super(props)
        this.id = 'matchOrderBankList'
        this.defaultPageSize = 15


        this.MatchOrderBankListData = {
            cOrderIDArray: [],
            cContractIDArray: [],
            cTovalValue: 0,
            cAmount: 0,
            cMaxAmt: 0,
            cCurrencySymbol: "",
            cBankIDHF: "",
            cBankACIDHF: "",
            cTPLUSXHF: ""
        }

        this.state = {
            matchOrderBankListPageIndex: 1,
            columns: [
                {
                    id: 'cb',
                    Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        return (
                            <input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
                        )
                    },
                    sortable: false,
                    skip: true
                },
                {
                    Header: this.props.language.cashadvancebank.header.contractid,
                    accessor: 'contractid',
                    id: 'contractid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.orderid,
                    accessor: 'orderid',
                    id: 'orderid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.settlementdate,
                    accessor: 'settlementdate',
                    id: 'settlementdate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.tradedate,
                    accessor: 'tradedate',
                    id: 'tradedate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.stockid,
                    accessor: 'stockid',
                    id: 'stockid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.price,
                    accessor: 'price',
                    id: 'price',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.quantity,
                    accessor: 'quantity',
                    id: 'quantity',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.value,
                    accessor: 'value',
                    id: 'value',
                    show: true,
                    skip: false,
                }
            ],
        }
    }


    render() {
        var queryAdvancePaymentInfo = this.props.queryAdvancePaymentInfo
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header">
                        <Table
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={queryAdvancePaymentInfo.mvChildBeanList.slice(
                                (this.state.matchOrderBankListPageIndex - 1) * this.defaultPageSize + 1,
                                this.state.matchOrderBankListPageIndex * this.defaultPageSize + 1)}
                        />
                    </div>

                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.matchOrderBankListPageIndex}
                            totalRecord={Math.ceil(queryAdvancePaymentInfo.mvChildBeanList.length / this.defaultPageSize)}
                            onPageChange={this.onPageChange.bind(this)}
                            onNextPage={this.onNextPage.bind(this)}
                            onPrevPage={this.onPrevPage.bind(this)}
                            onReloadPage={this.onReloadPage.bind(this)}
                        />
                    </div>

                </Body>
            </div>
        )

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({
                columns: [
                    {
                        id: 'cb',
                        Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
                        maxWidth: 50,
                        width: 40,
                        Cell: props => {
                            return (
                                <input type='checkbox' className={this.id + "-row-checkbox"}
                                    onChange={() => { this.onRowSelected(props.original) }} />
                            )
                        },
                        sortable: false,
                        skip: true
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.contractid,
                        accessor: 'contractid',
                        id: 'contractid',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.orderid,
                        accessor: 'orderid',
                        id: 'orderid',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.settlementdate,
                        accessor: 'settlementdate',
                        id: 'settlementdate',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.tradedate,
                        accessor: 'tradedate',
                        id: 'tradedate',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.stockid,
                        accessor: 'stockid',
                        id: 'stockid',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.price,
                        accessor: 'price',
                        id: 'price',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.quantity,
                        accessor: 'quantity',
                        id: 'quantity',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: nextProps.language.cashadvancebank.header.value,
                        accessor: 'value',
                        id: 'value',
                        show: true,
                        skip: false,
                    }
                ]
            })
        }
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage() {
        this.setState({ matchOrderBankListPageIndex: parseInt(this.state.matchOrderBankListPageIndex) + 1 });
    }

    onPrevPage() {
        this.setState({ matchOrderBankListPageIndex: parseInt(this.state.matchOrderBankListPageIndex) - 1 });

    }

    onReloadPage() {
    }

    onPageChange(pageIndex) {
        this.setState({ matchOrderBankListPageIndex: parseInt(pageIndex) });

    }
    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById(this.id + '-cb-all').checked
            var checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.queryAdvancePaymentInfo.mvChildBeanList
            else
                this.rowSelected = []
        }
        else {
            var index = this.rowSelected.indexOf(param)
            if (index === -1) {
                this.rowSelected.push(param)
            }
            else {
                this.rowSelected.splice(index, 1)
            }

            if (document.getElementsByClassName(this.id + '-row-checkbox').length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all").checked = true
            else
                document.getElementById(this.id + "-cb-all").checked = false
        }

        this.MatchOrderBankListData.cTovalValue = 0;
        this.MatchOrderBankListData.cOrderIDArray = new Array()
        this.MatchOrderBankListData.cContractIDArray = new Array()

        for (var i = 0; i < this.rowSelected.length; i++) {
            this.MatchOrderBankListData.cOrderIDArray[i] = this.rowSelected[i].mvOrderID
            this.MatchOrderBankListData.cContractIDArray[i] = this.rowSelected[i].mvContractID
            this.MatchOrderBankListData.cTovalValue += parseFloat(this.rowSelected[i].mvAvailableAmount)
            this.MatchOrderBankListData.cTPLUSXHF = this.rowSelected[i].mvSettleDay
        }

        // var txtAdvanceAvailable = document.getElementById('txtAdvanceAvailable')
        // var txtAdvancePayment = document.getElementById('txtAdvancePayment')
        // txtAdvanceAvailable.value = Utils.currencyShowFormatter(this.MatchOrderBankListData.cTovalValue, ",", 'vi-VN')
        // txtAdvancePayment.value = Utils.currencyShowFormatter(this.MatchOrderBankListData.cTovalValue, ",", 'vi-VN')

        // this.props.calculateInterest({
        //     advPayment: document.getElementById('txtAdvancePayment').value,
        //     language: this.props.language
        // })
    }

}
const mapStateToProps = (state) => {
    return {
        queryAdvancePaymentInfo: state.cashadvancebank.queryAdvancePaymentInfo,

    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getqueryAdvancePaymentInfo: (params) => {
        dispatch(actions.getqueryAdvancePaymentInfo(params))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(MatchOrderBankList)
