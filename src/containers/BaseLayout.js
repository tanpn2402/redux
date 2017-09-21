import React from 'react'
import "react-table/react-table.css"
import $ from 'jquery'
import generateWindow from './view'
import config from '../core/config'
import { connect } from 'react-redux'
import * as actions from '../actions'

var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var _ = require('lodash')
var WidthProvider = require('react-grid-layout').WidthProvider
var ResponsiveReactGridLayout  = require('react-grid-layout').Responsive
ResponsiveReactGridLayout  = WidthProvider(ResponsiveReactGridLayout )

class BaseLayout extends React.Component {

    constructor () {
        super()
        this.state= {
            reload: false,
            layout: []
        }
        this.layoutCols =  {lg: 8, md: 6, sm: 4, xs: 2, xxs: 2}
    }

    generateChild(menuid){
        console.log(this.state.layout)
        const layout = this.state.layout[menuid]
        console.log(layout)
        return (
            <div key={menuid} 
                data-grid={{x: layout['x'], y: layout['y'], w: layout['w'], 
                    h: layout['h'], minW: layout['minW'], minH: layout['minH'], 
                    maxW: layout['maxW'], maxH: layout['maxH'], static: layout['static'],
                    isResizable: layout['isResizable']}}>

                <div className="component-header" >
                        <span className="content-block-head">
                            {this.props.title[menuid]}
                        </span>
                        <ul className="btn-action">
                            <li className="btn-close">
                                <span className="glyphicon glyphicon-remove" onClick={e => this.onCloseLayout(menuid)}></span>
                            </li>
                        </ul>
                        
                </div>
                
                {
                    generateWindow(menuid, this.props)
                }
                        
             
            </div>
        )
    }

    generateDOM(layout){
        var child = []
        
        for (var i = 0; i < layout.length; i += 1) {
            this.state.layout[layout[i].i] = layout[i]
            child.push( this.generateChild(layout[i].i) )
            
        };

        
        return child;
    }
    render () {
        const layout = this.props.layout
        return (

            <ResponsiveReactGridLayout className="layout" cols={this.layoutCols} rowHeight={53} width={1320} 
                margin={[3,3]}
                >
                {this.generateDOM(layout)}
            </ResponsiveReactGridLayout>
        );
    }
}
const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch, props) => ({
    onRemoveTab: (menuid,pageid, tabList, reload) => {
        dispatch(actions.menuRemoved(menuid, pageid, tabList, reload))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)