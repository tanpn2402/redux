import React from 'react'

export default class DropdownItem extends React.Component {

    constructor(){
        super()
    }

    render(){
        console.log(this.props)
        return (
            <ul className="dropdown-menu" style={this.props.theme.background} onSelect={this.props.onMenuSelected}>
            {
                this.props.subitems.map(sub => {
                    return (
                        <li ><a id={sub.text} key={sub.text} style={this.props.theme.background} href="javascript:void(0);" onClick={this.props.onMenuSelected}>{this.props.data[sub.text]}</a></li>
                        )
                    }
                )
            }
            </ul>
    
        )
    }

}