import React, { Component } from 'react'

export default class WidgetBody extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        if(this.props.chart!= undefined){
            return (
                <div className="widget-body" style={{zIndex: '2'}} onMouseDown={ e => e.stopPropagation() }>
                    {this.props.children}
                </div>
            )
        }else{
            return (
                <div className="widget-body" onMouseDown={ e => e.stopPropagation() }>
                    {this.props.children}
                </div>
            )
        }
        

    }
}