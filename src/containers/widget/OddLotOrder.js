import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'

class OddLotOrder extends Component {
    constructor(props) {
        super(props)

        this.id = 'oddLotOrder'
        this.idParent = 'oddlottrading'
        this.rowSelected = []
        this.state = {
            oddLotOrderPageIndex: 1,
            columns: [
                {
                    // Create a select-all checkbox
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
                    skip: true,
                    filterable: false,
                    mobile: false,
                },
                {
                    id: 'stockid',
                    accessor: 'stockCode',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'tradingquantity',
                    accessor: 'settledBal',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'oddlotquantity',
                    accessor: 'oddLotQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'currentprice',
                    accessor: 'nominalPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'exeprice',
                    accessor: 'collectionPrice',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
            filterable: true
        }
        this.defaultPageSize = 15
        this.paramsEnquiryOddLot = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ODDLOTENQUIRY'
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({

        })
    }


    render() {
        let oddLotOrder = this.props.oddlotenquiry
        let buttonActionOddLotOrder = [
            <button style={this.props.theme.searchbar.default.button} className="hks-btn" type="button"
                onClick={this.registerOddLotOrder.bind(this)}>
                {this.props.language.oddlottrading.header.register}
            </button>
        ]
        let data = oddLotOrder.oddLotList.slice((this.state.oddLotOrderPageIndex - 1) * this.defaultPageSize,
            this.state.oddLotOrderPageIndex * this.defaultPageSize)

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeOddLotOrderStateColumn.bind(this)}
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

                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        pageSize={this.defaultPageSize}
                        tableData={data}
                        onRowSelected={(param) => this.onRowSelected(param)}

                        pageIndex={this.state.oddLotOrderPageIndex}
                        totalPage={Math.ceil(oddLotOrder.oddLotList.length / this.defaultPageSize)}
                        onPageChange={this.onOddLotOrderPageChange.bind(this)}

                        searchParams={[]}
                        searchActions={buttonActionOddLotOrder}
                        searchData={{ stockList: [] }}

                        searchMobileParams={[]}
                        searchDefaultValues={{}}

                        // onSearch={() => {}}
                        searchEnable={true}
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
        this.props.oddLotEnquiry(this.paramsEnquiryOddLot, !this.props.reload);
    }

    onOddLotOrderPageChange(pageIndex) {
        this.setState({ oddLotOrderPageIndex: pageIndex })
    }



    onChangeOddLotOrderStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById(this.id + '-cb-all')
                .checked
            var checkboxes = document.getElementsByClassName(this.id + '-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.oddlotenquiry.oddLotList !== undefined ? this.props.oddlotenquiry.oddLotList : []
            else
                this.rowSelected = []
        } else {
            var index = this.rowSelected.indexOf(param)
            if (index === -1) {
                this.rowSelected.push(param)
            } else {
                this.rowSelected.splice(index, 1)
            }

            if (document.getElementsByClassName(this.id + '-row-checkbox')
                .length === this.rowSelected.length)
                document.getElementById(this.id + "-cb-all")
                    .checked = true
            else
                document.getElementById(this.id + "-cb-all")
                    .checked = false
        }

    }

    registerOddLotOrder(e) {
        e.preventDefault();
        if (this.rowSelected.length > 0) {
            this.props.beforeRegisterOddLot({
                language: this.props.language,
                data: { rowSelected: this.rowSelected, me: this }
            })
        }
        else {
            this.props.onShowMessageBox(this.props.language.messagebox.title.error, this.props.language.messagebox.message.selectStock)
        }
    }

    reloadData() {
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.props.onshowenquiry(this.paramsEnquiryOddLot)
        this.props.onshowhistory(this.paramsOddLotHisEnquiry)
    }

}
const mapStateToProps = (state) => {
    return {
        oddlotenquiry: state.oddlottrading.oddlotenquiry,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    oddLotEnquiry: (param) => {
        dispatch(actions.getOddlotEnquiry(param))
    },
    onShowMessageBox: (type, message) => {
        dispatch(actions.showMessageBox(type, message))
    },
    beforeRegisterOddLot: (params) => {
        dispatch(actions.beforeRegisterOddLot(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OddLotOrder)
