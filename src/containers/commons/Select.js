import React from 'react'
import { PowerSelect } from 'react-power-select'

class Select extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ""
        }
    }

    onClick(key) {
        this.props.onTabChange(key)
    }

    handleValueChange = ({ option }) => {
        if(this.props.handleChange && option) {
            this.props.handleChange(option)
        }
    }

    render() {
        let options = ["---"]
        if(this.props.options.length > 0) 
            options = this.props.options
        return (
            <div className="select-control" ref={ r => this.selector = r }>   
                <PowerSelect
                    options={options}
                    selected={this.props.selected}
                    onChange={this.handleValueChange.bind(this)}
                    optionLabelPath={this.props.optionLabelPath}
                    showClear={false}
                    searchEnabled={this.props.searchEnabled}
                />
            </div>
        )


    }

    componentDidMount() {
        // let elements = this.selector.getElementsByClassName("PowerSelect__TriggerStatus")
        // if(elements.length > 0) {
        //     let child = elements[0]
        //     child.style.paddingTop = this.selector.offsetHeight / 2 - 2 + "px"
        // }
    }
}
Select.defaultProps = {
    options: [],
    selected: null,
    optionLabelPath: null,
    optionComponent: null,
    searchEnabled: false,
}
export default Select
