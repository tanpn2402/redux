import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Footer from '../DataTableFooter'

class AvaibleMarginList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns : [
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

        this.id = 'avaiblemarginlist'
        this.pageIndex = 1

        this.params = {
            mvLastAction:'AVAIABLEMARGINLIST',
            mvInstrumentID: '',
            mvMarketID: 'ALL',
            mvLending:'',
            page: 1,
            start: 0,
            limit: 15,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            columns : [
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
        console.log('render in AvaibleMarginList', this.props.language.avaiblemarginlist.header.Stockcode)
        var data = this.props.data.list === undefined ? [] : this.props.data.list
        console.log(data);
        var page = this.props.data.mvPage === undefined ? [] : this.props.data.mvPage
        var totalRecord = this.props.data.totalCount === undefined ? 1 : this.props.data.totalCount

        return (
            <div id={this.id + '-body'} className="layout-body">
                <SearchBar
                    id={this.id}
                    onSearch={this.onSearch.bind(this)}
                    buttonAction={[]} 
                    stockList={this.props.stockList} 
                    language={this.props.language.searchbar} 
                    theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                    param={[ 'mvStockId', 'mvMarket', 'mvLending', 'dropdown']}/>

                <DataTable
                    id={this.id + "-table" }
                    columns={this.state.columns}
                    data={data}/>

                <Footer pageIndex={this.state.pageIndex} totalRecord={totalRecord} onPageChange={this.onPageChange.bind(this)}/>

            </div>
        )
    }

    componentDidMount() {
        this.props.onSearch(this.params)
    }

    onSearch(param){
        this.params['page'] = this.pageIndex
        this.params['start'] = ( this.pageIndex - 1 ) * 15
        this.params['limit'] = 15
        this.params['mvMarketID'] = param['mvMarket']
        this.params['mvInstrumentID'] = param['mvStockId'] === 'ALL' ? '': param['mvStockId']
        this.params['mvLending'] = param['mvLending'] === 'ALL' ? '': param['mvLending']
        console.log('param onSearch', param)
        console.log('params', this.params)

        this.setState({
            pageIndex: 1
        });

        this.props.onSearch(this.params, !this.props.reload)
    }

    onChangeStateColumn(e){
        console.log("on change Colum");
        const id = e.target.id
        this.setState({
            columns: this.state.columns.map(el => el.id === id ? Object.assign(el, {show: !el.show}) : el)
        });
    }

    onPageChange(pageIndex){
        console.log(this.id + ' onPageChange', pageIndex)
        this.params['page'] = pageIndex
        this.params['start'] = ( pageIndex - 1 ) * 15

        this.setState({
            pageIndex: pageIndex
        });
        // console.log('params', this.params)
        this.props.onSearch(this.params, !this.props.reload)
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