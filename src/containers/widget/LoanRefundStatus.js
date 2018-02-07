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
        this.id = 'loanRefundStatus'
        this.idParent = 'loanrefund'
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
            filterable: false,
            columns: [
                {
                    id: 'loanID',
                    accessor: 'tranID',
                    width: 80,
                    show: true,
                    skip: false,
                }, {
                    id: 'trandate',
                    accessor: 'tradeDate',
                    width: 120,
                    show: true,
                    skip: false,
                }, {
                    id: 'refundamount',
                    accessor: 'refundAmt',
                    width: 140,
                    show: true,
                    skip: false,
                    background: props.theme.number.col
                }, {
                    id: 'type',
                    accessor: 'type',
                    Cell: props => this.getType(props.original.type.this.props.language.loanrefund.type),
                    width: 130,
                    show: true,
                    skip: false,
                }, {
                    id: 'status',
                    accessor: 'status',
                    width: 140,
                    Cell: props => this.getStatus(props.original.status, this.props.language.loanrefund.status),
                    show: true,
                    skip: false,
                }, {
                    id: 'remark',
                    accessor: 'remark',
                    width: 250,
                    Cell: props => this.getRemark(props.original.remark, this.props.language.loanrefund.remark),
                    show: true,
                    skip: false,
                }, {
                    id: 'lastupdate',
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

            filterable: false
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
        let loanRefundStatus = this.props.loanRefundStatus

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    widgetID= 'loanRefundStatus'
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
                        tableData={loanRefundStatus.loanrefundList}

                        pageIndex={this.state.loanRefundStatusPageIndex}
                        totalPage={Math.ceil(loanRefundStatus.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        onSearch={this.onSearch.bind(this)}
                        searchActions={[]}
                        searchData={{stockList:[]}}
                        searchParams={['mvStartDate', 'mvEndDate']}
                        searchEnable={loanRefundStatus.loanrefundList.length > 0}
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
        this.props.getLoanRefundStatus(this.loanRefundStatusParams)
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
