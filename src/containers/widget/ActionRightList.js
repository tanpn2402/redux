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

class ActionRightList extends Component {
    constructor(props) {
        super(props)

        this.id = 'actionRightList'
        this.defaultPageSize = 15
        this.pageIndex = 1
        this.state = {
            columns: [
                {
                    id: 'stockId',
                    Header: this.props.language.entitlement.header.stock,
                    accessor: 'stockId',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'issueType',
                    Header: this.props.language.entitlement.header.actiontype,
                    Cell: props => { return this.getRightType(this.props.language, props.original.issueType) },
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bookCloseDate',
                    Header: this.props.language.entitlement.header.recorddate,
                    accessor: 'bookCloseDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'totalBonusRight',
                    Header: this.props.language.entitlement.header.owningvolume,
                    accessor: 'totalBonusRight',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'ratecash',
                    Header: this.props.language.entitlement.header.ratecash,
                    Cell: props => {
                        return this.redererToCash(props.original)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'stockRate',
                    Header: this.props.language.entitlement.header.rate,
                    accessor: 'stockRate',
                    width:100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.entitlement.header.pervalue,
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.price, ",", this.lang)
                    },
                    width:100,
                    skip: false,
                    show: true,
                },
                {   // SL CK
                    id: 'totalScript',
                    Header: this.props.language.entitlement.header.recievecash,
                    accessor: 'totalScript',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.totalScript, ",", this.lang)
                    },
                    width:100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'totalIssue',
                    Header: this.props.language.entitlement.header.receivedstock,
                    accessor: 'totalIssue',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'status',
                    Header: this.props.language.entitlement.header.status,
                    Cell: props => { return this.getRightStatus(this.props.language, props.original.status) },
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'payableDate',
                    Header: this.props.language.entitlement.header.payabledate,
                    accessor: 'payableDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'paidDate',
                    Header: this.props.language.entitlement.header.paiddate,
                    accessor: 'paidDate',
                    width: 200,
                    skip: false,
                    show: true,
            }]
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

        this.actionTypeStore= [
            {text: 'ALL',        value: 'ALL'},
            {text: this.props.language.entitlement.issueType.ISSUE_1,    value: '1'},
            {text: this.props.language.entitlement.issueType.ISSUE_I,    value: 'I'},
            {text: this.props.language.entitlement.issueType.ISSUE_B,    value: 'B'},
            {text: this.props.language.entitlement.issueType.ISSUE_D,    value: 'D'},            
        ]
    }

    getEntitlementStatus(language, status) {
        let stt = language.entitlement.status['STATUS_' + status.toUpperCase()]
        return stt === undefined ? status.toUpperCase() : stt
    }

    getRightType(language, type) {
        let t = language.entitlement.issueType['ISSUE_' + type]
        return t === undefined ? type: t
    }
    
    getRightStatus(language, status) {
        let stt = language.entitlement.rightStatus['STATUS_' + status]
        return stt === undefined ? status: stt
    }
    
    redererToCash (original) {
        console.log(original)
        if (original.cashRate !== null && original.cashRate.length > 0) {
            var value = (original.issueRatioDelivery / original.issueRatioPer);
            return Utils.currencyShowFormatter(value, ",", this.lang);          
        }else{
            return ''
        }
    }


    render() {
        var allRightList = this.props.allRightList
        console.log(allRightList)
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
                            data={allRightList.rightList}/>
                    </div>
                    <div className="table-header">
                        <SearchBar
                            key={this.id+ '-search'}
                            id={this.id+ '-search'}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{stockList: [] , actionType: this.actionTypeStore}}
                            param={['mvActionType', 'mvStockId', 'mvStartDate', 'mvEndDate', 'dropdown']}/>
                    </div>
                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(allRightList.totalCount / this.defaultPageSize)}
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
        this.props.getRightlist(this.paramsright)
    }

    onChangeStateColumn(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }
    onNextPage(){
        this.state.pageIndex = parseInt(this.state.pageIndex) + 1
        this.paramsright['page'] = this.state.pageIndex
        this.paramsright['start'] = (this.state.pageIndex - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onPrevPage(){
        this.state.pageIndex = parseInt(this.state.pageIndex) - 1
        this.paramsright['page'] = this.state.pageIndex
        this.paramsright['start'] = (this.state.pageIndex - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onReloadPage(){
        this.paramsright['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsright)
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = parseInt(pageIndex)
        this.paramsright['page'] = this.state.pageIndex
        this.paramsright['start'] = (this.state.pageIndex - 1) * this.paramsright['limit']
        this.paramsright['key'] = (new Date()).getTime()

        this.props.getRightlist(this.paramsright)
        
    }

    onSearch(param){
        this.state.pageIndex = 1
        this.paramsright['start']= 0
        this.paramsright['page']= 1        
        this.paramsright['mvActionType']= param['mvActionType']
        this.paramsright['mvStockId'] = param['mvStockId']
        this.paramsright['mvStartDate'] = param['mvStartDate']
        this.paramsright['mvEndDate'] = param['mvEndDate']
        this.paramsright['key']= new Date().getTime()

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