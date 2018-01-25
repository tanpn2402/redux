import React from 'react'
import { PowerSelect } from 'react-power-select'
import InputSelect from './InputSelect'
class Select extends React.Component {
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
        return <InputSelect {...this.props} />
    }

    componentDidMount() {
        // let elements = this.selector.getElementsByClassName("PowerSelect__TriggerStatus")
        // if(elements.length > 0) {
        //     let child = elements[0]
        //     child.style.paddingTop = this.selector.offsetHeight / 2 - 2 + "px"
        // }
    }
}

class SelectTmpA extends React.Component {
    render() {
        return (
            <div className="select-control" ref={ r => this.selector = r }>   
                <PowerSelect
                    options={this.props.options}
                    selected={this.props.selected}
                    onChange={this.props.handleValueChange}
                    optionLabelPath={this.props.optionLabelPath}
                    optionComponent={this.props.optionComponent}
                    selectedOptionComponent={this.props.selectedOptionComponent}
                    showClear={false}
                    searchEnabled={this.props.searchEnabled}
                />
            </div>
        )
    }
}
class SelectTmpB extends React.Component {
    render() {
        return (
            <div className="select-control" ref={ r => this.selector = r }>   
                <PowerSelect
                    options={this.props.options}
                    selected={this.props.selected}
                    onChange={this.props.handleValueChange}
                    optionLabelPath={this.props.optionLabelPath}
                    optionComponent={this.props.optionComponent}
                    selectedOptionComponent={this.props.selectedOptionComponent}
                    showClear={false}
                    searchEnabled={this.props.searchEnabled}
                />
            </div>
        )
    }
}

Select.defaultProps = {
    options: [],
    selected: null,
    optionLabelPath: null,
    optionComponent: null,
    selectedOptionComponent: null,
    searchEnabled: false,
}
export default Select
