import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

class OddLotHistory extends Component {
    constructor(props) {
        super(props)

        this.id = 'oddlotHistory'

        this.state = {
            oddLotTransPageIndex: 1,
            columns: [
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
                {
                    id: 'stockid',
                    accessor: 'instrumentId',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'oddlotquantityH',
                    accessor: 'appliedQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'exepriceH',
                    accessor: 'price',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'fee',
                    Header: this.props.language.oddlottrading.header.tax,
                    accessor: 'fee',
                    width: 120,
                    skip: false,
                    show: true,
                },

                {
                    id: 'value',
                    accessor: 'settleAmt',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    accessor: 'status',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
            filterable: true
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
        let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeOddLotTransStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main no-header" style={{ color: font2 }}>
                        <Table theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            columns={this.state.columns}
                            filterable={this.state.filterable}
                            defaultPageSize={this.defaultPageSize}
                            data={oddlothistory.historyList} 
                            language={this.props.language.oddlottrading.header}/>
                    </div>
                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.state.oddLotTransPageIndex}
                            totalRecord={Math.ceil(oddlothistory.totalCount / this.defaultPageSize)}
                            onPageChange={this.onOddLotTransPageChange.bind(this)}
                            onNextPage={this.onOddLotTransNextPage.bind(this)}
                            onPrevPage={this.onOddLotTransPrevPage.bind(this)}
                            onReloadPage={this.onOddLotTransReloadPage.bind(this)}
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
        this.props.oddLotHisEnquiry(this.paramsOddLotHisEnquiry, !this.props.reload);
    }

    onOddLotTransPageChange(pageIndex) {
        this.state.oddLotTransPageIndex = pageIndex
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.oddLotHisEnquiry(this.paramsOddLotHisEnquiry)
    }

    onOddLotTransNextPage() {
        this.state.oddLotTransPageIndex = parseInt(this.state.oddLotTransPageIndex) + 1
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.oddLotHisEnquiry(this.paramsOddLotHisEnquiry)
    }

    onOddLotTransPrevPage() {
        this.state.oddLotTransPageIndex = parseInt(this.state.oddLotTransPageIndex) - 1
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.oddLotHisEnquiry(this.paramsOddLotHisEnquiry)
    }

    onOddLotTransReloadPage() {
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
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
