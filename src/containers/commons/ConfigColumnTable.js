import React from 'react';
import { Checkbox } from 'react-bootstrap'

export default class ConfigColumnTable extends React.Component {

    constructor() {
        super()
        this.state = {

            listVisible: false,
        };

    }

    select(item) {
        this.props.onSeleted;
    }

    show() {
        this.setState({
            listVisible: true,
        });
    }

    hide() {
        this.setState({ listVisible: false, });
    }

    toggleDropdown() {
        this.setState({ listVisible: !this.state.listVisible });
    }

    onMouseOver() {
        this.setState({ listVisible: true, });
    }

    onMouseOut() {
        this.setState({ listVisible: false, });
    }

    onClick() {
        this.setState({ listVisible: true, });
    }

    onCheckBoxChange(e) {
        console.log(e.target)
    }

    render() {
        return (
            <div className="dropdown-container" id={this.props.id+"-columns"}>
                <div className="dropdown-display" onClick={this.toggleDropdown.bind(this)}><span className="glyphicon glyphicon-th-list"></span></div>
                <div className={"dropdown-list " + (this.state.listVisible ? "show": "hide")}
                  onMouseOver={this.onMouseOver.bind(this)}
                  onMouseOut={this.onMouseOut.bind(this)}>
                    {this.renderListItems()}
                </div>
            </div>
        );
    }

    renderListItems() {
        console.log(this.props.columns)
        var items = [];
        for (var i = 0; i < this.props.columns.length; i++) {
            var item = this.props.columns[i]
            if (item.skip === false) {
                items.push(
                    <div className="dropdown-item" key={item.id}>
                        <Checkbox id={item.id}  defaultChecked='true' readOnly='false' onChange={this.props.onChangeStateColumn} >
                        {item.Header}
                        </Checkbox>
                    </div>
                )
            }

        }
        return items
    }
}

