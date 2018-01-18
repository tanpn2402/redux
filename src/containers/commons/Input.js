import React from 'react'
import { Button, FormControl } from 'react-bootstrap'

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.handleButtonInputClick = this.handleButtonInputClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.readOnly = false
    }

    render() {
        let step = isNaN(this.props.step) ? 1 : this.props.step
        let type = this.props.type
        if(type === 'number') {
            return (
                <div className={'input-control ' + type + " " + this.props.className} ref={ r => this.rInputControl = r } >
                    <span className='input-group-btn' style={{ zIndex: '0' }} >
                        <button type="button" className="btn btn-default" 
                            onClick={() => this.handleButtonInputClick((-1)*step)} ref={r => this.rButton1 = r} >-</button>
                    </span>
                    <FormControl
                        inputRef={ref => this.rInput = ref}
                        onChange={this.handleChange} defaultValue={this.props.defaultValue}
                        onKeyPress={this.handleKeyPress} />
                    <span className='input-group-btn' style={{ zIndex: '0' }}>
                        <button type="button" className="btn btn-default" 
                            onClick={() => this.handleButtonInputClick(step)} ref={r => this.rButton2 = r}>+</button>
                    </span>
                </div>
            )
        } else {
            let defaultValue = this.props.defaultValue === 0 ? "" : this.props.defaultValue
            return (
                <div className={'input-control ' + type + " " + this.props.className} ref={ r => this.rInputControl = r }>
                    <input className={"form-control " + this.props.className}
                        ref={ref => this.rInput = ref}
                        onChange={this.handleChange}
                        defaultValue={defaultValue}
                        readOnly={this.props.readOnly}
                        style={this.props.style}
                    />
                
                </div>
            )
        }
        
    }

    componentDidMount() {
        if(this.rInputControl && this.rButton1 && this.rButton2) {
            this.rButton1.style.width = this.rInputControl.offsetHeight - 2 + "px"
            this.rButton1.style.height = this.rInputControl.offsetHeight - 2 + "px"

            this.rButton2.style.width = this.rInputControl.offsetHeight - 2 + "px"
            this.rButton2.style.height = this.rInputControl.offsetHeight - 2 + "px"
        }
    }

    handleButtonInputClick(value) {
        if(!this.readOnly) {
            let number = parseFloat( this.rInput.value )
            this.rInput.value = isNaN(number) ? 0 : (number + value) < 0 ? 0 : (number + value)

            if( this.props.onChange && !isNaN(this.rInput.value)) {
                this.props.onChange(this.rInput.value)
            }
        }
    }

    handleKeyPress(e){
        if (e.key === 'Enter') {
            console.log('a');       
            // e.stopPropagation();
            if(this.props.onKeyPress) {
                this.props.onKeyPress(e);
            }
        }
    }

    handleChange(e) {
        if( this.props.onChange ) {
            this.props.onChange(e.target.value)
        }
    }

    value(_val) {
        // console.log(_val)
        this.rInput.value = _val
    }

    getValue() {
        return this.rInput.value
    }

    readonly(_bol) {
        if(_bol != undefined) {
            this.rInput.readOnly = _bol
            this.readOnly = _bol
            if(_bol) {
                this.rInputControl.classList.add("readOnly")
            } else {
                this.rInputControl.classList.remove("readOnly") 
            }
        } else {
            return this.rInput.readOnly
        }
    }

    focus() {
        this.rInput.focus()
    }
}
Input.defaultProps = {
    defaultValue: 0,
    step: 1,
    type: 'text',
    className: ""
}
export default Input