import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import moment from 'moment'
import config from '../../core/config'

class LoanTrans extends Component {
    constructor(props) {
        super(props)
        this.id = 'loanRefundStatus'
        this.defaultPageSize = 15


        this.loanRefundStatusParams = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'LOANREFUND',
            key: (new Date()).getTime(),
            start: 0,
            limit: this.defaultPageSize,
            page: 1
        }

        this.state = {
            loanRefundStatusPageIndex: 1,
            columns: [
                {
                    id: 'loanID',
                    Header: this.props.language.loanrefund.header.loanID,
                    accessor: 'tranID',
                    width: 80,
                    show: true,
                    skip: false,
                }, {
                    id: 'tradeDate',
                    Header: this.props.language.loanrefund.header.trandate,
                    accessor: 'tradeDate',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'refundAmt',
                    Header: this.props.language.loanrefund.header.refundamount,
                    accessor: 'refundAmt',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'type',
                    Header: this.props.language.loanrefund.header.type,
                    accessor: 'type',
                    Cell: props => this.getType(props.original.type.this.props.language.loanrefund.type),
                    width: 130,
                    show: true,
                    skip: false,
                }, {
                    id: 'status',
                    Header: this.props.language.loanrefund.header.status,
                    accessor: 'status',
                    width: 100,
                    Cell: props => this.getStatus(props.original.status, this.props.language.loanrefund.status),
                    show: true,
                    skip: false,
                }, {
                    id: 'remark',
                    Header: this.props.language.loanrefund.header.remark,
                    accessor: 'remark',
                    width: 250,
                    Cell: props => this.getRemark(props.original.remark, this.props.language.loanrefund.remark),
                    show: true,
                    skip: false,
                }, {
                    id: 'lastupdate',
                    Header: this.props.language.loanrefund.header.lastupdate,
                    accessor: 'lastupdate',
                    Cell: props => Utils.formatDate(props.original.lastupdate, 'ddmmyyyy'),
                    width: 150,
                    show: true,
                    skip: false,
                },

            ]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    id: 'loanID',
                    Header: nextProps.language.loanrefund.header.loanID,
                    accessor: 'tranID',
                    width: 80,
                    show: true,
                    skip: false,
                }, {
                    id: 'tradeDate',
                    Header: nextProps.language.loanrefund.header.trandate,
                    accessor: 'tradeDate',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'refundAmt',
                    Header: nextProps.language.loanrefund.header.refundamount,
                    accessor: 'refundAmt',
                    width: 100,
                    show: true,
                    skip: false,
                }, {
                    id: 'type',
                    Header: nextProps.language.loanrefund.header.type,
                    accessor: 'type',
                    Cell: props => this.getType(props.original.type.nextProps.language.loanrefund.type),
                    width: 130,
                    show: true,
                    skip: false,
                }, {
                    id: 'status',
                    Header: nextProps.language.loanrefund.header.status,
                    accessor: 'status',
                    width: 100,
                    Cell: props => this.getStatus(props.original.status, nextProps.language.loanrefund.status),
                    show: true,
                    skip: false,
                }, {
                    id: 'remark',
                    Header: nextProps.language.loanrefund.header.remark,
                    accessor: 'remark',
                    width: 250,
                    Cell: props => this.getRemark(props.original.remark, nextProps.language.loanrefund.remark),
                    show: true,
                    skip: false,
                }, {
                    id: 'lastupdate',
                    Header: nextProps.language.loanrefund.header.lastupdate,
                    accessor: 'lastupdate',
                    Cell: props => Utils.formatDate(props.original.lastupdate, 'ddmmyyyy'),
                    width: 150,
                    show: true,
                    skip: false,
                },
            ],
            filterable: true
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
        var loanRefundStatus = this.props.loanRefundStatus
        let tableheader = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main">
                        <Table
                            theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            columns={this.state.columns}
                            filterable={this.state.filterable}
                            defaultPageSize={this.defaultPageSize}
                            data={loanRefundStatus.loanrefundList} />
                    </div>
                    <div className="table-header" style={tableheader}>
                        <SearchBar
                            key={this.id + '-search'}
                            id={this.id + '-search'}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{ stockList: [] }}
                            param={['mvStartDate', 'mvEndDate']} />
                    </div>
                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.state.loanRefundStatusPageIndex}
                            totalRecord={Math.ceil(loanRefundStatus.totalCount / this.defaultPageSize)}
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

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        this.props.getLoanRefundStatus(this.loanRefundDataParams)
    }

    onSearch(param) {
        this.state.loanRefundStatusPageIndex = 1
        this.loanRefundStatusParams['start'] = 0
        this.loanRefundStatusParams['page'] = 1

        this.loanRefundStatusParams['mvStartDate'] = param['mvStartDate']
        this.loanRefundStatusParams['mvEndDate'] = param['mvEndDate']
        this.loanRefundStatusParams['key'] = (new Date()).getTime()
        this.props.getLoanRefundStatus(this.loanRefundStatusParams)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onNextPage() {
        this.state.loanRefundStatusPageIndex = parseInt(this.state.loanRefundStatusPageIndex) + 1
        this.loanRefundStatusParams['start'] = (this.state.loanRefundStatusPageIndex - 1) * this.loanRefundStatusParams['limit']
        this.loanRefundStatusParams['key'] = (new Date()).getTime()
        this.loanRefundStatusParams['page'] = this.state.loanRefundStatusPageIndex
        this.props.getLoanRefundStatus(this.loanRefundStatusParams)
    }

    onPrevPage() {
        this.state.loanRefundStatusPageIndex = parseInt(this.state.loanRefundStatusPageIndex) - 1
        this.loanRefundStatusParams['start'] = (this.state.loanRefundStatusPageIndex - 1) * this.loanRefundStatusParams['limit']
        this.loanRefundStatusParams['key'] = (new Date()).getTime()
        this.loanRefundStatusParams['page'] = this.state.loanRefundStatusPageIndex
        this.props.getLoanRefundStatus(this.loanRefundStatusParams)
    }

    onReloadPage() {
        this.loanRefundStatusParams['key'] = (new Date()).getTime()
        this.props.getLoanRefundStatus(this.loanRefundStatusParams)
    }

    onPageChange(pageIndex) {
        this.state.loanRefundStatusPageIndex = parseInt(pageIndex)
        this.loanRefundStatusParams['start'] = (this.state.loanRefundStatusPageIndex - 1) * this.loanRefundStatusParams['limit']
        this.loanRefundStatusParams['key'] = (new Date()).getTime()
        this.loanRefundStatusParams['page'] = this.state.loanRefundStatusPageIndex
        this.props.getLoanRefundStatus(this.loanRefundStatusParams)
    }

}
const mapStateToProps = (state) => {
    return {
        loanRefundStatus: state.loanrefund.loanRefundData,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getLoanRefundStatus: (params) => {
        dispatch(actions.getLoanRefundData(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoanTrans)
