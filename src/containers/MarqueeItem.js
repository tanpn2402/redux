import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { ComposedChart } from '../containers/commons/ComposedChart'


export default class MarqueeItem extends React.Component {
    constructor(props) {
        super(props)
        this.genPopover = this.genPopover.bind(this)
        this.state = {
            threshHold: 110
        }
    }

    render() {
        let data = this.props.data
        console.log(data)
        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={this.genPopover(data)} onEnter={() => this.props.onPause()} onExit={() => this.props.onResume()}>
                <li>
                    <strong className="title">{data.title}</strong>
                    <span className={data.status}>&nbsp;{data.id}</span>
                    <span className="percent">
                        <span className="netchange">&nbsp;{data.netchange}</span>&nbsp;(<span className="changepercentage">{data.changeper}</span>%)
                    </span>
                </li>
            </OverlayTrigger>
        )
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.setState((prevState) => {
        //         return {
        //             threshHold: prevState.threshHold + 0.01
        //         }
        //     })
        // }, 1000)
    }

    genPopover(d) {
        const data = [
            { name: '09:00', index: 109.0000, volume: 1595.6 }, { name: '10:00', index: 110.4802, volume: 1796.6 },
            { name: '11:00', index: 110.3331, volume: 1748.5 }, { name: '12:00', index: 110.1637, volume: 1131.1 },
            { name: '13:00', index: 109.5084, volume: 1336.1 }, { name: '14:00', index: 110.7820, volume: 1067.9 },
        ]
        const data2 = [
            { name: '09:00', index: 110.9808, volume: 1595.6 }, { name: '10:00', index: 109.5505, volume: 1796.6 },
            { name: '11:00', index: 109.0000, volume: 1748.5 }, { name: '12:00', index: 110.1041, volume: 1131.1 },
            { name: '13:00', index: 110.4313, volume: 1336.1 }, { name: '14:00', index: 109.8071, volume: 1067.9 },
        ]
        const data3 = [
            { name: '09:00', index: 109.1825, volume: 1595.6 }, { name: '10:00', index: 109.3075, volume: 1796.6 },
            { name: '11:00', index: 110.8301, volume: 1748.5 }, { name: '12:00', index: 110.1019, volume: 1131.1 },
            { name: '13:00', index: 109.2077, volume: 1336.1 }, { name: '14:00', index: 109.5897, volume: 1067.9 },
        ]
        const colorBreakPoint = this.state.threshHold //threshold
        const { min, max } = data2.reduce((result, dataPoint) => ({
            min: (dataPoint.index < result.min || result.min === 0) ? dataPoint.index : result.min,
            max: (dataPoint.index > result.max || result.max === 0) ? dataPoint.index : result.max,
        }), { min: 0, max: 0 });
        const colorBreakPointPercentage = (1 - ((colorBreakPoint - min) / (max - min)))
        return (
            <Popover id="popover-trigger-hover-focus" style={{ width: '550px', maxWidth: 'none', backgroundColor: '#000', color: '#FFF' }}>
                <ComposedChart data={data2} width={500} height={250}
                    threshHoldPercentage={colorBreakPointPercentage} timeDataKey='name'
                    leftTicks={[109, 110, 111]} rightTicks={[1000, 4000, 8000]}
                    threshHold={colorBreakPoint} indexDataKey='index' volumeDataKey='volume' />
            </Popover>
        )
    }
}