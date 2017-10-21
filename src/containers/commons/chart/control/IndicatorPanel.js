// react element
import React from "react";
import PropTypes from 'prop-types'; // ES6

import { Button, FormControl, FormGroup, InputGroup, Glyphicon, Popover, OverlayTrigger } from 'react-bootstrap';
import Switch from "react-bootstrap-switch"

class IndicatorPanel extends React.Component
{
    constructor(props)
    {
		super(props);
        
        this.getValue = this.getValue.bind(this);
        this.createParaForm = this.createParaForm.bind(this);
        
        this.state = {
            refreshState: false
        };
        this.paraRef = [];
        this.errorState = [];
    }
    
    render()
    {
        const { name, onChange, onRemove, addbutton, defaultValue } = this.props;
        const { refreshState } = this.state;
        // const popoverHoverFocus = (<Popover id="" title="RSI">This is a description.</Popover>);
                    // <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
                // <FormControl inputRef={(r)=>ref_Period=r} defaultValue="14" type="text" onChange={onChange}/>
            // </OverlayTrigger>
            
        const paraForm = [];
        for (var i = 0; i < this.paraName.length; i++)
            paraForm.push(this.createParaForm(i));
        
        return(
            <div className="panel panel-default" style={{'marginBottom': '0px'}}>
                <div className="panel-heading" style={{'backgroundColor': '#97ccff'}}>
                    {name}
                    <div className="pull-right">
                        {addbutton}
                        <Button bsSize='xs' onClick={()=>{if (onRemove) onRemove(this)}}><Glyphicon glyph="remove"/></Button>
                    </div>
                </div>
                    {paraForm}
            </div>
        );
    }
    
    createParaForm(index)
    {
        const { onChange, defaultValue } = this.props;
        var onChangeInternal = (e)=>
        {
            this.errorState[index] = !this.validate(e.target);
            this.setState({refreshState: !this.setState.refreshState});
            if (onChange)
                onChange();
        };
        return (
            <FormGroup key={index} bsClass="panel-body" style={{'padding': '0px'}} validationState={this.errorState[index] ? 'error' : null}>
                <InputGroup bsSize='sm' style={{'width': '100%'}}>
                    <InputGroup.Addon style={{'width': '100px'}}>
                        {this.paraName[index]}
                    </InputGroup.Addon>
                    <FormControl inputRef={(r)=>{if(!this.paraRef[index])this.paraRef[index]=r}} defaultValue={defaultValue[index].toString()} type="text" onChange={onChangeInternal}/>
                    <FormControl.Feedback />
                </InputGroup>
            </FormGroup>
            );
    }
    
    setValue(pValue)
    {
        for (var i = 0; i < pValue[1].length; i++)
            this.paraRef[i].value(pValue[1][i].toString());
    }
    
    getValue()
    {
        const { defaultValue, defaultHeight } = this.props;
        const value = [];
        for (var i = 0; i < this.paraRef.length; i++)
        {
            if (!this.validate(this.paraRef[i])) // One wrong value, all use default
                return [this.id, defaultValue, defaultHeight];
            value.push(parseInt(this.paraRef[i].value));
        }
        return [this.id, value, defaultHeight];
    }
    
    validate(pComp)
    {
        if (!pComp)
            return true;
        var patt = /^[0-9]+$/
        return patt.test(pComp.value);
    }
}

IndicatorPanel.propTypes = {
	defaultValue: PropTypes.array.isRequired,
    defaultHeight: PropTypes.number.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
}

class IndicatorPanel_RSI extends IndicatorPanel
{
    constructor(props)
    {
		super(props);
        
        this.paraName = ['Period'];
        this.id = "RSI";
    }
}

IndicatorPanel_RSI.defaultProps = {
    defaultValue: [14],
    defaultHeight: 100,
    name: "RSI",
};

class IndicatorPanel_MACD extends IndicatorPanel
{
    constructor(props)
    {
		super(props);
        
        this.paraName = ['Short EMA', 'Long EMA', 'Signal Line'];
        this.id = "MACD";
    }
}

IndicatorPanel_MACD.defaultProps = {
    defaultValue: [12, 26, 9],
    defaultHeight: 125,
    name: "MACD",
};

class IndicatorPanel_STC extends IndicatorPanel
{
    constructor(props)
    {
		super(props);
        
        this.paraName = ['%K', '%D', 'K Period'];
        this.id = "STO";
    }
}

IndicatorPanel_STC.defaultProps = {
    defaultValue: [14, 5, 3],
    defaultHeight: 125,
    name: "STC",
};

class IndicatorPanel_Vol extends IndicatorPanel
{
    constructor(props)
    {
		super(props);
        
        this.paraName = [];
        this.id = "Vol";
    }
}

IndicatorPanel_Vol.defaultProps = {
    defaultValue: [],
    defaultHeight: 125,
    name: "Volume",
};

export {IndicatorPanel_RSI, IndicatorPanel_MACD, IndicatorPanel_STC, IndicatorPanel_Vol}