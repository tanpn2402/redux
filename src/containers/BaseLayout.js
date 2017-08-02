import React from 'react';
import BasicTable from './BasicTable';
import SearchArea from './SearchArea';
import DropdownCheckBox from './DropdownCheckBox';
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
    }

    generateChild(p){
        var products = [{
              id: 1,
              name: "Product1",
              price: 120
          }, {
              id: 2,
              name: "Product2",
              price: 80
          }];
        return (
            <div key={p.i} data-grid={{x: p.x, y: p.y, w: p.w, h: p.h, minW: p.minW, minH: p.minH, static: p.static}}>
                <div className="child-grid-header" onClick={this.props.onWindowTitleClick}>
                    <div className="col-md-8 window-title">
                        <span>{p.i.split('-')[0]}</span>
                    </div>
                    <div className="col-md-4 window-action">
                        <ul className="btn-action">
                            <li className="btn-pin"><a href="javascript:void(0);" id={p.i}  onClick={this.onPinLayout.bind(this)}>!</a></li>
                            <li className="btn-close"><a href="javascript:void(0);" id={p.i}  onClick={this.onCloseLayout.bind(this)}>x</a></li>
                        </ul>
                    </div>
                        
                </div>
                <div className="child-grid-body" onClick={this.props.onWindowBodyClick}>
                        <div className="layout-body">
                            <div>
                                <SearchArea></SearchArea>
                            </div>
                            <BasicTable></BasicTable>
                        </div>
                </div>
            </div>

        )
    }

    generateChildTest(menuid){
       
        return (
            <div key={menuid} data-grid={{x: this.layout[menuid]['x'], y: this.layout[menuid]['y'], w: this.layout[menuid]['w'], h: this.layout[menuid]['h'], minW: this.layout[menuid]['minW'], minH: this.layout[menuid]['minH'], static: false}}>
                <div className="child-grid-header" >
                    <div className="col-md-8 window-title">
                        <span>{menuid}</span>
                    </div>
                    <div className="col-md-4 window-action">
                        <ul className="btn-action">

                        
                            <li className="btn-settings">
                                <DropdownCheckBox />
                            </li>

                            <li className="btn-pin"><a href="javascript:void(0);" id={menuid}  onClick={this.onPinLayout.bind(this)} >!</a></li>
                            <li className="btn-close"><a href="javascript:void(0);" id={menuid} onClick={this.onCloseLayout.bind(this)} >x</a></li>


                        </ul>
                    </div>
                        
                </div>
                <div className="child-grid-body" >
                        <div className="layout-body">
                            <SearchArea></SearchArea>
                            <BasicTable></BasicTable>
                        </div>
                </div>
            </div>
        )
    }

    generateDOM(p){
        var child = [];
        console.log(p)
        if(p == undefined)
            return
       
        for (var i = 0; i < p.length; i += 1) {
            
            if(this.layout[p[i]] === undefined )
                this.layout[p[i]] = {i: p[i], x:0, y:0, w: 10, h: 12, minX: 10, minY: 10};

            console.log(this.layout)
            child.push( this.generateChildTest(p[i]) );
            
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
        //console.log('onLayoutChange', layout);
    }
    render () {
        //console.log(this.props.layout);
        return (

            <ReactGridLayout className="layout" cols={20} rowHeight={30} width={1320} 
                //onResize={this.props.onResize}
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