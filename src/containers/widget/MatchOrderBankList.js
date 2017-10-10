import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import config from '../../core/config'
/*
Khi tick vào 1 record thì dựa vài giá trị ở bên AdvanceBankPanel để tính phí
Khi bên AdvanceBankPanel chọn combobox ngân hàng thì bên này query láy data hiển thị

*/

class MatchOrderBankList extends Component {
    constructor(props) {
        super(props)
        this.id = 'matchOrderBankList'
        this.defaultPageSize = 15
        this.lang = config.cache.lang

        this.accessor = [
            'mvContractID',
            'mvOrderID',
            'cashSettleDay',
            'tradeDate',
            'mvStockID',
            'mvPrice',
            'mvQuantity',
            'mvFormatedAmount',
            'mvSettleDay'
        ]

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
                    accessor: this.accessor[0],
                    id: 'contractid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.orderid,
                    accessor: this.accessor[1],
                    id: 'orderid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.settlementdate,
                    accessor: this.accessor[2],
                    id: 'settlementdate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.tradedate,
                    accessor: this.accessor[3],
                    id: 'tradedate',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.stockid,
                    accessor: this.accessor[4],
                    id: 'stockid',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.price,
                    accessor: this.accessor[5],
                    id: 'price',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.quantity,
                    accessor: this.accessor[6],
                    id: 'quantity',
                    show: true,
                    skip: false,
                },
                {
                    Header: this.props.language.cashadvancebank.header.value,
                    accessor: this.accessor[7],
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.mvFormatedAmount, ",", this.lang)
                    },
                    id: 'value',
                    show: true,
                    skip: false,
                }
            ],
        }

        this.rowSelected = []
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
                                (this.state.matchOrderBankListPageIndex - 1) * this.defaultPageSize,
                                this.state.matchOrderBankListPageIndex * this.defaultPageSize)}
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
                        Header: props => {
                            return <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" 
                                onChange={() => this.onRowSelected('ALL')} />
                        },
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
                        accessor: this.accessor[0],
                        id: 'contractid',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: this.props.language.cashadvancebank.header.orderid,
                        accessor: this.accessor[1],
                        id: 'orderid',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: this.props.language.cashadvancebank.header.settlementdate,
                        accessor: this.accessor[2],
                        Cell: props => {
                            return Utils.formatDate(props.original.cashSettleDay, "ddmmyyyy")
                        },
                        id: 'settlementdate',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: this.props.language.cashadvancebank.header.tradedate,
                        accessor: this.accessor[3],
                        Cell: props => {
                            return Utils.formatDate(props.original.tradeDate, "ddmmyyyy")
                        },
                        id: 'tradedate',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: this.props.language.cashadvancebank.header.stockid,
                        accessor: this.accessor[4],
                        id: 'stockid',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: this.props.language.cashadvancebank.header.price,
                        accessor: this.accessor[5],
                        id: 'price',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: this.props.language.cashadvancebank.header.quantity,
                        accessor: this.accessor[6],
                        id: 'quantity',
                        show: true,
                        skip: false,
                    },
                    {
                        Header: this.props.language.cashadvancebank.header.value,
                        accessor: this.accessor[7],
                        Cell: props => {
                            return Utils.currencyShowFormatter(props.original.mvFormatedAmount, ",", this.lang)
                        },
                        id: 'value',
                        show: true,
                        skip: false,
                    }
                ]
            })
        }

        this.rowSelected = nextProps.rowSelected
        document.getElementById(this.id + "-cb-all").checked = nextProps.selectAll
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
            var tmp = this.rowSelected.filter(el => el.mvOrderID === param.mvOrderID)

            if(tmp.length > 0){
                // exist in row selected
                this.rowSelected = this.rowSelected.filter(el => el.mvOrderID !== param.mvOrderID)
            } else{
                this.rowSelected.push(param)
            }

            if (document.getElementsByClassName(this.id + '-row-checkbox').length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all").checked = true
            else
                document.getElementById(this.id + "-cb-all").checked = false
        }
        
        this.props.onPaymentChange(this.rowSelected, document.getElementById(this.id + "-cb-all").checked )
        
    }

}
const mapStateToProps = (state) => {
    return {
        queryAdvancePaymentInfo: state.cashadvancebank.queryAdvancePaymentInfo,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchOrderBankList)
