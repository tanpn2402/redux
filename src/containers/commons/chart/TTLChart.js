/*global define*/
"use strict";

// react element
import React from "react";
import PropTypes from 'prop-types'; // ES6

// D3 format
import { timeParse, timeFormat } from "d3-time-format";
import { format } from "d3-format";

// css
import "./../../../assets/css/chart_hist.css";

// react-stockcharts
import { ChartCanvas, Chart } from "react-stockcharts";
import { fitWidth , TypeChooser} from "react-stockcharts/lib/helper";
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } from "react-stockcharts/lib/coordinates";
import { sma, wma, ema, sar, bollingerBand, macd, rsi, stochasticOscillator } from "react-stockcharts/lib/indicator";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { OHLCTooltip, MovingAverageTooltip, BollingerBandTooltip, MACDTooltip, RSITooltip, StochasticTooltip, SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { CandlestickSeries, LineSeries, AreaSeries, OHLCSeries, BarSeries, MACDSeries, RSISeries, StochasticSeries, SARSeries, BollingerSeries} from "react-stockcharts/lib/series";

// TTL element
import TTLMainChart from "./TTLMainChart"
import TTLTimeLineChart from "./TTLTimeLineChart"
import TTLChartControl from "./TTLChartControl"
import TTLChartEditControl from "./TTLChartEditControl"

import Config from '../../../core/config'

class TTLChart extends React.Component
{
	constructor(props) {
		super(props);
        // Previous chart type and sub chart list paramerters
        this.prevChartType = this.props.config.chart.type;
        this.subChartVarArray = [];
        this.inChartVarArray = [];
        // Bind function
		this.refresh = this.refresh.bind(this);
		this.addRawData = this.addRawData.bind(this);
		this.setRawData = this.setRawData.bind(this);
		this.setChartType = this.setChartType.bind(this);
		this.setMainChartSeries = this.setMainChartSeries.bind(this);
		this.setSubCharts = this.setSubCharts.bind(this);
		this.handleMainChartEvents = this.handleMainChartEvents.bind(this);
		this.updateData = this.updateData.bind(this);
		this.resetXExtents = this.resetXExtents.bind(this);
		this.refreshMovingWindowDomain = this.refreshMovingWindowDomain.bind(this);
        this.startInteract = this.startInteract.bind(this);
        this.handleCreateMainChartSeries = this.handleCreateMainChartSeries.bind(this);
        this.handleSetSubCharts = this.handleSetSubCharts.bind(this);
        
        this.data = convertRawData(this.props.rawData);
        this.state = {
            refreshState: false,
            mainChartSeries: createMainChartSeries(this.props.config.chart.type, this.props.config),
            drawingSwitch: false,
            data: this.data,
            inChartList: [],
            subChartList: []
        }

        this.interactEnabled = {};
        this.interactRef = {};
        this.interactGraph = this.props.config.interactGraph;
        this.undoList = [];
        
        var isMob = false;
        if (isMob)
        {
            this.chartLayout = {
                chartCanvas_margin_left: 50,
                chartCanvas_margin_right:40,
                axis_fontSize: 22,
                tooltip_fontSize: 16,
                subchart_topPadding: 30,
                tooltip_width: 90,
                tooltip_startx: -36,
            };
        }
        else
        {
            this.chartLayout = {
                chartCanvas_margin_left: 50,
                chartCanvas_margin_right: 40,
                axis_fontSize: 11,
                tooltip_fontSize: 11,
                subchart_topPadding: 10,
                tooltip_width: 65,
                tooltip_startx: -30,
            };
        }
    }

    componentWillReceiveProps(nextProps){
        this.state.mainChartSeries = createMainChartSeries(this.prevChartType, nextProps.config);
        this.state.subChartList = this.handleSetSubCharts(this.inChartVarArray, this.subChartVarArray, nextProps.config);

        let _tmp = convertRawData(nextProps.rawData)
        // console.log("TTL CHAR", _tmp)
        this.setState({
            data: _tmp,
            refreshState: true,
            mainChartSeries: createMainChartSeries(nextProps.config.chart.type, nextProps.config),
        })
    }
    
    componentDidMount()
    {
        this.resetXExtents();
        this.interactGraph = this.props.config.interactGraph
        this.subChartVarArray = this.props.config.subCharts;
        this.inChartVarArray = this.props.config.inCharts;
        this.handleSetSubCharts(this.props.config.inCharts, this.props.config.subCharts, this.props.config)
    }

    componentDidUpdate() {
        // var h = this.props.height + 30
        // this.subChartVarArray.forEach(e => {
        //     let height = e[2]
        //     if(height) {
        //         h += height
        //     }
        // })

        // this.TTLStockChart.style.height = h + "px"
    }

    componentWillUnmount() {
    }

	render() {
		var { width, height, ratio, config } = this.props;
        var { refreshState } = this.state;

        let padding = {top: "25px", bottom: "100px"}
        if(config.option.control == false && config.option.editor == false) 
            padding.top = 0 + "px"
        if(config.option.timeline == false)
            padding.bottom = 0 + "px"
            
		return (
            <div className={"TTLStockChart " + config.chart.appearance.theme} ref={ref => this.TTLStockChart = ref}
                style={{backgroundColor: config.chart.appearance.background}}>
                
                <div id="TTLStockChart_C_Main" className="TTLStockChart_C_Main">
                    <div className="TTLMainChart" style={{paddingTop: padding.top, paddingBottom: padding.bottom}}>
                        <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
                            <TTLMainChart width={width} height={height} ratio={ratio} ref={node => {this.mainChart=node;}} baseref={this}
                                chartLayout={this.chartLayout}
                                data={this.state.data}
                                config={config}
                                onChartEvent={this.handleMainChartEvents}
                                mainSeries={this.state.mainChartSeries}
                                drawingSwitch={this.state.drawingSwitch}
                                interactEnabled={this.interactEnabled}
                                interactGraph={this.interactGraph}
                                interactRef={this.interactRef}
                                undoList={this.undoList}
                                onInteractComplete={(id) => this.handleOnInteractComplete(id)}
                                inChartList={this.state.inChartList}
                                subChartList={this.state.subChartList}
                                />

                        </div>
                    </div>
                    <div className="TTLTimeLineChart">
                        {
                            !this.props.config.option.timeline ? null :
                                <TTLTimeLineChart width={width} height={70} ratio={ratio} 
                                    ref={node => {this.timeLine=node;}} baseref={this}
                                    chartLayout={this.chartLayout}
                                    data={this.state.data}
                                    config={config}
                                    />
                        }
                    </div>
                   
                </div>
                <div id="TTLStockChart_C_Ctl" className="TTLStockChart_C_Ctl" >
                    {
                        !this.props.config.option.control ? null : 
                            <TTLChartControl 
                                inCharts={config.inCharts}
                                subCharts={config.subCharts}
                                mainChartSeries={config.chart.type} 
                                handleSeriesChange={(series) => this.handleCreateMainChartSeries(series, config)} 
                                handleSetSubCharts={(inChartVarArray, subChartVarArray) => {
                                            this.subChartVarArray = subChartVarArray;
                                            this.inChartVarArray = inChartVarArray;
                                            this.handleSetSubCharts(inChartVarArray, subChartVarArray, config)
                                        }
                                    }/>
                    }
                </div>
                <div id="TTLStockChart_C_EditCtl" className="TTLStockChart_C_EditCtl">
                    {
                        !this.props.config.option.editor ? null : 
                            <TTLChartEditControl startInteract={(id) => this.handleStartInteract(id)}/>
                    }
                </div>
            </div>
		);
    }
    
    handleOnInteractComplete(id)
    {
        return (graph) => 
        {
            this.undoList.push(id);
            this.interactEnabled[id] = false;
            this.interactGraph[id] = graph;
            Config.technical_analysis_setting.interactGraph[id] = graph
            this.setState((prevState, props) => ({
                drawingSwitch: !prevState.drawingSwitch
            }));
        }
        
    }
    
    handleStartInteract(id)
    {
        for (let key in this.interactRef)
            this.interactRef[key].terminate();
        if (id == "Clear")
        {
            for (let key in this.interactGraph)
            {
                this.interactGraph[key] = undefined;
                this.interactEnabled[key] = false;
                Config.technical_analysis_setting.interactGraph[key] = undefined
            }
            this.undoList = [];
        }
        else if (id == "Undo")
        {
            if (this.undoList.length > 0)
            {
                const undoGraphID = this.undoList.pop();
                this.interactGraph[undoGraphID].pop();
                Config.technical_analysis_setting.interactGraph[undoGraphID].pop();
            }
        }
        else
        {
            this.interactEnabled[id] = true;
        }

        this.setState((prevState, props) => ({
            drawingSwitch: !prevState.drawingSwitch
        }));
    }
    
    handleMainChartEvents(newXScaleDomain)
    {
        if(this.props.config.option.timeline) {
            this.timeLine.refreshMovingWindow(newXScaleDomain);
        }
    }
    
    refresh()
    {
        this.setState({
            refreshState: !this.state.refreshState  
        });
    }

    addRawData(rawDataPoint)
    {
        addRawDataPoint(this.state.data, rawDataPoint);
        this.updateData();
    }

    setRawData(rawData)
    {
        this.state.data = convertRawData(rawData);
        this.updateData(true);
    }
    
    updateData(resetXExtents)
    {
        if (resetXExtents)
            this.mainChart.startInteract("Clear");
        
        var callBackCount;
        const callBack = () =>
        {
            if (!callBackCount)
                callBackCount = true;
            else
            {
                if (resetXExtents)
                    this.resetXExtents();
                else
                    this.refreshMovingWindowDomain();
            }
        }
        this.mainChart.setState({
            data: this.state.data
        }, callBack);

        if(this.props.config.option.timeline) {
            this.timeLine.setState({
                data: this.state.data
            }, callBack);
        }
    }
    
    resetXExtents()
    {
        var callBack = () => this.refreshMovingWindowDomain();
        this.mainChart.xAxisZoom([Math.max(0,this.state.data.length-100), this.state.data.length - 1], callBack); // Default xExtents
    }
    
    refreshMovingWindowDomain()
    {
        this.handleMainChartEvents(this.mainChart.canvas.state.xScale.domain());
    }
    
    setChartType(pChartType)
    {
        this.mainChart.setChartType(pChartType);
    }
    
    setMainChartSeries(pSeriesName)
    {
        this.mainChart.setMainChartSeries(pSeriesName);
    }

    setSubCharts(pInChartVarArray, pSubChartVarArray) {
        this.mainChart.setSubCharts(pInChartVarArray, pSubChartVarArray)
    }
    
    startInteract(id)
    {
        this.mainChart.startInteract(id);
    }

    handleCreateMainChartSeries(pSeriesName, pConfig){
        var pSeries = createMainChartSeries(pSeriesName, pConfig);
        this.setState({mainChartSeries: pSeries})
        Config.technical_analysis_setting.mainChartSeries = pSeriesName
        this.prevChartType = pSeriesName;
    }
    /*
        - pInChartVarArray: ds cac chart trong main chart
        - pSubChartVarArray: ds sub chart
    */
    handleSetSubCharts(pInChartVarArray, pSubChartVarArray, pConfig)
    {
        // console.log(pInChartVarArray, pSubChartVarArray)
        var lvDisplayInChartVol = false;
        if (pInChartVarArray != undefined)
        {
            for (var i=0;i<pInChartVarArray.length;i++)
                if ("InChartVol" == pInChartVarArray[i][0])
                {
                    lvDisplayInChartVol = true;
                    pInChartVarArray.splice(i, 1);
                    i--;
                }
        }
        const lvInChartList = createInChartList(pInChartVarArray, this.chartLayout);
        const lvSubChartListForInChart = createSubChartListForInChart(lvDisplayInChartVol, this.chartLayout);
        const lvSubChartList = createSubChartList(lvDisplayInChartVol, pSubChartVarArray, this.chartLayout, pConfig);
        const lvTotalSubChartList = lvSubChartListForInChart.concat(lvSubChartList);
        var lvData;
        if (this.state.data)
            lvData = this.state.data.map(function (r, i) {
                return clearDataPoint(r);
            });
        Config.technical_analysis_setting.inChartList = Object.assign([], pInChartVarArray)
        Config.technical_analysis_setting.subChartList = Object.assign([], pSubChartVarArray)
        this.setState({
            data: lvData,
            inChartList: lvInChartList,
            subChartList: lvTotalSubChartList
        });
        
    }
}
// END OF CLASS TTLChart
const upColor = "#CC0000";
const downColor = "#1054A9";
const inChartFuncMap = {"InChartSMA": createInChartSMA, "InChartEMA": createInChartEMA, "InChartWMA": createInChartWMA, "InChartSAR": createInChartSAR, "InChartBB": createInChartBB};
const subChartInitialTopPadding = 20;
const subChartFuncMap = {"InChartVol": createInChartVol, "Vol": createVol, "RSI": createRSI, "MACD": createMACD, "STO": createSTO};
const bbAppearance = {
    stroke: {
        top: "#964B00",
        middle: "#FF6600",
        bottom: "#964B00",
    },
    fill: "#4682B4"
};
const macdAppearance = {
	stroke: {
		macd: "#FF0000",
		signal: "#00F300",
	},
	fill: {
		divergence: "#4682B4"
	},
};
const stoAppearance = {
	stroke: Object.assign({},
		StochasticSeries.defaultProps.stroke)
};


// CREATE SUB CHART
// define subchart
/*
pChartName, pPara, pHeight
pChartName= InChartVol|Vol|RSI|MACD|STO
*/
function createInChartVol(props)
{
    const {id, height, origin, para, addPadding, chartLayout, config} = props;
    // console.log('create In Chart Vol')
    return (
        <Chart
            id={id}
            key={id}
            yExtents={d => d.volume}
            height={height}
            origin={origin}>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} ticks={5} tickFormat={format(".0s")} 
                tickStroke={config.axis.tickStroke} stroke={config.axis.stroke}/>
        
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".4s")} />
        
            <BarSeries yAccessor={d => d.volume} />
        </Chart>)
}

function createVol(props)
{
    // console.log('create Vol')
    const {id, height, origin, para, addPadding, chartLayout, config} = props;
    // No para
    const topPadding = chartLayout.subchart_topPadding + (addPadding ? subChartInitialTopPadding : 0);
    
    // No calculator
    return (
        <Chart
            id={id}
            key={id}
            yExtents={d => d.volume}
            height={height}
            exHeight={true}
            origin={origin}
            padding={{ top: topPadding, bottom: 0 }}>
            
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} tickStroke={config.axis.tickStroke} stroke={config.axis.stroke}/>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} ticks={5} tickFormat={format(".0s")} 
                tickStroke={config.axis.tickStroke} stroke={config.axis.stroke}/>
        
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".4s")} />
        
            <BarSeries yAccessor={d => d.volume} />
            <SingleValueTooltip
                origin={[chartLayout.tooltip_startx, topPadding]}
                fontSize={chartLayout.tooltip_fontSize}
                yAccessor={d => d.volume}
                yLabel={'Volume'} 
                yDisplayFormat={format(".4s")}
            />
        </Chart>)
}

function createRSI(props)
{
    // console.log('create RSI')
    const {id, height, origin, para, addPadding, chartLayout, config} = props;
    const [pPeriod] = para; //14
    const topPadding = chartLayout.subchart_topPadding + (addPadding ? subChartInitialTopPadding : 0);
    
    const calculator = rsi()
        .options({windowSize: pPeriod})
        .merge((d, c) => {d[id] = c})
        .accessor(d => d[id]);
    return (
        <Chart
            id={id}
            key={id}
            calculator={calculator}
            height={height}
            exHeight={true}
            yExtents={[0, 100]}
            origin={origin}
            padding={{ top: topPadding, bottom: 0 }}>
            
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} tickStroke={config.axis.tickStroke} stroke={config.axis.stroke}/>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} tickValues={[30, 50, 70]} 
                tickStroke={config.axis.tickStroke} stroke={config.axis.stroke}/>
    
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")} />
    
            <RSISeries
                yAccessor={calculator.accessor()}
            />
            <RSITooltip
                origin={[chartLayout.tooltip_startx, topPadding]}
                yAccessor={calculator.accessor()}
                options={calculator.options()}
                fontSize={chartLayout.tooltip_fontSize}
            />
        </Chart>)
}

function createMACD(props)
{
    // console.log('create MACD')
    const {id, height, origin, para, addPadding, chartLayout, config} = props;
    const [pShortEMA, pLongEMA, pSignalLine] = para;//12,26,9
    const topPadding = chartLayout.subchart_topPadding + (addPadding ? subChartInitialTopPadding : 0);
    const calculator = macd()
        .options({fast: pShortEMA, slow: pLongEMA, signal: pSignalLine})
        .merge((d, c) => {d[id] = c})
        .accessor(d => d[id]);
    return (
        <Chart
            id={id}
            key={id}
            calculator={calculator}
            height={height}
            exHeight={true}
            yExtents={calculator.accessor()}
            origin={origin}
            padding={{ top: topPadding, bottom: 0 }}>
            
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} tickStroke={config.axis.tickStroke} stroke={config.axis.stroke}/>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} ticks={5} 
                tickStroke={config.axis.tickStroke} stroke={config.axis.stroke} />
    
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")} />
    
            <MACDSeries
                yAccessor={calculator.accessor()}
                {...macdAppearance}
                />
            <MACDTooltip
                origin={[chartLayout.tooltip_startx, topPadding]}
                yAccessor={calculator.accessor()}
                options={calculator.options()}
                fontSize={chartLayout.tooltip_fontSize}
                appearance={macdAppearance}
                />
        </Chart>)
}

function createSTO(props)
{
    // console.log('create STO')
    const {id, height, origin, para, addPadding, chartLayout, config} = props;
    const [pK, pD, pKW] = para; //slow:14,5,3  fast:20,5,1
    const topPadding = chartLayout.subchart_topPadding + (addPadding ? subChartInitialTopPadding : 0);
    const calculator = stochasticOscillator()
        .options({windowSize: pK, kWindowSize: pKW, dWindowSize: pD})
        .merge((d, c) => {d[id] = c})
        .accessor(d => d[id]);
    return (
        <Chart
            key={id}
            id={id}
            calculator={calculator}
            height={height}
            exHeight={true}
            yExtents={[0, 100]}
            origin={origin}
            padding={{ top: topPadding, bottom: 0 }}>
            
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} tickStroke={config.axis.tickStroke} stroke={config.axis.stroke}/>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} tickValues={[20, 50, 80]}
                tickStroke={config.axis.tickStroke} stroke={config.axis.stroke}/>
        
            <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")} />
        
            <StochasticSeries
                yAccessor={calculator.accessor()}
                {...stoAppearance}
                />
            <StochasticTooltip
                origin={[chartLayout.tooltip_startx, topPadding]}
                yAccessor={calculator.accessor()}
                options={calculator.options()}
                appearance={stoAppearance}
                fontSize={chartLayout.tooltip_fontSize} 
                label="STO"
                />
        </Chart>)
}

function createInChartSMA(props)
{
    // console.log('create In Chart SMA')
    const {id, tooltipStruct, para, chartLayout} = props;
    // var [pPeriod] = para; // 10
    var lvInChartArray = [];
    var lvCal = [];
    
    var lvPeriodID = 0;
    var tooltipOptions = [];
    para.forEach((pPeriod) =>
    {
        lvPeriodID++;
        var calculator = sma()
            .id(id+'P'+lvPeriodID+'A')
            .options({windowSize: pPeriod})
            .merge(((t) => (d, c) => {d[id+'P'+t] = c})(lvPeriodID))
            .accessor(((t) => d => d[id+'P'+t])(lvPeriodID));
        lvInChartArray.push(<LineSeries key={id+'P'+lvPeriodID+'A'} calculator={calculator} yAccessor={calculator.accessor()} stroke={calculator.stroke()}/>);
        // lvInChartArray.push(<CurrentCoordinate yAccessor={calculator.accessor()} fill={calculator.stroke()} />);
        lvCal.push(calculator);
        tooltipOptions.push({yAccessor: calculator.accessor(), type: calculator.type(), stroke: calculator.stroke(), windowSize: calculator.options().windowSize});
    })

    lvInChartArray.push(<MovingAverageTooltip key={id+'C'} origin={[tooltipStruct.row0.x, tooltipStruct.row0.y]} width={chartLayout.tooltip_width} fontSize={chartLayout.tooltip_fontSize} options={tooltipOptions}/>);
    para.forEach((pPeriod) => tooltipStruct.row0.x += chartLayout.tooltip_width);
    return lvInChartArray;
}

function createInChartWMA(props)
{
    // console.log('create In Chart WMA')
    const {id, tooltipStruct, para, chartLayout} = props;
    // var [pPeriod] = para; // 10
    var lvInChartArray = [];
    var lvCal = [];

    var lvPeriodID = 0;
    var tooltipOptions = [];
    para.forEach((pPeriod) =>
    {
        lvPeriodID++;
        var calculator = wma()
            .id(id+'P'+lvPeriodID+'A')
            .options({windowSize: pPeriod})
            .merge(((t) => (d, c) => {d[id+'P'+t] = c})(lvPeriodID))
            .accessor(((t) => d => d[id+'P'+t])(lvPeriodID));
        lvInChartArray.push(<LineSeries key={id+'P'+lvPeriodID+'A'} calculator={calculator} yAccessor={calculator.accessor()} stroke={calculator.stroke()}/>);
        // lvInChartArray.push(<CurrentCoordinate key={id+'P'+lvPeriodID+'B'} yAccessor={calculator.accessor()} fill={calculator.stroke()} />);
        lvCal.push(calculator);
        tooltipOptions.push({yAccessor: calculator.accessor(), type: calculator.type(), stroke: calculator.stroke(), windowSize: calculator.options().windowSize});
    })

    lvInChartArray.push(<MovingAverageTooltip key={id+'C'} origin={[tooltipStruct.row0.x, tooltipStruct.row0.y]} width={chartLayout.tooltip_width} fontSize={chartLayout.tooltip_fontSize} options={tooltipOptions}/>);
    para.forEach((pPeriod) => tooltipStruct.row0.x += chartLayout.tooltip_width);
    return lvInChartArray;
}

function createInChartEMA(props)
{
    // console.log('create In Chart EMA')
    const {id, tooltipStruct, para, chartLayout} = props;
    // var [pPeriod] = para; // 10
    var lvInChartArray = [];
    var lvCal = [];

    var lvPeriodID = 0;
    var tooltipOptions = [];
    para.forEach((pPeriod) =>
    {
        lvPeriodID++;
        var calculator = ema()
            .id(id+'P'+lvPeriodID+'A')
            .options({windowSize: pPeriod})
            .merge(((t) => (d, c) => {d[id+'P'+t] = c})(lvPeriodID))
            .accessor(((t) => d => d[id+'P'+t])(lvPeriodID));
        lvInChartArray.push(<LineSeries key={id+'P'+lvPeriodID+'A'} calculator={calculator} yAccessor={calculator.accessor()} stroke={calculator.stroke()}/>);
        // lvInChartArray.push(<CurrentCoordinate key={id+'P'+lvPeriodID+'B'} yAccessor={calculator.accessor()} fill={calculator.stroke()} />);
        lvCal.push(calculator);
        tooltipOptions.push({yAccessor: calculator.accessor(), type: calculator.type(), stroke: calculator.stroke(), windowSize: calculator.options().windowSize});
    })

    lvInChartArray.push(<MovingAverageTooltip key={id+'C'} origin={[tooltipStruct.row0.x, tooltipStruct.row0.y]} width={chartLayout.tooltip_width} fontSize={chartLayout.tooltip_fontSize} options={tooltipOptions}/>);
    para.forEach((pPeriod) => tooltipStruct.row0.x += chartLayout.tooltip_width);
    return lvInChartArray;
}

function createInChartSAR(props)
{
    // console.log('create In Chart SAR')
    const {id, tooltipStruct, para, chartLayout} = props;
    var [pSccelerationFactor, pMaxAccelerationFactor] = para; // 0.02,0.2
    var lvInChartArray = [];
    var lvCal = [];
    
    var lvPeriodID = 0;
    var calculator = sar()
        .options({accelerationFactor: pSccelerationFactor, maxAccelerationFactor: pMaxAccelerationFactor})
		.merge((d, c) => {d[id] = c})
		.accessor(d => d[id]);
    lvInChartArray.push(<SARSeries key={id+'SA'} calculator={calculator} yAccessor={calculator.accessor()}/>);
    lvInChartArray.push(<SingleValueTooltip key={id+'SB'} origin={[tooltipStruct.row1.x, tooltipStruct.row1.y]} fontSize={chartLayout.tooltip_fontSize} calculator={calculator}
                        yLabel={'SAR (' + pSccelerationFactor + ', ' + pMaxAccelerationFactor + ')'} yAccessor={calculator.accessor()}
                        />);
    tooltipStruct.row1.y += 15;
    return lvInChartArray;
}

function createInChartBB(props)
{
    // console.log('create In Chart BB')
    const {id, tooltipStruct, para, chartLayout} = props;
    const lvInChartArray = [];
    const calculator = bollingerBand()
		.merge((d, c) => {d[id] = c})
		.accessor(d => d[id]);
    lvInChartArray.push(<BollingerSeries key={id+'BA'} yAccessor={calculator.accessor()} calculator={calculator} {...bbAppearance}/>);
    lvInChartArray.push(<BollingerBandTooltip key={id+'BB'} origin={[tooltipStruct.row1.x, tooltipStruct.row1.y]} fontSize={chartLayout.tooltip_fontSize} yAccessor={calculator.accessor()} options={calculator.options()}/>);
    tooltipStruct.row1.y += 15;
    return lvInChartArray;
}


function createInChartList(pInChartVarArray, pChartLayout)
{
    var inChartList = [];
    var lvToolTipStruct = {};
    
    if (pInChartVarArray != undefined)
    {
        for (var i = pInChartVarArray.length-1; i >= 0; i--)
        {
            var [pChartName, pPara] = pInChartVarArray[i];
            var lvDataID = 100 + i; // start with 100
    
            prepareInChart(pChartName, lvDataID, lvToolTipStruct, pPara, pChartLayout);
        }
        for (var i = pInChartVarArray.length-1; i >= 0; i--)
        {
            var [pChartName, pPara] = pInChartVarArray[i];
            var lvDataID = 100 + i; // start with 100
    
            const props = {
                id: lvDataID,
                tooltipStruct: lvToolTipStruct,
                para: pPara,
                chartLayout: pChartLayout,
            };
            const subChart = inChartFuncMap[pChartName](props);
            inChartList = inChartList.concat(subChart);
        }
    }
    return inChartList;
}

function prepareInChart(pChartName, pDataID, pToolTipStruct, pPara, pChartLayout)
{
    if (!pToolTipStruct.row0) // init
    {
        pToolTipStruct.row0 = {x:pChartLayout.tooltip_startx+3, y:20};
        pToolTipStruct.row1 = {x:pChartLayout.tooltip_startx, y:25};
    }

    if (pChartName == "InChartSMA" || pChartName == "InChartEMA" || pChartName == "InChartWMA")
    {
        if (pToolTipStruct.row1.y == 25)
            pToolTipStruct.row1 = {x:pChartLayout.tooltip_startx, y:65};
    }
    // else if (pChartName == "InChartSAR")
    // {
    // }
    // else if (pChartName == "InChartBB")
    // {
    // }
}

function createSubChart(pChartName, pNextChartID, pHeight, pOrigin, pPara, pAddPadding, pChartLayout, pConfig)
{
    const props = {
        id: pNextChartID,
        height: pHeight,
        origin: pOrigin,
        para: pPara,
        addPadding: pAddPadding,
        chartLayout: pChartLayout,
        config: pConfig
    };
    return subChartFuncMap[pChartName](props);
}

function createSubChartListForInChart(pDisplayInChartVol, pChartLayout)
{
    const subChartList = [];
    // var lvOriginFunc = (t) => { return (w, h) => {console.log(h); return [0, h-t]} }
    // if (pDisplayInChartVol)
    // {
        // var [pChartName, pPara, pHeight] = ["InChartVol", [], 150];
        // var lvChartID = 3; // always use 3
        // lvTotalSubChartHeight += pHeight;
        // var lvOrigin = lvOriginFunc(150);
        // var subChart = createSubChart(pChartName, lvChartID, pHeight, lvOrigin, pPara, false, pChartLayout);
        // subChartList.push(subChart);
    // }
    return subChartList;
}

function createSubChartList(pDisplayInChartVol, pSubChartVarArray, pChartLayout, pConfig)
{
    const subChartList = [];
    var lvOriginFunc = (t) => { return (w, h) => [0, h-t] }
    if (pSubChartVarArray != undefined)
    {
        var lvTotalSubChartHeight = 0;
        for (var i = pSubChartVarArray.length-1; i >= 0; i--)
        {
            var [pChartName, pPara, pHeight] = pSubChartVarArray[i];
            if (pChartName == "InChartVol")
                continue; // skip
            var lvChartID = i + 10; // start with 10
            var lvAddPadding = (lvChartID == 10);
            pHeight += lvAddPadding ? subChartInitialTopPadding : 0;
    
            lvTotalSubChartHeight += pHeight;
            var lvOrigin = lvOriginFunc(lvTotalSubChartHeight);
            var subChart = createSubChart(pChartName, lvChartID, pHeight, lvOrigin, pPara, lvAddPadding, pChartLayout, pConfig);
            subChartList.push(subChart);
        }
        if (pDisplayInChartVol)
        {
            var [pChartName, pPara, pHeight] = ["InChartVol", [], 150];
            var lvChartID = 3; // always use 3
            lvTotalSubChartHeight += pHeight;
            var lvOrigin = lvOriginFunc(lvTotalSubChartHeight);
            var subChart = createSubChart(pChartName, lvChartID, pHeight, lvOrigin, pPara, false, pChartLayout, pConfig);
            subChartList.push(subChart);
        }
        subChartList.reverse();
    }
    return subChartList;
}

function createMainChartSeries(pSeriesName, pConfig)
{
    // console.log(pConfig)
    if (pSeriesName == "Line")
    {
        return <LineSeries yAccessor={d => d.close} strokeWidth={2} stroke={pConfig.chart.appearance.strokeNormal} />;
    }
    if (pSeriesName == "Area")
    {
        const AreaAppearance = {
            stroke: pConfig.chart.appearance.strokeNormal,
            fill: pConfig.chart.appearance.fill,
            opacity: pConfig.chart.appearance.opacity,            
        }
        return <AreaSeries yAccessor={d => d.close} {...AreaAppearance}/>;
    }
    else if (pSeriesName == "OHLC")
    {   const OHLCAppearance = {
            stroke: pConfig.chart.appearance.strokeNormal
        }
        return <OHLCSeries {...OHLCAppearance}/>;
    }
    else // if (pSeriesName == "Candlestick") //or "Candle"
    {
        const candlesAppearance = {
			wickStroke: function wickStroke(d) {
				return d.close > d.open ? pConfig.chart.appearance.strokeDown : pConfig.chart.appearance.strokeUp;
            },
			fill: function fill(d) {
				return d.close > d.open ? "rgba(0,0,0,0)" : d.close > d.open ? pConfig.chart.appearance.strokeDown : pConfig.chart.appearance.strokeUp;
			},
			stroke: function stroke(d) {
				return d.close > d.open ? pConfig.chart.appearance.strokeDown : pConfig.chart.appearance.strokeUp;
            },
			candleStrokeWidth: 1,
			opacity: 1,
        }
        
        var candlechart = <CandlestickSeries {...candlesAppearance}/>;
        return candlechart;
    }
}

function clearDataPoint(pData)
{
    var d = {};
	d.date = pData.date;
    d.close = pData.close;
	d.high = pData.high;
	d.low = pData.low;
	d.open = pData.open;
	d.volume = pData.volume;
    d.pclose = pData.pclose;
    return d;
}

var parseDate = timeParse("%Y-%m-%d %H:%M:%S");
function convertRawData(pRawData)
{
    var pclose = undefined;
    return pRawData.map((r, i) => {
            const d = convertRawDataPoint(r, pclose);
            pclose = d.close;
            return d;
        });
}

function addRawDataPoint(pRawData, rawDataPoint)
{
    if (pRawData.length > 0)
        pRawData.push(convertRawDataPoint(rawDataPoint, pRawData[pRawData.length-1].close));
    else
        pRawData = [convertRawDataPoint(rawDataPoint)];
    return pRawData;
}

function convertRawDataPoint(rawDataPoint, pclose)
{
    return {
        date: new Date(parseDate(rawDataPoint[0]).getTime()),
        close: rawDataPoint[1],
        high: rawDataPoint[2],
        low: rawDataPoint[3],
        open: rawDataPoint[4],
        volume: rawDataPoint[5],
        pclose: pclose
    };
}

TTLChart.propTypes = {
	width: PropTypes.number.isRequired,
	// height: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
    rawData: PropTypes.array.isRequired,
};

TTLChart.defaultProps = {
    config: {
        chart: {
            type: "Line",
            appearance: {
                strokeDasharray: "Solid",
                strokeWidth: 1,
                strokeNormal: "#FF6600",
                strokeUp: "",
                strokeDown: "",

                wickStroke: "#000000", // for Candlestick Chart
                background: "#303030",
                theme: 'dark'
            },
        },

        axis: {
            xAxis: true,
            yAxis: true,

            showGrid: true,
            tickStrokeDasharray: "Solid",
            tickStrokeOpacity: 0.2,
            tickStrokeWidth: 1,

            showTicks: true,
            stroke: '#fff',
            tickStroke: '#fff',
        },

        tooltip: {
            fontSize: '12px',
        },

        option: {
            timeline: true,
            control: true,
            editor: true,
        },

        subCharts: [],
        inCharts: []

    }
};

/*
stroke: "#ff7f0e"
 */
TTLChart = fitWidth(TTLChart);

export default TTLChart