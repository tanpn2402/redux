import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from './DataTable'
import * as utils from '../../utils'
import config from "../../core/config"

class WatchListTable extends React.Component {
    constructor(props) {
        super(props)
        this.id = "watchlist"
        this.state = {
            columns: [
                {
                    columns: [{
                        id: 'cb',
                        Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox"
                            onChange={() => this.onRowSelected('ALL')} />,
                        width: 40,
                        Cell: props => {
                            return (
                                <div style={{width: "100%", height: "100%"}}>
                                    <input type='checkbox' className={this.id + "-row-checkbox"}
                                        style={{position: "relative", top: "3px"}}
                                        onChange={() => { this.onRowSelected(props.original) }} />
                                </div>
                            )
                        },
                        sortable: false,
                        accessor_tmp: 'cb',
                        skip: true,
                        background: this.props.theme.watchlist.evenCol,
                        
                    }],
                    skip: true,
                    show: true,
                    background: Object.assign({}, this.props.theme.watchlist.evenCol, {borderTop: this.props.theme.watchlist.evenCol.borderBottom }) ,
                    background: this.props.theme.watchlist.evenCol,
                },
                {
                    id: 'reference',
                    Header: this.props.language.watchlist.header.reference,
                    background: Object.assign({}, this.props.theme.watchlist.evenCol, {borderTop: this.props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [
                        {
                            id: 'ref',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvReferences", "reference")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber)
                        }, {
                            id: 'ce',
                            Cell: row => {  
                                return this.onRowStatusChange(row, "mvCeiling", "reference")    
                                },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber)
                        }, {
                            id: 'fl',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvFloor", "reference")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber)
                        }
                    ],
                    skip: false,
                    show: true,
                },
                {
                    id: 'bid',
                    background: Object.assign({}, this.props.theme.watchlist.evenCol, {borderTop: this.props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [{
                        id: 'pri3',
                        accessor_tmp: 'mvBidPrice3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice3", "bid3")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                    }, {
                        id: 'vol3',
                        accessor_tmp: 'mvBidVol3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol3", "bid3")
                        },
                        minWidth: 70,
                        maxWidth: 100,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                    },
                    {
                        id: 'pri2',
                        accessor_tmp: 'mvBidPrice2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice2", "bid2")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                    }, {
                        id: 'vol2',
                        accessor_tmp: 'mvBidVol2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol2", "bid2")
                        },
                        minWidth: 70,
                        maxWidth: 100,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                    }, {
                        id: 'pri1',
                        accessor_tmp: 'mvBidPrice1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice1", "bid1")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                    }, {
                        id: 'vol1',
                        accessor_tmp: 'mvBidVol1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol1", "bid1")
                        },
                        minWidth: 70,
                        maxWidth: 100,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                    }
                    ],
                    skip: false,
                    show: true,
                },
                {
                    id: 'matching',
                    background: Object.assign({}, this.props.theme.watchlist.evenCol, {borderTop: this.props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [
                    {
                        id: 'stock',
                        accessor: 'mvStockCode',
                        minWidth: 45,
                        maxWidth: 90,
                        show: true,
                        skip: false,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'market',
                        accessor: 'mvMarket',
                        minWidth: 45,
                        maxWidth: 90,
                        show: true,
                        skip: false,
                        background: this.props.theme.watchlist.oddCol,
                    },
                    {
                        id: 'price',
                        accessor: 'mvMatchPrice',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchPrice", "matching")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'volume',
                        accessor: 'mvMatchVol',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVol", "matching")
                        },
                        minWidth: 70,
                        maxWidth: 100,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'totalvol',
                        accessor: 'mvMatchVolTotal',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVolTotal", "matching")
                        },
                        minWidth: 70,
                        maxWidth: 100,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'percent',
                        accessor: 'mvMatchUpDown',
                        Header: '%',
                        Cell: row => {
                            return this._renderChangePercent(row, "mvMatchUpDown", "matching")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'change',
                        accessor: 'mvMatchUpDown',
                        Cell: row => {
                            return this._renderChangeValue(row, "mvMatchUpDown", "matching")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'offer',
                    Header: this.props.language.watchlist.header.bestask,
                    background: Object.assign({}, this.props.theme.watchlist.evenCol, {borderTop: this.props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [
                        {
                            id: 'pri1',
                            accessor_tmp: 'mvOfferPrice1',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice1", "offer1")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                        }, {
                            id: 'vol1',
                            accessor_tmp: 'mvOfferVol1',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol1", "offer1")
                            },
                            minWidth: 70,
                            maxWidth: 100,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                        },
                        {
                            id: 'pri2',
                            accessor_tmp: 'mvOfferPrice2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice2", "offer2")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                        }, {
                            id: 'vol2',
                            accessor_tmp: 'mvOfferVol2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol2", "offer2")
                            },
                            minWidth: 70,
                            maxWidth: 100,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                        }, {
                            id: 'pri3',
                            accessor_tmp: 'mvOfferPrice3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice3", "offer3")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                        }, {
                            id: 'vol3',
                            accessor_tmp: 'mvOfferVol3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol3", "offer3")
                            },
                            minWidth: 70,
                            maxWidth: 100,
                            skip: false,
                            show: true,
                            background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber)
                        }
                    ],
                    skip: false,
                    show: true,
                },
                {
                    id: 'pricehistory',
                    Header: this.props.language.watchlist.header.pricehistory,
                    background: Object.assign({}, this.props.theme.watchlist.evenCol, {borderTop: this.props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [{
                        id: 'open',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvOpen")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'high',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvHigh")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'low',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvLow")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'avg',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvNomial")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.oddCol, this.props.theme.table.colNumber),
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'foreigninvestment',
                    background: Object.assign({}, this.props.theme.watchlist.evenCol, {borderTop: this.props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [{
                        id: 'forbuy',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForBuy", "foreigninvestment")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'forsell',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForSell", "foreigninvestment")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber),
                    }, {
                        id: 'forroom',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForRoom", "foreigninvestment")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({}, this.props.theme.watchlist.evenCol, this.props.theme.table.colNumber),
                    }],
                    skip: false,
                    show: true,
                }
            ],
            pageIndex: 1,
            disableRemove: true,
            watchStockList: [],
            mvInstrument: null,
            realtimeData: config.cache.watchlistData,
            oldInstrumentData: null
        }

        this.rowSelected = []
    }

    reloadColumTable(props) {
        this.setState({
            columns: [
                {
                    columns: [{
                        id: 'cb',
                        // Header: props => <input id={this.id + "-cb-all"} type='checkbox' className="row-checkbox"
                        //     onChange={() => this.onRowSelected('ALL')} />,
                        width: 40,
                        Cell: props => {
                            return (
                                <div style={{width: "100%", height: "100%"}}>
                                    <input type='checkbox' className={this.id + "-row-checkbox"}
                                        style={{position: "relative", top: "3px"}}
                                        onChange={() => { this.onRowSelected(props.original) }} />
                                </div>
                            )
                        },
                        sortable: false,
                        accessor_tmp: 'cb',
                        skip: true,
                        background: Object.assign({}, props.theme.watchlist.evenCol, {borderTop: props.theme.watchlist.evenCol.borderBottom }) ,
                    }],
                    skip: true,
                    show: true,
                    background: props.theme.watchlist.evenCol,
                },
                {
                    id: 'reference',
                    Header: props.language.watchlist.header.reference,
                    background: Object.assign({}, props.theme.watchlist.evenCol, {borderTop: props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [
                        {
                            id: 'ref',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvReferences", "reference")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber)
                        }, {
                            id: 'ce',
                            Cell: row => {  
                                return this.onRowStatusChange(row, "mvCeiling", "reference")    
                                },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber)
                        }, {
                            id: 'fl',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvFloor", "reference")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber)
                        }
                    ],
                    skip: false,
                    show: true,
                },
                {
                    id: 'bid',
                    background: Object.assign({}, props.theme.watchlist.evenCol, {borderTop: props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [{
                        id: 'pri3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice3", "bid3")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                    }, {
                        id: 'vol3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol3", "bid3")
                        },
                        width: 70,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                    },
                    {
                        id: 'pri2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice2", "bid2")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                    }, {
                        id: 'vol2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol2", "bid2")
                        },
                        width: 70,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                    }, {
                        id: 'pri1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice1", "bid1")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                    }, {
                        id: 'vol1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol1", "bid1")
                        },
                        width: 70,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                    }
                    ],
                    skip: false,
                    show: true,
                },
                {
                    id: 'matching',
                    background: Object.assign({}, props.theme.watchlist.evenCol, {borderTop: props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [
                    {
                        id: 'stock',
                        accessor: 'mvStockCode',
                        minWidth: 45,
                        maxWidth: 90,
                        show: true,
                        skip: false,
                        background: Object.assign({},props.theme.watchlist.oddCol),
                    }, {
                        id: 'market',
                        accessor: 'mvMarket',
                        minWidth: 45,
                        maxWidth: 90,
                        show: true,
                        skip: false,
                        background: Object.assign({},props.theme.watchlist.oddCol),
                    },
                    {
                        id: 'price',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchPrice", "matching")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }, {
                        id: 'volume',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVol", "matching")
                        },
                        width: 70,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }, {
                        id: 'totalvol',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVolTotal", "matching")
                        },
                        width: 70,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }, {
                        id: 'percent',
                        Header: '%',
                        Cell: row => {
                            return this._renderChangePercent(row, "mvMatchUpDown", "matching")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }, {
                        id: 'change',
                        Cell: row => {
                            return this._renderChangeValue(row, "mvMatchUpDown", "matching")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'offer',
                    Header: props.language.watchlist.header.bestask,
                    background: Object.assign({}, props.theme.watchlist.evenCol, {borderTop: props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [
                        {
                            id: 'pri1',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice1", "offer1")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                        }, {
                            id: 'vol1',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol1", "offer1")
                            },
                            width: 70,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                        },
                        {
                            id: 'pri2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice2", "offer2")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                        }, {
                            id: 'vol2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol2", "offer2")
                            },
                            width: 70,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                        }, {
                            id: 'pri3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice3", "offer3")
                            },
                            minWidth: 48, maxWidth: 65,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                        }, {
                            id: 'vol3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol3", "offer3")
                            },
                            width: 70,
                            skip: false,
                            show: true,
                            background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber)
                        }
                    ],
                    skip: false,
                    show: true,
                },
                {
                    id: 'pricehistory',
                    Header: props.language.watchlist.header.pricehistory,
                    background: Object.assign({}, props.theme.watchlist.evenCol, {borderTop: props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [{
                        id: 'open',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvOpen")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }, {
                        id: 'high',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvHigh")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }, {
                        id: 'low',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvLow")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }, {
                        id: 'avg',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvNomial")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.oddCol, props.theme.table.colNumber),
                    }],
                    skip: false,
                    show: true,
                },
                {
                    id: 'foreigninvestment',
                    background: Object.assign({}, props.theme.watchlist.evenCol, {borderTop: props.theme.watchlist.evenCol.borderBottom }) ,
                    columns: [{
                        id: 'forbuy',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForBuy")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber),
                    }, {
                        id: 'forsell',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForSell")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber),
                    }, {
                        id: 'forroom',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForRoom")
                        },
                        minWidth: 48, maxWidth: 65,
                        skip: false,
                        show: true,
                        background: Object.assign({},props.theme.watchlist.evenCol, props.theme.table.colNumber),
                    }],
                    skip: false,
                    show: true,
                }
            ],
        })
    }
    
    onRowSelected(param) {
        // console.log(param)
        if (param === 'ALL') {
            var current = document.getElementById('watchlist-cb-all').checked
            var checkboxes = document.getElementsByClassName('watchlist-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = current;
            }
            if (current)
                this.rowSelected = this.props.listInstrumentData
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

        if(this.props.onRowSelected != undefined) {
            this.props.onRowSelected(this.rowSelected)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.theme.title != this.props.theme.title) {
            this.reloadColumTable(nextProps, this.props)
        }

        if(nextProps.listInstrumentInWatchList.length != this.props.listInstrumentInWatchList.length) {
            document.getElementById('watchlist-cb-all').checked = false
            var checkboxes = document.getElementsByClassName('watchlist-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }

        let {listInstrumentData, listInstrumentInWatchList, instrumentData} = nextProps
        let {realtimeData} = this.state
        
        // check if instrutment data already in realtimeData[]
        let tmp = realtimeData.filter(e => e.mvStockCode == instrumentData.mvStockCode)
        if(tmp.length > 0) {
            // console.log("CASE UPDATE")

            // compare value
            let oldData = Object.assign({}, tmp[0])
            Object.assign(tmp[0], instrumentData)
            config.cache.watchlistData = realtimeData
            this.setState({
                realtimeData: realtimeData,
                oldInstrumentData: oldData
            })

        } else if(listInstrumentInWatchList.indexOf(instrumentData.mvStockCode) > -1) {
            console.log("CASE ADD")
            realtimeData.push(instrumentData)
            config.cache.watchlistData = realtimeData
            this.setState({
                realtimeData: realtimeData,
                oldInstrumentData: null
            })
        } else if(nextProps.listInstrumentInWatchList.length < this.props.listInstrumentInWatchList.length) {
            // case REMOVE STOCK
            console.log("CASE REMOVE")
            let oldList = this.props.listInstrumentInWatchList
            let newList = nextProps.listInstrumentInWatchList

            let diff = oldList.filter(x => !newList.includes(x))
            let newData = realtimeData.filter(x => !diff.includes(x.mvStockCode))
            console.log("diff", diff, "new Data:", newData, "old data:", realtimeData)

            this.setState({
                realtimeData: newData,
            })

        }
    }

    componentDidMount() {
        // this.onSubscribeToServer()
    }

    componentDidUpdate(){
        let classList = document.querySelector(".value-binding")
        if(classList != null) {
            let className = classList.className
            let newClassName = className.replace(" value-change", "")
            document.querySelector(".value-binding").className = newClassName
            document.querySelectorAll(".value-binding").forEach(div => {
                div.className = div.className.replace(" value-change", "")
            })
            window.requestAnimationFrame(time => {
                window.requestAnimationFrame(time => {
                    // document.querySelector(".value").className = newClassName + " value-change"
                    document.querySelectorAll(".value-binding").forEach(div => {
                        div.className = div.className + " value-change"
                    })
                })
            })
        }
        
    }

    onCellClick(state, rowInfo, cell, instance) {

        if(rowInfo == undefined) return
        let data = rowInfo.original
        let cellID = cell.id

        let stockCode = data.mvStockCode
        let market = data.mvMarket
        let tmp = config.cache.stockList.filter(e => e.stockCode == stockCode)
        let stockName = tmp.length > 0 ? tmp[0].stockName : ""

        // console.log(cell, rowInfo, state, instance)
        this.props.changeInstrument(stockCode)

      
        let accessor = cell.accessor_tmp
        if(accessor == "mvBidVol1" || accessor == "mvBidPrice1") {
            this.props.setDefaultOrderParams({
                mvBS: "BUY",
                mvStockCode: stockCode,
                mvStockName: stockName,
                mvMarketID: market,
                mvQty: data["mvBidVol1"],
                mvPrice: data["mvBidPrice1"]
            })
        } else if(accessor == "mvBidVol2" || accessor == "mvBidPrice2") {
            this.props.setDefaultOrderParams({
                mvBS: "BUY",
                mvStockCode: stockCode,
                mvStockName: stockName,
                mvMarketID: market,
                mvQty: data["mvBidVol2"],
                mvPrice: data["mvBidPrice2"]
            })
        } else if(accessor == "mvBidVol3" || accessor == "mvBidPrice3") {
            this.props.setDefaultOrderParams({
                mvBS: "BUY",
                mvStockCode: stockCode,
                mvStockName: stockName,
                mvMarketID: market,
                mvQty: data["mvBidVol3"],
                mvPrice: data["mvBidPrice3"]
            })
        } else if(accessor == "mvOfferVol1" || accessor == "mvOfferPrice1") {
            this.props.setDefaultOrderParams({
                mvBS: "BUY",
                mvStockCode: stockCode,
                mvStockName: stockName,
                mvMarketID: market,
                mvQty: data["mvOfferVol1"],
                mvPrice: data["mvOfferPrice1"]
            })
        } else if(accessor == "mvOfferVol2" || accessor == "mvOfferPrice2") {
            this.props.setDefaultOrderParams({
                mvBS: "BUY",
                mvStockCode: stockCode,
                mvStockName: stockName,
                mvMarketID: market,
                mvQty: data["mvOfferVol2"],
                mvPrice: data["mvOfferPrice2"]
            })
        } else if(accessor == "mvOfferPrice3" || accessor == "mvOfferVol3") {
            this.props.setDefaultOrderParams({
                mvBS: "BUY",
                mvStockCode: stockCode,
                mvStockName: stockName,
                mvMarketID: market,
                mvQty: data["mvOfferVol3"],
                mvPrice: data["mvOfferPrice3"]
            })
        }if(accessor == "cb") {
            return
        } else {
            this.props.setDefaultOrderParams({
                mvBS: "BUY",
                mvStockCode: stockCode,
                mvStockName: stockName,
                mvMarketID: market,
                mvQty: data["mvMatchVol"],
                mvPrice: data["mvMatchPrice"]
            })
        }

        //this.props.onDesktopTabClick("tradepage", "placeorder")
        this.props.showPlaceOrder({
            theme: this.props.theme,
            language: this.props.language,
            data: {},
            title: this.props.language.menu.placeorder,
            id: 'quickorder',
        })
    }

    render() {

        


        return (
            <DataTable
                theme={this.props.theme}
                id="watchlist"
                columns={this.state.columns}
                tableData={this.state.realtimeData}
                onRowSelected={(param) => this.onRowSelected(param)}
                language={this.props.language}
                onCellClick={this.onCellClick.bind(this)}

                pageIndex={this.state.pageIndex}
                totalPage={Math.ceil(this.props.listInstrumentInWatchList.length/15)}
                onPageChange={this.onPageChange.bind(this)}

                searchActions={[]}
                searchData={{ stockList: [] }}
                searchParams={[]}
                searchMobileParams={[]}
                searchDefaultValues={{}}
                searchEnable={false}
            />
        )
    }


    onRowStatusChange(row, accessor, parent) {
        let data = row.original
        let refPrice = data["mvReferences"]
        let color = this.props.theme.watchlist
        let bindingStyle = this.props.theme.bindingdata
        let style = bindingStyle.nochange
        let fontColor= this.props.theme.font


        let accessorToCompare = null
        
        switch(parent) {
            case "reference":

            break;
            case "bid1": 
                accessorToCompare = "mvBidPrice1"; break;
            case "bid2":
                accessorToCompare = "mvBidPrice2";break;
            case "bid3":
                accessorToCompare = "mvBidPrice3";break;

            case "offer1":
                accessorToCompare = "mvOfferPrice1";break;
            case "offer2":
                accessorToCompare = "mvOfferPrice2";break;
            case "offer3":
                accessorToCompare = "mvOfferPrice3";break;

            case "matching":
                accessorToCompare = "mvMatchPrice";break;
                
            
        }

        if(accessorToCompare == null) {
            let style = bindingStyle.normal
            if(accessor == "mvCeiling"){
                style = Object.assign({}, style, fontColor)
                return <div className="value-ceil" style={fontColor.ceil}>{data[accessor]}</div>
            }
            else if(accessor == "mvFloor"){
                style = Object.assign({}, style, fontColor)
                return <div className="value-floor" style={fontColor.floor}>{data[accessor]}</div>
            }
            else if(accessor == "mvReferences"){
                style = Object.assign({}, style, fontColor)
                return <div className="value-ref" style={fontColor.ref}>{data[accessor]}</div>
            }
            else {
                style = Object.assign({}, style, fontColor)
                return <div className="value-static" style={fontColor.ref}>{data[accessor]}</div>
            }


        } else {
            if(refPrice > data[accessorToCompare]) {
                // down
                style = bindingStyle.down
            } else if(refPrice < data[accessorToCompare]) {
                style = bindingStyle.up
            }
            let value  = data[accessor]
            
            let className = "value-static"
            if(data["mvStockCode"] == this.props.instrumentData.mvStockCode) {
                
                let {oldInstrumentData} = this.state
                // console.log(oldInstrumentData)
                if(oldInstrumentData == null) {
                    className = "value-binding"
                }
                else if(oldInstrumentData.mvStockCode == data["mvStockCode"]) {
                    if(value == oldInstrumentData[accessor]) {
                        className = "value-static"
                    } else {
                        className = "value-binding"
                    }
                }
            }

            if(accessor.includes("Vol")) {
                value = utils.quantityShowFormatter(value)
            }
            // console.log(value)
            className += " value-change"
            return <div className={className} style={style}>{value}</div>
        }

    }

    _renderChangeValue(props, accessor) {

        let refPrice = props.original["mvReferences"]
        let matchPrice = props.original["mvMatchPrice"]
        
        let changeValue = Math.abs(utils.round(refPrice - matchPrice, 1))
        // console.log(changeValue, refPrice, matchPrice)
        let style = this.props.theme.bindingdata.nochange
        let className = "glyphicon glyphicon-triangle-";
        if(matchPrice == "" || matchPrice == undefined ) {
            changeValue = 0
            style = this.props.theme.bindingdata.nochange
            className += "---"
        } 
        else if(refPrice > matchPrice) {
            style = this.props.theme.bindingdata.down
            className += "bottom"
        } else if(refPrice < matchPrice) {
            style = this.props.theme.bindingdata.up
            className += "top"
        }

        let classNameBinding = "value-static"
        if(props.original["mvStockCode"] == this.props.instrumentData.mvStockCode) {
            let {oldInstrumentData} = this.state
            // console.log(oldInstrumentData)
            if(oldInstrumentData == null) {
                className = "value-binding"
            }
            else if(oldInstrumentData.mvStockCode == props.original["mvStockCode"]) {
                if(matchPrice == oldInstrumentData["mvMatchPrice"]) {
                    className = "value-static"
                } else {
                    className = "value-binding"
                }
            }
        }
        classNameBinding += " value-change"

        return (
            <div className={classNameBinding} style={style}>
                <span><span className={className}></span>{changeValue}</span>
            </div> 
        )
    }

    _renderChangePercent(props, accessor) {
        let refPrice = props.original["mvReferences"]
        let matchPrice = props.original["mvMatchPrice"]
        
        let percentChange = Math.abs(utils.round( (refPrice - matchPrice)/refPrice * 100 , 1))

        let style = this.props.theme.bindingdata.nochange
        let className = "glyphicon glyphicon-triangle-";
        if(matchPrice == "" || matchPrice == undefined ) {
            percentChange = 0
            style = this.props.theme.bindingdata.nochange
            className += "---"
        } 
        else if(props.original["mvReferences"] > props.original["mvMatchPrice"]) {
            style = this.props.theme.bindingdata.down
            className += "bottom"
        } else if(props.original["mvReferences"] < props.original["mvMatchPrice"]) {
            style = this.props.theme.bindingdata.up
            className += "top"
        }

        let classNameBinding = "value-static"
        if(props.original["mvStockCode"] == this.props.instrumentData.mvStockCode) {
            classNameBinding = "value-binding"
        }
        classNameBinding += " value-change"

        return (
            <div className={classNameBinding} style={style}>
                <span><span className={className}></span>{percentChange + "%"}</span>
            </div> 
        )
    }
    
    onPageChange(pageIndex) {
        this.setState({ pageIndex: pageIndex });
    }
}

const mapStateToProps = (state) => {
    return {
        listInstrumentData: state.trading.listInstrumentData,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,

        instrumentData: state.trading.instrumentData,
        reloadWatchlist: state.trading.reloadWatchlist
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },
    setDefaultOrderParams: (params) => { dispatch(actions.setDefaultOrderParams(params)) },
    onDesktopTabClick: (tabID, subTabID) => {
        dispatch(actions.onTabClick(tabID, subTabID));
    },
    showPlaceOrder: (param) => {
        dispatch(actions.showPopup(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchListTable)
