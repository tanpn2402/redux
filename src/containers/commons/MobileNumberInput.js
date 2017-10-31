import React from 'react'
import { Button, FormControl } from 'react-bootstrap'

export class MobileNumberInput extends React.Component {
    constructor(props) {
        super(props)
        this.changeInputVal = this.changeInputVal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            inputValue: this.props.defaultValue
        }
    }

    render() {
        return (
            <div className='input-group' >
                <span className='input-group-btn' style={{ zIndex: '0' }} >
                    <Button onClick={() => this.changeInputVal(-1)} >&#10134;</Button>
                </span>
                <FormControl inputRef={ref => this.props.onRef(ref)}
                    onChange={this.handleChange} value={this.state.inputValue}
                    style={{ textAlign: 'center', outline: 'none', boxShadow: 'none', zIndex: '0' }}
                    required />
                <span className='input-group-btn' style={{ zIndex: '0' }}  >
                    <Button onClick={() => this.changeInputVal(1)} >&#10133;</Button>
                </span>
            </div>
        )
    }

    async changeInputVal(value) {
        await this.setState((prevState) => {
            let number = parseFloat(prevState.inputValue)
            return {
                inputValue: isNaN(number) ? 0 : (number + value) < 0 ? 0 : (number + value)
            }
        })
        this.props.onChange()
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
        this.props.onChange()
    }
}