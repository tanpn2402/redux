export default {
    title: 'light',
    button: {
        confirm: {
            backgroundColor: '#c40909',
            color: '#FFFFFF',
            border: '2px solid #c40909'
        },
        cancel: {
            backgroundColor: '#999',
            color: '#FFFFFF',
            border: '2px solid #999'
        },
        buy: {
            backgroundColor: "#4990e2",
            color: "white",
            border: "2px solid #4990e2"
        },
        sell: {
            backgroundColor: "#f67522",
            color: "white",
            border: "2px solid #f67522"
        }
    },
    font:{
        //+++++++++++++++++++++++++++++++++++++++++++++++
        //                      MAIN                    +
        //  used in DataTable.js     (aggregated rows)  +
        //  used in Popup.js         (modal title)      +
        //                                              +
        //+++++++++++++++++++++++++++++++++++++++++++++++
        main: {
            color: '#000'
        },
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        //                      SUB1                          +
        //  used in DataTable.js            (normal rows)     +
        //  used in Pagination.js           ("Page x of xx")  +
        //  used in AccountInfo.js          (normal rows)     +
        //  used in AdvanceBankPanel.js     (normal rows)     +
        //  used in AdvancePanel.js         (normal rows)     +
        //  used in EntitlementPanel.js     (normal rows)     +
        //  used in FundTransferPanel.js    (normal rows)     +
        //  used in LoanRefundPanel.js      (normal rows)     +
        //  used in StockMarketInfo.js      (normal rows)     +
        //  used in Sumary.js               (normal rows)     +
        //                                                    +
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        sub1:{
            color: '#000'
        },
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //                       SUB2                                        +
        //  used in DataTable.js     (header and group header)               +
        //  used in SearchBar.js     (label of each component in searchbar)  +
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        sub2:{
            color: '#000'
        },

        // userd in trading status
        sub3: {
            color: "#5f5f5f"
        },
        disable: {
            color: "#B3B3B3",
            fontWeight: "normal"
        },
        ceil: {
            color: '#ff00ff'
        },
        floor: {
            color: '#66ccff'
        },
        ref: {
            color: '#ffcc00'
        }
    },
    page: {
        pageHeader: {
            backgroundColor: '#ffffff'
        },
        background: {
            backgroundColor: '#f2f2f2'
        },
        pageMenuNav: {
            backgroundColor: '#005aa0'
        },
        pageMainContent:{
            
        }
    },
    searchbar: {
        default: {
            button:{
                backgroundColor: "#337AB7",
                color: "#FFFAFA",
                borderColor: "#2E6DA4"
            }
        }
    },
    statusbar: {
        backgroundColor: '#005aa0'
    },
    widget: {
        widgetBackground: {
            backgroundColor: '#FFFFFF'
        },
        widgetHeader: {
            backgroundColor: '#FFFFFF',
            color: "#000"
        },
        widgetBody: {
            // border: '1.75px solid #FFFFFF'
        }
    },
    // Comment to use default library theme, uncomment to customize
    table: {
        tableHeader: {
            backgroundColor: 'rgba(38, 38, 38, 0.2)',
            color: "#000"
        },
        tableFooter: {
                backgroundColor: '#FFF',
                color: '#000'
        },
        tableBody: {
    
        },
        tableSearch: {
    
        },
        rowOdd: {
            backgroundColor: '#eaeaea',
            color: "#000"
        },
        rowEven: {
            backgroundColor: '#FFF',
            color: "#000"
        },
        filterRow: {
            backgroundColor: 'rgb(222, 222, 222)',
            color: '#000000'
        },
        pivotRow: {
            background: '#0644a8',
            color: '#FFF',
            fontWeight: 'normal'
        },
        noDataDisplay: {
            backgroundColor: 'transparent',
            color: '#000000'
        },
        colNumber: {
            textAlign: "right",
            justifyContent: "flex-end"
        },
        colText: {
            textAlign: "left",
            justifyContent: "flex-start"
        }
    },
    tab:{
        normal:{
            // backgroundColor: '#286CAE'
        },
        active:{
            // backgroundColor: '#fff',
            // color: '#555'
        }
    },
    tabcontrol:{
        normal:{
            backgroundColor: '#eaeaea',
            // color: "#9b9b9b"
        },
        active:{
            // backgroundColor: '#FFF',
            // color: "#000"
        }
    },
    setting: {
        settingTitle: {
            //backgroundColor: '#02407D'
        },
        settingPanel: {
            //backgroundColor: '#F0F0F0'
        }
    },
    profile: {
        profileTitle: {
            //backgroundColor: '#02407D'
        },
        profilePanel: {
            //backgroundColor: '#F0F0F0'
        }
    },
    chart: {
        pieChart: {
            //   backgroundColor: '#EEECEC'
        },
        popoverChart: {
            backgroundColor: '#FFF',
            color: '#000',
            referenceLine:{
                color: '#26547C'
            },
            increaseLine:{
                color: '#00E513'
            },
            decreaseLine:{
                color: '#E50000'
            },
            chartFrame: {
                backgroundColor: "#F2F2F2",
                width: 550,
                border: "1px solid #6790fc",
                maxWidth: "none"
            }
        }
    },
    techanalysis: {
        backgroundColor: '#FFFFFF',
        chartConfig: {
            chart: {
                appearance: {
                    strokeNormal: "#4682B4",
                    strokeDown: "#1054A9",
                    strokeUp: "#CC0000",
                    fill: "#4682B4",
                    opacity: 0.5,
                    wickStroke: "#000000",
                    background: "#FFFFFF",
                    theme: "light"
                },
            },

            axis: {
                stroke: "#000000",
                tickStroke: "#000000"

            },

            control: {
                edgeFill1: "#FFFFFF",
                edgeFill2: "#250B98",
                edgeStroke: "#000000",
                strokeOpacity: 1,
                edgeRadius: 5,
                strokeWidth: 1,
                stroke: "#000000",
                fill: "#8AAFE2",
                fillOpacity: 0.2,
                gannFanFill: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f"]


            }
        }
    },
    scrolling: {
        button: {
            backgroundColor: "#f5f5f5",
            color: "#005aa0",
        },
        background: {
            backgroundColor: "#FFF"
        }
    },
    popup: {
        header: {
            backgroundColor: "#FFF",
            color: "#000"
        },
        body: {
            backgroundColor: "#FFF",
            color: "#000"
        },
        table: {
            rowEven: {
                backgroundColor: "#FFF"
            },
            rowOdd: {
                backgroundColor: "rgb(241,241,241)"
            }
        }
    },
    watchlist: {
        up: {
            color: "rgb(112, 168, 0)",
        },
        down: {
            color: "#ff0000",
        },
        floor: {
            color: "#000",
        },
        ceil: {
            color: "#000",
        },
        ref: {
            color: "#000",
        },
        nochange: {
            color: "#000",
        },
        oddCol: {
            backgroundColor: "rgba(226, 226, 226, 0.4)",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            justifyContent:'flex-start',
            alignItems:'center',
        },
        evenCol: {
            backgroundColor: "#FFF",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            justifyContent:'flex-start',
            alignItems:'center',
        }
    },
    number:{
        col:{
            justifyContent:'flex-end',
        }, 
        col2:{
            alignItems:'center',
            justifyContent:'flex-end',
        }
    },
    placeorder: {
        tabBS: {
            active: {
                backgroundColor: "rgba(0, 88, 153, 0.5)",
                color: "#000",
                fontWeight: 700,
            },
            normal: {
                backgroundColor: "#FFF",
                color: "#999",
                fontWeight: 500,
            }
        },
        background: {
            buy: {
                backgroundColor: "#B1E69A"
            },
            sell: {
                backgroundColor: "#FBD4D9"
            }
        }
    },
    bindingdata: {
        up: {
            color: "green"
        },
        down: {
            color: "#ea0070"
        },
        normal: {
            color: "#000"
        },
        nochange: {
            color: "#fc0"
        }
    },


    social:{
        socialHeader: {
            backgroundColor: '#2159a0',
            color: "#FFF"
        },
        socialBody: {
            backgroundColor: '#FFF',

        },
        socialPostControl: {
            backgroundColor: '',
        },
        socialRank: {
            borderColor: ''
        },
        socialFol: {
            backgroundColor: "",
            color: ""
        },
        socialFollowed: {
            backgroundColor: "#FFF",
            borderColor: "#2158a0",
            color: "#2158a0"
        },
        socialBG:{
            backgroundColor: '#f3f3f2'
        }
    },
    form: {
        background:{
            backgroundColor: '#b1e69a'
        },
        button: {
            submit: {
                border: "2px solid #005899",
                color: "#FFF",
                backgroundColor: "#005899"
            },
            clear: {
                border: "2px solid #005899",
                color: "#005899",
                backgroundColor: "#FFF"
            }
        }
    },
    accountselector: {
        background: "#2159a0",
        color: "#FFF"
    }

}