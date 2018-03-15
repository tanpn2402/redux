import React from 'react'
import { Button, FormControl } from 'react-bootstrap'
import * as utils from "../../utils"

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
                    <span className='input-group-btn' style={{ zIndex: '1', left: "1px" }} >
                        <button type="button" className="btn btn-default"  tabIndex="-1"
                            onClick={() => this.handleButtonInputClick((-1)*step)} ref={r => this.rButton1 = r} >
                            <span className="glyphicon glyphicon-minus"></span>    
                        </button>
                    </span>
                    <FormControl
                        inputRef={ref => this.rInput = ref}
                        onChange={this.handleChange} defaultValue={this.props.defaultValue}
                        onKeyPress={this.handleKeyPress} 
                        type='number'
                        min='0'
			            max={this.props.maxValue}
                        tabIndex={this.props.tabIndex}
                        id={this.props.idInput}
                        />
                    <span className='input-group-btn' style={{ zIndex: '1', right: "1px" }}>
                        <button type="button" className="btn btn-default" tabIndex="-1"
                            onClick={() => this.handleButtonInputClick(step)} ref={r => this.rButton2 = r}>
                            <span className="glyphicon glyphicon-plus"></span>    
                        </button>
                    </span>
                </div>
            )
        } else if(type === "currency") {
            return (
                <div className={'input-control number' + this.props.className} ref={ r => this.rInputControl = r } >
                    <span className='input-group-btn' style={{ zIndex: '1', left: "1px" }} >
                        <button type="button" className="btn btn-default"  tabIndex="-1"
                            onClick={() => this.handleButtonInputClick((-1)*step)} ref={r => this.rButton1 = r} >
                            <span className="glyphicon glyphicon-minus"></span>    
                        </button>
                    </span>
                   
                    <input type="text" 
                        ref={ref => this.rInput = ref}
                        onKeyPress={this.keyPress.bind(this)}
                        type='text'
                        min="0" max={this.props.maxValue}
                        tabIndex={this.props.tabIndex}
                        class="form-control" 
                        onChange={this.handleChange} defaultValue={this.props.defaultValue} />
                    <span className='input-group-btn' style={{ zIndex: '1', right: "1px" }}>
                        <button type="button" className="btn btn-default" tabIndex="-1"
                            onClick={() => this.handleButtonInputClick(step)} ref={r => this.rButton2 = r}>
                            <span className="glyphicon glyphicon-plus"></span>    
                        </button>
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
                        type={this.props.type}
                        defaultValue={defaultValue}
                        readOnly={this.props.readOnly}
                        style={this.props.style}
                        tabIndex={this.props.tabIndex}
                    />
                
                </div>
            )
        }
        
    }

    componentDidMount() {
        // if(this.rInputControl && this.props.tabIndex != undefined) {
        //     this.rInputControl.tabIndex = this.props.tabIndex
        // }

        if(this.rInputControl && this.rButton1 && this.rButton2) {
            this.rButton1.style.width = this.rInputControl.offsetHeight - 2 + "px"
            this.rButton1.style.height = this.rInputControl.offsetHeight - 2 + "px"

            this.rButton2.style.width = this.rInputControl.offsetHeight - 2 + "px"
            this.rButton2.style.height = this.rInputControl.offsetHeight - 2 + "px"
        }
    }

    handleButtonInputClick(value) {
        if(!this.readOnly) {
            let number = utils.round(parseFloat( this.rInput.value ), 1);
            let maxNumber = parseFloat( this.props.maxValue )

            let v = isNaN(number) ? 0 : (number + value) < 0 ? 0 :(number + value)>maxNumber ? maxNumber : (number + value)

            this.rInput.value = utils.round(v, 2)

            if( this.props.onChange && !isNaN(this.rInput.value)) {
                this.props.onChange(this.rInput.value)
            }
        }
    }

    keyPress(e) {
        console.log("key press")
        var decimalvalidate = /^[0-9][0-9]*$/;
        if (!decimalvalidate.test(e.key)) {
            let number =  utils.round(parseFloat( this.rInput.value ), 1);
            let maxNumber = parseFloat( this.props.maxValue );
            if(e.key == "." ) {
                if(this.rInput.value.includes(".") ){
                    e.preventDefault()
                    return
                } else {
                    this.rInput.value += '.'
                    e.preventDefault()
                    return
                }
            }
            e.preventDefault();
            if (e.key === 'Enter' && this.props.onKeyPress != undefined) {
                this.props.onKeyPress(e)

            }
            else if(e.key==='+'){
                if(number >=maxNumber ){
                    return
                } else {
                    let v=number + this.props.step;
                    this.rInput.value = utils.round(v, 2)
		        }
            } else if(e.key==='-' && number !== 0) {
                let v = (number - this.props.step) > 0 ? number - this.props.step : 0;
                this.rInput.value = utils.round(v, 2)
            }
        } 
    }
    
    handleKeyPress(e){
        var decimalvalidate = /^[0-9][0-9]*$/;
        if (!decimalvalidate.test(e.key)) {
            let number = Math.ceil(parseFloat( this.rInput.value ));
            let maxNumber = parseFloat( this.props.maxValue );
            e.preventDefault();
            if (e.key === 'Enter' && this.props.onKeyPress != undefined) {
                this.props.onKeyPress(e)

            }
            else if(e.key==='+'){
                if(number >=maxNumber ){
                    return
                } else {
                	this.rInput.value=number + this.props.step;
		}
            } else if(e.key==='-' && number !== 0) {
                this.rInput.value = (number - this.props.step) > 0 ? number - this.props.step : 0;
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
    className: "",
    maxValue: 10000000,
    idInput: ""
}
export default Input