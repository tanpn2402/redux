import React, { Component } from 'react'
export default class FlashPopup extends Component {

    componentDidMount(){
        let id = this.props.id

        setTimeout(function(){
            console.log('asds', id)
            document.getElementById(id).style.opacity = '0'
        }, 3000)
        setTimeout(function(){
            document.getElementById(id).style.display = 'none'
        }, 4000)
    }


    render() {
        return (
            <div className="flashpopup-child" id={this.props.id} style={{ opacity: this.props.show ? '1' : '0' ,  }}>
                <p>{this.props.message}</p>
            </div>
        );
    }
}
