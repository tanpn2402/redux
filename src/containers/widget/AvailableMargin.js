import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import { Button } from 'react-bootstrap'
import config from '../../core/config'
import moment from 'moment'

class AvaibleMarginList extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.defaultPageSize = 15
        this.id = 'available'
        this.idParent = 'avaiblemarginlist'
        this.state = {
            columns: [
                {
                    id: 'No',
                    accessor: 'mvRowNum',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'Stockcode',
                    accessor: 'mvInstrumentID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'Fullname',
                    accessor: 'mvInstrumentName',
                    width: 230,
                    skip: false,
                    show: true,
                },
                {
                    id: 'Exchange',
                    accessor: 'mvMarketID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'psentlending',
                    accessor: 'mvLendPercent',
                    width: 80,
                    skip: false,
                    show: true,
                },
            ],
            filterable: true,
            pageIndex: 1,
        }

        this.params = {
            mvLastAction: 'AVAIABLEMARGINLIST',
            mvInstrumentID: '',
            mvMarketID: 'ALL',
            mvLending: '',
            page: 1,
            start: 0,
            limit: this.defaultPageSize,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            
        });

    }

    render() {

        let data = this.props.data

        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title filterable={this.state.filterable} id={this.id} language={this.props.language} widgetID={'available'}
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

                        pageSize={this.defaultPageSize}
                        columns={this.state.columns}
                        filterable={this.state.filterable}
                        tableData={data.list}

                        pageIndex={this.state.pageIndex}
                        totalPage={Math.ceil(data.totalCount / this.defaultPageSize)}
                        onPageChange={this.onPageChange.bind(this)}

                        onSearch={this.onSearch.bind(this)}
                        searchActions={[]}
                        searchParams={['mvStockId', 'mvMarket', 'mvLending']}
                        searchData={{stockList: this.stockList}}
                        searchEnable={data.list.length > 0}
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
        this.props.onSearch(this.params)
    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * 15
        this.params['limit'] = 15
        this.params['mvMarketID'] = param['mvMarket']
        this.params['mvInstrumentID'] = param['mvStockId'] === 'ALL' ? '' : param['mvStockId']
        this.params['mvLending'] = param['mvLending'] === 'ALL' ? '' : param['mvLending']

        this.props.onSearch(this.params)
    }

    onChangeStateColumn(e) {
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, { show: !el.show }) : el)
        });
    }

    onPageChange(pageIndex) {
        this.state.pageIndex = pageIndex
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.avaiblemarginlist.data,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (params) => {
        dispatch(actions.avaiblemarginlist(params))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AvaibleMarginList)