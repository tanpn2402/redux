/*global define*/
"use strict";

// react element
import React from "react";
import PropTypes from 'prop-types'; // ES6

// react-stockcharts
import { ChartCanvas, Chart } from "react-stockcharts";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { AreaSeries } from "react-stockcharts/lib/series";
import { first, last, mousePosition, touchPosition, getTouchProps } from "react-stockcharts/lib/utils";

// TTL element
import MovingWindow from "./MovingWindow"

class TTLTimeLineChart extends React.Component {
	constructor(props) {
		super(props);
        
		this.setData = this.setData.bind(this);
        
		this.handlePress = this.handlePress.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.handleLeave = this.handleLeave.bind(this);
        
		this.refreshMovingWindow = this.refreshMovingWindow.bind(this);
        
        this.state = {
            data: this.props.data,
        }
    }

	render() {
		var { width, height, ratio, chartLayout } = this.props;
		var { data: initialData } = this.state;

        var margin = {left: 70, right: chartLayout.chartCanvas_margin_right, top:0, bottom: 25} // 25 is XAxis height (20 with grid)
        
        var mainChartHeight = height + margin.bottom;
        
        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
        const {
			data: data,
			xScale: xScale,
			xAccessor: xAccessor,
			displayXAccessor: displayXAccessor,
		} = xScaleProvider(initialData);

        const start = xAccessor(data[data.length-1]);
		const end = xAccessor(data[0]);
		const xExtents = [start, end];
        
        const range = [0, data.length - 1]; // Only use for initial, override when TTLChart.componentDidMount
        const listenerProps = {
            onMouseUp: (e)=>this.handleLeave(),
            onMouseLeave: (e)=>this.handleLeave(),
            onMouseDown: (e)=>this.handlePress(mousePosition(e)),
            onMouseMove: (e)=>this.handleMove(mousePosition(e)),
            
            onTouchCancel: (e)=>this.handleLeave(),
            onTouchEnd: (e)=>this.handleLeave(),
            onTouchMove: (e)=>this.handleMove(touchPosition2(e)),
            onTouchStart: (e)=>this.handlePress(touchPosition2(e)),
        }

		return (
            <ChartCanvas ref={node => {this.canvas=node;}} width={width} height={mainChartHeight} pointsPerPxThreshold={2}
                ratio={ratio}
                margin={margin}
                seriesName="StockTimeLine"
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                xExtents={xExtents}
                displayXAccessor={displayXAccessor}
                panEvent={false}
                zoomEvent={false}
                >
                <Chart id={1} height={height} padding={{ top: 0, bottom: 0 }}
                    yExtents={[d => [d.high, d.low]]}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={5} fontSize={chartLayout.axis_fontSize} zoomEnabled={false}/>
                    <AreaSeries yAccessor={(d) => d.close}/>;
                    <MovingWindow ref={node => {this.movingWindow=node;}} height={height} range={range} usingProps={listenerProps} />
                </Chart>
            </ChartCanvas>
		);
	}
    
    handlePress(point)
    {
        if (this.startDrag)
            return;
        
        const [x, y] = point;
        const splitterWidth = 6;
        
        const { xScale: timeline_xScale } = this.canvas.props;
        const { xScale } = this.props.baseref.mainChart.canvas.state;
        const [ firstPointX_main, lastPointX_main ] = xScale.domain();
        const firstPointX = timeline_xScale(firstPointX_main);
        const lastPointX = timeline_xScale(lastPointX_main);
        
        if (x < firstPointX || x > lastPointX) // Outside the movingWindow
            return;
        
        if (x - splitterWidth <= firstPointX) // Within the range of splitter_start (left < first < right)
            this.dragMethod="start";
        else if (x + splitterWidth >= lastPointX) // Within the range of splitter_end (left < end < right)
            this.dragMethod="end";
        else
        {
            this.dragMethod="mid";
            this.originalMouseXRefPos = timeline_xScale.invert(x);
        }
        this.originalDomain = xScale.domain();
        this.startDrag = true;
    }
    
    handleLeave()
    {
        this.startDrag = false;
    }
    
    handleMove(point)
    {
        if (!this.startDrag)
            return;
        
        const [x, y] = point;
        const minimumDomainWidth = 2;
        const splitterWidthHalf = 3;
        
        const { xScale: timeline_xScale } = this.canvas.props;
        const { xScale, xAccessor, fullData } = this.props.baseref.mainChart.canvas.state
        const { data } = this.props.baseref.mainChart.canvas.props
        const [ oriStart, oriEnd ] = this.originalDomain;
        const [ boundStart, boundEnd ] = [xAccessor(first(data)), xAccessor(last(data))]// = xScale.range(); // The xScale.range() bound can not be trusted
        
        var newStart, newEnd;
        if (this.dragMethod === "start")
        {
            const mouseXRefPos = timeline_xScale.invert(x - splitterWidthHalf);
            newStart = Math.min(oriEnd - minimumDomainWidth, mouseXRefPos);
            newEnd = oriEnd;
        }
        else if (this.dragMethod === "end")
        {
            const mouseXRefPos = timeline_xScale.invert(x + splitterWidthHalf);
            newStart = oriStart;
            newEnd = Math.max(oriStart + minimumDomainWidth, mouseXRefPos);
        }
        else
        {
            const mouseXRefPos = timeline_xScale.invert(x);
            var diff = mouseXRefPos - this.originalMouseXRefPos;
            newStart = Math.max(boundStart, oriStart + diff);
            newEnd = Math.min(boundEnd, oriEnd + diff);
        }
        const callback = () => {this.refreshMovingWindow(this.props.baseref.mainChart.canvas.state.xScale.domain())}
        this.props.baseref.mainChart.xAxisZoom([newStart, newEnd], callback);
    }
    
    refreshMovingWindow(newXScaleDomain)
    {
        this.movingWindow.setState({
           range: newXScaleDomain
        });
    }

    setData(data)
    {
        this.setState({
            data: data,
        })
    }
}

function touchPosition2(e, pointKey)
{
    if (pointKey === undefined)
        pointKey = 0;
    return touchPosition(getTouchProps(e.touches[pointKey]), e);
}

TTLTimeLineChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	chartLayout: PropTypes.object.isRequired,
};

TTLTimeLineChart.defaultProps = {
};

export default TTLTimeLineChart