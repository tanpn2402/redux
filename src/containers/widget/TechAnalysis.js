import React from "react";
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from "react-bootstrap";
import SearchBar from "../commons/SearchBar"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Pagination from "../commons/Pagination"
import Title from "../commons/WidgetTitle"
import Body from "../commons/WidgetBody"

import Chart from "../commons/chart/index"

import {TabControl, TabItem} from "../commons/TabControl"
import Select from "../commons/Select"
import Input from "../commons/Input"

class EnterOrder extends React.Component {
    constructor(props) {
        super(props)

        this.id = "enterorder-a"
        this.state = {
        }
    }

    render() {
        return (


            <div style={{ width: "100%", height: "100%" }} id={this.id} className="enterorder-a buy">
                <div className="enterorder-form buy">
                    <div>
                        <Col xs={3}>
                            <Select
                                options={["11111", "22222", "33333"]}

                            />
                        </Col>
                        <Col xs={6}>
                            <Select
                                options={["11111", "22222", "33333"]}

                            />
                        </Col>
                        <Col xs={3}>
                            <Select
                                options={["11111", "22222", "33333"]}

                            />

                        </Col>
                    </div>

                    <div>
                        <div className="col-xs-4" style={{ lineHeight: "2.2" }}>
                            Stock Code
                        </div>
                        <div className="col-xs-8">
                            <Col xs={5}>
                                <Select
                                    options={["11111", "22222", "33333"]}
                                />

                            </Col>
                        <Col xs={7}>
                                <Input type="text" setRef={ref => this.ref =  ref}/>
                        </Col>
                        </div>

                    </div>


                    <div>
                        <div className="col-xs-4" style={{ lineHeight: "2.2" }}>
                            Quantity
                        </div>
                        <div className="col-xs-8">
                            
                            <Input type="number" setRef={ref => this.ref =  ref}/>
                            
                        </div>
                    </div>

                    <div>
                        <div className="col-xs-4" style={{ lineHeight: "2.2" }}>
                            Price
                        </div>
                        <div className="col-xs-8">
                        
                            <Input type="number" setRef={ref => this.ref =  ref}/>
                            
                        </div>
                    </div>
                </div>


                <div style={{ padding: "10px 10px", backgroundColor: "#f1f1f1", fontSize: "16px" }} >
                    <div style={{ display: "inline" }}>
                        Consult sum of money
                    </div>

                    <div style={{ float: "right", paddingRight: "3px" }}>
                        $00.0
                    </div>
                </div>


                <div style={{ padding: "6px 10px", marginTop: "10px"}} >
                    <div style={{ display: "inline" }}>
                        Maximum quantity
                    </div>

                    <div style={{ color: "#ca3435", display: "inline", marginLeft: "5px" }}>
                        200
                    </div>
                </div>

                <div className="group-btn-action form-submit-action">
                    <span>
                        <button type="reset" className="hks-btn btn-cancel"
                            onClick={this.handleResetForm.bind(this)}>
                            {this.props.language.button.reset}
                        </button>
                        <button type="submit" className="hks-btn btn-submit"
                            onClick={this.handleSubmit.bind(this)}>
                            {this.props.language.button.buy}
                        </button>
                    </span>
                </div>
            </div>


            
        )
    }

    handleSubmit() {

    }

    handleResetForm() {

    }
}



class ListView extends React.Component {
    constructor(props) {
        super(props)

        

        this.onClick = this.onClick.bind(this)
        this.state = {
            toRender: false,
            compoWid : 0
        }
    }

    toggleIconExpand(icon) {
        if(icon == "+") {
            return "-"
        } else return "+"
    }

    onClick(id) {
        console.log(id)
        document.getElementById(id + "-icon").innerHTML = this.toggleIconExpand(document.getElementById(id + "-icon").innerHTML)
    }

    createColumns(columns) {
        let remainWid = this.state.compoWid - 40
        let i = 0
        let col = []
        while (remainWid > 0 ) {
            if( columns[i].width && remainWid > columns[i].width*0.7 ) {
                if( remainWid > columns[i].width ) {
                    col.push({
                        id: columns[i].id,
                        accessor: columns[i].accessor,
                        width: columns[i].width,
                        style: columns[i].style
                    })
                }
                else {
                    col.push({
                        id: columns[i].id,
                        accessor: columns[i].accessor,
                        width: remainWid,
                        style: columns[i].style
                    })
                }

                remainWid -= columns[i].width
                i += 1
            } else {
                col[i - 1].width += remainWid
                remainWid = -1
            }
        }

        return col
    }

    getMaxWid(columns, col) {
        let max = 0
        let addCol = []
        for(let i = 0; i < columns.length; i++) {
            let t = col.filter(f => f.id === columns[i].id)
            if( t.length > 0 ) {
                continue
            } else {
                addCol.push(columns[i])
                if(columns[i].width > max) {
                    max = columns[i].width
                }
            }
        }
        return {
            maxWid: max,
            addCol: addCol
        }
    }

    render() {
        let language = this.props.language
        let data = this.props.data
        let columns = this.props.columns

        console.log(this.props.columns)
        let width = window.innerWidth


        
        let col = this.createColumns(columns)
        let maxWid = this.getMaxWid(columns, col).maxWid
        let addCol = this.getMaxWid(columns, col).addCol
        
        console.log(col)
        let rowStamp = (new Date()).getTime()
        let row = 1
        return (
            <div className="listview-control" ref={node => this.lv = node}>

                {
                    !this.state.toRender ? null : 
                    
                    (
                        <div className="rt-lv" style={{ height: "100%" }}>
                            <div className="lv-thead">
                                <div className="lv-tr">
                                    <div className="lv-th" style={{ width: "30px" }}></div>
                                    {
                                        col.map(hd => {
                                            return (
                                                <div className="lv-th" style={Object.assign({ width: hd.width }, hd.style)}>
                                                    {language.header[hd.id]}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="lv-tbody">
                                <div className="lv-tbody-b">
                                {
                                    data.map( d => {
                                        let rowId = "r-" + rowStamp + "-" + (row++) 
                                        return (
                                        
                                            <div className="lv-tr-group">
                                                <div data-toggle="collapse" data-target={"#" + rowId} className="lv-tr odd" onClick={e => this.onClick(rowId)}>
                                                    <div className="lv-td icon" style={{ width: "30px" }}>
                                                        <span className="lv-expand-icon" id={rowId + "-icon"}>+</span>
                                                    </div>

                                                    {
                                                        col.map(hd => {
                                                            return (
                                                                <div className="lv-td" style={Object.assign({ width: hd.width }, hd.style)}>
                                                                    {d[hd.accessor]}
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </div>

                                                <div id={rowId} className="collapse">
                                                    <div className="lv-tr-add">
                                                        {
                                                            addCol.map( col => {
                                                                return (
                                                                    <div className="lv-group">
                                                                        <div className="lv-hd" style={{ width: maxWid }}>
                                                                            { language.header[col.id] }
                                                                        </div>
                                                                        <div className="lv-vl" style={{ width: maxWid }}>
                                                                            { d[col.accessor] }
                                                                        </div>
                                                                    </div> 
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                       
                                        )}
                                    )
                                }
                                </div>
                            </div>

                            <div className="lv-tfooter">
                                <div style={{ float: "left", paddingLeft: '10px' }}>
                                   {"< Prev"}
                                </div>
                                <div style={{ textAlign: "center", position: "absolute", width: '100%' }}>
                                    Page 1 of 5
                                </div>
                                <div style={{ float: "right", paddingRight: '10px' }}>
                                    {" Next >"}
                                </div>
                            </div>
                        </div>
                    )
                }
        
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            compoWid: this.lv.offsetWidth,
            toRender: true
        })
    }
}

class TechAnalysis extends React.Component {

    constructor(props) {
        super(props)

        this.id = "techanalysis"

        this.param = {
            mvStatus: "ALL",
            mvOrderType: "ALL",
            mvOrderBS: "ALL",
            page: 1,
            start: 0,
            limit: 5,
        }

        this.state = {
            activeKey: 1,
            columns: [
                {
                    id: "orderID",
                    accessor: "mvOrderGroupID",
                    width: 100, 
                },
                {
                    id: "stockid",
                    accessor: "mvStockID",
                    width: 90,   
                    style: {textAlign:  "center"}                  
                },
                {
                    id: "price",
                    accessor: "mvPrice",
                    width: 130,
                    style: {textAlign:  "right"}    
                },
                {
                    id: "buysell",
                    accessor: "mvBS",
                    width: 50,
                    style: {textAlign:  "center"}    
                },
                {
                    id: "quantity",
                    accessor: "mvQty",
                    width: 80,
                },
                {
                    id: "pendingQty",
                    accessor: "mvPendingQty",
                    width: 80,
                },
                {
                    id: "executedQty",
                    accessor: "mvPendingQty",
                    width: 80,
                },
                {
                    id: "avgprice",
                    accessor: "mvAvgPriceValue",
                    width: 100,
                },
                {
                    id: "status",
                    accessor: "mvStatus",
                    width: 80,
                },
                {
                    id: "ordertype",
                    accessor: "mvOrderType",
                    width: 80,
                },
                {
                    id: "feetax",
                    accessor: "mvOrderType",
                    width: 80,
                }
            ]
        }
    }

    render() {
        //console.log(this.props.data)
        return (
            

            <div style={{ height: "100%", position: "relative" }} id={this.id}>
                <Title language={this.props.language} theme={this.props.theme} widgetID={"techanalysis"}>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}>
                    <TabControl activeKey={this.state.activeKey} onTabChange={this.onTabChange.bind(this)}>
                        <TabItem eventKey={1} title="Normal" >
                            <EnterOrder language={this.props.language}/>
                            
                        </TabItem>
                        <TabItem eventKey={2} title="Auction">
                            <div style={{ padding: "0px", height: "100%" }}>
                                <ListView language={this.props.language.orderjournal} 
                                    columns={this.state.columns} 
                                    data={this.props.data.mvOrderBeanList}/>
                            </div>
                            
                            
                        </TabItem>
                        <TabItem eventKey={3} title="Special" disabled>
                            
                            
                        </TabItem>
                    </TabControl>
                </Body>
            </div>


            
        )
    }

    componentDidMount() {
        this.props.onSearch(this.param)

    }

    onTabChange(key) {
        //console.log(key)

        this.setState({activeKey: key})
    }

}
const mapStateToProps = (state) => {
    return {
        data: state.orderjournal.enquiryorder
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onSearch: (param, reload) => {
        dispatch(actions.getEnquiry(param, reload))
    },

})



export default connect(mapStateToProps, mapDispatchToProps)(TechAnalysis)
