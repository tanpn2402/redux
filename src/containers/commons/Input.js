import React from 'react'
import { Button, FormControl } from 'react-bootstrap'

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.changeInputVal = this.changeInputVal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            inputValue: this.props.defaultValue
        }
    }

    render() {
        let step = isNaN(this.props.step) ? 1 : this.props.step
        let type = this.props.type

        if(type === 'number') {
            return (
                <div className={'input-control ' + type} >
                    <span className='input-group-btn' style={{ zIndex: '0' }} >
                        <Button onClick={() => this.changeInputVal((-1)*step)} >&#10134;</Button>
                    </span>
                    <FormControl 
                        inputRef={ref => this.props.setRef(ref)}
                        onChange={this.handleChange} value={this.state.inputValue}
                        style={{ }}
                        required />
                    <span className='input-group-btn' style={{ zIndex: '0' }}  >
                        <Button onClick={() => this.changeInputVal(step)} >&#10133;</Button>
                    </span>
                </div>
            )
        } else {
            return (
                <div className={'input-control ' + type} >
                    <FormControl 
                        inputRef={ref => this.props.setRef(ref)}
                        onChange={this.handleChange}
                         />
                
                </div>
            )
        }
        
    }

    async changeInputVal(value) {
        await this.setState((prevState) => {
            let number = parseFloat(prevState.inputValue)
            return {
                inputValue: isNaN(number) ? 0 : (number + value) < 0 ? 0 : (number + value)
            }
        })
        if( this.props.onChange ) {
            this.props.onChange()
        }
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
        if( this.props.onChange ) {
            this.props.onChange()
        }
    }
}
Input.defaultProps = {
    defaultValue: 0,
    step: 1,
    type: 'text'
}
export default Input