import React from 'react'
import { ComposedChart as ComposedChartRC, Tooltip, ReferenceLine, Line, Area, Legend, CartesianGrid, XAxis, YAxis } from 'recharts'

export class ComposedChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {data, width, height, threshHoldPercentage, leftTicks, rightTicks, threshHold, indexDataKey,
            volumeDataKey, theme, minIndex, maxIndex, minVolume, maxVolume} = this.props.dataObject
        let font = theme.color
        let background = theme.backgroundColor
        let increaseColor = theme.increaseLine.color
        let decreaseColor = theme.decreaseLine.color
        let refColor = theme.referenceLine.color
        return (
            <ComposedChartRC
                data={data}
                width={width}
                height={height}>
                <defs>
                    <linearGradient x1='0%' x2='0%' y1='0%' y2='100%' id='gradientLine'>
                        <stop offset='0%' stopColor={increaseColor} />
                        <stop offset={threshHoldPercentage} stopColor={increaseColor} />
                        <stop offset={threshHoldPercentage} stopColor={decreaseColor} />
                        <stop offset='100%' stopColor={decreaseColor} />
                    </linearGradient>
                </defs>
                <Tooltip />
                <XAxis stroke={font} scale={'point'} ticks={['']} />
                <YAxis yAxisId="left" stroke={font} domain={[minIndex, maxIndex]} orientation="left"
                    ticks={leftTicks}/>
                <YAxis yAxisId="right" stroke={font} ticks={rightTicks}
                    domain={['0', maxVolume + 7000]} orientation="right" />
                <ReferenceLine strokeWidth='2' yAxisId="left" stroke={refColor}
                    strokeDasharray="9 9" y={threshHold} /*the 'y' props is the breakpoint (threshold)*/ />
                <Line yAxisId="left" type="linear" dot={false} dataKey={indexDataKey} strokeWidth='2'
                    stroke='url(#gradientLine)' isAnimationActive={false} />
                <Area yAxisId="right" type="monotone" dataKey={volumeDataKey} fill="#8884d8" stroke="#7bdff2"
                     isAnimationActive={false} />
            </ComposedChartRC>
        )
    }
}