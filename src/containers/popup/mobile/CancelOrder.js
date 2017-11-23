import React, { Component } from 'react';
import { Table, Button, Modal, } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import CheckAuthenticationModal from '../CheckAuthenticationModal';
import PopupTable from '../../commons/PopupTable';
import Input from '../../commons/Input';
import * as api from '../../../api/web_service_api';
import * as ACTION from '../../../api/action_name';

class CancelOrder extends Component {
    constructor(props) {
        super(props)

        this.id = 'cancelorder-popup'
    }
    onCancelSubmit() {
        this.props.onCancelOrder(this.props.data, this.props.language)
        this.props.onHide()
    }
    render() {
        var language = this.props.language
        var tmp = this.props.data.data[0]
        console.log(tmp)
        var data = [
            {
                header: "market",
                value: tmp.mvMarketID
            },
            {
                header: "tradeId",
                value: tmp.mvOrderGroupID
            },
            {
                header: "stockid",
                value: tmp.mvStockID
            },
            {
                header: "stockName",
                value: tmp.mvStockName
            },
            {
                header: "buysell",
                value: tmp.mvBS
            },
            {
                header: "price",
                value: tmp.mvPriceValue
            },
            {
                header: "quantity",
                value: tmp.mvQtyValue
            }
        ]
        return (
            <div>
                <Modal.Body>
                    <PopupTable language={this.props.language.orderjournal.header} data={data} />
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language} />

                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{language.button.cancel}</Button>
                    <Button className="submit" onClick={this.onCancelSubmit.bind(this)}> {language.button.confirmCancel}</Button>
                </Modal.Footer>

            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        returnCode: state.orderjournal.returnCode,
        message: state.orderjournal.message,
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    onCancelOrder: (param, language) => {
        dispatch(actions.onCancelOrder(param, language))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder)
