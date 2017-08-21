import React, { Component } from 'react'
import DropdownItem from './DropdownItem'
export default class MenuItem extends Component {
    render() {
        return (
            <div>
            <div data-toggle="collapse" data-target={'#' + this.props.id}>
                <label  aria-expanded="true" className="main-menu-header">{this.props.text}</label>
            </div>
                <DropdownItem 
                    items={this.props.subitems} 
                    id={this.props.id} 
                    language={this.props.language} 
                    onMenuSelected={this.props.onMenuSelected}/>
            </div>
        );
    }
}
