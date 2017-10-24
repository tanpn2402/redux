/*global define*/
"use strict";

// react element
import React from "react";
import PropTypes from 'prop-types'; // ES6

// react-stockcharts
import GenericChartComponent from "react-stockcharts/lib/GenericChartComponent";

class MovingWindow extends React.Component
{
    constructor(props)
    {
		super(props);
        
        this.renderSVG = this.renderSVG.bind(this);
        
        const {range} = this.props
        
        this.state = {
            range: range,
        }
    }
    
    render()
    {
        return <GenericChartComponent
			svgDraw={this.renderSVG}
			drawOn={[""]}
		/>;
    }
    
    renderSVG(moreProps)
    {
		const { xScale, plotData, width } = moreProps;
        const { className, fillWindow, fillSplitter, usingProps, height, splitterWidth } = this.props;
        
        const { range } = this.state
        const [ startPoint, endPoint ] = range;

        var sx, ex;
        if (endPoint >= plotData.length)
        {
            sx = this.prevPoint.sx;
            ex = this.prevPoint.ex;
        }
        else
        {
            sx = xScale(startPoint);
            ex = xScale(endPoint);
            this.prevPoint = {sx, ex};
        }
        
        // rect is used for listener added in usingProps
        return (
        <g className={className} {...usingProps}>
            <rect x={sx} y={0} width={ex-sx} height={height} fill={fillWindow} />
            <rect x={sx} y={0} width={splitterWidth} height={height} fill={fillSplitter} opacity={0.7} />
            <rect x={ex-splitterWidth} y={0} width={splitterWidth} height={height} fill={fillSplitter} opacity={0.7} />
            <rect width={width} height={height} style={{opacity: 0}} />
		</g>);
	}
}

MovingWindow.propTypes =
{
	className: PropTypes.string,
    fillWindow: PropTypes.string,
    fillSplitter: PropTypes.string,
    splitterWidth: PropTypes.number,
    height: PropTypes.number,
    usingProps: PropTypes.object,
};

MovingWindow.defaultProps =
{
    // className: "react-stockcharts-enable-interaction react-stockcharts-svgpathannotation", // class name copy from Annotate, SvgPathAnnotation
    className: "react-stockcharts-enable-interaction react-stockcharts-annotate react-stockcharts-default-cursor", // class name copy from Annotate, SvgPathAnnotation
    fillWindow: "rgba(0,0,0,0.3)",
    fillSplitter: "#505050",
    splitterWidth: 6,
}

export default MovingWindow
