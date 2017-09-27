import React from 'react'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'

export default class PieChart extends React.Component {
    constructor(props){
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

    render(){
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
          
        return(
            <ReactHighstock config={this.config} domProps={{ id: this.props.id }}></ReactHighstock>
        )
    }
}