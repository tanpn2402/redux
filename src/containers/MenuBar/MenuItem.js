import React from 'react'
import DropdownItem from './DropdownItem'
export default class MenuItem extends React.Component {

    constructor(){
        super()
        this.state={
            hover: false
        }
        
    }
    
    onhover(){
        this.setState({hover: true})
    }
    offhover(){
        console.log("aaaaaaaaaaaaaaa")
        this.setState({hover: false})
    }
    render(){
        
        return (
            <ul className="nav navbar-nav" >
            {
                this.props.menu_items.map(item => {
                var cus=this.props.theme.textcolor;
                if(this.state.hover=== true){
                    cus=this.props.theme.dark
                }
                else{
                    cus=this.props.theme.textcolor
                }
                return (
                     <li className="dropdown">
                        <a  style={cus} href="#" className="dropdown-toggle" 
                        data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
                        onMouseOverCapture={this.onhover.bind(this)}
                        onMouseLeave={this.offhover.bind(this)}
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