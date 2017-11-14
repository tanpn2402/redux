import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../commons/DataTable'
import { FormControl, Form, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'

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
                        id: 'ce',
                        accessor: 'mvCeilingPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'fl',
                        accessor: 'mvFloorPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'ref',
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
                    columns: [{
                        id: 'pri3',
                        accessor: 'mvBestBid3Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol3',
                        accessor: 'mvBestBid3Volume',
                        width: 60,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'pri2',
                        accessor: 'mvBestBid2Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol2',
                        accessor: 'mvBestBid2Volume',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'pri1',
                        accessor: 'mvBestBid1Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol1',
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
                    columns: [{
                        id: 'price',
                        accessor: 'mvNominalPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'volume',
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
                        id: 'totalvol',
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
                        accessor: 'mvBestOffer1Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol1',
                        accessor: 'mvBestOffer1Volume',
                        width: 60,
                        skip: false,
                        show: true,
                    },
                    {
                        id: 'pri2',
                        accessor: 'mvBestOffer2Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol2',
                        accessor: 'mvBestOffer2Volume',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'pri3',
                        accessor: 'mvBestOffer3Price',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'vol3',
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
                        id: 'open',
                        accessor: 'mvOpenPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'high',
                        accessor: 'mvHighPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'low',
                        accessor: 'mvLowPrice',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'avg',
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
                    columns: [{
                        id: 'forbuy',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'forsell',
                        width: 60,
                        skip: false,
                        show: true,
                    }, {
                        id: 'room',
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
            listStock: []
        }
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
        this.onRefresh()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            listStock: nextProps.watchListLocalStockList
        })
    }

    onRefresh() {
        var time = (new Date()).getTime()
        this.getDataParams['key'] = time
        this.props.onRefresh(this.getDataParams)
    }

    onAddStock(stockID) {
        let stock = this.state.listStock.find(stock => {
            return stock.mvStockCode == stockID
        })
        if (stock === undefined) {
            this.props.stockList.map(stock => {
                if (stockID === stock.stockCode) {
                    // this.addRemoveParams['mvAddOrRemove'] = 'Add'
                    // this.addRemoveParams['mvStockCode'] = stockID
                    // this.addRemoveParams['mvMarketID'] = stock.mvMarketID
                    let newStock = {
                        mvStockCode: stockID,
                        mvMarketID: stock.mvMarketID
                    }
                    this.props.addStockToLocalStore(newStock)
                }
            })
        }
        // if (!this.alreadyInList(stockID)) {
        //     this.props.onAddStock(this.addRemoveParams);
        //     this.onRefresh()
        // } else {
        //     //show Alert
        //     console.log("alert")
        // }
    }

    onRemoveStock(removeList) {
        removeList.forEach(stock => {
            let removeStock = {
                mvStockCode: stock.mvStockCode,
                mvMarketID: stock.mvMarketID
            }
            this.props.removeStockFromLocalStore(removeStock)
        })
        this.rowSelected = []
        document.getElementById("watchlist-cb-all").checked = false
        let checkboxes = document.getElementsByClassName('watchlist-row-checkbox')
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false
        }
        // this.addRemoveParams['mvAddOrRemove'] = 'Remove'
        // removeList.map(stock => {
        //     this.addRemoveParams['mvStockCode'] = stock.mvStockCode
        //     this.addRemoveParams['mvMarketID'] = stock.mvMarketID
        //     this.props.onRemoveStock(this.addRemoveParams)
        // })
        // this.rowSelected = []

        // this.onRefresh()
    }

    onChange(e) {
        console.log(e.target.value)

        this.inputValue = e.target.value
    }

    alreadyInList(stockID) {
        // var i = 0;
        // this.props.watchListData.mvMarketData.map(stock => {
        //     if (stockID === stock.mvStockId)
        //         i++
        // })
        // return i === 0 ? false : true
    }

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
                <Title language={this.props.language} theme={this.props.theme} widgetID={'watchlist'}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <DataTable
                        theme={this.props.theme}
                        id="watchlist"
                        columns={this.state.columns}
                        tableData={this.state.listStock}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)
