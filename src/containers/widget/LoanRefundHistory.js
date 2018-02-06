import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import moment from 'moment'
import config from '../../core/config'

class LoanTrans extends Component {
    constructor(props) {
        super(props)
        this.id = 'loanRefundHistory'
        this.idParent = 'loanrefund'
        this.defaultPageSize = 20

        this.loanRefundHistoryParams = {
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            key: (new Date()).getTime(),
            start: 0,
            limit: this.defaultPageSize,
            page: 1
        }

        this.accessor = [
            'tranID',
            'tradeDate',
            'refundAmt',
            'type',
            'status',
            'remark',
            'lastupdate'
        ]

        this.state = {
            loanRefundHistoryPageIndex: 1,
            columns: [
                {
                    id: 'loanID',
                    accessor: this.accessor[0],
                    width: 80,
                    show: true,
                    skip: false,
                }, {
                    id: 'trandate',
                    accessor: this.accessor[1],
                    width: 120,
                    show: true,
                    skip: false,
                }, {
                    id: 'refundamount',
                    accessor: this.accessor[2],
                    Cell: props => Utils.currencyShowFormatter(props.original.refundAmt, ",", this.lang),
                    width: 140,
                    show: true,
                    skip: false,
                    background: props.theme.number.col
                }, {
                    id: 'type',
                    accessor: this.accessor[3],
                    Cell: props => this.getType(props.original.type, this.props.language.loanrefund.status),
                    width: 130,
                    show: true,
                    skip: false,
                }, {
                    id: 'status',
                    accessor: this.accessor[4],
                    width: 140,
                    Cell: props => this.getStatus(props.original.status, this.props.language.loanrefund.status),
                    show: true,
                    skip: false,
                }, {
                    id: 'remark',
                    accessor: this.accessor[5],
                    Cell: props => this.getRemark(props.original.remark, this.props.language.loanrefund.remark),
                    width: 250,
                    show: true,
                    skip: false,
                }, {
                    id: 'lastupdate',
                    accessor: this.accessor[6],
                    Cell: props => Utils.formatDate(props.original.lastupdate, 'ddmmyyyy'),
                    width: 150,
                    show: true,
                    skip: false,
                },
            ],
            filterable: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({

        })
    }


    getStatus(v, language) {
        if (v) {
            return language['STATUS_' + v.toUpperCase()]
        } else {
            return language['STATUS_P']
        }
    }

    getType(v, language) {
        if (v) {
            return language['TYPE_' + v.toUpperCase()]
        } else {
            return language['TYPE_M']
        }
    }

    getRemark(v, language) {
        if (v != "For Margin Call") {
            return v
        } else {
            return language.formargincall
        }
    }


    render() {
        let loanRefundHistory = this.props.loanRefundHistory

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

                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        pageSize={this.defaultPageSize}
                        tableData={loanRefundHistory.loanrefundhistoryList}

                        pageIndex={this.state.loanRefundHistoryPageIndex}
                        totalPage={Math.ceil(loanRefundHistory.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        onSearch={this.onSearch.bind(this)}
                        searchActions={[]}
                        searchData={{ stockList: [] }}
                        searchParams={['mvStartDate', 'mvEndDate']}
                        searchEnable={loanRefundHistory.loanrefundhistoryList.length > 0}
                        searchMobileParams={[]}
                        searchDefaultValues={{}}
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
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }

    onSearch(param) {
        this.state.loanRefundHistoryPageIndex = 1
        this.loanRefundHistoryParams['start'] = 0
        this.loanRefundHistoryParams['page'] = 1

        this.loanRefundHistoryParams['mvStartDate'] = param['mvStartDate']
        this.loanRefundHistoryParams['mvEndDate'] = param['mvEndDate']
        this.loanRefundHistoryParams['key'] = (new Date()).getTime()
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }


    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onPageChange(pageIndex) {
        this.state.loanRefundHistoryPageIndex = parseInt(pageIndex)
        this.loanRefundHistoryParams['start'] = (this.state.loanRefundHistoryPageIndex - 1) * this.loanRefundHistoryParams['limit']
        this.loanRefundHistoryParams['key'] = (new Date()).getTime()
        this.loanRefundHistoryParams['page'] = this.state.loanRefundHistoryPageIndex
        this.props.getLoanRefundHistory(this.loanRefundHistoryParams)
    }

}
const mapStateToProps = (state) => {
    return {
        loanRefundHistory: state.loanrefund.loanRefundHistory
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getLoanRefundHistory: (params) => {
        dispatch(actions.getLoanRefundHistory(params))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(LoanTrans)
