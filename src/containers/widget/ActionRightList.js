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

class ActionRightList extends Component {
    constructor(props) {
        super(props)

        this.id = 'actionRightList'
        this.idParent = 'entitlement'
        this.stockList = config.cache.stockList
        this.defaultPageSize = 15
        this.pageIndex = 1
        this.state = {
            columns: [
                {
                    id: 'stock',
                    accessor: 'stockId',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'actiontype',
                    Cell: props => { return this.getRightType(this.props.language, props.original.issueType) },
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'recorddate',
                    Header: this.props.language.entitlement.header.recorddate,
                    accessor: 'bookCloseDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'owningvolume',
                    accessor: 'totalBonusRight',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'ratecash',
                    Cell: props => {
                        return this.redererToCash(props.original)
                    },
                    width: 150,
                    skip: false,
                    show: true,
                },
                {
                    id: 'rate',
                    accessor: 'stockRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'pervalue',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.price, ",", this.lang)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {   // SL CK
                    id: 'recievecash',
                    accessor: 'totalScript',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.totalScript, ",", this.lang)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'receivedstock',
                    accessor: 'totalIssue',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Cell: props => { return this.getRightStatus(this.props.language, props.original.status) },
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'payabledate',
                    accessor: 'payableDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'paiddate',
                    accessor: 'paidDate',
                    width: 200,
                    skip: false,
                    show: true,
                }],
            filterable: false
        }

        this.paramsright = {
            mvActionType: '',
            mvStockId: '',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            key: (new Date()).getTime(),
            start: '0',
            limit: this.defaultPageSize,
        }

        this.actionTypeStore = [
            { text: 'ALL', value: 'ALL' },
            { text: this.props.language.entitlement.issueType.ISSUE_1, value: '1' },
            { text: this.props.language.entitlement.issueType.ISSUE_I, value: 'I' },
            { text: this.props.language.entitlement.issueType.ISSUE_B, value: 'B' },
            { text: this.props.language.entitlement.issueType.ISSUE_D, value: 'D' },
        ]
    }

    getEntitlementStatus(language, status) {
        let stt = language.entitlement.status['STATUS_' + status.toUpperCase()]
        return stt === undefined ? status.toUpperCase() : stt
    }

    getRightType(language, type) {
        let t = language.entitlement.issueType['ISSUE_' + type]
        return t === undefined ? type : t
    }

    getRightStatus(language, status) {
        let stt = language.entitlement.rightStatus['STATUS_' + status]
        return stt === undefined ? status : stt
    }

    redererToCash(original) {
        if (original.cashRate !== null && original.cashRate.length > 0) {
            var value = (original.issueRatioDelivery / original.issueRatioPer);
            return Utils.currencyShowFormatter(value, ",", this.lang);
        } else {
            return ''
        }
    }


    render() {
        let allRightList = this.props.allRightList

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language}
                    theme={this.props.theme} columns={this.state.columns}
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
                        tableData={allRightList.rightList}

                        pageIndex={this.state.pageIndex}
                        totalPage={Math.ceil(allRightList.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        onSearch={this.onSearch.bind(this)}
                        searchActions={[]}
                        searchData={{ stockList: this.stockList, actionType: this.actionTypeStore }}
                        searchParams={['mvActionType', 'mvStockId', 'mvStartDate', 'mvEndDate', 'dropdown']}
                        searchEnable={allRightList.rightList.length > 0}
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
        this.props.getRightlist(this.paramsright)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== undefined) {
            this.setState({

            })
        }
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = parseInt(pageIndex)
        this.paramsright['page'] = this.state.pageIndex
        this.paramsright['start'] = (this.state.pageIndex - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()

        this.props.getRightlist(this.paramsright)

    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.paramsright['start'] = 0
        this.paramsright['page'] = 1
        this.paramsright['mvActionType'] = param['mvActionType']
        this.paramsright['mvStockId'] = param['mvStockId']
        this.paramsright['mvStartDate'] = param['mvStartDate']
        this.paramsright['mvEndDate'] = param['mvEndDate']
        this.paramsright['key'] = new Date().getTime()

        this.props.getRightlist(this.paramsright)
    }

}
const mapStateToProps = (state) => {
    return {
        allRightList: state.entitlement.allRightList,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getRightlist: (params) => {
        dispatch(actions.getRightlist(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionRightList)
