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

        if(this.state.show){
            return (
                <Modal show={true}>
                    <div className="modal-header popup-main-header">
                        <h4 className="title modal-title">{this.props.title}</h4>
                    </div>
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
    authcard: state.popup.authcard,    
    timestamp: state.popup.timestamp
});

const mapDispatchToProps = (dispatch, props) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
