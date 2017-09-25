/*global define*/
"use strict";

// css
import "../css/bootstrap-iso.css";
// import "../css/bootstrap.css";
// import "../css/bootstrap-theme.css";
import "../css/react-bootstrap-switch.css";

// react element
import React from "react";
import PropTypes from 'prop-types'; // ES6

import { Button, FormControl, FormGroup, InputGroup, Dropdown, MenuItem, DropdownButton, Glyphicon } from 'react-bootstrap';
import Switch from "react-bootstrap-switch"

class TTLChartEditControl extends React.Component
{
    constructor(props) {
		super(props);
        // Bind function
		this.refresh = this.refresh.bind(this);

        // Initialize variable
        var { chartMethod } = this.props;
        
        this.chartMethodGlobal = chartMethod;
        
        this.refMap = {};
        this.state={
            refreshState: false,
            controlShow: false,
        };
    }
    
    refresh()
    {
        this.setState({
            refreshState: !this.state.refreshState
        });
    }
    
    render()
    {
        const { refreshState, controlShow } = this.state;
        const onSelect = (eventKey)=>{this.props.startInteract(eventKey)}
        return (
            <div>
                <Dropdown pullRight id="ChartEditDropdown" onSelect={onSelect}>
                    <Dropdown.Toggle noCaret bsSize='sm'>
                        <Glyphicon glyph="pencil" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem eventKey="FreeLine">Free Line</MenuItem>
                        <MenuItem eventKey="TrendLine">Trend Line</MenuItem>
                        <MenuItem eventKey="FibonacciRetracement">Fibonacci Retracement</MenuItem>
                        <MenuItem eventKey="EquidistantChannel">Equidistant Channel</MenuItem>
                        <MenuItem eventKey="StandardDeviationChannel">Standard Deviation Channel</MenuItem>
                        <MenuItem eventKey="GannFan">Gann Fan</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="Undo">Undo</MenuItem>
                        <MenuItem eventKey="Clear">Clear</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
    
    setChartMethod(pChartMethod)
    {
        this.chartMethodGlobal = pChartMethod;
    }
}

TTLChartEditControl.propTypes = {
	chartMethod: PropTypes.object.isRequired
};

TTLChartEditControl.defaultProps = {
};

export default TTLChartEditControl