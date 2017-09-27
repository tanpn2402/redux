import React, { Component } from 'react'
import ConfigColumnTable from '../commons/ConfigColumnTable'
import { connect } from 'react-redux'
import config from '../../core/config'
import * as actions from '../../actions'

class WidgetTitle extends Component {
    constructor(props) {
        super(props)
        this.customConfig = config.tabbar[config.tabbar.findIndex(tab=>tab.id=="customization")]
    }

    removeWidget(){
        var widgetID = this.props.widgetID
        console.log("WIDGET " + widgetID + " WILL BE DELETED")
        console.log(this.customConfig)
        var tabs = this.customConfig.widget

        var indexOfTobeDelWidget = tabs.findIndex(tab =>{
            return tab.i == widgetID
        })

        if (indexOfTobeDelWidget>-1){
            console.log(this.customConfig)
            this.customConfig.widget.splice(indexOfTobeDelWidget,1) //Delete widget from CustomConfig
            this.props.reloadCustom(this.props.load)
        }
        
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
                                <li onMouseDown={ e => e.stopPropagation() }>
                                    <ConfigColumnTable 
                                        id={this.props.id}
                                        columns={this.props.columns} 
                                        onChangeStateColumn={this.props.onChangeStateColumn}/>
                                </li>
                            )
                        }
                        
                        <li className="btn-close" >
                            <span className="glyphicon glyphicon-repeat"></span>
                        </li>

                        {
                            this.props.tabID !== 'customization' ? '' :
                            (
                                <li className="btn-close" onClick={e => this.removeWidget()} onMouseDown={ e => e.stopPropagation() }>
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