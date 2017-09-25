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
import { IndicatorPanel_RSI, IndicatorPanel_MACD, IndicatorPanel_STC, IndicatorPanel_Vol } from "./control/IndicatorPanel"

const indicatorMap = {"RSI": IndicatorPanel_RSI, "MACD": IndicatorPanel_MACD, "STC": IndicatorPanel_STC, "Volume": IndicatorPanel_Vol };
const chartPropsList = [
            {id: 'InChartVol', name: 'Volume', paraType: 'null'},
            {id: 'InChartSMA', name: 'SMA', paraType: 'int', defaultValue: [10,20]},
            {id: 'InChartWMA', name: 'WMA', paraType: 'int', defaultValue: [10,20]},
            {id: 'InChartEMA', name: 'EMA', paraType: 'int', defaultValue: [10,20]},
            {id: 'InChartSAR', name: 'SAR', paraType: 'float', defaultValue: [0.02,0.2]},
            {id: 'InChartBB', name: 'Bollinger (20, 2)', paraType: 'null'},
        ];

class TTLChartControl extends React.Component
{
    constructor(props) {
		super(props);
        
		this.refresh = this.refresh.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
        
		this.importState = this.importState.bind(this);
		this.exportState = this.exportState.bind(this);
		this.refreshState = this.refreshState.bind(this);
		this.setChartMethod = this.setChartMethod.bind(this);
        
		this.createAddIndicatorButton = this.createAddIndicatorButton.bind(this);
		this.addIndicator = this.addIndicator.bind(this);
		this.removeIndicator = this.removeIndicator.bind(this);
		this.addIndicatorRef = this.addIndicatorRef.bind(this);
		this.getIndicatorValues = this.getIndicatorValues.bind(this);
		this.changeMainChartSeries = this.changeMainChartSeries.bind(this);
		this.changeInSubChart = this.changeInSubChart.bind(this);
        
		this.createIndicatorPanel = this.createIndicatorPanel.bind(this);
		this.createInchartInputForm = this.createInchartInputForm.bind(this);
        
        const { chartMethod } = this.props;
        this.chartMethodGlobal = chartMethod;
        
        
        this.state={
            indicators: [],
            refreshState: false,
            controlShow: false,
        };
        this.refMap = {};
        this.getSetMap = {};
        this.indicatorRowIDMap={};
        this.indicatorRefMap={};
        this.errorState = {};
        this.indicatorRowID = 0;
    }
    
    refresh()
    {
        this.setState({
            refreshState: !this.state.refreshState
        });
    }
    
    componentDidMount()
    {
        if (!this.mainChartSeries) // Borrow flag
            this.changeMainChartSeries("Candle");
            // this.importState(["Candle", [["InChartVol"],["InChartSMA",[60]],["InChartBB"]], [["RSI", [11], 100], ["MACD", [13,5,3], 125]]]);
    }
    
    render()
    {
        const { indicators, refreshState, controlShow} = this.state;
        const cm = (pEventKey, pEvent) => {this.props.handleSeriesChange(pEventKey)};
        
        const inChartInputForms = chartPropsList.map((chartProps) => this.createInchartInputForm(chartProps));
        const AddDropDown = (props) => this.createAddIndicatorButton("main");
        return (
            <div className="ttlchart-control">
                <Button bsSize='sm' onClick={()=>this.setState({controlShow: !controlShow})}><Glyphicon glyph="cog"/></Button>
                <div style={{'display': (controlShow ? 'block' : 'none')}} className="TTLStockChart_C_Ctl_Disp">
                    <div className="panel panel-default" style={{'marginBottom': '0px'}} id="mainCtrl">
                        <div className="panel-heading">
                            Display
                            <div className="pull-right">
                                <DropdownButton pullRight className="btn btn-default pull-right" title="Chart Type" bsSize='xs' id="Display_MainChartSeriesType" onSelect={cm}>
                                    <MenuItem eventKey="Candle">Candle</MenuItem>
                                    <MenuItem eventKey="Line">Line</MenuItem>
                                    <MenuItem eventKey="Area">Area</MenuItem>
                                    <MenuItem eventKey="OHLC">OHLC</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <div className="panel-body" style={{'padding': '0px'}}>
                            {inChartInputForms}
                        </div>
                        <div className="panel-heading">
                            Indicators
                            <div className="pull-right">
                                <AddDropDown/>
                            </div>
                        </div>
                        <div className="panel-body" style={{'padding': '0px'}}>
                            {indicators}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    createInchartInputForm(chartProps)
    {
        const {id, name, paraType, defaultValue} = chartProps;
        
        if (paraType == 'null')
        {
            this.getSetMap[id] = {
                setOnOff: (value) => this.refMap[id+'_C'].value(value),
                getOnOff: () => this.refMap[id+'_C'].value(),
                setPara: (value) => {},
                getPara: () => {},
                isValid: (value) => true,
            }
        }
        else if (paraType == 'int')
        {
            this.getSetMap[id] = {
                setOnOff: (value) => this.refMap[id+'_C'].value(value),
                getOnOff: () => this.refMap[id+'_C'].value(),
                setPara: (value) => this.refMap[id+'_P'].value = value.toString(),
                getPara: () => this.refMap[id+'_P'].value.split(",").map(pStr=>parseInt(pStr)),
                isValid: (value) => {if (!value) value = this.refMap[id+'_P'].value; const patt = /^[0-9]+$/; var result = true; value.split(",").forEach((str)=> {if(!patt.test(str)) result = false;}); return result;},
            }
        }
        else if (paraType == 'float')
        {
            this.getSetMap[id] = {
                setOnOff: (value) => this.refMap[id+'_C'].value(value),
                getOnOff: () => this.refMap[id+'_C'].value(),
                setPara: (value) => this.refMap[id+'_P'].value = value.toString(),
                getPara: () => this.refMap[id+'_P'].value.split(",").map(pStr=>parseFloat(pStr)),
                isValid: (value) => {if (!value) value = this.refMap[id+'_P'].value; const patt = /^[0-9]+(\.[0-9]+)?$/; var result = true; value.split(",").forEach((str)=> {if(!patt.test(str)) result = false;}); return result;},
            }
        }
        
        const onChangeInternal = (e)=>
        {
            this.errorState[id] = !this.getSetMap[id].isValid(e.target.value);
            this.setState({refreshState: !this.setState.refreshState});
            this.changeInSubChart();
        };
        
        const formCtrl = [];
        if (paraType != 'null')
        {
            formCtrl.push(<FormControl key={0} inputRef={(ref)=>this.refMap[id+'_P']=ref} defaultValue={defaultValue.toString()} type="text" onChange={onChangeInternal}/>);
            formCtrl.push(<FormControl.Feedback key={1} />);
        }
        return (
            <FormGroup key={id} bsClass="panel-body" style={{'padding': '0px'}} validationState={this.errorState[id] ? 'error' : null}>
                <InputGroup bsSize='sm'>
                    <InputGroup.Addon>
                        <Switch bsSize="mini" ref={(ref)=>this.refMap[id+'_C']=ref} defaultValue={false} onChange={this.changeInSubChart}/> 
                        {' ' + name}
                    </InputGroup.Addon>
                    {formCtrl}
                </InputGroup>
            </FormGroup>);
    }
    
    setChartMethod(pChartMethod)
    {
        this.chartMethodGlobal = pChartMethod;
    }
    
    importState(pState)
    {
        if (pState[0])
        {
            this.changeMainChartSeries(pState[0])
        }
        if (pState[1])
        {
            chartPropsList.forEach((chartProps) =>
            {
                const {id, defaultValue} = chartProps;
                this.getSetMap[id].setOnOff(false);
                this.getSetMap[id].setPara(defaultValue);
            });
            pState[1].forEach((pInChartState) =>
            {
                const [id, value] = pInChartState;
                this.getSetMap[id].setOnOff(true);
                this.getSetMap[id].setPara(value);
            });
        }
        if (pState[2])
        {
            this.removeAllIndicator();
            pState[2].forEach((pInChartState)=>
            {
                const [id, value, height] = pInChartState;
                this.addIndicator(id, "last", value, height);
            });
        }
    }
    
    exportState()
    {
        const lvInChartList = [];
        const lvSubChartList = [];
        
        chartPropsList.forEach((chartProps) =>
        {
            const {id, defaultValue} = chartProps;
            if (this.getSetMap[id].getOnOff())
            {
                if (this.getSetMap[id].isValid())
                    lvInChartList.push([id, this.getSetMap[id].getPara()])
            }
        });
    
        this.getIndicatorValues().forEach((value)=>
        {
            if (value)
                lvSubChartList.push(value);
        });
        
        return [this.mainChartSeries, lvInChartList, lvSubChartList];
    }
    
    refreshState()
    {
        this.changeMainChartSeries(this.mainChartSeries);
        //refresh
        this.changeInSubChart();
    }
    
    createAddIndicatorButton(pIndicatorRowID)
    {
        const menuItemList = [];
        Object.keys(indicatorMap).forEach(function(key) {
           menuItemList.push(<MenuItem key={key} eventKey={key}>{key}</MenuItem>);
        });
        
        const lvID = "Add_"+pIndicatorRowID;
        const onSelect = (pEventKey, pEvent) => {this.addIndicator(pEventKey, pIndicatorRowID)};
        return (<Dropdown pullRight={true} id={lvID}>
                    <Dropdown.Toggle noCaret bsSize='xs'>
                        <Glyphicon glyph="plus" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu onSelect={onSelect}>
                        {menuItemList}
                    </Dropdown.Menu>
                </Dropdown>)
    }
    
    addIndicator(pIndicatorName, pIndicatorRowID, pDefaultValue, pDefaultHeight)
    {
        const indicators = this.state.indicators;
        const lvIndicatorRowID = "IndicatorRow_"+(this.indicatorRowID++);
        const panel = this.createIndicatorPanel(pIndicatorName, lvIndicatorRowID, pDefaultValue, pDefaultHeight);
        
        this.indicatorRowIDMap[lvIndicatorRowID]=panel;
        const prevPanel = this.indicatorRowIDMap[pIndicatorRowID];
        
        var index;
        if (pIndicatorRowID == "main")
        {
            index = 0;
        }
        else if (pIndicatorRowID == "last")
        {
            index = indicators.length;
        }
        else
        {
            for (var i=0;i<indicators.length;i++)
                if (indicators[i] == prevPanel)
                {
                    index = i+1;
                    break;
                }
        }
        indicators.splice(index,0,panel);
        
        this.setState({
            indicators: indicators
        })
    }
    
    removeIndicator(pIndicatorRowID)
    {
        var indicators = this.state.indicators;
        
        var panel = this.indicatorRowIDMap[pIndicatorRowID]
        delete this.indicatorRowIDMap[pIndicatorRowID]
        delete this.indicatorRefMap[pIndicatorRowID]
        
        for(var i = indicators.length - 1; i >= 0; i--)
            if(indicators[i] === panel)
            {
                indicators.splice(i, 1);
                break;
            }
        
        this.setState({
            indicators: indicators
        })
        
        //refresh
        this.changeInSubChart();
    }
    
    removeAllIndicator()
    {
        var indicators = this.state.indicators;
        for (var i=0;i<indicators.length;i++)
        {
            delete this.indicatorRowIDMap[indicators[i].key]
            delete this.indicatorRefMap[indicators[i].key]
        }
            
        this.setState({
            indicators: []
        })
        
        //refresh
        this.changeInSubChart();
    }
    
    addIndicatorRef(pIndicatorRowID, pRef)
    {
        if (this.indicatorRowIDMap[pIndicatorRowID])
        {
            this.indicatorRefMap[pIndicatorRowID] = pRef;
            //refresh
            this.changeInSubChart();
        }
    }
    
    getIndicatorValues()
    {
        var lvSubChartListPara = [];
        
        var indicators = this.state.indicators;
        for (var i=0;i<indicators.length;i++)
            lvSubChartListPara.push(this.indicatorRefMap[indicators[i].key].getValue())
        return lvSubChartListPara;
    }
    
    changeMainChartSeries(pSeries)
    {
        this.mainChartSeries = pSeries;
        if (this.chartMethodGlobal)
            this.chartMethodGlobal.chartObj.setMainChartSeries(pSeries);
    }

    changeInSubChart()
    {
        var lvInChartList = [];
        var lvSubChartList = [];
        
        var state = this.exportState();
    
        if (this.chartMethodGlobal)
            this.chartMethodGlobal.chartObj.setSubCharts(state[1], state[2]);
    }

    createIndicatorPanel(pName, pPanelID, pDefaultValue, pDefaultHeight)
    {
        var onChange = ()=>this.changeInSubChart();
        var onRemove = ()=>this.removeIndicator(pPanelID);
        var refFunc = (ref) => this.addIndicatorRef(pPanelID, ref);
        var addIndicatorButton = this.createAddIndicatorButton(pPanelID);
        
        var Indicator = indicatorMap[pName];
        return <Indicator key={pPanelID} ref={refFunc} onChange={onChange} onRemove={onRemove} addbutton={addIndicatorButton} defaultValue={pDefaultValue} defaultHeight={pDefaultHeight}/>;
    }
}

TTLChartControl.propTypes = {
	chartMethod: PropTypes.object.isRequired
};

TTLChartControl.defaultProps = {
};

export default TTLChartControl