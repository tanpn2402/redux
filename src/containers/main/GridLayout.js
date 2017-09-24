import React from 'react'
import $ from 'jquery'
import generateWindow from '../widget'
import { connect } from 'react-redux'
import * as actions from '../../actions'

var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin')
var _ = require('lodash')
var WidthProvider = require('react-grid-layout').WidthProvider
var ResponsiveReactGridLayout  = require('react-grid-layout').Responsive
ResponsiveReactGridLayout  = WidthProvider(ResponsiveReactGridLayout )

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
        console.log(this.state.layout)
        const layout = this.state.layout[menuid]
        console.log(layout)
        return (
            <div key={menuid} 
                data-grid={{x: layout['x'], y: layout['y'], w: layout['w'], 
                    h: layout['h'], minW: layout['minW'], minH: layout['minH'], 
                    maxW: layout['maxW'], maxH: layout['maxH'], static: layout['static'],
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
        return (

            <ResponsiveReactGridLayout className="layout" cols={this.layoutCols} rowHeight={53} width={1320} 
                margin={[3,3]}
                >
                {x}
            </ResponsiveReactGridLayout>
        );
    }
}
const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch, props) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(GridLayout)