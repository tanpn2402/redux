import React, { Component } from 'react'
import ConfigColumnTable from '../commons/ConfigColumnTable'
import { connect } from 'react-redux'
import config from '../../core/config'
import * as actions from '../../actions'

class WidgetTitle extends Component {
    constructor(props) {
        super(props)
    }

    removeWidget() {
        var widgetID = this.props.widgetID
        console.log("WIDGET " + widgetID + " WILL BE DELETED")
        console.log(config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")])
        var tabs = config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget

        var indexOfTobeDelWidget = tabs.findIndex(tab => {
            return tab.i == widgetID
        })

        if (indexOfTobeDelWidget > -1) {
            console.log(config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")])
            config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget.splice(indexOfTobeDelWidget, 1) //Delete widget from CustomConfig
            this.props.reloadCustom(this.props.load)
        }

    }


    render() {
        //console.log(this.props.children)
        let widgetheader = this.props.theme.widget == undefined ? undefined : this.props.theme.widget.widgetheader
        return (
            <div className="widget-header" style={widgetheader}>
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
                                    <li onMouseDown={e => e.stopPropagation()}>
                                        <ConfigColumnTable
                                            id={this.props.id}
                                            columns={this.props.columns}
                                            language={this.props.language}
                                            onChangeStateColumn={this.props.onChangeStateColumn}
                                            onToggleFilter={(e) => { this.props.onToggleFilter(e) }} />
                                    </li>
                                )
                        }

                        <li className="btn-close" >
                            <span className="glyphicon glyphicon-repeat"></span>
                        </li>

                        {
                            this.props.tabID !== 'customization' ? '' :
                                (
                                    <li className="btn-close" onClick={e => this.removeWidget()} onMouseDown={e => e.stopPropagation()}>
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    tabID: state.menuSelected.tabID,
    load: state.menuSelected.load
})

const mapDispatchToProps = (dispatch, props) => ({
    reloadCustom: (load) => {
        dispatch(actions.reloadCustom(load))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetTitle)