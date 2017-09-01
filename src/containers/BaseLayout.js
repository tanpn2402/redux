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
        console.log("BaseLayout constructor")
        this.state= {
            reload: false,
            layout: []
        }
        this.layoutCols =  {lg: 8, md: 6, sm: 4, xs: 2, xxs: 2}
    }

    generateChild(menuid){
        //console.log(this.layout[menuid])
        const layout = this.state.layout
        console.log(layout)
        return (
            <div key={menuid} 
                data-grid={{x: layout[menuid]['x'], y: layout[menuid]['y'], w: layout[menuid]['w'], 
                    h: layout[menuid]['h'], minW: layout[menuid]['minW'], minH: layout[menuid]['minH'], 
                    maxW: layout[menuid]['maxW'], maxH: layout[menuid]['maxH'], static: layout[menuid]['static'],
                    isResizable: layout[menuid]['isResizable']}}>

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

    generateDOM(p){
        var child = [];
        if(p === undefined)
            return
       
        for (var i = 0; i < p.length; i += 1) {
            if(this.state.layout[p[i]] === undefined )
            {
                
                
                if(window.innerWidth < 768){
                    this.state.layout[p[i]] = config.layoutdefault_sm[p[i]]
                    this.state.layout[p[i]].static = true

                }
                else{
                    this.state.layout[p[i]] = config.layoutdefault[p[i]]
                }
                /*if(window.innerWidth > 1100)
                {
                    this.state.layout[p[i]] = config.layoutdefault[p[i]]
                }
                else if(window.innerWidth > 800)
                {
                    this.state.layout[p[i]] = config.layoutdefault[p[i]]
                }
                else if(window.innerWidth > 600)
                {
                    this.state.layout[p[i]] = config.layoutdefault[p[i]]
                }
                else{
                    this.state.layout[p[i]] = config.layoutdefault[p[i]]
                }*/

            }

            child.push( this.generateChild(p[i]) );
            
        };

        
        return child;
    }

    onDragStop(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
                     placeholder: LayoutItem, e: MouseEvent, element: HTMLElement){

        const _layout = this.state.layout
        _layout[newItem.i] = newItem
        this.setState(layout: _layout)
    }

    onResizeStop(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
        placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) {
        var _layout = this.state.layout
        _layout[newItem.i] = newItem
        this.setState({ layout: _layout })

        /*if (document.getElementById(newItem.i + '-table') !== null) {
            document.getElementById(newItem.i + '-body').style.height = newItem.h * 39 - 25 + 'px'
            document.getElementById(newItem.i + '-table').style.height =
                document.getElementById(newItem.i + '-body').offsetHeight - 65 + 'px'
        }*/
    }

    onResize(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
        placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) {
        var _layout = this.state.layout
        _layout[newItem.i] = newItem
        this.setState({ layout: _layout })

        /*if (document.getElementById(newItem.i + '-table') !== null) {
            document.getElementById(newItem.i + '-body').style.height =
                document.getElementById(newItem.i + '-main').offsetHeight - 25 + 'px'

            document.getElementById(newItem.i + '-table').style.height =
                document.getElementById(newItem.i + '-body').offsetHeight - 65 + 'px'
        }*/
    }

    onCloseLayout(menuid){
        this.props.onRemoveTab(menuid, this.props.page, this.props.layout, true)
    }


    onLayoutChange(layout){
        console.log('onLayoutChange', layout);
    }

    componentWillUpdate(){
        //console.log('sdasdsa', $('#abc').height()    )
    }

    componentDidMount(){
        //console.log('sdasdsa', $('#abc').height()    )

        
    }
    render () {
        console.log('render in BaseLayout', this.props);
        const layout = this.props.layout[this.props.page]
        return (

            <ResponsiveReactGridLayout className="layout" cols={this.layoutCols} rowHeight={53} width={1320} 
                onResize={this.onResize.bind(this)}
                onResizeStop={this.onResizeStop.bind(this)}
                onDragStop={this.onDragStop.bind(this)}
                onLayoutChange={this.onLayoutChange}
                margin={[1,1]}
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