import React, { Component } from 'react'
import { TypeChooser } from "react-stockcharts/lib/helper"
import TTLChart from "../../assets/js/TTLChart"

export default class Chart extends Component {

    constructor(props){
        super(props)

    }

    render() {
        return (
            <TypeChooser>
                {type => <TTLChart 
                            type={type} 
                            rawData={this.props.rawData} 
                            height={this.props.height} 
                            config={this.props.config}
                            />
                }
            </TypeChooser>
        );
    }
}