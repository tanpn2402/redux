import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import CustomizationGridLayout from '../../main/CustomizationGridLayout.js'
import config from '../../../core/config'


class Social extends Component {
    constructor(props) {
        super(props)
        this.customConfig = config.tabbar[config.tabbar.findIndex(tab=>tab.id==this.props.tabID)]
        this.state = {
            layout : this.customConfig.widget.length>0?this.customConfig.widget:[]
        }

        this.reloadWidget = this.reloadLayout.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.load != this.props.load){
            this.reloadLayout()
        }
        // console.log(nextProps, this.state.layout, this.state.layout.map(e => e.i == "userdetail").length)
        if(nextProps.showUserDetail) {
            if(this.state.layout.filter(e => e.i == "userdetail").length < 1) {
                let mtp = this.state.layout
                mtp.push({ i: 'userdetail', x: 4, y: 2, w: 2, h: 30, minH: 10, maxH: 24, minW: 2, isDraggable: true, isResizable: false })
                this.setState({
                    layout: mtp
                })
            }
            console.log(nextProps, this.state.layout)
        } else {
            if(this.state.layout.filter(e => e.i == "userdetail").length > 0) {
                this.setState({
                    layout: this.state.layout.filter(el => el.i != "userdetail")
                })
            }
        }
    }

    reloadLayout(){
        var widgets = config.tabbar[config.tabbar.findIndex(tab=>tab.id==this.props.tabID)].widget

        this.setState({
            layout : widgets.length > 0 ? [...widgets] : []
        })
    }


    render(){
        console.log(this.state.layout)
        return(
            <CustomizationGridLayout
                id={this.props.tabID}
                language={this.props.language}
                layout={this.state.layout}
                stockList={this.props.stockList} 
                theme={this.props.theme}
                margin={[10, 10]}>
            </CustomizationGridLayout>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        load: state.menuSelected.load,
        reload: state.social.reload,
        showUserDetail: state.social.show
    }
}

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Social)
