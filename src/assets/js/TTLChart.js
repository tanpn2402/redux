/*global define*/
"use strict";

// react element
import React from "react";
import PropTypes from 'prop-types'; // ES6

// D3 format
import { timeParse } from "d3-time-format";

// css
import "../css/chart_hist.css";

// react-stockcharts
import { fitWidth } from "react-stockcharts/lib/helper";

// TTL element
import TTLMainChart from "./TTLMainChart"
import TTLTimeLineChart from "./TTLTimeLineChart"
import TTLChartControl from "./TTLChartControl"
import TTLChartEditControl from "./TTLChartEditControl"
import { CandlestickSeries, LineSeries, AreaSeries, OHLCSeries, BarSeries, MACDSeries, RSISeries, StochasticSeries, SARSeries, BollingerSeries} from "react-stockcharts/lib/series";

class TTLChart extends React.Component
{
	constructor(props) {
		super(props);
        
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
        
        this.data = convertRawData(this.props.rawData);
        this.state = {
            refreshState: false,
            mainChartSeries: createMainChartSeries(this.props.chartType),
            drawingSwitch: false
        }

        this.interactEnabled = {};
        this.interactRef = {};
        this.interactGraph = {};
        this.undoList = [];
        
        var isMob = false;
        if (isMob)
        {
            this.chartLayout = {
                chartCanvas_margin_right: 80,
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
                chartCanvas_margin_right: 65,
                axis_fontSize: 12,
                tooltip_fontSize: 11,
                subchart_topPadding: 10,
                tooltip_width: 65,
                tooltip_startx: -36,
            };
        }
    }
    
    componentDidMount()
    {
        this.resetXExtents();
    }

    componentWillUnmount() {
    }

	render() {
		var { width, height, ratio } = this.props;
		var { refreshState } = this.state;
        
		return (
            <div>
                <div id="TTLStockChart_C_Ctl" className="TTLStockChart_C_Ctl" >
                    <TTLChartControl handleSeriesChange={(series) => this.handleCreateMainChartSeries(series)} />
                </div>
                <div id="TTLStockChart_C_EditCtl" className="TTLStockChart_C_EditCtl">
                    <TTLChartEditControl startInteract={(id) => this.handleStartInteract(id)}/>
                </div>
                <TTLMainChart width={width} height={height} ratio={ratio} ref={node => {this.mainChart=node;}} baseref={this}
                    chartLayout={this.chartLayout}
                    data={this.data}
                    onChartEvent={this.handleMainChartEvents}
                    mainSeries={this.state.mainChartSeries}
                    drawingSwitch={this.state.drawingSwitch}
                    interactEnabled={this.interactEnabled}
                    interactGraph={this.interactGraph}
                    interactRef={this.interactRef}
                    undoList={this.undoList}
                    onInteractComplete={(id) => this.handleOnInteractComplete(id)}
                    />
                <TTLTimeLineChart width={width} height={100} ratio={ratio} ref={node => {this.timeLine=node;}} baseref={this}
                    chartLayout={this.chartLayout}
                    data={this.data}
                    />
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
    
    handleMainChartEvents(newXScaleDomain)
    {
        this.timeLine.refreshMovingWindow(newXScaleDomain);
    }
    
    refresh()
    {
        this.setState({
            refreshState: !this.state.refreshState
        });
    }

    addRawData(rawDataPoint)
    {
        addRawDataPoint(this.data, rawDataPoint);
        this.updateData();
    }

    setRawData(rawData)
    {
        this.data = convertRawData(rawData);
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
            data: this.data
        }, callBack);
        this.timeLine.setState({
            data: this.data
        }, callBack);
    }
    
    resetXExtents()
    {
        var callBack = () => this.refreshMovingWindowDomain();
        this.mainChart.xAxisZoom([Math.max(0,this.data.length-100), this.data.length - 1], callBack); // Default xExtents
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

    handleCreateMainChartSeries(pSeriesName){
        var pSeries = createMainChartSeries(pSeriesName);
        this.setState({mainChartSeries: pSeries})
    }
}

const upColor = "#CC0000";
const downColor = "#1054A9";



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
};

TTLChart.fitWidth = function(pChart)
{
    return fitWidth(pChart);
}

export default TTLChart