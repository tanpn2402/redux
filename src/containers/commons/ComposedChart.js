import React from 'react'
import { ComposedChart as ComposedChartRC, ReferenceLine, Line, Area, Legend, CartesianGrid, XAxis, YAxis } from 'recharts'

export class ComposedChart extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <ComposedChartRC
                data={this.props.data}
                width={this.props.width}
                height={this.props.height}>
                <defs>
                    <linearGradient x1='0%' x2='0%' y1='0%' y2='100%' id='aaa'>
                        <stop offset='0%' stopColor='#00ff1d' />
                        <stop offset={this.props.threshHoldPercentage} stopColor='#00ff1d' />
                        <stop offset={this.props.threshHoldPercentage} stopColor='red' />
                        <stop offset='100%' stopColor='red' />
                    </linearGradient>
                </defs>
                <XAxis dataKey={this.props.timeDataKey} stroke='white' />
                <YAxis yAxisId="left" stroke='white' domain={['dataMin', 'dataMax']} orientation="left" ticks={this.props.leftTicks} />
                <YAxis yAxisId="right" type="number" stroke='white' ticks={this.props.rightTicks}
                    domain={['0', 'dataMax + 7000']} orientation="right" />
                <CartesianGrid stroke='grey' fill='black' vertical={false} />
                <ReferenceLine strokeWidth='2' yAxisId="left" stroke='yellow'
                    strokeDasharray="9 9" y={this.props.threshHold} /*the 'y' props is the breakpoint (threshold)*/ />
                <Line yAxisId="left" type="linear" dot={false} dataKey={this.props.indexDataKey} strokeWidth='2' stroke='url(#aaa)' />
                <Area yAxisId="right" type="monotone" dataKey={this.props.volumeDataKey} fill="#8884d8" stroke="#7bdff2" />
            </ComposedChartRC>
        )
    }
}