import React from 'react'
import "react-table/react-table.css"
import $ from 'jquery'
import generateWindow from './view'
import config from '../core/config'
import { connect } from 'react-redux'
import * as actions from '../actions'

var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);

class BaseLayout extends React.Component {

    constructor () {
        super()
        console.log("BaseLayout constructor")
        this.state= {
            reload: false,
            layout: []
        }
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

                <div className="child-grid-header" >
                        {this.props.title[menuid]}
                        <ul className="btn-action">
                            {/*<li>
                                <a href="javascript:void(0);"   onClick={e => this.onPinLayout(menuid)} >
                                    <span className="glyphicon glyphicon-pushpin"></span>
                                </a>
                            </li>*/}
                            <li>
                                <a href="javascript:void(0);" onClick={e => this.onCloseLayout(menuid)} >
                                    <span className="glyphicon glyphicon-remove"></span>
                                </a>
                            </li>
                        </ul>
                        
                </div>
                <div id={menuid + '-main'} className="child-grid-body" onMouseDown={ e => e.stopPropagation() }>
                        {
                            generateWindow(menuid, this.props)
                        }
                        
                </div>
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
                console.log('load from default layout')
                this.state.layout[p[i]] = config.layoutdefault[p[i]]
            }
            
            console.log('accc', this.state.layout[p[i]])
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

        if (document.getElementById(newItem.i + '-table') !== null) {
            document.getElementById(newItem.i + '-body').style.height = newItem.h * 39 - 25 + 'px'
            document.getElementById(newItem.i + '-table').style.height =
                document.getElementById(newItem.i + '-body').offsetHeight - 65 + 'px'
        }
    }

    onResize(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
        placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) {
        var _layout = this.state.layout
        _layout[newItem.i] = newItem
        this.setState({ layout: _layout })

        if (document.getElementById(newItem.i + '-table') !== null) {
            document.getElementById(newItem.i + '-body').style.height =
                document.getElementById(newItem.i + '-main').offsetHeight - 25 + 'px'

            document.getElementById(newItem.i + '-table').style.height =
                document.getElementById(newItem.i + '-body').offsetHeight - 65 + 'px'
        }
    }

    onPinLayout(menuid){
        //console.log(menuid)
        /*console.log(this.layout)
        this.layout[menuid]['static'] = !this.layout[menuid]['static']
        this.setState({reload: !this.state.reload});
        console.log(this.layout)*/
        console.log('onPinLayout ---', this.state.layout)
        var _layout = this.state.layout
        var temp = this.state.layout[menuid].static
        _layout[menuid].static = !temp
         this.setState({layout: _layout})

        console.log('onPinLayout',this.state.layout)
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

            <ReactGridLayout className="layout" cols={30} rowHeight={30} width={1320} 
                onResize={this.onResize.bind(this)}
                onResizeStop={this.onResizeStop.bind(this)}
                onDragStop={this.onDragStop.bind(this)}
                onLayoutChange={this.onLayoutChange}
                >
                {this.generateDOM(layout)}
            </ReactGridLayout>
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