import React, { Component } from 'react'

export default class WidgetBody extends Component {
    constructor(props) {
        super(props)
    }


    render() {
       
                
        let widgetBackground = this.props.theme.widget.widgetBackground.backgroundColor
        if(this.props.chart!= undefined){
            return (
                <div className="widget-body" style={{zIndex: '2', background: widgetBackground}} onMouseDown={ e => e.stopPropagation() }>
                    <div className="widget-wrapper">
                        {this.props.children}
                    </div>
                </div>
            )
        }else{
            return (
                <div className="widget-body" onMouseDown={ e => e.stopPropagation()} style={{background: widgetBackground}} 
                    ref={ref => this.Body = ref}>
                    <div className={"widget-wrapper " + this.props.className} ref={ref => this.Wrapper = ref} style={Object.assign({backgroundColor: widgetBackground}, this.props.style)}>
                        {this.props.children}
                    </div>
                </div>
            )
        }
        

    }
}

WidgetBody.defaultProps= {
    style: {},
    className: ""
}