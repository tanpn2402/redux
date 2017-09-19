import React, { Component } from 'react';
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import SearchBar from '../commons/SearchBar'
import DataUpperTable from '../DataUpperTable'
import Pagination from '../commons/Pagination'
import {FormControl, Form, ControlLabel, FormGroup, Button} from 'react-bootstrap'

class WatchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    columns: [{
                        id: 'cb',
                        Header: props => <input id = {this.id + "-cb-all"} type = 'checkbox' className = "row-checkbox"
                                            onChange = { () => this.onRowSelected('ALL') }/>,
                        maxWidth: 50,
                        width: 40,
                        Cell: props => {
                            return ( <input type = 'checkbox' className = { this.id + "-row-checkbox" }
                                onChange = { () => { this.onRowSelected(props.original) } } />
                            )
                        },
                        sortable: false,
                        skip: true
                    }],
                    skip: true,
                    show: true
                },
                {
                    id: 'name',
                    Header: this.props.language.watchlist.header.name,
                    columns: [{
                        id: 'mvStockCode',
                        Header: this.props.language.watchlist.header.stock,
                        accessor: 'mvStockCode',
                        width: 60,
                        show: true,
                        skip: false
                    }, {
                        id: 'mvMarketID',
                        Header: this.props.language.watchlist.header.market,
                        accessor: 'mvMarketID',
                        width: 60,
                        show: true,
                        skip: false
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'reference',
                    Header: this.props.language.watchlist.header.reference,
                    columns: [{
                        id: 'mvCeilingPrice',
                        Header: this.props.language.watchlist.header.ce,
                        accessor: 'mvCeilingPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvFloorPrice',
                        Header: this.props.language.watchlist.header.fl,
                        accessor: 'mvFloorPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvReferencePrice',
                        Header: this.props.language.watchlist.header.ref,
                        accessor: 'mvReferencePrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'bestbid',
                    Header: this.props.language.watchlist.header.bestbid,
                    columns: [{
                            id: 'mvBestBid3Price',
                            Header: this.props.language.watchlist.header.pri3,
                            accessor: 'mvBestBid3Price',
                            width: 60,
                            skip: false,
                            show: true,
                        }, {
                            id: 'mvBestBid3Volume',
                            Header: this.props.language.watchlist.header.vol3,
                            accessor: 'mvBestBid3Volume',
                            width: 60,
                            skip: false,
                            show: true,
                        },
                        {
                            id: 'mvBestBid2Price',
                            Header: this.props.language.watchlist.header.pri2,
                            accessor: 'mvBestBid2Price',
                            width: 60,
                            skip: false,
                            show: true,
                        }, {
                            id: 'mvBestBid2Volume',
                            Header: this.props.language.watchlist.header.vol2,
                            accessor: 'mvBestBid2Volume',
                            width: 60,
                            skip: false,
                            show: true,
                        }, {
                            id: 'mvBestBid1Price',
                            Header: this.props.language.watchlist.header.pri1,
                            accessor: 'mvBestBid1Price',
                            width: 60,
                            skip: false,
                            show: true,
                        }, {
                            id: 'mvBestBid1Volume',
                            Header: this.props.language.watchlist.header.vol1,
                            accessor: 'mvBestBid1Volume',
                            width: 60,
                            skip: false,
                            show: true,
                        }
                    ],
                    skip: false,
                    show: true,
                },
                {
                    id: 'matching',
                    Header: this.props.language.watchlist.header.matching,
                    columns: [{
                        id: 'mvNominalPrice',
                        Header: this.props.language.watchlist.header.price,
                        accessor: 'mvNominalPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvNoalPriSubRefPri',
                        Header: this.props.language.watchlist.header.volume,
                        accessor: 'mvNoalPriSubRefPri',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvTotalTradingQty',
                        Header: '+/-',
                        accessor: 'mvTotalTradingQty',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'ce',
                        Header: '%',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'ce',
                        Header: this.props.language.watchlist.header.totalvol,
                        width: 60,
                        skip: false,
                        show: true,
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'bestask',
                    Header: this.props.language.watchlist.header.bestask,
                    columns: [{
                        id: 'mvBestOffer1Price',
                        Header: this.props.language.watchlist.header.pri1,
                        accessor: 'mvBestOffer1Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvBestOffer1Volume',
                        Header: this.props.language.watchlist.header.vol1,
                        accessor: 'mvBestOffer1Volume',
                        width: 60,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'mvBestOffer2Price',
                        Header: this.props.language.watchlist.header.pri2,
                        accessor: 'mvBestOffer2Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvBestOffer2Volume',
                        Header: this.props.language.watchlist.header.vol2,
                        accessor: 'mvBestOffer2Volume',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvBestOffer3Price',
                        Header: this.props.language.watchlist.header.pri3,
                        accessor: 'mvBestOffer3Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvBestOffer3Volume',
                        Header: this.props.language.watchlist.header.vol3,
                        accessor: 'mvBestOffer3Volume',
                        width: 60,
                        skip: false,
                        show: true,
                    }
                    ],
                    skip: false,
                    show: true,
                },
                {
                    id: 'pricehistory',
                    Header: this.props.language.watchlist.header.pricehistory,
                    columns: [{
                        id: 'mvOpenPrice',
                        Header: this.props.language.watchlist.header.open,
                        accessor: 'mvOpenPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvHighPrice',
                        Header: this.props.language.watchlist.header.high,
                        accessor: 'mvHighPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvLowPrice',
                        Header: this.props.language.watchlist.header.low,
                        accessor: 'mvLowPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'avgPrice',
                        Header: this.props.language.watchlist.header.avg,
                        accessor: 'avgPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'foreigninvestment',
                    Header: this.props.language.watchlist.header.foreigninvestment,
                    columns: [{
                        id: 'ce',
                        Header: this.props.language.watchlist.header.forbuy,
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'ce',
                        Header: this.props.language.watchlist.header.forsell,
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'ce',
                        Header: this.props.language.watchlist.header.room,
                        width: 60,
                        skip: false,
                        show: true,
                    }],
                    skip: false,
                    show: true,
                }
            ],
            showAlert: false,
            pageIndex: 1,
        }
        this.rowSelected = []
        this.id = 'watchlist'
        this.addRemoveParams= {
            mvTimelyUpdate: 'Y',
            mvAddOrRemove: '',
            mvCategory: '1',
            mvStockCode: '',
            mvMarketID: ''
        }
        
        this.getDataParams={
            key: '',
            mvCategory: '1'
        }
    }

    onRowSelected(param){
        if(param === 'ALL'){
            var current = document.getElementById('watchlist-cb-all').checked
            var  checkboxes = document.getElementsByClassName('watchlist-row-checkbox')
            for(var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked=current;
            }
            if(current)
                this.rowSelected = this.props.watchListData !== undefined ? 
                    this.props.watchListData : []
            else
                this.rowSelected = []
        }
        else{
            var index = this.rowSelected.indexOf(param)
            if(index === -1){
                this.rowSelected.push(param)
            }
            else{
                this.rowSelected.splice(index, 1)
            }

            if(document.getElementsByClassName("watchlist-row-checkbox").length === this.rowSelected.length)
                document.getElementById("watchlist-cb-all").checked = true
            else
                document.getElementById("watchlist-cb-all").checked = false
        }
        console.log('onRowSelected', this.rowSelected)
    }
    componentDidMount() {
        this.onRefresh()
    }
    onRefresh(){
         var time=(new Date()).getTime()
         this.getDataParams['key']=time
         this.props.onRefresh(this.getDataParams)
    }
    onAddStock(stockID){
        this.props.stockList.map(stock => {
            if(stockID === stock.stockCode){
                this.addRemoveParams['mvAddOrRemove']= 'Add'
                this.addRemoveParams['mvStockCode']= stockID
                this.addRemoveParams['mvMarketID']= stock.mvMarketID
            }
        })
        if(!this.alreadyInList(stockID)){
            this.props.onAddStock(this.addRemoveParams);
            this.onRefresh()
        }else{
            //show Alert
            console.log("alert")
        }
            
    }
    onRemoveStock(removeList){
        this.addRemoveParams['mvAddOrRemove']= 'Remove'
        removeList.map(stock => {
            this.addRemoveParams['mvStockCode']= stock.mvStockId
            this.props.onRemoveStock(this.addRemoveParams )
        })
        
        this.onRefresh()
    }
    onChange(e){
        console.log(e.target.value)
        this.inputValue=e.target.value
    }
    alreadyInList(stockID){
        var i=0;
        this.props.watchListData.map(stock => {
            if(stockID === stock.mvStockId)
                i++
        })
        return i===0 ? false:true
    }
    
    onPageChange(pageIndex){
        this.setState({pageIndex: pageIndex });
    }

    onNextPage(){
        if(this.state.pageIndex > 0){
            this.setState({pageIndex: parseInt(this.state.pageIndex) + 1 });
        }
    }

    onPrevPage(){
        if(this.state.pageIndex > 1){
            this.setState({pageIndex: parseInt(this.state.pageIndex) - 1 });
        }
    }

    render() {
        var disableRemove =this.rowSelected.length === 0? true:false;
        this.buttonAction = [
            <Pagination
                    pageIndex={this.state.pageIndex} 
                    totalRecord={11}
                    onPageChange={this.onPageChange.bind(this)}
                    onNextPage={this.onNextPage.bind(this)}
                    onPrevPage={this.onPrevPage.bind(this)}
                />,
            <Button  bsStyle="default" type="button" onClick={e => this.onRefresh()}>
                <span className="glyphicon glyphicon-refresh"></span>
            </Button>,

            <FormGroup controlId="mvStockId">
                <FormControl bsClass='form-control stockSearch' 
                componentClass="input" list="stockList" 
                placeholder= {this.props.language.watchlist.header.stock}
                onChange={e => this.onChange(e)}
                />
                    <datalist id="stockList">
                    {
                        this.props.stockList.map(e => {
                            console.log(e)
                            return( <option value={e.stockCode}>{e.stockName}</option> )
                        })
                    }
                    </datalist>
            </FormGroup>,
            <Button  bsStyle="primary" type="button" 
                onClick={e => this.onAddStock(this.inputValue)}>
                <span className="glyphicon glyphicon-plus" ></span> 
                 {this.props.language.watchlist.toolbar.addstock}
            </Button>,
            <Button  bsStyle="default" type="button" 
                onClick={e => this.onRemoveStock(this.rowSelected)} disabled={disableRemove}>
                <span className="glyphicon glyphicon-remove"></span> 
                 {this.props.language.watchlist.toolbar.removestock}
            </Button>
        ]

        return (
            <div id={'component-' + this.id} className="component-wrapper" onMouseDown={ e => e.stopPropagation() }>
                <div className="component-main">
                    <DataUpperTable
                        id="watchlist-table" 
                        columns={this.state.columns} 
                        data={this.props.watchListData}
                        onRowSelected={this.onRowSelected.bind(this)} 
                        />
                </div>
                <div className="component-body">
                    <SearchBar
                        id={this.id}
                        buttonAction={this.buttonAction} 
                        language={[]} 
                        theme={this.props.theme}
                        onChangeStateColumn={this.onChangeStateColumn.bind(this)}
                        param={['dropdown']}
                        data={{stockList: [], columns: this.state.columns }}/>
                </div>
            </div>
        )
    }

    onChangeStateColumn(e){

    }

    
    
}

const mapStateToProps = (state) => {
  return {
    watchListData: state.watchlist.watchListData,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    onRefresh: (param) => {
        dispatch(actions.loadWatchList(param))
      },
    onAddStock: (param) => {
        dispatch(actions.addStock(param))
      },
    onRemoveStock: (param) => {
        dispatch(actions.removeStock(param))
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)
