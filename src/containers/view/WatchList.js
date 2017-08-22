import React, { Component } from 'react';
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import SearchBar from '../SearchBar'
import {FormControl, Form, ControlLabel, FormGroup, Button} from 'react-bootstrap'

class WatchList extends Component {
    constructor(props) {
        super(props)

        
        this.state = {
            columns: [
                {
                    columns: [{
                        id: 'cb',
                        Header: props => < input id = {
                            this.id + "-cb-all"
                        }
                        type = 'checkbox'
                        className = "row-checkbox"
                        onChange = {
                            () => this.onRowSelected('ALL')
                        }
                        />,
                        maxWidth: 50,
                        width: 40,
                        Cell: props => {
                            //if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y')
                            return ( <
                                input type = 'checkbox'
                                className = {
                                    this.id + "-row-checkbox"
                                }
                                onChange = {
                                    () => {
                                        this.onRowSelected(props.original)
                                    }
                                }
                                />
                            )
                        },
                        sortable: false,
                        skip: true
                    }],
                    skip: true
                },
                {
                    id: 'headergroup',
                    Header: this.props.language.watchlist.header.name,
                    columns: [{
                        id: 'mvStockId',
                        Header: this.props.language.watchlist.header.stock,
                        accessor: 'mvStockId',
                        width: 60,
                        show: true,
                        skip: false
                    }, {
                        id: 'mvStockName',
                        Header: this.props.language.watchlist.header.market,
                        accessor: 'mvStockName',
                        width: 60,
                        show: true,
                        skip: false
                    }],
                    skip: false,
                    show: true,
                },
                // {
                //     Header: this.props.language.watchlist.header.reference,
                //     columns: [{
                //         Header: this.props.language.watchlist.header.ce,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.fl,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.ref,
                //         accessor: '',
                //         width: 60,
                //     }]
                // },
                // {
                //     Header: this.props.language.watchlist.header.bestbid,
                //     columns: [{
                //             Header: this.props.language.watchlist.header.pri3,
                //             accessor: '',
                //             width: 60,
                //         }, {
                //             Header: this.props.language.watchlist.header.vol3,
                //             accessor: '',
                //             width: 60,
                //         },
                //         {
                //             Header: this.props.language.watchlist.header.pri2,
                //             accessor: '',
                //             width: 60,
                //         }, {
                //             Header: this.props.language.watchlist.header.vol2,
                //             accessor: '',
                //             width: 60,
                //         }, {
                //             Header: this.props.language.watchlist.header.pri1,
                //             accessor: '',
                //             width: 60,
                //         }, {
                //             Header: this.props.language.watchlist.header.vol1,
                //             accessor: '',
                //             width: 60,
                //         }
                //     ]
                // },
                // {
                //     Header: this.props.language.watchlist.header.matching,
                //     columns: [{
                //         Header: this.props.language.watchlist.header.price,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.volume,
                //         width: 60,
                //     }, {
                //         Header: '+/-',
                //         width: 60,
                //     }, {
                //         Header: '%',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.totalvol,
                //         width: 60,
                //     }]
                // },
                // {
                //     Header: this.props.language.watchlist.header.bestask,
                //     columns: [{
                //         Header: this.props.language.watchlist.header.pri1,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.vol1,
                //         accessor: '',
                //         width: 60,
                //     },
                //     {
                //         Header: this.props.language.watchlist.header.pri2,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.vol2,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.pri3,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.vol3,
                //         accessor: '',
                //         width: 60,
                //     }
                //     ]
                // },
                // {
                //     Header: this.props.language.watchlist.header.pricehistory,
                //     columns: [{
                //         Header: this.props.language.watchlist.header.open,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.high,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.low,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.avg,
                //         width: 60,
                //     }]
                // },
                // {
                //     Header: this.props.language.watchlist.header.foreigninvestment,
                //     columns: [{
                //         Header: this.props.language.watchlist.header.forbuy,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.forsell,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.watchlist.header.room,
                //         width: 60
                //     }]
                // }
            ],
            showAlert: false
        }
        this.rowSelected = []
        this.id = 'watchlist'
        this.addRemoveParams= {
            mvTimelyUpdate: 'Y',
            mvAddOrRemove: '',
            mvCategory: '1',
            mvStockCode: '',
            mvMarketID: 'HA'
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
        if(!this.isInList(stockID)){
            this.addRemoveParams['mvAddOrRemove']= 'Add'
            this.addRemoveParams['mvStockCode']= stockID
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
    isInList(stockID){
        var i=0;
        this.props.watchListData.map(stock => {
            if(stockID === stock.mvStockId)
                i++
        })
        return i===0 ? false:true
    }
    
    render() {
        var disableRemove =this.rowSelected.length === 0? true:false;
        this.buttonAction = [
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
            <div id={'watchlist-body'} className="layout-body">
                <SearchBar
                    id={this.id}
                    onSearch={[]}
                    buttonAction={this.buttonAction} 
                    stockList={[]} 
                    language={[]} 
                    theme={this.props.theme}
                    columns={this.state.columns}
                    onChangeStateColumn={[]}
                    param={[]}
                    />
                <DataTable
                    id="watchlist-table" 
                    columns={this.state.columns} 
                    data={this.props.watchListData}
                    onRowSelected={this.onRowSelected.bind(this)} 
                    />
            </div>
        )
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