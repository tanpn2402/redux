import React from 'react'
import { TypeAhead } from 'react-power-select'

class InputSelect extends React.Component {
    constructor(props) {
        super(props)
        this.tmpValue = false
    }

    handleValueChange = ({ option }) => {
         if(this.props.handleChange && option && option !== "---") {
            this.props.handleChange(option)
        }
    }

    render() {
        let options = ["---"]
        if(this.props.options.length > 0) 
            options = this.props.options
        this.tmpValue = !this.tmpValue
        return (
            <div className={"select-control " + this.props.className}>
                <TypeAhead
                    options={options}
                    selected={this.props.selected}
                    onChange={this.handleValueChange.bind(this)}
                    optionLabelPath={this.props.optionLabelPath}
                    selectedOptionComponent={this.props.selectedOptionComponent}
                    showClear={false}
                    searchEnabled={this.props.searchEnabled}
                />
            </div>
        )
    }
}

InputSelect.defaultProps = {
    options: [],
    selected: null,
    optionLabelPath: null,
    optionComponent: null,
    selectedOptionComponent: null,
    searchEnabled: false,
    className: ""
}
export default InputSelect