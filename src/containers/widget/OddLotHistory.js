import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'

class OddLotHistory extends Component {
    constructor(props) {
        super(props)

        this.id = 'oddlotHistory'
        this.idParent = 'oddlottrading'
        this.state = {
            oddLotTransPageIndex: 1,
            columns: [

                {
                    id: 'stockid',
                    accessor: 'instrumentId',
                    width: 60,
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'oddlotquantityH',
                    accessor: 'appliedQty',
                    width: 120,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },
                {
                    id: 'exeprice',
                    accessor: 'price',
                    Cell: props => {
                        if (props.aggregated) {
            
                        } else {
                            var value=props.original.price.trim()
                            if(!isNaN(value) && value.toString().indexOf('.') != -1)
                                return value;
                            else
                            return 0;          
                        }
                    },
                    width: 120,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },
                {
                    id: 'fee',
                    Header: this.props.language.oddlottrading.header.tax,
                    accessor: 'fee',
                    width: 120,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },

                {
                    id: 'value',
                    accessor: 'settleAmt',
                    width: 120,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
                },
                {
                    id: 'status',
                    accessor: 'status',
                    width: 120,
                    Cell: props => {
                        if (props.aggregated) {
            
                        } else {
                            var value=props.original.status.trim()
                            let text = this.props.language.oddlotHistory.status[value]
                            return (
                                Utils.statusRenderer(text,value)
                            )
                        }
                    },
                    skip: false,
                    show: true,
                    background: props.theme.table.colText
                },
                {
                    id: 'transdate',
                    accessor: 'createTime',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'approvedate',
                    accessor: 'valueDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
            filterable: false
        }
        this.defaultPageSize = 15
        this.paramsOddLotHisEnquiry = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ODDLOT',
            key: (new Date()).getTime(),
            start: '0',
            page: 1,
            limit: this.defaultPageSize,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({

        })
    }

    render() {
        let oddlothistory = this.props.oddlothistory

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeOddLotTransStateColumn.bind(this)}
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
                        tableData={oddlothistory.historyList}

                        pageIndex={this.state.oddLotTransPageIndex}
                        totalPage={Math.ceil(oddlothistory.totalCount / this.defaultPageSize)}
                        onPageChange={this.onOddLotTransPageChange.bind(this)}

                        searchEnable={oddlothistory.historyList.length > 0}
                        searchMobileParams={[]}
                        searchDefaultValues={{}}
                        searchEnable={false}

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
        this.props.oddLotHisEnquiry(this.paramsOddLotHisEnquiry, !this.props.reload);
    }

    onOddLotTransPageChange(pageIndex) {
        this.state.oddLotTransPageIndex = pageIndex
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.oddLotHisEnquiry(this.paramsOddLotHisEnquiry)
    }

    onChangeOddLotTransStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

}
const mapStateToProps = (state) => {
    return {
        oddlothistory: state.oddlottrading.oddlothistory,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    oddLotHisEnquiry: (param) => {
        dispatch(actions.getOddlotHistory(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(OddLotHistory)
