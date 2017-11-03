import React from "react";
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from "react-bootstrap";
import SearchBar from "../commons/SearchBar"
import { connect } from "react-redux"
import * as actions from "../../actions"
import DataUpperTable from "../DataUpperTable"
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


            <div style={{ width: '100%', height: "100%" }} id={this.id} className="enterorder-a buy">
                <div className="enterorder-form buy">
                    <div>
                        <Col xs={3}>
                            <Select
                                options={['11111', '22222', '33333']}

                            />
                        </Col>
                        <Col xs={6}>
                            <Select
                                options={['11111', '22222', '33333']}

                            />
                        </Col>
                        <Col xs={3}>
                            <Select
                                options={['11111', '22222', '33333']}

                            />

                        </Col>
                    </div>

                    <div>
                        <div className="col-xs-4" style={{ lineHeight: '2.2' }}>
                            Stock Code
                        </div>
                        <div className="col-xs-8">
                            <Col xs={5}>
                                <Select
                                    options={['11111', '22222', '33333']}
                                />

                            </Col>
                        <Col xs={7}>
                                <Input type="text" setRef={ref => this.ref =  ref}/>
                        </Col>
                        </div>

                    </div>


                    <div>
                        <div className="col-xs-4" style={{ lineHeight: '2.2' }}>
                            Quantity
                        </div>
                        <div className="col-xs-8">
                            
                            <Input type="number" setRef={ref => this.ref =  ref}/>
                            
                        </div>
                    </div>

                    <div>
                        <div className="col-xs-4" style={{ lineHeight: '2.2' }}>
                            Price
                        </div>
                        <div className="col-xs-8">
                        
                            <Input type="number" setRef={ref => this.ref =  ref}/>
                            
                        </div>
                    </div>
                </div>


                <div style={{ padding: '10px 10px', backgroundColor: '#f1f1f1', fontSize: '16px' }} >
                    <div style={{ display: 'inline' }}>
                        Consult sum of money
                    </div>

                    <div style={{ float: 'right', paddingRight: '3px' }}>
                        $00.0
                    </div>
                </div>


                <div style={{ padding: '6px 10px', marginTop: '10px'}} >
                    <div style={{ display: 'inline' }}>
                        Maximum quantity
                    </div>

                    <div style={{ color: '#ca3435', display: 'inline', marginLeft: '5px' }}>
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


class TechAnalysis extends React.Component {

    constructor(props) {
        super(props)

        this.id = "techanalysis"
        this.state = {
            activeKey: 1
        }
    }

    render() {
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
                            
                            
                        </TabItem>
                        <TabItem eventKey={3} title="Special" disabled>
                            
                            
                        </TabItem>
                    </TabControl>
                </Body>
            </div>


            
        )
    }

    onTabChange(key) {
        //console.log(key)

        this.setState({activeKey: key})
    }

}
const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch, props) => ({

})



export default connect(mapStateToProps, mapDispatchToProps)(TechAnalysis)
