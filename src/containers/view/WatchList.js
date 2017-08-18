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
            columns: [{
                    id: 'cb',
                    Header: props => < input id={this.id + "-cb-all"}
                    type = 'checkbox'
                    className = "row-checkbox"
                    onChange={() => this.onRowSelected('ALL')}
                    />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        //if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y')
                            return ( <
                                input type = 'checkbox'
                                className={this.id + "-row-checkbox"}
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
                },
                {
                    Header: this.props.language.header.name,
                    columns: [{
                        id: 'mvStockId',
                        Header: this.props.language.header.stock,
                        accessor: 'mvStockId',
                        width: 60,
                        show: true,
                    }, {
                        id: 'mvStockName',
                        Header: this.props.language.header.market,
                        accessor: 'mvStockName',
                        width: 60,
                        show: true,
                    }]
                },
                // {
                //     Header: this.props.language.header.reference,
                //     columns: [{
                //         Header: this.props.language.header.ce,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.fl,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.ref,
                //         accessor: '',
                //         width: 60,
                //     }]
                // },
                // {
                //     Header: this.props.language.header.bestbid,
                //     columns: [{
                //             Header: this.props.language.header.pri3,
                //             accessor: '',
                //             width: 60,
                //         }, {
                //             Header: this.props.language.header.vol3,
                //             accessor: '',
                //             width: 60,
                //         },
                //         {
                //             Header: this.props.language.header.pri2,
                //             accessor: '',
                //             width: 60,
                //         }, {
                //             Header: this.props.language.header.vol2,
                //             accessor: '',
                //             width: 60,
                //         }, {
                //             Header: this.props.language.header.pri1,
                //             accessor: '',
                //             width: 60,
                //         }, {
                //             Header: this.props.language.header.vol1,
                //             accessor: '',
                //             width: 60,
                //         }
                //     ]
                // },
                // {
                //     Header: this.props.language.header.matching,
                //     columns: [{
                //         Header: this.props.language.header.price,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.volume,
                //         width: 60,
                //     }, {
                //         Header: '+/-',
                //         width: 60,
                //     }, {
                //         Header: '%',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.totalvol,
                //         width: 60,
                //     }]
                // },
                // {
                //     Header: this.props.language.header.bestask,
                //     columns: [{
                //         Header: this.props.language.header.pri1,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.vol1,
                //         accessor: '',
                //         width: 60,
                //     },
                //     {
                //         Header: this.props.language.header.pri2,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.vol2,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.pri3,
                //         accessor: '',
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.vol3,
                //         accessor: '',
                //         width: 60,
                //     }
                //     ]
                // },
                // {
                //     Header: this.props.language.header.pricehistory,
                //     columns: [{
                //         Header: this.props.language.header.open,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.high,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.low,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.avg,
                //         width: 60,
                //     }]
                // },
                // {
                //     Header: this.props.language.header.foreigninvestment,
                //     columns: [{
                //         Header: this.props.language.header.forbuy,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.forsell,
                //         width: 60,
                //     }, {
                //         Header: this.props.language.header.room,
                //         width: 60
                //     }]
                // }
            ],
            showAlert: false
        }
        this.rowSelected = []
        this.id = 'watchlist'
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
    
    onAddStock(value){
        if(!this.isInList(value)){
            this.props.onAddStock(value);
            this.props.onRefresh()
        }else{
            //show Alert
            console.log("alert")
        }
            
    }
    onRemoveStock(param){
        this.props.onRemoveStock(param)
        this.props.onRefresh()
    }
    onChange(e){
        console.log(e.target.value)
        this.inputValue=e.target.value
    }
    isInList(value){
        var i=0;
        this.props.watchListData.map(stock => {
            if(value === stock.mvStockId)
                i++
        })
        return i=0 ? false:true
    }
    render() {
        this.buttonAction = [
            <Button  bsStyle="default" type="button" >
                <span className="glyphicon glyphicon-refresh"></span>
            </Button>,
            <FormGroup controlId="mvStockId">
                <FormControl bsClass='form-control stockSearch' 
                componentClass="input" list="stockList" 
                placeholder="Mã CK"
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
                 {this.props.language.toolbar.addstock}
            </Button>,
            <Button  bsStyle="default" type="button" 
                onClick={e => this.props.onRemoveStock(this.rowSelected)}>
                <span className="glyphicon glyphicon-remove"></span> 
                 {this.props.language.toolbar.removestock}
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

    componentDidMount() {
       this.props.onRefresh()
       
    }
    
}
const mapStateToProps = (state) => {
  return {
    watchListData: state.watchlist.watchListData,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    onRefresh: () => {
        dispatch(actions.loadWatchList())
      },
    onAddStock: (value) => {
        dispatch(actions.addStock(value))
      },
    onRemoveStock: (param) => {
        dispatch(actions.removeStock(param))
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)