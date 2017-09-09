import React, { Component } from 'react'
import { Button, Modal, } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import generatePopup from './index'

class Popup extends Component {
    constructor(props){
        super(props)

        this.state = {
            show: false,
            lastPopup: 1,
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.lastPopup !== nextProps.timestamp){
            this.setState({show: true, lastPopup: nextProps.timestamp})
        }
    }
    render() {
        console.log('asdsadasdsa',this.props)
        if(this.state.show){
            return (
                <Modal show={true} onHide={e => this.onClose()} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg" className="title">{this.props.title}</Modal.Title>
                    </Modal.Header>
                    {generatePopup(this.props, this.onClose.bind(this)) }
                </Modal>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    onClose(){
        this.setState({show: false})
    }
}
const mapStateToProps = state => ({
    data: state.popup.data,
    language: state.popup.language,
    id: state.popup.id,
    title: state.popup.title,
    timestamp: state.popup.timestamp
});

const mapDispatchToProps = (dispatch, props) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
