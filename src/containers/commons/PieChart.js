import React from 'react'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'
import { PieChart as PChart, Pie, Tooltip, Cell } from 'recharts'

export default class PieChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.config = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                style: {
                    height: '100%',
                    width: '100%',
                }
            },
            credits: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            rangeSelector: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,

                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Total asset',
                    y: 56.33
                }, {
                    name: 'Equity',
                    y: 24.03,
                    //sliced: true,
                    //selected: true
                }, {
                    name: 'Total stock market value',
                    y: 10.38
                }, {
                    name: 'Profit/Loss',
                    y: 4.77
                }, {
                    name: '% Profit/Loss (per equity)',
                    y: 6.4
                }]
            }]
        }

    }

    render() {
        let backgroundColor = this.props.theme.chart == undefined ? undefined : this.props.theme.chart.piechart.backgroundColor
        this.config = {
            chart: {
                backgroundColor: backgroundColor,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                style: {
                    height: '100%',
                    width: '100%',
                }
            },
            credits: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            rangeSelector: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,

                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Total asset',
                    y: 56.33
                }, {
                    name: 'Equity',
                    y: 24.03,
                    //sliced: true,
                    //selected: true
                }, {
                    name: 'Total stock market value',
                    y: 10.38
                }, {
                    name: 'Profit/Loss',
                    y: 4.77
                }, {
                    name: '% Profit/Loss (per equity)',
                    y: 6.4
                }]
            }]
        }

        const data = [
            {
                name: 'Total asset',
                value: 60
            },
            {
                name: 'Equity',
                value: 30
            },
            {
                name: 'Total stock market value',
                value: 7
            },
            {
                name: 'Profit/Loss',
                vaue: 1
            },
            {
                name: '% Profit/Loss (per equity)',
                value: 2
            }
        ]
        const colors = ['#55dde0', '#eac435', '#f2545b', '#564d65', '#1a181b']
        return (
            // <ReactHighstock config={this.config} domProps={{ id: this.props.id }}></ReactHighstock>
            <PChart width={150} height={150}>
                <Pie data={data}>
                    {
                        data.map((entry, index) => {
                            return (
                                <Cell key={'cell-' + index} fill={colors[index]} />
                            )
                        })
                    }
                </Pie>
                <Tooltip />
            </PChart>
        )
    }
}