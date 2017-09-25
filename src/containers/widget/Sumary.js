import React, { Component } from 'react'
import { Form, FormGroup, FormControl, Radio, Table, Col, Button, Modal, } from 'react-bootstrap'
import SearchBar from '../commons/SearchBar'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Title from '../commons/WidgetTitle'
import Body from '../commons/WidgetBody'

class Sumary extends Component {
    constructor(props) {
        super(props)
        this.id = "sumary"

        this.data = [
            {id : 'asd', value: 'a123'},
            {id : 'asd', value: 'sd123'},
            {id : 'asd', value: 'sad123'},
            {id : 'asd', value: 'dasda123'},
            {id : 'asd', value: 'asdsda123'}
        ]
    }


    render() {
        return (
            <div>
                <Title>
                    {this.props.language.menu[this.id]}
                </Title>
                <Body>
                    <div style={{width: '100%', height: '100%', paddingTop:'25px'}}>
                        <div className="col-md-4">
                            asddsd
                        </div>
                        <div className="col-md-8">
                            <Table responsive>
                                <tbody >
                                    {
                                        this.data.map(d => {
                                            return(
                                                <tr>
                                                    <th>{d.id}</th>
                                                    <td>{d.value}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>
                        </div>

                    </div>
                </Body>
            </div>
        )

    }

    componentDidMount() {

    }

}
const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Sumary)
