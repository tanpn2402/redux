import React, { Component } from 'react';
import { Button, Modal, Accordion, Panel } from 'react-bootstrap';
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import DataTable from '../commons/DataTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'
import Collapse from './Collapse'

class DetailOrder extends Component {
    constructor(props) {
        super(props)

        this.id = 'detailorder-popup'
        this.panels = ['orderinfo', 'exesum', 'orderaudit']
        this.activePanel = 'orderinfo'
    }

    componentWillReceiveProps(nextProps) {

    }

    // componentDidMount() {
    //     document.getElementById(this.activePanel).className = 'glyphicon glyphicon-chevron-down'
    //     this.panels.forEach(id => {
    //         let panel = document.getElementById(id)
    //         if (id != this.activePanel) {
    //             this[id].parentElement.style.background = '#8ab4f7'
    //             this[id].parentElement.style.color = '#000'
    //         } else {
    //             this[id].parentElement.style.background = '#166ef9'
    //             this[id].parentElement.style.color = '#fff'
    //         }
    //     })
    // }

    handleSelect(e) {
        if (this.activePanel == e && document.getElementById(e).className.includes('down')) {
            document.getElementById(e).className = 'glyphicon glyphicon-chevron-right'
            this[e].parentElement.style.background = '#8ab4f7'
            this[e].parentElement.style.color = '#000'
            return
        }
        this.panels.forEach(id => {
            let panel = document.getElementById(id)
            if (id != e) {
                panel.className = 'glyphicon glyphicon-chevron-right'
                this[id].parentElement.style.background = '#8ab4f7'
                this[id].parentElement.style.color = '#000'
            } else {
                panel.className = panel.className.includes('right') ? 'glyphicon glyphicon-chevron-down' : 'glyphicon glyphicon-chevron-right'
                this[id].parentElement.style.background = '#166ef9'
                this[id].parentElement.style.color = '#fff'
            }
        })
        this.activePanel = e
    }

    render() {
        let language = this.props.language
        let collapses = [
            {
                id: 'test_1',
                header: 'Order Info',
                body: (data, content1, content2) => {
                    return (<div>
                        <div>
                            <span style={{ fontWeight: 'bold' }} >Account No. # </span> <span>{data.mvClientID}</span>
                            <span style={{ fontWeight: 'bold', marginLeft: '15px' }}>Transaction Date # </span><span>{data.mvActivationDate}</span>
                        </div>
                        <div>
                            <div style={{ display: 'inline-block', width: '50%' }}>
                                {
                                    content1.map((content, index) => {
                                        return (
                                            <div style={{ backgroundColor: index % 2 == 0 ? 'white' : '#E0E0E0' }} >
                                                <div style={{ display: 'inline-block', width: '50%', textAlign: 'right', paddingRight: '7px', fontWeight: 'bold' }}>
                                                    {content.text}
                                                </div>
                                                <div style={{ display: 'inline-block', width: '50%', textAlign: 'left', paddingLeft: '7px' }}>
                                                    {data[content.value]}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div style={{ display: 'inline-block', width: '50%' }}>
                                {
                                    content2.map((content, index) => {
                                        return (
                                            <div style={{ backgroundColor: index % 2 == 0 ? 'white' : '#E0E0E0' }}>
                                                <div style={{ display: 'inline-block', width: '50%', textAlign: 'right', paddingRight: '5px', fontWeight: 'bold' }}>
                                                    {content.text}
                                                </div>
                                                <div style={{ display: 'inline-block', width: '50%', textAlign: 'left', paddingLeft: '5px' }}>
                                                    {data[content.value]}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>)
                },
            },
            {
                id: 'test_2',
                header: 'Execution Summary',
                body: (data, content1, content2) => {
                    return 'bbb'
                },
            },
            {
                id: 'test_3',
                header: 'Order Audit',
                body: (data, content1, content2) => {
                    return (
                        <div>
                            <div style={{ backgroundColor: '#E0E0E0', fontWeight: 'bold' }} >
                                <div style={{ display: 'inline-block', width: '25%' }} >Time</div>
                                <div style={{ display: 'inline-block', width: '25%' }}>Action</div>
                                <div style={{ display: 'inline-block', width: '20%' }}>Price</div>
                                <div style={{ display: 'inline-block', width: '20%' }}>Quantity</div>
                                <div style={{ display: 'inline-block' }}>Remarks</div>
                            </div>

                            <div>
                                <div style={{ display: 'inline-block', width: '25%' }} >{data.mvActivationDate + " " + data.mvInputTime}</div>
                                <div style={{ display: 'inline-block', width: '25%' }}>no data</div>
                                <div style={{ display: 'inline-block', width: '20%' }}>{data.mvPrice}</div>
                                <div style={{ display: 'inline-block', width: '20%' }}>{data.mvQty}</div>
                                <div style={{ display: 'inline-block' }}>{data.mvRemark}</div>
                            </div>
                        </div>
                    )
                },
            }
        ]
        let content1 = [
            {
                text: 'Stock Code',
                value: 'mvStockID'
            },
            {
                text: 'Stock Name',
                value: 'mvStockName'
            },
            {
                text: 'Market',
                value: 'mvMarketID'
            },
            {
                text: 'Stock Currency',
                value: 'mvCurrencyID'
            },
            {
                text: 'Order Type',
                value: 'mvOrderType'
            },
            {
                text: 'No. of Shares',
                value: 'mvQty'
            },
            {
                text: 'OS Qty',
                value: 'mvQty'
            },
            {
                text: 'Net Amount',
                value: 'mvNetAmt'
            }
        ]
        let content2 = [
            {
                text: 'Order No.',
                value: 'mvOrderID'
            },
            {
                text: 'Quantity',
                value: 'mvQty'
            },
            {
                text: 'B/S',
                value: 'mvBS'
            },
            {
                text: 'Order Price',
                value: 'mvPrice'
            },
            {
                text: 'Status',
                value: 'mvStatus'
            },
            {
                text: 'Cancel Qty',
                value: 'mvCancelQty'
            },
            {
                text: 'Good Till Date',
                value: 'mvGoodTillDate'
            },
            {
                text: 'Gross Amount',
                value: 'mvGrossAmt'
            }
        ]
        let data = this.props.data.data
        return (
            <div>
                <Modal.Body>
                    {
                        // <Accordion onSelect={(e) => this.handleSelect(e)} defaultActiveKey='orderinfo'>
                        //     <Panel header={<div ref={e => this.orderinfo = e}><span id='orderinfo' className='glyphicon glyphicon-chevron-right' /><span> Order Info</span></div>} eventKey='orderinfo' >
                        // <div>
                        //     <span style={{ fontWeight: 'bold' }} >Account No. # </span> <span>{data.mvClientID}</span>
                        //     <span style={{ fontWeight: 'bold', marginLeft: '15px' }}>Transaction Date # </span><span>{data.mvActivationDate}</span>
                        // </div>
                        // <div>
                        //     <div style={{ display: 'inline-block', width: '50%' }}>
                        //         {
                        //             content1.map((content, index) => {
                        //                 return (
                        //                     <div style={{ backgroundColor: index % 2 == 0 ? 'white' : '#E0E0E0' }} >
                        //                         <div style={{ display: 'inline-block', width: '50%', textAlign: 'right', paddingRight: '7px', fontWeight: 'bold' }}>
                        //                             {content.text}
                        //                         </div>
                        //                         <div style={{ display: 'inline-block', width: '50%', textAlign: 'left', paddingLeft: '7px' }}>
                        //                             {data[content.value]}
                        //                         </div>
                        //                     </div>
                        //                 )
                        //             })
                        //         }
                        //     </div>
                        //     <div style={{ display: 'inline-block', width: '50%' }}>
                        //         {
                        //             content2.map((content, index) => {
                        //                 return (
                        //                     <div style={{ backgroundColor: index % 2 == 0 ? 'white' : '#E0E0E0' }}>
                        //                         <div style={{ display: 'inline-block', width: '50%', textAlign: 'right', paddingRight: '5px', fontWeight: 'bold' }}>
                        //                             {content.text}
                        //                         </div>
                        //                         <div style={{ display: 'inline-block', width: '50%', textAlign: 'left', paddingLeft: '5px' }}>
                        //                             {data[content.value]}
                        //                         </div>
                        //                     </div>
                        //                 )
                        //             })
                        //         }
                        //     </div>
                        // </div>
                        //     </Panel>
                        //     <Panel header={<div ref={e => this.exesum = e}><span id='exesum' className='glyphicon glyphicon-chevron-right' /> Execution Summary</div>} eventKey='exesum'>
                        //         WIP
                        // </Panel>
                        //     <Panel header={<div ref={e => this.orderaudit = e}><span id='orderaudit' className='glyphicon glyphicon-chevron-right' /> Order Audit</div>} eventKey='orderaudit'>
                        // <div style={{ backgroundColor: '#E0E0E0', fontWeight: 'bold' }} >
                        //     <div style={{ display: 'inline-block', width: '25%' }} >Time</div>
                        //     <div style={{ display: 'inline-block', width: '25%' }}>Action</div>
                        //     <div style={{ display: 'inline-block', width: '20%' }}>Price</div>
                        //     <div style={{ display: 'inline-block', width: '20%' }}>Quantity</div>
                        //     <div style={{ display: 'inline-block' }}>Remarks</div>
                        // </div>

                        // <div>
                        //     <div style={{ display: 'inline-block', width: '25%' }} >{data.mvActivationDate + " " + data.mvInputTime}</div>
                        //     <div style={{ display: 'inline-block', width: '25%' }}>no data</div>
                        //     <div style={{ display: 'inline-block', width: '20%' }}>{data.mvPrice}</div>
                        //     <div style={{ display: 'inline-block', width: '20%' }}>{data.mvQty}</div>
                        //     <div style={{ display: 'inline-block' }}>{data.mvRemark}</div>
                        // </div>

                        //     </Panel>
                        // </Accordion>
                    }
                    <Collapse collapses={collapses} expandedIndex={0} data={data} content1={content1} content2={content2} />
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language} />

                <Modal.Footer>
                    <Button onClick={this.props.onHide} >Close</Button>
                </Modal.Footer>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder)