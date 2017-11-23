import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../commons/DataTable'
import { FormControl, Form, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import * as atmosphereAPI from '../../api/atmosphereAPI'


import Config from '../../core/config'

class WatchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    columns: [{
                        id: 'cb',
                        // Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox"
                        //     onChange={() => this.onRowSelected('ALL')} />,
                        maxWidth: 50,
                        width: 40,
                        Cell: props => {
                            return (<input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
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
                        id: 'stock',
                        accessor: 'mvStockCode',
                        width: 60,
                        show: true,
                        skip: false
                    }, {
                        id: 'market',
                        accessor: 'mvMarket',
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
                        id: 'ce',
                        accessor: 'mvCeiling',
                        Cell: row => {  
                            return this.onRowStatusChange(row, "mvCeiling")    
                            },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'fl',
                        accessor: 'mvFloor',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvFloor")
                        },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'ref',
                        accessor: 'mvReferences',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvReferences")
                        },
                        width: 60,
                        skip: false,
                        show: true,
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'bestbid',
                    columns: [{
                        id: 'pri3',
                        accessor: 'mvBidPrice3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice3")
                        },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol3',
                        accessor: 'mvBidVol3',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvBidVol3")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'pri2',
                        accessor: 'mvBidPrice2',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvBidPrice2")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol2',
                        accessor: 'mvBidVol2',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvBidVol2")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'pri1',
                        accessor: 'mvBidPrice1',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvBidPrice1")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol1',
                        accessor: 'mvBidVol1',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvBidVol1")
                        // },
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
                    columns: [{
                        id: 'price',
                        accessor: 'mvNominal',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvNominal")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'volume',
                        accessor: 'mvNoalPriSubRefPri',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvNoalPriSubRefPri")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'mvTotalTradingQty',
                        Header: '+/-',
                        accessor: 'mvMatchUpDown',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvMatchUpDown")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'ce1',
                        Header: '%',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvBidVol1")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'totalvol',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvBidVol1")
                        // },
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
                        id: 'pri1',
                        accessor: 'mvOfferPrice1',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvOfferPrice1")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol1',
                        accessor: 'mvOfferVol1',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvOfferVol1")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'pri2',
                        accessor: 'mvOfferPrice2',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvOfferPrice2")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol2',
                        accessor: 'mvOfferVol2',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvOfferVol2")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'pri3',
                        accessor: 'mvOfferPrice3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvOfferPrice3")
                        },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol3',
                        accessor: 'mvOfferVol3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvOfferVol3")
                        },
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
                        id: 'open',
                        accessor: 'mvOpen',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvOpen")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'high',
                        accessor: 'mvHigh',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvHigh")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'low',
                        accessor: 'mvLow',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvLow")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'avg',
                        // accessor: 'avgPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'foreigninvestment',
                    columns: [{
                        id: 'forbuy',
                        accessor: 'mvForeignForBuy',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvForeignForBuy")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'forsell',
                        accessor: 'mvForeignForSell',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvForeignForSell")
                        // },
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'room',
                        accessor: 'mvForeignForRoom',
                        // Cell: row => {
                        //     return this.onRowStatusChange(row, "mvForeignForRoom")
                        // },
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
            disableRemove: true,
            watchStockList: []
        }
        this.oldWatchStockList = []
        this.rowSelected = []
        this.id = 'watchlist'
        this.addRemoveParams = {
            mvTimelyUpdate: 'Y',
            mvAddOrRemove: '',
            mvCategory: '1',
            mvStockCode: '',
            mvMarketID: ''
        }

        this.getDataParams = {
            key: '',
            mvCategory: '1'
        }        
    }

    onRowSelected(param) {
        if (param === 'ALL') {
            var current = document.getElementById('watchlist-cb-all').checked
            var checkboxes = document.getElementsByClassName('watchlist-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.watchListData !== undefined ?
                    this.props.watchListData : []
            else
                this.rowSelected = []
        }
        else {
            var index = this.rowSelected.indexOf(param)
            if (index === -1) {
                this.rowSelected.push(param)
            }
            else {
                this.rowSelected.splice(index, 1)
            }

            if (document.getElementsByClassName("watchlist-row-checkbox").length === this.rowSelected.length)
                document.getElementById("watchlist-cb-all").checked = true
            else
                document.getElementById("watchlist-cb-all").checked = false
        }
        this.setState({
            disableRemove: this.rowSelected.length == 0 ? true : false
        })
    }

    componentDidMount() {
        this.onSubscribeToServer()
    }

    componentDidUpdate(prevProps, prevState){
        // let className = document.querySelector(".value").className
        // let newClassName = className.replace(" value-change", "")
        // document.querySelector(".value").className = newClassName
        document.querySelectorAll(".value").forEach(div => {
            div.className = div.className.replace(" value-change", "")
        })
        window.requestAnimationFrame(time => {
            window.requestAnimationFrame(time => {
                // document.querySelector(".value").className = newClassName + " value-change"
                document.querySelectorAll(".value").forEach(div => {
                    div.className = div.className + " value-change"
                })
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        this.oldWatchStockList = this.state.watchStockList
        this.setState({
            watchStockList: nextProps.watchListData
        })
    }

    // onRefresh(newParams) {
    //     // var time = (new Date()).getTime()
    //     // this.getDataParams['key'] = time
    //     // this.props.onRefresh(this.getDataParams)
    //     let stock = this.state.watchStockList.find(stock => {
    //         return stock.mvStockCode == newParams.mvStockCode
    //     })

    // }

    onAddStock(willBeAddedStockCode) {
        let stock = this.state.watchStockList.find(stock => {
            return willBeAddedStockCode == stock.mvStockCode
        })
        if (stock === undefined) {
            let willBeAddedStock = this.props.stockList.find(stockInStockList => stockInStockList.stockCode == willBeAddedStockCode)
            if (willBeAddedStock!=null) {
                this.addRemoveParams['mvAddOrRemove'] = 'Add'
                this.addRemoveParams['mvStockCode'] = willBeAddedStock.stockCode
                this.addRemoveParams['mvMarketID'] = willBeAddedStock.mvMarketID
                this.props.onAddStock(this.addRemoveParams)
                
            } else {
            console.log("Stock not found")
            } 
        }
        
        // console.log(this.props.watchListData)
        // if (!this.alreadyInList(stockID)) {
        //     this.props.onAddStock(this.addRemoveParams);
        //     this.onRefresh()
        // } else {
        //     //show Alert
        //     console.log("alert")
        // }
    }

    onRemoveStock(removeList) {


        // removeList.forEach(stock => {
        //     let removeStock = {
        //         mvStockCode: stock.mvStockCode,
        //         mvMarketID: stock.mvMarketID
        //     }
        //     this.props.removeStockFromLocalStore(removeStock)
        // })
        
        //Get selected stockID
        this.rowSelected = []
        document.getElementById("watchlist-cb-all").checked = false
        let checkboxes = document.getElementsByClassName('watchlist-row-checkbox')
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false
        }

        //Add or remove stock from list
        this.addRemoveParams['mvAddOrRemove'] = 'Remove'
        removeList.map(stock => {
            this.addRemoveParams['mvStockCode'] = stock.mvStockCode
            this.addRemoveParams['mvMarketID'] = stock.mvMarketID
            this.props.onRemoveStock(this.addRemoveParams)
        })
        this.rowSelected = []

        // this.onRefresh()
    }


    onChange(e) {
        this.inputValue = e.target.value
    }

    // alreadyInList(stockID) {
    //     var i = 0;
    //     this.props.watchListLocalStockList.map(stock => {
    //         if (stockID === stock.mvStockId)
    //             i++
    //     })
    //     return i === 0 ? false : true
    // }

    onPageChange(pageIndex) {
        this.setState({ pageIndex: pageIndex });
    }

    render() {
        let button = this.props.theme.searchbar.default.button || undefined
        this.buttonAction = [
            <Button bsStyle="default" type="button" onClick={e => this.onRefresh()}>
                <span className="glyphicon glyphicon-refresh"></span>
            </Button>,

            <FormGroup controlId="mvStockId">
                <FormControl bsClass='form-control stockSearch'
                    componentClass="input" list="stockList"
                    placeholder={this.props.language.watchlist.header.stock}
                    onChange={e => this.onChange(e)}
                />
                <datalist id="stockList">
                    {
                        this.props.stockList.map(e => {
                            return (<option value={e.stockCode}>{e.stockName}</option>)
                        })
                    }
                </datalist>
            </FormGroup>,
            <Button type="button" style={button}
                onClick={e => this.onAddStock(this.inputValue)}>
                <span className="glyphicon glyphicon-plus" ></span>
                {this.props.language.watchlist.toolbar.addstock}
            </Button>,
            <Button bsStyle="default" type="button"
                onClick={e => this.onRemoveStock(this.rowSelected)} disabled={this.state.disableRemove}>
                <span className="glyphicon glyphicon-remove"></span>
                {this.props.language.watchlist.toolbar.removestock}
            </Button>
        ]
        let tableHeader = this.props.theme.table.tableHeader
        let tableFooter = this.props.theme.table.tableFooter
        return (
            <div style={{ height: '100%' }}>
                <Title id={this.id} language={this.props.language} theme={this.props.theme} widgetID={'watchlist'}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <DataTable
                        theme={this.props.theme}
                        id="watchlist"
                        columns={this.state.columns}
                        tableData={this.state.watchStockList}
                        onRowSelected={(param) => this.onRowSelected(param)}
                        language={this.props.language}

                        pageIndex={this.state.pageIndex}
                        totalPage={11}
                        onPageChange={this.onPageChange.bind(this)}

                        searchActions={this.buttonAction}
                        searchData={{ stockList: [] }}
                        searchParams={[]}
                        searchMobileParams={[]}
                        searchDefaultValues={{}}
                    />
                </Body>
            </div>
        )
    }

    onChangeStateColumn(e) {

    }

    componentWillUnmount() {
        console.log("Socket will be unsubscribed")
        atmosphereAPI.unsubscribe()
    }

    onRowStatusChange(row, rowName) {
        let index = row.index
        if (rowName == "mvCeiling") {
            return <div className="value-ceil">{row.value}</div>
        }
        if (rowName == "mvFloor") {
            return <div className="value-floor">{row.value}</div>
        }
        if (rowName == "mvReferences") {
            return <div className="value-ref">{row.value}</div>            
        }

        if (row.value == null) {
            return ( 
                <div className="value unchange">-</div>
            )
        } else if (row.original == null || row.original.mvReferences == null) {
            return (
                <div className="value unchange">{row.value}</div>
            )
        } else if (row.original.mvReferences > row.value) {
            return (
                <div className="value value-change down">{row.value}</div>
            )
        } else if (row.original.mvReferences < row.value) {
            return (
                <div className="value value-change up">{row.value}</div>
            )
        } else if (row.original.mvReferences == row.value) {
            return (
                <div className="value unchange">{row.value}</div>
            )
        }
    }

    onSubscribeToServer() {
        // localStorage.setItem("socketID","C080001")
        
        let socketID = localStorage.getItem("socketID")
        if (socketID == null) {
            console.log("No WebSocketID")
        } else {
            atmosphereAPI.subscribe(socketID, ((stockJsonResponse) => {
                if (stockJsonResponse!=null) {
                    this.props.updateStockInfo(stockJsonResponse)
                }
            }).bind(this))
            
        }
    }


}


const mapStateToProps = (state) => {
    return {
        watchListData: state.watchlist.watchListData,
        watchListLocalStockList: state.watchlist.watchListLocalStockList
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
    addStockToLocalStore: (param) => {
        dispatch(actions.addStockToLocalStore(param))
    },
    removeStockFromLocalStore: (param) => {
        dispatch(actions.removeStockFromLocalStore(param))
    },
    updateStockInfo: (param) => {
        dispatch(actions.updateStockInfo(param))
    }
    // getStockFromServer: (param) => {
    //     dispatch(actions.getStocksFromServer(param))
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)
