import React, { Component } from 'react'

export default class DropdownItem extends Component {
    render() {
        return (
            
            <ul  id={this.props.id} className="nav nav-list tree main-menu-sub collapse in" aria-expanded="true">
                {
                    this.props.items.map(item => {
                        return (
                            <li><a href="javascript:void(0)" id={item.id} onClick={this.props.onMenuSelected}>
                                {this.props.language[item.text]}
                            </a></li>
                        )
                    })
                }
            </ul>
            
        );
    }
}
