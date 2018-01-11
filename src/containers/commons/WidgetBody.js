import React, { Component } from 'react'

export default class WidgetBody extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        let themee = this.props.theme.title
		
				let bg = "";
				let tColor= "";
		
				if(themee == "dark") {
					bg = "#474747"
					tColor = "#FFF"
				} else {
					bg = "#FFF"
					tColor = "#000"
		
                }
                
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
                    <div className="widget-wrapper" ref={ref => this.Wrapper = ref} style={{backgroundColor: bg}}>
                        {this.props.children}
                    </div>
                </div>
            )
        }
        

    }
}