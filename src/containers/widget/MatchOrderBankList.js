import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import config from '../../core/config'
/*
Khi tick vào 1 record thì dựa vài giá trị ở bên AdvanceBankPanel để tính phí
Khi bên AdvanceBankPanel chọn combobox ngân hàng thì bên này query láy data hiển thị

*/

class MatchOrderBankList extends Component {
    constructor(props) {
        super(props)
        this.id = 'matchOrderBankList'
        this.idParent = 'cashadvancebank'
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
                    // Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox" onChange={() => this.onRowSelected('ALL')} />,
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
                    accessor: this.accessor[0],
                    id: 'contractid',
                    show: true,
                    skip: false,
                },
                {
                    accessor: this.accessor[1],
                    id: 'orderid',
                    show: true,
                    skip: false,
                },
                {
                    accessor: this.accessor[2],
                    id: 'settlementdate',
                    show: true,
                    skip: false,
                },
                {
                    accessor: this.accessor[3],
                    id: 'tradedate',
                    show: true,
                    skip: false,
                },
                {
                    accessor: this.accessor[4],
                    id: 'stockid',
                    show: true,
                    skip: false,
                },
                {
                    accessor: this.accessor[5],
                    id: 'price',
                    show: true,
                    skip: false,
                },
                {
                    accessor: this.accessor[6],
                    id: 'quantity',
                    show: true,
                    skip: false,
                },
                {
                    accessor: this.accessor[7],
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.mvFormatedAmount, ",", this.lang)
                    },
                    id: 'value',
                    show: true,
                    skip: false,
                }
            ],
            filterable: false
        }

        this.rowSelected = []
    }


    render() {
        let queryAdvancePaymentInfo = this.props.queryAdvancePaymentInfo
        let data = queryAdvancePaymentInfo.mvChildBeanList.slice((this.state.matchOrderBankListPageIndex - 1) * this.defaultPageSize,
            this.state.matchOrderBankListPageIndex * this.defaultPageSize)

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table
                        theme={this.props.theme}
                        key={this.id}
                        id={this.id}
                        idParent={this.idParent}
                        language={this.props.language}

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        tableData={data}
                        onRowSelected={(param) => this.onRowSelected(param)}

                        pageIndex={this.state.matchOrderBankListPageIndex}
                        totalPage={Math.ceil(queryAdvancePaymentInfo.mvChildBeanList.length / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        searchEnable={data.length > 0}
                    />
                </Body>
            </div>
        )

    }

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({

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
        } else {
            var tmp = this.rowSelected.filter(el => el.mvOrderID === param.mvOrderID)

            if (tmp.length > 0) {
                // exist in row selected
                this.rowSelected = this.rowSelected.filter(el => el.mvOrderID !== param.mvOrderID)
            } else {
                this.rowSelected.push(param)
            }

            if (document.getElementsByClassName(this.id + '-row-checkbox').length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all").checked = true
            else
                document.getElementById(this.id + "-cb-all").checked = false
        }
        this.props.onPaymentChange(this.rowSelected, document.getElementById(this.id + "-cb-all").checked)
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
