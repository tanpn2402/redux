import React, { Component } from 'react'
export default class FlashPopup extends Component {
    constructor(props) {
        super(props)
        
    }

    // componentDidMount(){
    //     let id = this.props.id
        
        
    // }
    
    

    render() {
        
        return (
            <div className="flashpopup-child" id={this.props.id} style={{ opacity: this.props.show ? '1' : '0' ,  }}>
                <p>{this.props.message}</p>
            </div>
        );
    }
}
