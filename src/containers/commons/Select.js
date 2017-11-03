import React from 'react'
import {PowerSelect} from 'react-power-select'

class Select extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value:  ""
        }
    }

    onClick(key) {
        this.props.onTabChange(key)
    }
    
    handleValueChange = ({ option }) => {

    }

    render() {
        return (
            <div className="select-control">   
                <PowerSelect
                    options={this.props.options}
                    selected={this.state.value}
                    onChange={this.handleValueChange.bind(this)}
                    optionLabelPath={this.props.optionLabelPath}
                    showClear={false}
                    searchEnabled={this.props.searchEnabled}
                />
            </div>
        )
        

    }
}
Select.defaultProps = {
    options: [],
    optionLabelPath: "",
    optionComponent: null,
    searchEnabled: false,
}
export default Select