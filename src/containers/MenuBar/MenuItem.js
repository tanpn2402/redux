import React from 'react'
import DropdownItem from './DropdownItem'
export default class MenuItem extends React.Component {

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
        return (
            <ul className="nav navbar-nav" >
            {
                this.props.menu_items.map(item => {
                    var linkStyle;
                    if (this.state.hover && item.id===this.state.focusID) {
                        linkStyle = this.props.theme.onFocus
                    } else {
                        linkStyle = this.props.theme.normal
                    }
                return (
                     <li className="dropdown">
                        <a  style={linkStyle} href="#" className="dropdown-toggle" id={item.id}
                        data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
                        onFocus={(e) =>this.toggleHover(e)} onBlur={(e)=>this.toggleHover(e)}
                        >
                        {this.props.language[item.text]} 
                        <span className="caret"></span></a>
                        
                        <DropdownItem 
                        onMenuSelected={this.props.onMenuSelected} 
                        theme={this.props.theme} language={this.props.language} 
                        subitems={item.subitems} />
                     </li>
                );
                })
            }
            </ul>
    )
    }

}
