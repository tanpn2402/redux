import React, { Component } from 'react'

export default class WidgetBody extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="widget-body" onMouseDown={ e => e.stopPropagation() }>
                {this.props.children}
            </div>
        )

    }
}