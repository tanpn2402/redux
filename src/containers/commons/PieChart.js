import React from 'react'
// import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'
import { PieChart as PChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'

export default class PieChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let backgroundColor = this.props.theme.chart.pieChart.backgroundColor
        let rawData = this.props.data
        const totalValue = rawData.reduce((prevValue, curValue, curIndex, rawData) => prevValue += curValue.value, 0)
        const data = rawData.reduce((prevValue, curValue, curIndex, rawData) => {
            return {
                totalValue: prevValue.totalValue,
                processedData: prevValue.processedData.concat({
                    name: curValue.name,
                    value: parseFloat(((+curValue.value / +prevValue.totalValue) * 100).toFixed(1))
                })
            }
        }, { totalValue: totalValue, processedData: [] })
        const colors = ['#55dde0', '#eac435', '#f2545b', '#927cb7', '#1a181b', '#0fc11e']
        console.log(data.processedData)
        return (
            <ResponsiveContainer>
                <PChart>
                    <Pie data={data.processedData}>
                        {
                            data.processedData.map((entry, index) => {
                                return (
                                    <Cell key={'cell-' + index} fill={colors[index]} />
                                )
                            })
                        }
                    </Pie>
                    <Tooltip isAnimationActive={false} formatter={(value, name, entry, index) => {
                        return value + '%'
                    }} />
                </PChart>
            </ResponsiveContainer>
        )
    }
}