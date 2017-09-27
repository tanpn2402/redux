import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class FlashPopup extends Component {

    constructor(props){
        super(props)

        this.state = {
            show: true,
            listMessage: [],
            lastMessageID: 1,
        }


    }

    componentWillReceiveProps(nextProps){
        if(this.state.lastMessageID !== nextProps.id && nextProps.id !== 0){
            let msg = this.state.listMessage
            msg.push(nextProps)
            this.setState({ listMessage: msg, lastMessageID: nextProps.id })
        }
    }

    render() {
        return (
            <div className="flashpopup" id="flashpopup">
                {
                    this.state.listMessage.map(message => {
                        return (
                            <div className="flashpopup-child" id={'flashpopup-' + message.id} style={{ opacity: '1',  }}>
                                <p>{message.message}</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    componentDidUpdate(){
        let listMessage = this.state.listMessage
        let lastMessage = listMessage[listMessage.length - 1]

        setTimeout(function(){
            try{
                document.getElementById('flashpopup-' + lastMessage.id).style.opacity = '0'
            }catch(e){}
        }, 5000)
        setTimeout(function(){
            try{
                document.getElementById('flashpopup-' + lastMessage.id).style.display = 'none'
            }catch(e){}
        }, 5500)
    }
}


const mapStateToProps = state => ({
    message: state.flashpopup.message,
    type: state.flashpopup.type,
    id: state.flashpopup.id,
});

const mapDispatchToProps = (dispatch, props) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashPopup)
