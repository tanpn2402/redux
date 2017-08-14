import React from 'react'

export default class DropdownItem extends React.Component {

    constructor(){
        super()
        this.state={
            hover: false,
            focusID: "null"
        }
    }
    toggleHover(e){
        console.log(e.target.id)
        this.setState({hover: !this.state.hover, focusID: e.target.id})
    }
    render(){
        console.log('DropdownItem', this.props)
        return (
            <ul className="dropdown-menu" style={this.props.theme.background} 
            onSelect={this.props.onMenuSelected}>
            {
                this.props.subitems.map(sub => {
                    var linkStyle;
                    if (this.state.hover && sub.id===this.state.focusID) {
                        linkStyle = this.props.theme.onFocus
                    } else {
                        linkStyle = this.props.theme.normal
                    }
                    return (
                        <li ><a id={sub.text} key={sub.text} style={linkStyle} 
                        href="javascript:void(0);" onClick={this.props.onMenuSelected}
                        onMouseOver={(e) =>this.toggleHover(e)} onMouseLeave={(e)=>this.toggleHover(e)}
                        >
                        {this.props.language[sub.text]}
                        </a></li>
                        )
                    }
                )
            }
            </ul>
    
        )
    }

}