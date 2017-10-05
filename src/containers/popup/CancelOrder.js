//render modal body + footer 
import React, { Component } from 'react';
import { Button, Modal, } from 'react-bootstrap'
import ReactTable from "react-table"
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TableData from '../commons/DataTable'
import CheckAuthenticationModal from './CheckAuthenticationModal'

class CancelOrder extends Component{
    constructor(props) {
        super(props)
        this.columns = [{
                    id: 'mvStockID',
                    Header: this.props.language.orderjournal.header.stockid,
                    accessor: 'mvStockID',
                    width: 100,
                },
                {
                    id: 'mvBS',
                    Header: this.props.language.orderjournal.header.buysell,
                    accessor: 'mvBS',
                    width: 80,
                },
                {
                    id: 'mvPrice',
                    Header: this.props.language.orderjournal.header.price,
                    accessor: 'mvPrice',
                    width: 100,
                },
                {
                    id: 'mvQty',
                    Header: this.props.language.orderjournal.header.quantity,
                    accessor: 'mvQty',
                    width: 100,
                }
            ],
    
        this.id = 'cancelorder-popup'
    }
    onCancelSubmit() {
        var authParams = this.auth.getParam()

        this.props.onCancelSubmit(this.props.data, authParams, this.props.language)
        this.props.onHide()
    }
    render(){
        var data = this.props.data.data
        var language = this.props.language
        return(
            <div>
                <Modal.Body>
                    <TableData
                        id={this.id + "-table"} 
                        columns={this.columns}
                        defaultPageSize={15}
                        maxRows={5}
                        data={data}
                    />
                </Modal.Body>

                <CheckAuthenticationModal authType={this.props.authcard} ref={e => this.auth = e} language={language}/>
                
                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{language.button.cancel}</Button>
                    <Button className="submit" onClick={this.onCancelSubmit.bind(this)}> {language.button.submit}</Button>
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
    onCancelSubmit: (param, language, authParams) => {
        dispatch(actions.onCancelSubmit(param, language, authParams))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder)
