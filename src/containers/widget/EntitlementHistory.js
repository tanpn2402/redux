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

class EntitlementHistory extends Component {
    constructor(props) {
        super(props)

        this.id = 'entitlementHistory'

        this.state = {
            pageIndex: 1,
            columns: [
                {
                    id: 'createTime',
                    Header: this.props.language.entitlement.header.registerdate,
                    accessor: 'createTime',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'tradeStockCode',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'tradeStockCode',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'resultQty',
                    Header: this.props.language.entitlement.header.volume,
                    accessor: 'resultQty',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.entitlement.header.actionprice,
                    accessor: 'price',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'appliedAmt',
                    Header: this.props.language.entitlement.header.amount,
                    accessor: 'appliedAmt',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'comfirmedDate',
                    Header: this.props.language.entitlement.header.paiddate,
                    width: 100,
                    accessor: 'comfirmedDate',
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: this.props.language.entitlement.header.status,
                    Cell: props => { return this.getEntitlementStatus(this.props.language, props.original.status) },
                    width: 200,
                    skip: false,
                    show: true,
            }]
        }
        this.defaultPageSize = 15
        this.params = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ENTITLEMENT',
            mvStockId: '',
            mvStartDate: moment(new Date()).format("DD/MM/YYYY"),
            mvEndDate: moment(new Date()).format("DD/MM/YYYY"),
            key: (new Date()).getTime(),
            start: '0',
            limit: this.defaultPageSize,
        }
    }


    render() {
        var entitlementHistory = this.props.entitlementHistory
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main">
                        <Table
                            key={this.id}
                            id={this.id}
                            columns={this.state.columns}
                            defaultPageSize={this.defaultPageSize}
                            data={[]}/>
                    </div>
                    <div className="table-header">
                        <SearchBar
                            key={this.id+ '-search'}
                            id={this.id+ '-search'}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{columns:[], stockList: []}}
                            param={[ 'mvStockId', 'mvStartDate', 'mvEndDate']}/>
                    </div>
                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(entitlementHistory.totalCount / this.defaultPageSize)}
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
        this.props.getHistorylist(this.params)
    }

    onChangeStateColumn(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }
    onNextPage(){
        this.state.pageIndex1 = parseInt(this.state.pageIndex1) + 1
        this.paramsright['page'] = this.state.pageIndex1
        this.paramsright['start'] = (this.state.pageIndex1 - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onPrevPage(){
        this.state.pageIndex1 = parseInt(this.state.pageIndex1) - 1
        this.paramsright['page'] = this.state.pageIndex1
        this.paramsright['start'] = (this.state.pageIndex1 - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onReloadPage(){
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onPageChange(pageIndex) {
        this.state.pageIndex1 = parseInt(pageIndex)
        this.paramsright['page'] = this.state.pageIndex1
        this.paramsright['start'] = (this.state.pageIndex1 - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()
        
    }

}
const mapStateToProps = (state) => {
    return {
        entitlementHistory: state.entitlement.entitlementHistory,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getHistorylist: (params) => {
        dispatch(actions.getEntitlementHistorylist(params))
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitlementHistory)
