import React, { Component } from 'react';
import { Button} from 'react-bootstrap'
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
                    id: 'createTime',
                    Header: this.props.language.oddlottrading.header.transdate,
                    accessor: 'createTime',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'valueDate',
                    Header: this.props.language.oddlottrading.header.approvedate,
                    accessor: 'valueDate',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'instrumentId',
                    Header: this.props.language.oddlottrading.header.StockIDH,
                    accessor: 'instrumentId',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'appliedQty',
                    Header: this.props.language.oddlottrading.header.oddlotquantityH,
                    accessor: 'appliedQty',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.oddlottrading.header.exepriceH,
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
                    id: 'aaa',
                    Header: this.props.language.oddlottrading.header.fee,
                    accessor: '',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'settleAmt',
                    Header: this.props.language.oddlottrading.header.value,
                    accessor: 'settleAmt',
                    width: 120,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: this.props.language.oddlottrading.header.status,
                    accessor: 'status',
                    width: 120,
                    skip: false,
                    show: true,
                },
            ],
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


    render() {
        let oddlothistory = this.props.oddlothistory
            
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onChangeOddLotTransStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main no-header">
                        <Table
                            key={this.id}
                            id={this.id}
                            columns={this.state.columns}
                            defaultPageSize={this.defaultPageSize}
                            data={oddlothistory.historyList}/>
                    </div>
                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.oddLotTransPageIndex}
                            totalRecord={Math.ceil(oddlothistory.totalCount / this.defaultPageSize )}
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

    onOddLotTransNextPage(){
        this.state.oddLotTransPageIndex = parseInt(this.state.oddLotTransPageIndex) + 1
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.oddLotHisEnquiry(this.paramsOddLotHisEnquiry)
    }

    onOddLotTransPrevPage(){
        this.state.oddLotTransPageIndex = parseInt(this.state.oddLotTransPageIndex) - 1
        this.paramsOddLotHisEnquiry['start'] = (this.state.oddLotTransPageIndex - 1) * this.paramsOddLotHisEnquiry['limit']
        this.paramsOddLotHisEnquiry['key'] = (new Date()).getTime()
        this.paramsOddLotHisEnquiry['page'] = this.state.oddLotTransPageIndex
        this.props.oddLotHisEnquiry(this.paramsOddLotHisEnquiry)
    }

    onOddLotTransReloadPage(){
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
