import React, { Component } from 'react'
import ConfigColumnTable from '../commons/ConfigColumnTable'
import { connect } from 'react-redux'
import config from '../../core/config'
import * as actions from '../../actions'

class WidgetTitle extends Component {
    constructor(props) {
        super(props)
        
        this.globalLoad = false
        this.state = {
            reload: false
        }

        this.reloadWidget = this.reloadWidget.bind(this)
    }

    reloadWidget() {
        this.props.reloadCustom(this.props.widgetID)
    }

    removeWidget() {
        var widgetID = this.props.widgetID
        //console.log(config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")])
        var tabs = config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget

        var indexOfTobeDelWidget = tabs.findIndex(tab => {
            return tab.i == widgetID
        })

        if (indexOfTobeDelWidget > -1) {
            //console.log(config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")])
            config.tabbar[config.tabbar.findIndex(tab => tab.id == "customization")].widget.splice(indexOfTobeDelWidget, 1) //Delete widget from CustomConfig
            this.props.reloadCustom(this.props.load)
        }

    }

    componentWillReceiveProps(nextProps) {
        this.globalLoad = nextProps.load
    }
    shouldComponentUpdate (nextProps, nextState){
        // return a boolean value
        if (this.globalLoad != nextProps.load){
            this.globalLoad = nextProps.load
            return false
        }
        
        return true
    }

    render() {
        //console.log("RELOAD TITLE")
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
                                            onChangeStateColumn={this.props.onChangeStateColumn} />
                                    </li>
                                )
                        }

                        <li className="btn-close" >
                            <span className="glyphicon glyphicon-repeat" onClick={()=>this.reloadWidget()}></span>
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
    load: state.menuSelected.load
})

const mapDispatchToProps = (dispatch, props) => ({
    reloadCustom: (widgetID) => {
        dispatch(actions.reloadCustom(widgetID))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetTitle)
