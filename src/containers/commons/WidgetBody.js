import React, { Component } from 'react'

export default class WidgetBody extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        
    }
    
    render() {
        let widgetbody = this.props.theme.widget == undefined? undefined:this.props.theme.widget.widgetbody.border
        if(this.props.chart!= undefined){
            return (
                <div className="widget-body" style={{zIndex: '2', border: widgetbody}} onMouseDown={ e => e.stopPropagation() }>
                    {this.props.children}
                </div>
            )
        }else{
            return (
                <div className="widget-body" onMouseDown={ e => e.stopPropagation()} style={{border: widgetbody}} >
                    {this.props.children}
                </div>
            )
        }
        

    }
}
