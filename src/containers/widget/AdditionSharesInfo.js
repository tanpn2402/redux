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
            filterable: false,
            columns: [
                {
                    id: 'stock',
                    accessor: 'stockId',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'recorddate',
                    accessor: 'bookCloseDate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'owningvolume',
                    Header: this.props.language.entitlement.header.owningvolume,
                    accessor: 'totalBonusRight',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'rightrate',
                    accessor: 'rightRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'actionrate',
                    accessor: 'actionRate',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'availableqty',
                    accessor: 'maxQtyCanBuy',
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'actionprice',
                    accessor: 'price',
                    Cell: props => {
                        return Utils.currencyShowFormatter(props.original.price, ",", this.lang)
                    },
                    width: 100,
                    skip: false,
                    show: true,
                },
                {
                    id: 'startdate',
                    accessor: 'startDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'transferdeadline',
                    accessor: 'bookCloseDate',
                    width: 200,
                    skip: false,
                    show: true,
                },
                {
                    id: 'registerdeadline',
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
        let font2 = this.props.theme.font2 == undefined ? 'black' : this.props.theme.font2.color
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
                    <div className="table-main no-header" style={{ color: font2 }} >
                        <Table theme={this.props.theme}
                            key={this.id + "-table"}
                            id={this.id + "-table"}
                            columns={this.state.columns}
                            filterable={this.state.filterable}
                            defaultPageSize={this.defaultPageSize}
                            data={additionIssueShareInfo.additionList}
                            table={this.props.language.entitlement.header} 
                            language={this.props.language.entitlement.header}/>
                    </div>
                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
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

    onToggleFilter(value) {
        this.setState((prevState) => {
            return { filterable: !prevState.filterable }
        })
    }

    componentDidMount() {
        this.props.getAdditionalshareinfo(this.paramsAddition)
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
    onNextPage() {
        this.state.pageIndex = parseInt(this.state.pageIndex) + 1
        this.paramsAddition['page'] = this.state.pageIndex
        this.paramsAddition['start'] = (this.state.pageIndex - 1) * this.paramsAddition['limit']
        this.paramsAddition['key'] = (new Date()).getTime()

        this.props.getRightlist(this.paramsAddition)
    }

    onPrevPage() {
        this.state.pageIndex = parseInt(this.state.pageIndex) - 1
        this.paramsAddition['page'] = this.state.pageIndex
        this.paramsAddition['start'] = (this.state.pageIndex - 1) * this.paramsAddition['limit']
        this.paramsAddition['key'] = (new Date()).getTime()

        this.props.getRightlist(this.paramsAddition)
    }

    onReloadPage() {
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
