//render modal body + footer
import React, { Component } from 'react';
import { Table, Button, Modal, } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import CheckAuthenticationModal from '../CheckAuthenticationModal';
import PopupTable from '../../commons/PopupTable';

class EnterOrderConfirm extends Component{
    constructor(props) {
        super(props)
        this.id = 'enterordersuccess'
    }

    render(){
        var tmp = this.props.data
        var data = [
            {
                header: "market",
                value: tmp.mvMarketID
            },
            {
                header: "stockCode",
                value: tmp.mvStockCode
            },
            {
                header: "price",
                value: tmp.mvPrice
            },
            {
                header: "quantity",
                value: tmp.mvVolume
            },
            {
                header: "buysell",
                value: tmp.mvBS
            },
            {
                header: "totalCash",
                value: tmp.mvGrossAmt
            }
        ]
        var language = this.props.language

        return(
            <div>
                <Modal.Body>
                    <PopupTable language={this.props.language.enterorder.header} data={data} />
                </Modal.Body>
                
                <Modal.Footer>
                    <button className="hks-btn btn-complete" onClick={this.props.onHide}>
                        <span className="glyphicon glyphicon-ok" style={{marginRight: "5px"}}></span>
                        {language.button.complete}
                    </button>
                </Modal.Footer>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EnterOrderConfirm)
