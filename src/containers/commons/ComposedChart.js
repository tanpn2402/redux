import React from 'react'
import { ComposedChart as ComposedChartRC, ReferenceLine, Line, Area, Legend, CartesianGrid, XAxis, YAxis } from 'recharts'

export class ComposedChart extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let theme = this.props.theme.chart.popoverChart
        let font = theme.color
        let background = theme.backgroundColor
        let increaseColor = theme.increaseLine.color
        let decreaseColor = theme.decreaseLine.color
        let refColor = theme.referenceLine.color
        return (
            <ComposedChartRC
                data={this.props.data}
                width={this.props.width}
                height={this.props.height}>
                <defs>
                    <linearGradient x1='0%' x2='0%' y1='0%' y2='100%' id='gradientLine'>
                        <stop offset='0%' stopColor={increaseColor} />
                        <stop offset={this.props.threshHoldPercentage} stopColor={increaseColor} />
                        <stop offset={this.props.threshHoldPercentage} stopColor={decreaseColor} />
                        <stop offset='100%' stopColor={decreaseColor} />
                    </linearGradient>
                </defs>
                <XAxis dataKey={this.props.timeDataKey} stroke={font} />
                <YAxis yAxisId="left" stroke={font} domain={['dataMin', 'dataMax']} orientation="left" ticks={this.props.leftTicks} />
                <YAxis yAxisId="right" type="number" stroke={font} ticks={this.props.rightTicks}
                    domain={['0', 'dataMax + 7000']} orientation="right" />
                <CartesianGrid fill={background} vertical={false} />
                <ReferenceLine strokeWidth='2' yAxisId="left" stroke={refColor}
                    strokeDasharray="9 9" y={this.props.threshHold} /*the 'y' props is the breakpoint (threshold)*/ />
                <Line yAxisId="left" type="linear" dot={false} dataKey={this.props.indexDataKey} strokeWidth='2'
                    stroke='url(#gradientLine)' isAnimationActive={false} />
                <Area yAxisId="right" type="monotone" dataKey={this.props.volumeDataKey} fill="#8884d8" stroke="#7bdff2"
                     isAnimationActive={false} />
            </ComposedChartRC>
        )
    }
}