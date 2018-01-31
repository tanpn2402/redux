import React from 'react'
import $ from 'jquery'
import generateWindow from '../widget'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import config from "../../core/config"

var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var _ = require('lodash')
var WidthProvider = require('react-grid-layout').WidthProvider
var ResponsiveReactGridLayout  = require('react-grid-layout').Responsive
ResponsiveReactGridLayout  = WidthProvider(ResponsiveReactGridLayout )

const HEIGHT = config.gridHeight


class GridLayout extends React.Component {

    constructor () {
        super()
        this.state= {
            reload: false,
            layout: []
        }
        this.layoutCols =  {lg: 8, md: 8, sm: 8, xs: 2, xxs: 2}
    }

    generateChild(menuid){
        //console.log(this.state.layout)
        const layout = this.state.layout[menuid]
        // console.log(layout)
        
        let col
        if(layout['h'] == undefined) {
            try {
                let y = layout['y']
                let ele = document.getElementById("maincontent")
                let tab = document.getElementById("management")
                let hei = 0
                if(layout['tab'] == undefined || layout['tab'] == 0) {
                    hei = ele.offsetHeight - 60
                }
                else {
                    hei = ele.offsetHeight - 60 - 30
                }
                let heightToFit = hei - y*(HEIGHT + 7)
                col = Math.floor(heightToFit / (HEIGHT + 7))

                col = col > layout["maxH"] ? layout["maxH"] : col < layout["minH"] ? layout["minH"] : col
            } catch(ex) {
                col = layout["minH"]
            }
        } else {
            col = layout['h']
        }
        // console.log(menuid + "   " + col)
        return (
            <div key={menuid + (new Date()).getTime()} 
                data-grid={{x: layout['x'], y: layout['y'], w: layout['w'], 
                    h: col, minW: layout['minW'], minH: layout['minH'], 
                    maxW: layout['maxW'], maxH: layout['maxH'], isDraggable: layout['isDraggable'],
                    isResizable: layout['isResizable']}}>

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
        var x = this.generateDOM(layout)

        let identifyLayout = this.layoutCols
        if(this.props.identifyLayout != undefined) {
            identifyLayout = this.props.identifyLayout
        }
        return (
            <ResponsiveReactGridLayout className="layout" cols={identifyLayout} rowHeight={HEIGHT} width={1320} 
                margin={this.props.margin} useCSSTransforms={false}
                >
                {x}
            </ResponsiveReactGridLayout>
        );
    }
}

GridLayout.defaultProps = {
    margin: [4,4],
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch, props) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(GridLayout)