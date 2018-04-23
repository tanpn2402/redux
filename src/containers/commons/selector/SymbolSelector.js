import React from 'react'
import { TypeAhead } from 'react-power-select'
import { connect } from 'react-redux'
import * as actions from '../../actions'


const StockViewOption = ({ option }) =>
    <div style={{ maxWidth: '100%' }}>
        <span style={{fontWeight: "bold"}}>{option.stockCode}</span>
        <small style={{ paddingLeft: '5px' }}> - {option.stockName}</small>
    </div>

class SymbolSelector extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: {}
        }
    }

    handleValueChange = ({ option }) => {
         if(this.props.handleChange && option && option !== "---") {
            this.props.handleChange(option)
        }
    }

    render() {
        let options = ["---"]
        let {stockList, className, style} = this.props
        if(stockList.length > 0) 
            options = stockList

        return (
            <div className={"select-control symbol-selector" + className} style={style}>
                <TypeAhead
                    options={options}
                    selected={this.state.selected}
                    onChange={this.handleValueChange.bind(this)}
                    optionComponent={<StockViewOption />}
                    showClear={false}
                />
            </div>
        )
    }
}

InputSelect.defaultProps = {
    stockList: [],
    style: {}
}

const mapStateToProps = (state) => {
    return {
        stockList: state.stock.stockList
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(SymbolSelector)