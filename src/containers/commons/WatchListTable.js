import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from './DataTable'
import * as utils from '../../utils'

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
                            return (<input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
                            )
                        },
                        sortable: false,
                        skip: true,
                        background: this.props.theme.watchlist.evenCol,
                    }],
                    skip: true,
                    show: true,
                    background: Object.assign({}, this.props.theme.watchlist.evenCol, {borderTop: this.props.theme.watchlist.evenCol.borderBottom }) ,
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
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.oddCol
                        }, {
                            id: 'ce',
                            Cell: row => {  
                                return this.onRowStatusChange(row, "mvCeiling", "reference")    
                                },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.oddCol
                        }, {
                            id: 'fl',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvFloor", "reference")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.oddCol
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
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice3", "bid3")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    }, {
                        id: 'vol3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol3", "bid3")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    },
                    {
                        id: 'pri2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice2", "bid2")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    }, {
                        id: 'vol2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol2", "bid2")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    }, {
                        id: 'pri1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice1", "bid1")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    }, {
                        id: 'vol1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol1", "bid1")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
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
                        width: 45,
                        show: true,
                        skip: false,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'market',
                        accessor: 'mvMarket',
                        width: 45,
                        show: true,
                        skip: false,
                        background: this.props.theme.watchlist.oddCol,
                    },
                    {
                        id: 'price',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchPrice", "matching")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'volume',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVol", "matching")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'totalvol',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVolTotal", "matching")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'percent',
                        Header: '%',
                        Cell: row => {
                            return this._renderChangePercent(row, "mvMatchUpDown", "matching")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'change',
                        Cell: row => {
                            return this._renderChangeValue(row, "mvMatchUpDown", "matching")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
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
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice1", "offer1")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        }, {
                            id: 'vol1',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol1", "offer1")
                            },
                            width: 100,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        },
                        {
                            id: 'pri2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice2", "offer2")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        }, {
                            id: 'vol2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol2", "offer2")
                            },
                            width: 100,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        }, {
                            id: 'pri3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice3", "offer3")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        }, {
                            id: 'vol3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol3", "offer3")
                            },
                            width: 100,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
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
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'high',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvHigh")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'low',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvLow")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'avg',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvNomial")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
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
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol,
                    }, {
                        id: 'forsell',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForSell", "foreigninvestment")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol,
                    }, {
                        id: 'forroom',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForRoom", "foreigninvestment")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol,
                    }],
                    skip: false,
                    show: true,
                }
            ],
            pageIndex: 1,
            disableRemove: true,
            watchStockList: [],
            mvInstrument: null
        }

        this.balance = {
            mvOpen: 80.4,
            mvHigh: 70.5,
            mvLow: 60.5,
            mvNomial: 11.5,

            mvCeiling: 80.216,
            mvFloor: 70.135,
            mvReferences: 80.235,

            mvBidPrice1: 85.56,
            mvBidPrice2: 75.26,
            mvBidPrice3: 65.85,

            mvBidVol1: 75.76,
            mvBidVol2: 47.52,
            mvBidVol3: 96.67,

            mvMatchPrice: 86.2,
            mvMatchVol: 569.6,
            mvMatchUpDown: 1.5,
            mvMatchVolTotal: 469.56,


            mvOfferPrice1: 65.26,
            mvOfferPrice2: 87.12,
            mvOfferPrice3: 97.45,

            mvOfferVol1: 65.56,
            mvOfferVol2: 97.34,
            mvOfferVol3: 65.6,

            mvForeignForBuy: 56.5,
            mvForeignForSell: 69.3,
            mvForeignForRoom: 11.6
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
                        width: 30,
                        Cell: props => {
                            return (<input type='checkbox' className={this.id + "-row-checkbox"}
                                onChange={() => { this.onRowSelected(props.original) }} />
                            )
                        },
                        sortable: false,
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
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.oddCol
                        }, {
                            id: 'ce',
                            Cell: row => {  
                                return this.onRowStatusChange(row, "mvCeiling", "reference")    
                                },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.oddCol
                        }, {
                            id: 'fl',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvFloor", "reference")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.oddCol
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
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    }, {
                        id: 'vol3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol3", "bid3")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    },
                    {
                        id: 'pri2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice2", "bid2")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    }, {
                        id: 'vol2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol2", "bid2")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    }, {
                        id: 'pri1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice1", "bid1")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    }, {
                        id: 'vol1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol1", "bid1")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
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
                        width: 45,
                        show: true,
                        skip: false,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'market',
                        accessor: 'mvMarket',
                        width: 45,
                        show: true,
                        skip: false,
                        background: props.theme.watchlist.oddCol,
                    },
                    {
                        id: 'price',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchPrice", "matching")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'volume',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVol", "matching")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'totalvol',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVolTotal", "matching")
                        },
                        width: 100,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'percent',
                        Header: '%',
                        Cell: row => {
                            return this._renderChangePercent(row, "mvMatchUpDown", "matching")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'change',
                        Cell: row => {
                            return this._renderChangeValue(row, "mvMatchUpDown", "matching")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
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
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        }, {
                            id: 'vol1',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol1", "offer1")
                            },
                            width: 100,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        },
                        {
                            id: 'pri2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice2", "offer2")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        }, {
                            id: 'vol2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol2", "offer2")
                            },
                            width: 100,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        }, {
                            id: 'pri3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice3", "offer3")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        }, {
                            id: 'vol3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol3", "offer3")
                            },
                            width: 100,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
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
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'high',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvHigh")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'low',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvLow")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'avg',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvNomial")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
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
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol,
                    }, {
                        id: 'forsell',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForSell")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol,
                    }, {
                        id: 'forroom',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForRoom")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol,
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
            this.reloadColumTable(nextProps)
        }

        if(nextProps.listInstrumentInWatchList.length != this.props.listInstrumentInWatchList.length) {
            document.getElementById('watchlist-cb-all').checked = false
            var checkboxes = document.getElementsByClassName('watchlist-row-checkbox')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }
    }

    componentDidMount() {
        // this.onSubscribeToServer()
    }

    componentDidUpdate(){
        let classList = document.querySelector(".value")
        if(classList != null) {
            let className = classList.className
            let newClassName = className.replace(" value-change", "")
            document.querySelector(".value").className = newClassName
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
        
    }

    onCellClick(state, rowInfo, cell, instance) {
        if(rowInfo == undefined) return
        let data = rowInfo.original
        let cellID = cell.id

        let stockCode = data.mvStockCode
        let market = data.mvMarket

        this.props.changeInstrument(stockCode)

    }

    render() {

        let {listInstrumentData, listInstrumentInWatchList, listInstrumentInPortfolio} = this.props
        let data = listInstrumentData.filter(stock => {
            if(listInstrumentInWatchList.indexOf(stock.mvStockCode) > -1) {
                return stock
            }
        })
        // console.log(this.props.language)
        return (
            <DataTable
                theme={this.props.theme}
                id="watchlist"
                columns={this.state.columns}
                tableData={data}
                onRowSelected={(param) => this.onRowSelected(param)}
                language={this.props.language}
                onCellClick={this.onCellClick.bind(this)}

                pageIndex={this.state.pageIndex}
                totalPage={Math.ceil(data.length/15)}
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
            return <div className="value-ceil" style={bindingStyle.normal}>{data[accessor]}</div>
        } else {
            if(refPrice > data[accessorToCompare]) {
                // down
                style = bindingStyle.down
            } else if(refPrice < data[accessorToCompare]) {
                style = bindingStyle.up
            }
            let value  = data[accessor]
            if(accessor.includes("Vol")) {
                value = utils.currencyShowFormatter(value)
            }

            return <div className="value value-change" style={style}>{value}</div>
        }
        



        


        // let data = row.original
        // let color = this.props.theme.watchlist
        // let bindingStyle = this.props.theme.bindingdata
        
        // if (accessor == "mvCeiling") {
        //     return <div className="value-ceil" style={color.ceil}>{data[accessor]}</div>
        // }
        // else if (accessor == "mvFloor") {
        //     return <div className="value-floor" style={color.floor}>{data[accessor]}</div>
        // }
        // else if (accessor == "mvReferences") {
        //     return <div className="value-ref" style={color.ref}>{data[accessor]}</div>            
        // }

        // if(data[accessor] == null) {
        //     return <div className="value unchange" style={bindingStyle.normal}>-</div>
        // } else {
        //     let state = data["mvMatchPrice"] > data["mvReferences"] ? "up" : 
        //         data["mvMatchPrice"] < data["mvReferences"] ? "down" : "normal"
        //     let content = data[accessor]

        //     if(accessor == "mvMatchUpDown" || accessor == "mvMatchUpDown") {
        //         let className = ("glyphicon glyphicon-triangle-") + (state == "up" ? "top" : "bottom")
        //         content = <span><span className={className}></span>{data[accessor]}</span>
        //     }

        //     return <div className="value value-change" style={bindingStyle[state]}>{content}</div>
                
        // }

    }

    _renderChangeValue(props, accessor) {

        let refPrice = props.original["mvReferences"]
        let matchPrice = props.original["mvMatchPrice"]
        
        let changeValue = Math.abs(utils.round(refPrice - matchPrice, 1))
        console.log(changeValue, refPrice, matchPrice)
        let style = this.props.theme.bindingdata.nochange
        let className = "glyphicon glyphicon-triangle-";
        if(refPrice > matchPrice) {
            style = this.props.theme.bindingdata.down
            className += "bottom"
        } else if(refPrice < matchPrice) {
            style = this.props.theme.bindingdata.up
            className += "top"
        }


        return (
            <div className="value value-change" style={style}>
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
        if(props.original["mvReferences"] > props.original["mvMatchPrice"]) {
            style = this.props.theme.bindingdata.down
            className += "bottom"
        } else if(props.original["mvReferences"] < props.original["mvMatchPrice"]) {
            style = this.props.theme.bindingdata.up
            className += "top"
        }


        return (
            <div className="value value-change" style={style}>
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
        listInstrumentInPortfolio: state.trading.listInstrumentInPortfolio,
        listInstrumentInWatchList: state.trading.listInstrumentInWatchList,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    changeInstrument: (ins) => { dispatch(actions.changeInstrument(ins)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchListTable)
