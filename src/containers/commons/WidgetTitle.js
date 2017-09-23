import React, { Component } from 'react'
import ConfigColumnTable from '../commons/ConfigColumnTable'

export default class WidgetTitle extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        console.log(this.props.children)
        return (
            <div className="widget-header" >
                <div className="widget-title">
                    <span>
                        {this.props.children}
                    </span>
                </div>
                <div className="widget-action">
                    <ul>
                        {
                            this.props.columns === undefined ? '' :
                            (
                                <li>
                                    <ConfigColumnTable 
                                        id={this.props.id}
                                        columns={this.props.columns} 
                                        onChangeStateColumn={this.props.onChangeStateColumn}/>
                                </li>
                            )
                        }
                        <li className="btn-close">
                            <span className="glyphicon glyphicon-repeat"></span>
                        </li>
                    </ul>
                </div>
            </div>
        )

    }
}