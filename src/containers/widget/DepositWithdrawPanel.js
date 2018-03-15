import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'
import SelectControl from '../commons/Select'
import { PowerSelect } from 'react-power-select'

class DepositWithdrawPanel extends Component {
    constructor(props) {
        super(props)

        this.id = 'depositwithdraw'

        this.state = {
            
        }
    }


    changeType(id) {

    }

    render() {
        
        let rowOdd = this.props.theme.table.rowOdd.backgroundColor
        let rowEven = this.props.theme.table.rowEven.backgroundColor
        let font2 = this.props.theme.font.sub1.color
        let background = this.props.theme.form.background
        let formStyle = this.props.theme.form

        let header = this.props.language.deposit.header
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Title language={this.props.language} theme={this.props.theme} widgetID= 'depositwithdraw' >
                    {this.props.language.menu[this.id]}
                </Title>
                <Body theme={this.props.theme}  style={background}>
                    <Form onSubmit={this.submit.bind(this)} id={"form-" + this.id} className="widget-form">
                        <FormGroup>
                            <Table responsive>
                                <tbody >

                                    <tr style={{height: "30px", color: font2}} >
                                        <th>{header.type}</th>
                                        <td>
                                            <Radio
                                                inline
                                                defaultChecked={true}
                                                name="radioGroup"
                                                onClick={e => this.changeType(1)}>
                                                <div className="Radiobox">{header.deposit}</div>
                                            </Radio>
                                            <Radio
                                                name="radioGroup"
                                                inline
                                                onClick={e => this.changeType(2)}>
                                                <div className="Radiobox">{header.withdraw}</div>
                                            </Radio>
                                        </td>
                                    </tr>
                                    
                                    
                                    <tr style={{  color: font2 }}>
                                        <th>{header.depositable}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="depositable"
                                                ref={e => this.depositable = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                    <tr style={{  color: font2 }}>
                                        <th>{header.withdrawable}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input read-only"
                                                id="withdrawable"
                                                ref={e => this.withdrawable = e}
                                                readOnly />
                                        </td>
                                    </tr>
                                 
                                    <tr  style={{  color: font2 }}>
                                        <th style={{ color: font2 }}>{header.amount}</th>
                                        <td>
                                            <input
                                                style={{textAlign: "right"}}
                                                className="hks-input border"
                                                type="number"
                                                ref={e => this.txtAmount = e}
                                                style={{textAlign:'right'}}
                                                required />
                                        </td>
                                    </tr>
                                    
                                    <tr  >
                                        <th style={{ color: font2 }}>{header.remark}</th>
                                        <td>
                                            <textarea ref={e => this.txtRemark = e} className="hks-input border"
                                                rows="3" cols="26"></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="group-btn-action form-submit-action">
                                <span>
                                    <button className="btn btn-default" type="button" className="hks-btn btn-cancel"
                                        onClick={this.handleResetForm.bind(this)} style={formStyle.button.clear} >
                                        {this.props.language.button.cancel}
                                    </button>
                                    <button className="btn btn-default" type="submit" className="hks-btn btn-submit"
                                        onClick={this.submit.bind(this)} style={formStyle.button.submit} >
                                        {this.props.language.button.submit}
                                    </button>
                                </span>
                            </div>
                        </FormGroup>
                    </Form>
                </Body>
            </div>
        )

    }

    componentDidMount() {
        
        this.depositable.value = "0.00"
        this.withdrawable.value = "0.00"

        this.txtAmount.focus()
    }

    handleResetForm(e) {
       
        this.txtAmount.value = ''
        this.txtRemark.value = ''
    }

    submit(e) {
        e.preventDefault()
        
    }
    

}
const mapStateToProps = (state) => {
    return {
       
    }
}

const mapDispatchToProps = (dispatch, props) => ({

   
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositWithdrawPanel)
