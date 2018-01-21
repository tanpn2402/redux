import React from 'react'
import {getTheme } from '../../utils'

export default class Component extends React.Component {

    render() {
        let {theme, id, className, style} = this.props
        if(theme == null) {
            theme = getTheme("light")
        }
        let widgetStyle = theme.widget
        console.log(Object.assign({}, style, widgetStyle))
        return (
            <div className={className} id={id} style={Object.assign({}, style, widgetStyle.widgetBackground)}>
                {this.props.children}
            </div>
        )
    }
}

Component.defaultProps = {
    className: "",
    id: "",
    style: {width: "100%", height: "100%"},
    theme: null
}