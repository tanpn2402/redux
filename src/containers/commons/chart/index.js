import React, { Component } from 'react'
import { TypeChooser } from "react-stockcharts/lib/helper"
import TTLChart from "./TTLChart"

export default class Chart extends Component {

    constructor(props){
        super(props)

    }

    render() {
        return (
            <TypeChooser>
                {type => <TTLChart 
                            type={type} 
                            {...this.props}
                            />
                }
            </TypeChooser>
        );
    }
}