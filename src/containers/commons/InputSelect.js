import React from 'react'
import { TypeAhead } from 'react-power-select'


const StockViewOption = ({ option }) =>
    <div style={{ maxWidth: '100%' }}>
        <span style={{fontWeight: "bold"}}>{option.stockCode}</span>
        <small style={{ paddingLeft: '5px' }}> - {option.stockName}</small>
    </div>

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
            <div className={"select-control " + this.props.className} style={this.props.style}>
                <TypeAhead
                    options={options}
                    selected={this.props.selected}
                    onChange={this.handleValueChange.bind(this)}
                    optionLabelPath={this.props.optionLabelPath}
                    optionComponent={this.props.stockSelector ? <StockViewOption /> : null}
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
    className: "",
    stockSelector: false,
    style: {}
}
export default InputSelect