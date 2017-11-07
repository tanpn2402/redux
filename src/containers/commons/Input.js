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
                <div className={'input-control ' + type} ref={ r => this.rInput = r }>
                    <span className='input-group-btn' style={{ zIndex: '0' }} >
                        <button type="button" className="btn btn-default" 
                            onClick={() => this.changeInputVal((-1)*step)} ref={r => this.rButton1 = r} >-</button>
                    </span>
                    <FormControl 
                        inputRef={ref => this.props.setRef(ref)}
                        onChange={this.handleChange} value={this.state.inputValue}
                        required />
                    <span className='input-group-btn' style={{ zIndex: '0' }}>
                        <button type="button" className="btn btn-default" 
                            onClick={() => this.changeInputVal(step)} ref={r => this.rButton2 = r}>+</button>
                    </span>
                </div>
            )
        } else {
            let defaultValue = this.props.defaultValue === 0 ? "" : this.props.defaultValue
            return (
                <div className={'input-control ' + type} ref={ r => this.rInput = r }>
                    <FormControl 
                        inputRef={ref => this.props.setRef(ref)}
                        onChange={this.handleChange}
                        {...this.props}
                        defaultValue={defaultValue}
                         />
                
                </div>
            )
        }
        
    }

    componentDidMount() {
        if(this.rInput && this.rButton1 && this.rButton2) {
            console.log(this.rInput.offsetHeight)
            this.rButton1.style.width = this.rInput.offsetHeight + "px"
            this.rButton1.style.height = this.rInput.offsetHeight + "px"

            this.rButton2.style.width = this.rInput.offsetHeight + "px"
            this.rButton2.style.height = this.rInput.offsetHeight + "px"
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
            this.props.onChange(this.state.inputValue)
        }
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
        if( this.props.onChange ) {
            this.props.onChange(e.target.value)
        }
    }
}
Input.defaultProps = {
    defaultValue: 0,
    step: 1,
    type: 'text'
}
export default Input