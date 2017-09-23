import React, { Component } from 'react'

export default class WidgetBody extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        console.log(this.props.children)
        return (
            <div className="widget-body" >
                {this.props.children}
            </div>
        )

    }
}