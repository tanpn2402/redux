import React, { Component } from 'react'

export default class WidgetBody extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        let widgetBody = this.props.theme.widget.widgetBody.border
        if(this.props.chart!= undefined){
            return (
                <div className="widget-body" style={{zIndex: '2', border: widgetBody}} onMouseDown={ e => e.stopPropagation() }>
                    <div className="widget-wrapper">
                        {this.props.children}
                    </div>
                </div>
            )
        }else{
            return (
                <div className="widget-body" onMouseDown={ e => e.stopPropagation()} style={{border: widgetBody}} 
                    ref={ref => this.Body = ref}>
                    <div className="widget-wrapper" ref={ref => this.Wrapper = ref}>
                        {this.props.children}
                    </div>
                </div>
            )
        }
        

    }
}