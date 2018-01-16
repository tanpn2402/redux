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

import { TrendLine, FibonacciRetracement, EquidistantChannel, StandardDeviationChannel, GannFan } from "react-stockcharts/lib/interactive";

class TTLMainChart extends React.Component {
	constructor(props) {
		super(props);
        
		this.xAxisZoom = this.xAxisZoom.bind(this);
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

    componentDidUpdate(){
        this.interactRef["FibonacciRetracement"].forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
        // console.log(" TT LMAIN CHAR componentWillReceiveProps", nextProps.data)
        this.setState({
            data: nextProps.data,
        })
    }
    
	render() {
        // console.log('render in main')
        var { width, height, ratio, chartLayout, config } = this.props;
        var subChartList = this.props.subChartList;
        var inChartList = this.props.inChartList;
		var { data: initialData, chartType, drawingSwitch } = this.state;
        const margin = {left: chartLayout.chartCanvas_margin_left, right: chartLayout.chartCanvas_margin_right, top:0, bottom: 5}; // margin.top will bug the graph, do not set. margin.bottom will affect cursor line
        
        var mainChartHeight = height + margin.bottom;
        var needBottomPadForXAxis = true;
        const gridHeight = height - margin.top;// - margin.bottom;
		const gridWidth = width - margin.left - margin.right;
       
        var xGrid = config.axis.showGrid ? { 
            innerTickSize: -1 * gridWidth,
            tickStrokeDasharray: config.axis.tickStrokeDasharray,
            tickStrokeOpacity: config.axis.tickStrokeOpacity,
            tickStrokeWidth: config.axis.tickStrokeWidth
        } : {};

        var yGrid = config.axis.showGrid ? { 
            innerTickSize: -1 * gridHeight,
            tickStrokeDasharray: config.axis.tickStrokeDasharray,
            tickStrokeOpacity: config.axis.tickStrokeOpacity,
            tickStrokeWidth: config.axis.tickStrokeWidth
        } : {};
        
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
        
        const trandLineAppearence = {
            edgeFill: config.control.edgeFill1,
            edgeStroke: config.control.edgeStroke,
            stroke: config.control.stroke,
            strokeOpacity: config.control.strokeOpacity,
            r: config.control.edgeRadius,
            strokeWidth: config.control.strokeWidth
        }
        const fibonacciAppearence = {
            edgeFill: config.control.edgeFill1,
            edgeStroke: config.control.edgeStroke,
            stroke: config.control.stroke,
            nsEdgeFill: config.control.edgeFill2,
            strokeOpacity: config.control.strokeOpacity,
            r: config.control.edgeRadius,
            strokeWidth: config.control.strokeWidth
        }
        const equidistantChannelAppearence = {
            edgeFill: config.control.edgeFill1,
            edgeFill2: config.control.edgeFill2,
            edgeStroke: config.control.edgeStroke,
            stroke: config.control.stroke,
            fill: config.control.fill,
            fillOpacity: config.control.fillOpacity,
            strokeOpacity: config.control.strokeOpacity,
            r: config.control.edgeRadius,
            strokeWidth: config.control.strokeWidth
        }
        const standardDeviationChannelAppearence = {
            edgeFill: config.control.edgeFill1,
            edgeStroke: config.control.edgeStroke,
            stroke: config.control.stroke,
            fill: config.control.fill,
            fillOpacity: config.control.fillOpacity,
            strokeOpacity: config.control.strokeOpacity,
            r: config.control.edgeRadius,
            strokeWidth: config.control.strokeWidth
        }
        const gannFanAppearence = {
            edgeFill: config.control.edgeFill1,
            edgeStroke: config.control.edgeStroke,
            stroke: config.control.stroke,
            fill: config.control.gannFanFill,
            fillOpacity: config.control.fillOpacity,
            strokeOpacity: config.control.strokeOpacity,
            r: config.control.edgeRadius,
            strokeWidth: config.control.strokeWidth
        }
        // console.log(" TTL MAIN CHAR", data)
		return (
            <ChartCanvas ref={node => {this.canvas=node;}} width={width} height={mainChartHeight + 3} pointsPerPxThreshold={2}
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
                    <XAxis axisAt="bottom" orient="bottom" ticks={5} {...yGrid} fontSize={chartLayout.axis_fontSize} 
                        tickStroke={config.axis.tickStroke} stroke={config.axis.stroke} zoomEnabled={false}/>
                    <YAxis axisAt="left" orient="left" ticks={5} {...xGrid} fontSize={chartLayout.axis_fontSize} 
                        tickStroke={config.axis.tickStroke} stroke={config.axis.stroke} zoomEnabled={false}/>
    
                    <MouseCoordinateX
                        rectWidth={MouseCoordinateX_rectWidth}
                        at="bottom"
                        orient="bottom"
                        displayFormat={MouseCoordinateX_displayFormat} />
                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".2f")} />
                    {this.props.mainSeries}
                
                    <OHLCTooltip margin={{left: 100}} xDisplayFormat={MouseCoordinateX_displayFormat} fontSize={chartLayout.tooltip_fontSize} origin={[chartLayout.tooltip_startx, 5]}/>
                    
                    {inChartList}
                    
                    <TrendLine
                        ref={(node) => this.interactRef["FreeLine"] = node}
                        enabled={this.interactEnabled["FreeLine"] == true}
                        type="LINE"
                        appearance={trandLineAppearence}
                        snap={false}
                        snapTo={d => [d.high, d.low]}
                        onComplete={this.props.onInteractComplete("FreeLine")}
                        trends={this.interactGraph["FreeLine"]}
                        currentPositionStroke={config.control.stroke}
                    />
                    <TrendLine
                        ref={(node) => this.interactRef["TrendLine"] = node}
                        enabled={this.interactEnabled["TrendLine"] == true}
                        type="RAY"
                        appearance={trandLineAppearence}
                        snap={true}
                        snapTo={d => [d.high, d.low]}
                        onComplete={this.props.onInteractComplete("TrendLine")}
                        trends={this.interactGraph["TrendLine"]}
                        currentPositionStroke={config.control.stroke}
                    />
                    <FibonacciRetracement
                        ref={(node) => this.interactRef["FibonacciRetracement"] = node}
                        enabled={this.interactEnabled["FibonacciRetracement"] == true}
                        type="BOUND"
                        appearance={fibonacciAppearence}
                        onComplete={this.props.onInteractComplete("FibonacciRetracement")}
                        retracements={this.interactGraph["FibonacciRetracement"]}
                        currentPositionStroke={config.control.stroke}
                    />
                    <EquidistantChannel
						ref={(node) => this.interactRef["EquidistantChannel"] = node}
						enabled={this.interactEnabled["EquidistantChannel"] == true}
                        appearance={equidistantChannelAppearence}
						onComplete={this.props.onInteractComplete("EquidistantChannel")}
						channels={this.interactGraph["EquidistantChannel"]}
                        currentPositionStroke={config.control.stroke}
					/>
                    <StandardDeviationChannel
						ref={(node) => this.interactRef["StandardDeviationChannel"] = node}
						enabled={this.interactEnabled["StandardDeviationChannel"] == true}
                        appearance={standardDeviationChannelAppearence}
						onComplete={this.props.onInteractComplete("StandardDeviationChannel")}
						channels={this.interactGraph["StandardDeviationChannel"]}
                        currentPositionStroke={config.control.stroke}
					/>
                    <GannFan
						ref={(node) => this.interactRef["GannFan"] = node}
                        enabled={this.interactEnabled["GannFan"] == true}
                        appearance={gannFanAppearence}
						onComplete={this.props.onInteractComplete("GannFan")}
						fans={this.interactGraph["GannFan"]}
                        currentPositionStroke={config.control.stroke}
					/>
                </Chart>
                {subChartList}
                <CrossHairCursor />
            </ChartCanvas>
		);
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