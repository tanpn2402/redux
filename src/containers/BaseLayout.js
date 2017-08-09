import React from 'react'
import "react-table/react-table.css"
import $ from 'jquery'
import generateWindow from './view'

var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);

class BaseLayout extends React.Component {

    constructor () {
        super()
        console.log("BaseLayout constructor")

        this.layout = []

        this.style = {
            height: '100%',
            width: '100%',
        }
    }

    generateChild(menuid){
       
        return (
            <div key={menuid} data-grid={{x: this.layout[menuid]['x'], y: this.layout[menuid]['y'], w: this.layout[menuid]['w'], h: this.layout[menuid]['h'], minW: this.layout[menuid]['minW'], minH: this.layout[menuid]['minH'], maxW: this.layout[menuid]['maxW'], maxH: this.layout[menuid]['maxH'], static: false}}>
                <div className="child-grid-header" >
                    <div className="col-md-8 window-title">
                        <span>{menuid}</span>
                    </div>
                    <div className="col-md-4 window-action">
                        <ul className="btn-action">
                            <li className="btn-pin"><a href="javascript:void(0);" id={menuid}  onClick={this.onPinLayout.bind(this)} >!</a></li>
                            <li className="btn-close"><a href="javascript:void(0);" id={menuid} onClick={this.onCloseLayout.bind(this)} >x</a></li>
                        </ul>
                    </div>
                        
                </div>
                <div id={menuid + '-main'} className="child-grid-body" >
                        <div id={menuid + '-body'} className="layout-body">
                            {

                                generateWindow(menuid, this.props)
                            }
                        </div>
                </div>
            </div>
        )
    }

    generateDOM(p){
        console.log(this.props)
        var child = [];
        console.log(p)
        if(p == undefined)
            return
       
        for (var i = 0; i < p.length; i += 1) {
            
            if(this.layout[p[i]] === undefined )
                this.layout[p[i]] = {i: p[i], x:0, y:0, w: 25, h: 15, minW: 25, minH: 15, maxW: 30, maxH: 15};

            console.log(this.layout)
            child.push( this.generateChild(p[i]) );
            
        };

        
        return child;
    }

    onDragStop(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
                     placeholder: LayoutItem, e: MouseEvent, element: HTMLElement){

        this.layout[newItem.i] = newItem
    }

    onResizeStop(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
                     placeholder: LayoutItem, e: MouseEvent, element: HTMLElement){
        this.layout[newItem.i] = newItem

        var mainH = $('#' + newItem.i + '-main').height()
        var bodyH = mainH - 70;
        $('#' + newItem.i + '-body').height(bodyH)

        console.log('onResizeStop', $('#' + newItem.i + '-main').height()    )
    }

    onResize(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
                     placeholder: LayoutItem, e: MouseEvent, element: HTMLElement){
        this.layout[newItem.i] = newItem

        var mainH = $('#' + newItem.i + '-main').height()
        var bodyH = mainH - 70;
        $('#' + newItem.i + '-body').height(bodyH)

        console.log('onResize', $('#' + newItem.i + '-main').height()    )
    }

    onPinLayout(e){
        //this.layout[e.target.id]['static'] = !this.layout[e.target.id]['static']
    }

    onCloseLayout(e){
        /*this.setState({
            mvLayout: this.state.mvLayout.filter(el => el.i !== e.target.id)
        });*/
    }


    onLayoutChange(layout){
        console.log('onLayoutChange', layout);

    }

    componentWillUpdate(){
        //console.log('sdasdsa', $('#abc').height()    )
    }

    componentDidUpdate(){
        //console.log('sdasdsa', $('#abc').height()    )
    }
    render () {
        //console.log(this.props.layout);
        return (

            <ReactGridLayout className="layout" cols={30} rowHeight={30} width={1320} 
                onResize={this.onResize.bind(this)}
                onResizeStop={this.onResizeStop.bind(this)}
                //onResizeStart={this.props.onResizeStart}
                //onDrag={this.props.onDrag}
                //onDragStart={this.props.onDragStart}
                onDragStop={this.onDragStop.bind(this)}
                onLayoutChange={this.onLayoutChange}
                >
                {this.generateDOM(this.props.layout)}
            </ReactGridLayout>
        );
    }
}

export default BaseLayout;