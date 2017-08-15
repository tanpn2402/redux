import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap';
import SearchBar from '../SearchBar'
import DataTable from '../DataTable'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Popup from '../Popup'
import WatchListToolbar from './WatchListToolbar'

class WatchList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns: [{
                    id: 'cb',
                    Header: props => < input id = "watchlist-cb-all"
                    type = 'checkbox'
                    className = "row-checkbox"
                    onChange = {
                        () => this.onRowSelected('ALL')
                    }
                    />,
                    maxWidth: 50,
                    width: 40,
                    Cell: props => {
                        if (props.original.mvShowCancelIcon !== null && props.original.mvShowCancelIcon === 'Y')
                            return ( <
                                input type = 'checkbox'
                                className = "watchlist-row-checkbox"
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
                    Header: 'Name',
                    //headerClassName: 'name-header-group',
                    columns: [{
                        Header: 'Stock',
                        accessor: '',
                        width: 60,
                    }, {
                        Header: 'Market',
                        accessor: '',
                        width: 60,
                    }]
                },
                {
                    Header: 'Reference',
                    columns: [{
                        Header: 'CE',
                        accessor: '',
                        width: 60,
                    }, {
                        Header: 'FL',
                        accessor: '',
                        width: 60,
                    }, {
                        Header: 'Ref',
                        accessor: '',
                        width: 60,
                    }]
                },
                {
                    Header: 'Best Bid',
                    columns: [{
                            Header: 'Pri.3',
                            accessor: '',
                            width: 60,
                        }, {
                            Header: 'Vol.3',
                            accessor: '',
                            width: 60,
                        },
                        {
                            Header: 'Pri.2',
                            accessor: '',
                            width: 60,
                        }, {
                            Header: 'Vol.2',
                            accessor: '',
                            width: 60,
                        }, {
                            Header: 'Pri.1',
                            accessor: '',
                            width: 60,
                        }, {
                            Header: 'Vol.1',
                            accessor: '',
                            width: 60,
                        }
                    ]
                },
                {
                    Header: 'MATCHING',
                    columns: [{
                        Header: 'Price',
                        width: 60,
                    }, {
                        Header: 'Volume',
                        width: 60,
                    }, {
                        Header: '+/-',
                        width: 60,
                    }, {
                        Header: '%',
                        width: 60,
                    }, {
                        Header: 'Total Vol',
                        width: 60,
                    }]
                },
                {
                    Header: 'Best Ask',
                    columns: [{
                            Header: 'Pri.3',
                            accessor: '',
                            width: 60,
                        }, {
                            Header: 'Vol.3',
                            accessor: '',
                            width: 60,
                        },
                        {
                            Header: 'Pri.2',
                            accessor: '',
                            width: 60,
                        }, {
                            Header: 'Vol.2',
                            accessor: '',
                            width: 60,
                        }, {
                            Header: 'Pri.1',
                            accessor: '',
                            width: 60,
                        }, {
                            Header: 'Vol.1',
                            accessor: '',
                            width: 60,
                        }
                    ]
                },
                {
                    Header: 'Price history',
                    columns: [{
                        Header: 'Open',
                        width: 60,
                    }, {
                        Header: 'High',
                        width: 60,
                    }, {
                        Header: 'Low',
                        width: 60,
                    }, {
                        Header: 'Avg',
                        width: 60,
                    }]
                },
                {
                    Header: 'Foreign investment',
                    columns: [{
                        Header: 'For. Buy',
                        width: 60,
                    }, {
                        Header: 'For. Sell',
                        width: 60,
                    }, {
                        Header: 'Room',
                        width: 60
                    }]
                }
            ],
            lgShow: false
        }

        this.rowSelected = []
        this.id = 'watchlist'
    }

  
    render() {
        
console.log("stock:  "+this.props.stockList)
        return (
            <div id={'watchlist-body'} className="layout-body">
                <WatchListToolbar stockList={this.props.stockList} />
                <DataTable
                    id="watchlist-table" 
                    columns={this.state.columns} 
                    />
            </div>
        )
        
    }

    componentDidMount() {
        // this.props.onRefresh()
    }
    
    

    

}
const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, props) => ({
    // onRefresh: () => {
    //     dispatch(actions.loadWatchList())
    //   },

})

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)