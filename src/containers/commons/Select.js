import React from 'react'
import { PowerSelect } from 'react-power-select'

export default class Select extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <PowerSelect options={this.props.options} selected={this.props.selected}
                    onChange={this.props.onChange} optionComponent={this.props.optionComponent}
                    optionLabelPath={this.props.optionLabelPath} showClear={this.props.showClear}
                    searchEnabled={this.props.searchEnabled} />
            </div>
        )
    }
}