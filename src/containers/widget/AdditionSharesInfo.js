import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'

class AdditionSharesInfo extends Component {
    constructor(props) {
        super(props)
        this.id = 'additionSharesInfo'
        this.idParent = 'entitlement'
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
                    background: props.theme.table.colText
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
                    background: props.theme.number.col
                },
                {
                    id: 'rightrate',
                    accessor: 'rightRate',
                    width: 100,
                    skip: false,
                    show: true,
                    background: props.theme.number.col
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
                    background: props.theme.number.col
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
        let additionIssueShareInfo = this.props.additionIssueShareInfo

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} theme={this.props.theme}
                    columns={this.state.columns}
                    widgetID= 'additionSharesInfo'
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    onToggleFilter={e => this.onToggleFilter(e)} >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <Table
                        theme={this.props.theme}
                        key={this.id + "-table"}
                        id={this.id}
                        idParent={this.idParent}
                        language={this.props.language}

                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        pageSize={this.defaultPageSize}
                        tableData={additionIssueShareInfo.additionList}

                        pageIndex={this.state.pageIndex}
                        totalPage={Math.ceil(additionIssueShareInfo.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        searchEnable={additionIssueShareInfo.additionList.length > 0}
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
