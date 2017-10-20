/*global define*/
"use strict";

// react element
import React from "react";
import PropTypes from 'prop-types'; // ES6

// D3 format
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

// react-stockcharts
import { ChartCanvas, Chart } from "react-stockcharts";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } from "react-stockcharts/lib/coordinates";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CandlestickSeries, LineSeries, AreaSeries, OHLCSeries, BarSeries, MACDSeries, RSISeries, StochasticSeries, SARSeries, BollingerSeries} from "react-stockcharts/lib/series";
import { OHLCTooltip, MovingAverageTooltip, BollingerBandTooltip, MACDTooltip, RSITooltip, StochasticTooltip, SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { sma, wma, ema, sar, bollingerBand, macd, rsi, stochasticOscillator } from "react-stockcharts/lib/indicator";
import { TrendLine, FibonacciRetracement, EquidistantChannel, StandardDeviationChannel, GannFan } from "react-stockcharts/lib/interactive";

const inChartFuncMap = {"InChartSMA": createInChartSMA, "InChartEMA": createInChartEMA, "InChartWMA": createInChartWMA, "InChartSAR": createInChartSAR, "InChartBB": createInChartBB};
const subChartFuncMap = {"InChartVol": createInChartVol, "Vol": createVol, "RSI": createRSI, "MACD": createMACD, "STO": createSTO};
const priceFormat = format(".3f");

const subChartInitialTopPadding = 20;

const bbAppearance = {
    stroke: {
        top: "#964B00",
        middle: "#FF6600",
        bottom: "#964B00",
    },
    fill: "#4682B4"
};
const stoAppearance = {
	stroke: Object.assign({},
		StochasticSeries.defaultProps.stroke)
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
const upColor = "#CC0000";
const downColor = "#1054A9";

class TTLMainChart extends React.Component {
	constructor(props) {
		super(props);
        
		this.setData = this.setData.bind(this);
		this.setChartType = this.setChartType.bind(this);
		// this.setMainChartSeries = this.setMainChartSeries.bind(this);
		this.setSubCharts = this.setSubCharts.bind(this);
		this.xAxisZoom = this.xAxisZoom.bind(this);
		// this.onInteractComplete = this.onInteractComplete.bind(this);
		// this.startInteract = this.startInteract.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
        
        this.state = {
            data: this.props.data,
            drawingSwitch: false,
        }
        
        this.interactEnabled = this.props.interactEnabled;
        this.interactRef = this.props.interactRef;
        this.interactGraph = this.props.interactGraph;
        this.undoList = this.props.undoList
    }
    
    componentDidMount() {
        this.canvas.subscribe("MainChart-1", {
            listener: (type, moreProps, state) => 
            {
                if (type === "pan" || type === "zoom")
                    this.props.onChartEvent(moreProps.xScale.domain());
            }
        });
		document.addEventListener("keyup", this.onKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyPress);
        this.canvas.unsubscribe("MainChart-1");
    }
    
	render() {
        var { width, height, ratio, chartLayout } = this.props;
        var subChartList = this.props.subChartList;
        var inChartList = this.props.inChartList;
		var { data: initialData, chartType, drawingSwitch } = this.state;
        const margin = {left: 70, right: chartLayout.chartCanvas_margin_right, top:0, bottom: 5}; // margin.top will bug the graph, do not set. margin.bottom will affect cursor line
        
        var mainChartHeight = height + margin.bottom;
        var needBottomPadForXAxis = true;
        const gridHeight = height - margin.top;// - margin.bottom;
		const gridWidth = width - margin.left - margin.right;
        const yGrid = { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 };
		const xGrid = { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 };
        
        const inChartCalculator=[];
        const indicatorCalculator=[];
        subChartList.forEach((chart) => {
            if (chart.props.exHeight)
            {
                // exHeight==true is to exculde the sub-chart height from main chart
                mainChartHeight+=chart.props.height;
                needBottomPadForXAxis = false;
            }
            if (chart.props.calculator) indicatorCalculator.push(chart.props.calculator);
        });
        inChartList.forEach((chart) => {
                if (chart.props.calculator) inChartCalculator.push(chart.props.calculator);
        });
        if (needBottomPadForXAxis)
        {
            mainChartHeight += 15; // 25 is XAxis height (20 with grid)
            margin.bottom += 15;
        }
        
        var MouseCoordinateX_rectWidth;
        var MouseCoordinateX_displayFormat;
        if (chartType == "IntraDay")
        {
            MouseCoordinateX_rectWidth = 90;
            MouseCoordinateX_displayFormat = timeFormat("%m-%d %H:%M:%S");
        }
        else if (chartType == "Monthly")
        {
            MouseCoordinateX_rectWidth = 70;
            MouseCoordinateX_displayFormat = timeFormat("%Y-%m");
        }
        else//if (chartType == "Daily")
        {
            MouseCoordinateX_rectWidth = 80;
            MouseCoordinateX_displayFormat = timeFormat("%Y-%m-%d");
        }
        
        var chartData = initialData;
        const yExtents = [d => [d.high, d.low]]
        for (let cal of inChartCalculator)
        {
            chartData = cal(chartData);
            yExtents.push(cal.accessor());
        }
        for (let cal of indicatorCalculator)
        {
            chartData = cal(chartData);
        }
        
        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(chartData);
        
        // var xScale = d3.time.scale();
//tickFormat={timeFormat("%H:%M:%S")}
// tickFormat={priceFormat}

		return (
            <ChartCanvas ref={node => {this.canvas=node;}} width={width} height={mainChartHeight} pointsPerPxThreshold={2}
                ratio={ratio}
                margin={margin}
                seriesName="Stock"
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                clamp={true}
                >
                <Chart ref={node => this.aa = node} id={1} height={height} padding={{ top: 10, bottom: 20 }}
                    yExtents={yExtents}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={8} {...xGrid} fontSize={chartLayout.axis_fontSize} zoomEnabled={false}/>
                    <YAxis axisAt="right" orient="right" ticks={5} {...yGrid} fontSize={chartLayout.axis_fontSize} zoomEnabled={false}/>
    
                    <MouseCoordinateX
                        rectWidth={MouseCoordinateX_rectWidth}
                        at="bottom"
                        orient="bottom"
                        displayFormat={MouseCoordinateX_displayFormat} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />
                    {this.props.mainSeries}
                    <OHLCTooltip xDisplayFormat={MouseCoordinateX_displayFormat} fontSize={chartLayout.tooltip_fontSize} origin={[chartLayout.tooltip_startx, 5]}/>
                    {inChartList}
                    
                    <TrendLine
                        ref={(node) => this.interactRef["FreeLine"] = node}
                        enabled={this.interactEnabled["FreeLine"] == true}
                        type="LINE"
                        snap={false}
                        snapTo={d => [d.high, d.low]}
                        onComplete={this.props.onInteractComplete("FreeLine")}
                        trends={this.interactGraph["FreeLine"]}
                    />
                    <TrendLine
                        ref={(node) => this.interactRef["TrendLine"] = node}
                        enabled={this.interactEnabled["TrendLine"] == true}
                        type="RAY"
                        snap={true}
                        snapTo={d => [d.high, d.low]}
                        onComplete={this.props.onInteractComplete("TrendLine")}
                        trends={this.interactGraph["TrendLine"]}
                    />
                    <FibonacciRetracement
                        ref={(node) => this.interactRef["FibonacciRetracement"] = node}
                        enabled={this.interactEnabled["FibonacciRetracement"] == true}
                        type="BOUND"
                        onComplete={this.props.onInteractComplete("FibonacciRetracement")}
                        retracements={this.interactGraph["FibonacciRetracement"]}
                    />
                    <EquidistantChannel
						ref={(node) => this.interactRef["EquidistantChannel"] = node}
						enabled={this.interactEnabled["EquidistantChannel"] == true}
						onComplete={this.props.onInteractComplete("EquidistantChannel")}
						channels={this.interactGraph["EquidistantChannel"]}
					/>
                    <StandardDeviationChannel
						ref={(node) => this.interactRef["StandardDeviationChannel"] = node}
						enabled={this.interactEnabled["StandardDeviationChannel"] == true}
						onComplete={this.props.onInteractComplete("StandardDeviationChannel")}
						channels={this.interactGraph["StandardDeviationChannel"]}
					/>
                    <GannFan
						ref={(node) => this.interactRef["GannFan"] = node}
						enabled={this.interactEnabled["GannFan"] == true}
						onComplete={this.props.onInteractComplete("GannFan")}
						fans={this.interactGraph["GannFan"]}
					/>
                </Chart>
                {subChartList}
                <CrossHairCursor />
            </ChartCanvas>
		);
	}

    setData(data)
    {
        this.setState({
            data: data,
        })
    }
    
    setChartType(pChartType)
    {
        this.setState({
           chartType: pChartType
        });
    }
    
    // setMainChartSeries(pSeriesName)
    // {
    //     var lvMainChartSeries = createMainChartSeries(pSeriesName);
    //     this.setState({
    //        mainChartSeries: lvMainChartSeries
    //     });
    // }

    setSubCharts(pInChartVarArray, pSubChartVarArray)
    {
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
        const lvInChartList = createInChartList(pInChartVarArray, this.props.chartLayout);
        const lvSubChartListForInChart = createSubChartListForInChart(lvDisplayInChartVol, this.props.chartLayout);
        const lvSubChartList = createSubChartList(lvDisplayInChartVol, pSubChartVarArray, this.props.chartLayout);
        const lvTotalSubChartList = lvSubChartListForInChart.concat(lvSubChartList);
        var lvData;
        if (this.state.data)
            lvData = this.state.data.map(function (r, i) {
                return clearDataPoint(r);
            });
        this.setState({
            data: lvData,
            inChartList: lvInChartList,
            subChartList: lvTotalSubChartList
        });
    }
    
    xAxisZoom(newDomain, callback)
    {
        // Copy from ChartCanvas.js
		const { xScale, plotData, chartConfig } = this.canvas.calculateStateForDomain(newDomain);
		this.canvas.clearThreeCanvas();

		this.canvas.setState({
			xScale,
			plotData,
			chartConfig,
		}, callback);
	}
    
    onInteractComplete(id)
    {
        return (graph) => 
        {
            this.undoList.push(id);
            this.interactEnabled[id] = false;
            this.interactGraph[id] = graph;
            this.setState((prevState, props) => ({
                drawingSwitch: !prevState.drawingSwitch
            }));
        }
    }
    
    startInteract(id)
    {
        for (let key in this.interactRef)
            this.interactRef[key].terminate();
        if (id == "Clear")
        {
            for (let key in this.interactGraph)
            {
                this.interactGraph[key] = undefined;
                this.interactEnabled[key] = false;
            }
            this.undoList = [];
        }
        else if (id == "Undo")
        {
            if (this.undoList.length > 0)
            {
                const undoGraphID = this.undoList.pop();
                this.interactGraph[undoGraphID].pop();
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
    
    onKeyPress(e)
    {
        const keyCode = e.which;
		switch (keyCode) {
        case 46: { // DEL
			// const rest = this.state.retracements
				// .slice(0, this.state.retracements.length - 1);
			// this.canvasNode.cancelDrag();
			// this.setState({
				// retracements: rest,
			// });
			break;
		}
        }
    }
}

// TTLMainChart.fitWidth = function(pChart)
// {
//     return fitWidth(pChart);
// }

// ---------------------------------- helper method -------------------------------------
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

// -------------------------------- sub chart method ------------------------------------
// InChart
// Vol
// SMA  [Period]
// WMA  [Period]
// EMA  [Period]
// SAR  [Acc. Factor, Maximum]
// BB

// SubChart
// MACD [ShortEMA, LongEMA, SignalLine]
// RSI  [Period]
// STO  [K, D, KW] fast->KW=1, slow->KW=3
// Vol  []

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

function createSubChartList(pDisplayInChartVol, pSubChartVarArray, pChartLayout)
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
            var subChart = createSubChart(pChartName, lvChartID, pHeight, lvOrigin, pPara, lvAddPadding, pChartLayout);
            subChartList.push(subChart);
        }
        if (pDisplayInChartVol)
        {
            var [pChartName, pPara, pHeight] = ["InChartVol", [], 150];
            var lvChartID = 3; // always use 3
            lvTotalSubChartHeight += pHeight;
            var lvOrigin = lvOriginFunc(lvTotalSubChartHeight);
            var subChart = createSubChart(pChartName, lvChartID, pHeight, lvOrigin, pPara, false, pChartLayout);
            subChartList.push(subChart);
        }
        subChartList.reverse();
    }
    return subChartList;
}

// Prepare layout before create in chart
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

function createMainChartSeries(pSeriesName)
{
    if (pSeriesName == "Line")
    {
        return <LineSeries yAccessor={d => d.close} strokeWidth={2}/>;
    }
    if (pSeriesName == "Area")
    {
        return <AreaSeries yAccessor={d => d.close}/>;
    }
    else if (pSeriesName == "OHLC")
    {
        return <OHLCSeries />;
    }
    else // if (pSeriesName == "Candlestick") //or "Candle"
    {
        var candlechart = <CandlestickSeries 
            yAccessor = {d => ({ open: d.open, high: d.high, low: d.low, close: d.close, pclose: d.pclose })}
            stroke={d => d.pclose > d.close ? upColor : downColor}
            wickStroke={d => d.pclose > d.close ? upColor : downColor}
            fill={d => d.close > d.open ? "rgba(0,0,0,0)": (d.pclose > d.close ? upColor : downColor)}
            opacity={1}
            candleStrokeWidth={1}
            />;
        return candlechart;
    }
}

function createSubChart(pChartName, pNextChartID, pHeight, pOrigin, pPara, pAddPadding, pChartLayout)
{
    const props = {
        id: pNextChartID,
        height: pHeight,
        origin: pOrigin,
        para: pPara,
        addPadding: pAddPadding,
        chartLayout: pChartLayout,
    };
    return subChartFuncMap[pChartName](props);
}

function createInChartSMA(props)
{
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

function createInChartVol(props)
{
    const {id, height, origin, para, addPadding, chartLayout} = props;
    return (
        <Chart
            id={id}
            key={id}
            yExtents={d => d.volume}
            height={height}
            origin={origin}>
            <YAxis axisAt="left" orient="left" fontSize={chartLayout.axis_fontSize} ticks={5} tickFormat={format(".0s")}/>
        
            <MouseCoordinateY
                at="left"
                orient="left"
                displayFormat={format(".4s")} />
        
            <BarSeries yAccessor={d => d.volume} />
        </Chart>)
}

function createVol(props)
{
    const {id, height, origin, para, addPadding, chartLayout} = props;
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
            
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0}/>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} ticks={5} tickFormat={format(".0s")}/>
        
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
    const {id, height, origin, para, addPadding, chartLayout} = props;
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
            
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0}/>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} tickValues={[30, 50, 70]}/>
    
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
    const {id, height, origin, para, addPadding, chartLayout} = props;
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
            
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0}/>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} ticks={5} />
    
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
    const {id, height, origin, para, addPadding, chartLayout} = props;
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
            
            <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0}/>
            <YAxis axisAt="right" orient="right" fontSize={chartLayout.axis_fontSize} tickValues={[20, 50, 80]}/>
        
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

TTLMainChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	chartLayout: PropTypes.object.isRequired,
};

TTLMainChart.defaultProps = {
};

export default TTLMainChart