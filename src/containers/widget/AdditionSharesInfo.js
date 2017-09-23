import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'

class AdditionSharesInfo extends Component {
    constructor(props) {
        super(props)
        this.id = 'additionSharesInfo'
        this.state = {
            pageIndex: 1,
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
                    id: 'rightRate',
                    Header: this.props.language.entitlement.header.rightrate,
                    accessor: 'rightRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'actionRate',
                    Header: this.props.language.entitlement.header.actionrate,
                    accessor: 'actionRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'maxQtyCanBuy',
                    Header: this.props.language.entitlement.header.availableqty,
                    accessor: 'maxQtyCanBuy',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'price',
                    Header: this.props.language.entitlement.header.actionprice,
                    accessor: 'price',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.price, ",", this.lang)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'startDate',
                    Header: this.props.language.entitlement.header.startdate,
                    accessor: 'startDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'bookCloseDate1',
                    Header: this.props.language.entitlement.header.transferdeadline,
                    accessor: 'bookCloseDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transenddate',
                    Header: this.props.language.entitlement.header.registerdeadline,
                    accessor: 'transenddate',
                    width: 200,
                    skip: false,
                    show: true,
            }]
        }
        this.defaultPageSize = 15
        this.paramsAddition = {
            mvLastAction: 'OTHERSERVICES',
            mvChildLastAction: 'ENTITLEMENT',
            key: (new Date()).getTime(),
            start: '0',
            limit: '15',
        }
    }


    render() {
        var additionIssueShareInfo = this.props.additionIssueShareInfo
        return (
            <div style={{height: '100%', position: 'relative'}}>
                <Title columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div className="table-main">
                        <Table
                            key={this.id + "-table"}
                            id={this.id + "-table"}
                            columns={this.state.columns}
                            defaultPageSize={this.defaultPageSize}
                            data={additionIssueShareInfo.additionList}/>
                    </div>
                    <div className="table-header">
                        <SearchBar
                            key={this.id+ '-search'}
                            id={this.id+ '-search'}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{ stockList: []}}
                            param={[ 'mvStockId', 'mvStartDate', 'mvEndDate']}/>
                    </div>
                    <div className="table-footer">
                        <Pagination
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(additionIssueShareInfo.totalCount / this.defaultPageSize)}
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
        this.props.getAdditionalshareinfo(this.paramsAddition)
    }

    onChangeStateColumn(e){
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }
    onNextPage(){
        this.state.pageIndex = parseInt(this.state.pageIndex) + 1
        this.paramsAddition['page'] = this.state.pageIndex
        this.paramsAddition['start'] = (this.state.pageIndex - 1) * this.paramsAddition['limit']
        this.paramsAddition['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsAddition)
    }

    onPrevPage(){
        this.state.pageIndex = parseInt(this.state.pageIndex) - 1
        this.paramsAddition['page'] = this.state.pageIndex
        this.paramsAddition['start'] = (this.state.pageIndex - 1) * this.paramsAddition['limit']
        this.paramsAddition['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsAddition)
    }

    onReloadPage(){
        this.paramsAddition['key'] = (new Date()).getTime()
        
        this.props.getRightlist(this.paramsAddition)
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = parseInt(pageIndex)
        this.paramsAddition['page'] = this.state.pageIndex
        this.paramsAddition['start'] = (this.state.pageIndex - 1) * this.paramsAddition['limit']
        this.paramsAddition['key'] = (new Date()).getTime()
        
    }

}
const mapStateToProps = (state) => {
    return {
        additionIssueShareInfo: state.entitlement.additionIssueShareInfo,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    getAdditionalshareinfo: (params) => {
        dispatch(actions.getAdditionalshareinfo(params))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdditionSharesInfo)
