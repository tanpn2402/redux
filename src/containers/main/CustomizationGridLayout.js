import React from 'react'
import $ from 'jquery'
import generateWindow from '../widget'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import config from '../../core/config'

// var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var _ = require('lodash')
var WidthProvider = require('react-grid-layout').WidthProvider
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout)

class CustomGridLayout extends React.Component {

    constructor() {
        super()
        this.state = {
            layout: [],
            list: []
        }
        this.layoutCols = { lg: 8, md: 6, sm: 4, xs: 2, xxs: 2 }

        this.screenSize = 'lg'
    }

    generateChild(menuid) {
        const layout = this.state.layout[menuid]
        layout['x'] = layout['x'] === undefined ? 0 : layout['x']
        layout['y'] = layout['y'] === undefined ? 0 : layout['y']

        layout['w'] =  layout[this.screenSize + 'W'] === undefined ? layout['w'] : layout[this.screenSize + 'W']
        layout['h'] =  layout[this.screenSize + 'H'] === undefined ? layout['h'] : layout[this.screenSize + 'H']

        return (
            <div key={menuid}
                data-grid={{
                    x: layout['x'], y: layout['y'], w: layout['w'], h: layout['h'], minW: layout['minW'], 
                    minH: layout['minH'], maxW: layout['maxW'], maxH: layout['maxH'], 
                    isDraggable: layout['isDraggable'], isResizable: layout['isResizable'],
                    static: layout['static']
                }}>

                {
                    generateWindow(menuid, this.props)
                }


            </div>
        )
    }

    generateDOM(layout) {
        var child = []

        for (var i = 0; i < layout.length; i += 1) {

            if (this.state.list.indexOf(layout[i].i) < 0) {
                this.state.list.push(layout[i].i)
                this.state.layout[layout[i].i] = layout[i]
                child.push(this.generateChild(layout[i].i))
            }
            else {
                //
            }


        };


        return child;
    }

    onDragStop(layout, oldItem, newItem, placeholder, e, element) {
        const _layout = this.state.layout
        _layout[newItem.i].x = newItem.x
        _layout[newItem.i].y = newItem.y
        this.state.layout = _layout
        //console.log(this.state.layout)

        this.saveLayout()
    }

    onResizeStop(layout, oldItem, newItem, placeholder, e, element) {
        const _layout = this.state.layout
        _layout[newItem.i][this.screenSize + 'W'] = newItem.w
        _layout[newItem.i][this.screenSize + 'H'] = newItem.h
        this.state.layout = _layout
        //console.log(this.state.layout)

        this.saveLayout()
    }

    saveLayout() {
        var tmp = config.tabbar.filter(e => e.id === this.props.id)
        var index = 0
        for (var i = 0; i < config.tabbar.length; i++) {
            if (config.tabbar[i].id === this.props.id) break
            else index++
        }
        
        config.tabbar[index].widget = []
        for (var i = 0; i < this.state.list.length; i++) {
            config.tabbar[index].widget.push(this.state.layout[this.state.list[i]])
        }

        //console.log(config.tabbar)
    }

    render() {
        const layout = this.props.layout
        this.state.list = []
        return (
            <ResponsiveReactGridLayout className="layout" cols={this.layoutCols} rowHeight={config.gridHeight} width={1320}
                onResizeStop={this.onResizeStop.bind(this)}
                onDragStop={this.onDragStop.bind(this)}
                margin={[3, 3]}
                useCSSTransforms={false}
            >
                {this.generateDOM(layout)}
            </ResponsiveReactGridLayout>
        );
    }
}
const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomGridLayout)