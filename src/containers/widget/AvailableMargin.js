import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SearchBar from '../commons/SearchBar'
import Table from '../commons/DataTable'
import * as Utils from '../../utils'
import Pagination from '../commons/Pagination'
import { Button } from 'react-bootstrap'
import config from '../../core/config'
import moment from 'moment'

class AvaibleMarginList extends Component {
    constructor(props) {
        super(props)
        this.stockList = config.cache.stockList
        this.defaultPageSize = 15
        this.id = 'available'
        this.state = {
            columns: [
                {
                    id: 'mvRowNum',
                    Header: this.props.language.avaiblemarginlist.header.No,
                    accessor: 'mvRowNum',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvInstrumentID',
                    Header: this.props.language.avaiblemarginlist.header.Stockcode,
                    accessor: 'mvInstrumentID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvInstrumentName',
                    Header: this.props.language.avaiblemarginlist.header.Fullname,
                    accessor: 'mvInstrumentName',
                    width: 230,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: this.props.language.avaiblemarginlist.header.Exchange,
                    accessor: 'mvMarketID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvLendPercent',
                    Header: this.props.language.avaiblemarginlist.header.psentlending,
                    accessor: 'mvLendPercent',
                    width: 80,
                    skip: false,
                    show: true,
                },
            ],

            pageIndex: 1,
        }

        this.params = {
            mvLastAction: 'AVAIABLEMARGINLIST',
            mvInstrumentID: '',
            mvMarketID: 'ALL',
            mvLending: '',
            page: 1,
            start: 0,
            limit: 15,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                {
                    id: 'mvRowNum',
                    Header: nextProps.language.avaiblemarginlist.header.No,
                    accessor: 'mvRowNum',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvInstrumentID',
                    Header: nextProps.language.avaiblemarginlist.header.Stockcode,
                    accessor: 'mvInstrumentID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvInstrumentName',
                    Header: nextProps.language.avaiblemarginlist.header.Fullname,
                    accessor: 'mvInstrumentName',
                    width: 230,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvMarketID',
                    Header: nextProps.language.avaiblemarginlist.header.Exchange,
                    accessor: 'mvMarketID',
                    width: 80,
                    skip: false,
                    show: true,
                },
                {
                    id: 'mvLendPercent',
                    Header: nextProps.language.avaiblemarginlist.header.psentlending,
                    accessor: 'mvLendPercent',
                    width: 80,
                    skip: false,
                    show: true,
                },
            ]
        });

    }

    render() {

        let data = this.props.data
        let tableheader = this.props.theme.table == undefined ? undefined : this.props.theme.table.tableheader
        let tablefooter = this.props.theme.table == undefined ? undefined : this.props.theme.table.tablefooter
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title widgetID={'available'} theme={this.props.theme} columns={this.state.columns} onChangeStateColumn={this.onChangeStateColumn.bind(this)}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <div className="table-main">
                        <Table
                            theme={this.props.theme}
                            key={this.id}
                            id={this.id}
                            defaultPageSize={this.defaultPageSize}
                            columns={this.state.columns}
                            data={data.list}
                        />
                    </div>

                    <div className="table-header" style={tableheader}>
                        <SearchBar
                            id={this.id}
                            onSearch={this.onSearch.bind(this)}
                            buttonAction={[]}
                            language={this.props.language.searchbar}
                            theme={this.props.theme}
                            data={{ stockList: this.stockList }}
                            param={['mvStockId', 'mvMarket', 'mvLending']} />
                    </div>

                    <div className="table-footer" style={tablefooter}>
                        <Pagination theme={this.props.theme}
                            pageIndex={this.state.pageIndex}
                            totalRecord={Math.ceil(data.totalCount / this.defaultPageSize)}
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
        this.props.onSearch(this.params)
    }

    onSearch(param) {
        this.state.pageIndex = 1
        this.params['page'] = this.pageIndex
        this.params['start'] = (this.pageIndex - 1) * 15
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

    onNextPage() {
        this.state.pageIndex = this.state.pageIndex + 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onPrevPage() {
        this.state.pageIndex = this.state.pageIndex - 1
        this.params['page'] = this.state.pageIndex
        this.params['start'] = (this.state.pageIndex - 1) * this.params['limit']
        this.params['key'] = (new Date()).getTime()
        this.props.onSearch(this.params)
    }

    onReloadPage() {
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