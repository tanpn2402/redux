import React from 'react'
import DropdownItem from './DropdownItem'
export default class MenuItem extends React.Component {

    constructor(){
        super()
    }

    render(){
        return (
            <ul className="nav navbar-nav" >
            {
                this.props.menu_items.map(item => {
                console.log(item.subitems)
                return (
                     <li className="dropdown">
                        <a  style={this.props.theme.textcolor} href="#" className="dropdown-toggle" 
                        data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
                        >
                        {this.props.data[item.text]} 
                        <span className="caret"></span></a>
                        
                        <DropdownItem 
                        onMenuSelected={this.props.onMenuSelected} 
                        theme={this.props.theme} data={this.props.data} 
                        subitems={item.subitems} />
                     </li>
                );
                })
            }
            </ul>
    )
    }

}
