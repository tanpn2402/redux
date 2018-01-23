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
        var tabs = config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget
        
        var indexOfTobeDelWidget = tabs.findIndex(tab => {
            return tab.i == widgetID
        })
        console.log(tabs,widgetID )
        if (indexOfTobeDelWidget > -1) {
            config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget.splice(indexOfTobeDelWidget, 1) //Delete widget from CustomConfig
            this.props.reloadCustom(this.props.load)
        }

    }


    render() {
        let widgetHeader = this.props.theme.widget.widgetHeader
        return (
            <div className="widget-header" style={widgetHeader}>
                <div className="widget-title">
                    <label>
                        {this.props.children}
                    </label>
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
                                            filterable={this.props.filterable}
                                            language={this.props.language}
                                            onChangeStateColumn={this.props.onChangeStateColumn}
                                            onToggleFilter={(e) => { this.props.onToggleFilter(e) }} />
                                    </li>
                                )
                        }

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