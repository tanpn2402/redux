import React from 'react';
import { Checkbox } from 'react-bootstrap'

export default class ConfigColumnTable extends React.Component {

    constructor() {
        super()
        this.state = {
            subListVisible: false,
            listVisible: false,
        };
        this.clickOutside = this.clickOutside.bind(this)
    }

    clickOutside(e) {
        let className = e.target.className
        let id = e.target.id
        let columns = this.props.columns.map(column => {
            if (column.columns != undefined) {
                return column.columns.map(subCol => {
                    return subCol.id
                })
            } else {
                return column.id
            }
        })
        columns = columns.reduce((acc, obj) => {
            return acc.concat(obj)
        }, [])
        if (className !== 'dropdown-display'
            && className !== 'dropdown-item'
            && className !== 'dropdown-sublist'
            && className !== 'glyphicon glyphicon-th-list'
            && className !== 'glyphicon glyphicon-triangle-left'
            && className !== 'dropdown-item-column'
            && className !== 'checkbox'
            && !columns.includes(id)
            && id !== 'filter') {
            this.hide()
        }
    }

    hide() {
        this.setState({ listVisible: false, subListVisible: false });
        document.body.removeEventListener('click', this.clickOutside, false)
    }

    toggleDropdown() {
        this.setState({ listVisible: !this.state.listVisible, subListVisible: false });
        document.body.addEventListener('click', this.clickOutside, false)
    }

    toggleDropdownSubList(e) {
        this.setState((prevState) => {
            return {
                subListVisible: !prevState.subListVisible
            }
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className="dropdown-container" id={this.props.id + "-columns"}>
                <div className="dropdown-display" onClick={this.toggleDropdown.bind(this)}>
                    <span className="glyphicon glyphicon-th-list"></span>
                </div>
                <div className={"dropdown-list " + (this.state.listVisible ? "show" : "hide")}>
                    <div className='dropdown-item' onClick={e => this.toggleDropdownSubList(e)} >
                        <span className='glyphicon glyphicon-triangle-left' /> Columns
                    </div>

                    <div id='filter' className='dropdown-item'>
                        <div className='checkbox'>
                            <label style={{ width: '100%' }} className='dropdown-item-column'>
                                <input type='checkbox' id='filter' readOnly='false' 
                                    defaultChecked='true' onChange={this.props.onToggleFilter} />
                                <span className='dropdown-item-column' >
                                    {this.props.language.global.filter.toggle}
                                </span>
                            </label>
                        </div>
                    </div>

                </div>
                <div className={'dropdown-sublist ' + (this.state.subListVisible ? 'show' : 'hide')}>
                    {this.renderListItems()}
                </div>
            </div>
        );
    }

    renderListItems() {
        let items = [];
        for (var i = 0; i < this.props.columns.length; i++) {
            let item = this.props.columns[i]
            if (item.columns !== undefined) {
                // this is parent header
                let subItems = item.columns
                for (var j = 0; j < subItems.length; j++) {
                    // render sub headers
                    let subItem = subItems[j]
                    if (subItem.skip === false) {
                        items = this.renderItem(items, subItem, this)
                    }
                }
            } else {
                // this is sub header
                if (item.skip === false) {
                    items = this.renderItem(items, item, this)
                }
            }


        }
        return items
    }

    renderItem(arr, item) {
        arr.push(
            <div className="dropdown-item" key={item.id}
                onMouseDown={e => e.stopPropagation()}>
                <div className='checkbox'>
                    <label style={{ width: '100%' }} className='dropdown-item-column'>
                        <input type='checkbox' id={item.id} defaultChecked='true'
                            readOnly='false' onChange={this.props.onChangeStateColumn} />
                        <span style={{ lineHeight: '2.2' }} className='dropdown-item-column'>{item.Header}</span>
                    </label>
                </div>
            </div>
        )
        return arr
    }
}

