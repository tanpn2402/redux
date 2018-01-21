import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from './DataTable'

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
                                return this.onRowStatusChange(row, "mvReferences")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.oddCol
                        }, {
                            id: 'ce',
                            Cell: row => {  
                                return this.onRowStatusChange(row, "mvCeiling")    
                                },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.oddCol
                        }, {
                            id: 'fl',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvFloor")
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
                            return this.onRowStatusChange(row, "mvBidPrice3")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    }, {
                        id: 'vol3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol3")
                        },
                        width: 55,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    },
                    {
                        id: 'pri2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice2")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    }, {
                        id: 'vol2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol2")
                        },
                        width: 55,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    }, {
                        id: 'pri1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice1")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol
                    }, {
                        id: 'vol1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol1")
                        },
                        width: 55,
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
                            return this.onRowStatusChange(row, "mvMatchPrice")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'volume',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVol")
                        },
                        width: 55,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'totalvol',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVolTotal")
                        },
                        width: 55,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'percent',
                        Header: '%',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchUpDown")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.oddCol,
                    }, {
                        id: 'change',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchUpDown")
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
                                return this.onRowStatusChange(row, "mvOfferPrice1")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        }, {
                            id: 'vol1',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol1")
                            },
                            width: 55,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        },
                        {
                            id: 'pri2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice2")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        }, {
                            id: 'vol2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol2")
                            },
                            width: 55,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        }, {
                            id: 'pri3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice3")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: this.props.theme.watchlist.evenCol
                        }, {
                            id: 'vol3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol3")
                            },
                            width: 55,
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
                            return this.onRowStatusChange(row, "mvForeignForBuy")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol,
                    }, {
                        id: 'forsell',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForSell")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: this.props.theme.watchlist.evenCol,
                    }, {
                        id: 'forroom',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvForeignForRoom")
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
                                return this.onRowStatusChange(row, "mvReferences")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.oddCol
                        }, {
                            id: 'ce',
                            Cell: row => {  
                                return this.onRowStatusChange(row, "mvCeiling")    
                                },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.oddCol
                        }, {
                            id: 'fl',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvFloor")
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
                            return this.onRowStatusChange(row, "mvBidPrice3")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    }, {
                        id: 'vol3',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol3")
                        },
                        width: 55,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    },
                    {
                        id: 'pri2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice2")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    }, {
                        id: 'vol2',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol2")
                        },
                        width: 55,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    }, {
                        id: 'pri1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidPrice1")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.evenCol
                    }, {
                        id: 'vol1',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvBidVol1")
                        },
                        width: 55,
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
                            return this.onRowStatusChange(row, "mvMatchPrice")
                        },
                        width: 48,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'volume',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVol")
                        },
                        width: 55,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'totalvol',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchVolTotal")
                        },
                        width: 55,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'percent',
                        Header: '%',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchUpDown")
                        },
                        width: 45,
                        skip: false,
                        show: true,
                        background: props.theme.watchlist.oddCol,
                    }, {
                        id: 'change',
                        Cell: row => {
                            return this.onRowStatusChange(row, "mvMatchUpDown")
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
                                return this.onRowStatusChange(row, "mvOfferPrice1")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        }, {
                            id: 'vol1',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol1")
                            },
                            width: 55,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        },
                        {
                            id: 'pri2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice2")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        }, {
                            id: 'vol2',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol2")
                            },
                            width: 55,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        }, {
                            id: 'pri3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferPrice3")
                            },
                            width: 48,
                            skip: false,
                            show: true,
                            background: props.theme.watchlist.evenCol
                        }, {
                            id: 'vol3',
                            Cell: row => {
                                return this.onRowStatusChange(row, "mvOfferVol3")
                            },
                            width: 55,
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

    onRowStatusChange(row, accessor) {
        // console.log(row, accessor)
        let data = row.original
        let color = this.props.theme.watchlist
        let bindingStyle = this.props.theme.bindingdata
        
        if (accessor == "mvCeiling") {
            return <div className="value-ceil" style={color.ceil}>{data[accessor]}</div>
        }
        else if (accessor == "mvFloor") {
            return <div className="value-floor" style={color.floor}>{data[accessor]}</div>
        }
        else if (accessor == "mvReferences") {
            return <div className="value-ref" style={color.ref}>{data[accessor]}</div>            
        }

        if(data[accessor] == null) {
            return <div className="value unchange" style={bindingStyle.normal}>-</div>
        } else {
            let state = data["mvMatchPrice"] > data["mvReferences"] ? "up" : 
                data["mvMatchPrice"] < data["mvReferences"] ? "down" : "normal"
            let content = data[accessor]

            if(accessor == "mvMatchUpDown" || accessor == "mvMatchUpDown") {
                let className = ("glyphicon glyphicon-triangle-") + (state == "up" ? "top" : "bottom")
                content = <span><span className={className}></span>{data[accessor]}</span>
            }

            return <div className="value value-change" style={bindingStyle[state]}>{content}</div>
                
        }

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
